import fimJogoPopUp from './fimJogoPopUp.js';
import Personagem from './class/Personagem.js';
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './ConstantesViewport.js';
import Obstaculo from './class/Obstaculo.js';
import Buff from './class/Buff.js';

(function () {
    const contagemContainer = document.querySelector('#contagem');
    const sobreposicaoCarregamento = document.querySelector('#sobreposicaoCarregamento');
    function iniciarContagemRegressiva() {
        setTimeout(() => {
            contagemContainer.remove();
            iniciarJogo();
        }, 4000);
    }

    window.addEventListener('load', function windowLoad() {
        sobreposicaoCarregamento.remove();
        contagemContainer.classList.add('animacao-contagem-regressiva');

        contagemContainer.addEventListener('animationstart', function contagemAnimationStart() {
            iniciarContagemRegressiva();
            contagemContainer.removeEventListener('animationstart', contagemAnimationStart);
            window.removeEventListener('load', windowLoad);
        });
    });
})();

function iniciarJogo() {
    const TEMPO_LIMITE_JOGO = 1.5 * 60 * 1000;
    const TEMPO_RAGE = TEMPO_LIMITE_JOGO * 0.7;
    const INTERVALO_SPAWN_BUFF = 15_000;
    const RAGE_BUFF_PERCENT = 30;
    let rageAtivo = false;
    const NUMERO_MAX_DE_OBSTACULOS = 10;
    /**
     * Calcula a pontuação do jogador com base no tempo sobrevivido.
     * @param {Number} tempoSobrevividoMs Tempo sobrevivido em milissegundos
     * @returns Pontuação
     */
    const calcPontuacao = (tempoSobrevividoMs) => Math.round(tempoSobrevividoMs / 100);

    const teclasPressionadas = {};
    window.addEventListener('keydown', (e) => {
        const keydownTeclaToLower = e.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(keydownTeclaToLower))
            teclasPressionadas[keydownTeclaToLower] = true;
    });
    window.addEventListener('keyup', (e) => {
        const keyupTeclaToLower = e.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(keyupTeclaToLower))
            teclasPressionadas[keyupTeclaToLower] = false;
    });

    /** @type Array<Obstaculo> */
    let obstaculos = [];

    /** @type Array<Buff> */
    const buffs = [];

    const CTX = (() => {
        /** @type HTMLCanvasElement */
        const canva = document.querySelector('#root canvas');
        canva.height = VIEWPORT_HEIGHT;
        canva.width = VIEWPORT_WIDTH;
        return canva.getContext('2d');
    })();

    const gustin = (() => {
        const gustinSpriteImg = document.querySelector('img#gustin');
        return new Personagem(CTX, gustinSpriteImg, 450);
    })();

    const giddy = (() => {
        const giddyNormalSprite = document.querySelector('img#giddyNormal');
        return new Personagem(CTX, giddyNormalSprite, 250);
    })();

    gustin.setPosition(
        VIEWPORT_WIDTH / 2 - gustin.width / 2,
        VIEWPORT_HEIGHT * 0.9 - gustin.height,
    );
    gustin.desenhar();
    giddy.setPosition(VIEWPORT_WIDTH / 2 - giddy.width / 2, VIEWPORT_HEIGHT * 0.1);
    giddy.desenhar();

    function gerarNovoBuff() {
        const buff = new Buff(CTX);
        buff.gerarPosicionamentoSeguro(gustin, giddy, ...obstaculos);
        buffs.push(buff);
    }
    setInterval(gerarNovoBuff, INTERVALO_SPAWN_BUFF);

    function gerarNovoObstaculo() {
        const obstaculoGerado = new Obstaculo(CTX);
        obstaculoGerado.gerarPosicionamentoSeguro(gustin, giddy, ...obstaculos);
        obstaculos.push(obstaculoGerado);
    }
    setInterval(gerarNovoObstaculo, TEMPO_LIMITE_JOGO / NUMERO_MAX_DE_OBSTACULOS);

    function startRage() {
        const rageSprite = document.querySelector('img#giddyRage');

        rageAtivo = true;
        giddy.setSprite(rageSprite);
        giddy.speed *= 1 + RAGE_BUFF_PERCENT / 100;
    }
    setTimeout(startRage, TEMPO_RAGE);

    let timestampInicial;
    let timestampAnterior;
    requestAnimationFrame(function atualizarTick(timestamp) {
        if (!timestampInicial) timestampInicial = timestampAnterior = timestamp;

        const variacaoTempoSegundos = (timestamp - timestampAnterior) / 1000;
        timestampAnterior = timestamp;

        const tempoAcabou = timestamp >= timestampInicial + TEMPO_LIMITE_JOGO;
        if (tempoAcabou) {
            clearInterval(gerarNovoObstaculo);
            fimJogoPopUp(true, calcPontuacao(timestamp));
            return;
        }

        // Movimentação do player
        const {
            w: wPressionado,
            s: sPressionado,
            a: aPressionado,
            d: dPressionado,
        } = teclasPressionadas;

        const decomposicaoDiagonalGustin =
            (wPressionado || sPressionado) && (aPressionado || dPressionado) ? 0.7 : 1;

        const multiplicadorDirecaoGustin = {
            x: 0,
            y: 0,
        };
        if (aPressionado) multiplicadorDirecaoGustin.x--;
        if (dPressionado) multiplicadorDirecaoGustin.x++;

        if (wPressionado) multiplicadorDirecaoGustin.y--;
        if (sPressionado) multiplicadorDirecaoGustin.y++;

        const deslocamentoGustin = {
            x:
                gustin.speed *
                variacaoTempoSegundos *
                multiplicadorDirecaoGustin.x *
                decomposicaoDiagonalGustin,
            y:
                gustin.speed *
                variacaoTempoSegundos *
                multiplicadorDirecaoGustin.y *
                decomposicaoDiagonalGustin,
        };
        gustin.mover(deslocamentoGustin.x, deslocamentoGustin.y);

        // gustin - desfazer movimentacao em caso de colisão com obstaculo, ou remove-lo se possuir escudo
        for (const obstaculo of obstaculos) {
            if (gustin.colideCom(obstaculo)) {
                if (gustin.possuiEscudo) {
                    obstaculos = obstaculos.filter(
                        (obs) =>
                            obstaculo.xPositionLeft !== obs.xPositionLeft &&
                            obstaculo.yPositionTop !== obs.yPositionTop,
                    );
                } else gustin.mover(-deslocamentoGustin.x, -deslocamentoGustin.y);
            }
        }
        for (const buff of buffs) {
            if (gustin.colideCom(buff)) {
                buff.aplicarBuff(gustin);
                buffs.pop(buff);
            }
        }

        // Movimentação do npc
        const diferencaX = gustin.xPositionLeft - giddy.xPositionLeft;
        const diferencaY = gustin.yPositionTop - giddy.yPositionTop;
        const multiplicadorDirecaoGiddy = {
            x: Math.sign(diferencaX),
            y: Math.sign(diferencaY),
        };

        const decomposicaoDiagonalGiddy =
            multiplicadorDirecaoGiddy.x !== 0 && multiplicadorDirecaoGiddy.y !== 0 ? 0.7 : 1;

        const deslocamentoGiddy = {
            x:
                giddy.speed *
                variacaoTempoSegundos *
                multiplicadorDirecaoGiddy.x *
                decomposicaoDiagonalGiddy,
            y:
                giddy.speed *
                variacaoTempoSegundos *
                multiplicadorDirecaoGiddy.y *
                decomposicaoDiagonalGiddy,
        };
        giddy.mover(deslocamentoGiddy.x, deslocamentoGiddy.y);

        // giddy - desfazer movimentacao em caso de colisão com obstaculo, rage ignora colisao
        if (giddy.colideCom(...obstaculos) && !rageAtivo) {
            giddy.mover(-deslocamentoGiddy.x, -deslocamentoGiddy.y);
        }

        // Redesenhar frame
        CTX.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        for (const obstaculo of obstaculos) obstaculo.desenhar();
        for (const buff of buffs) buff.desenhar();
        gustin.desenhar();
        giddy.desenhar();

        const houveGameOver = gustin.colideCom(giddy) && !gustin.possuiEscudo;
        if (houveGameOver) {
            clearInterval(gerarNovoObstaculo);
            fimJogoPopUp(false, calcPontuacao(timestamp));
            return;
        }

        requestAnimationFrame(atualizarTick);
    });
}
