import fimJogoPopUp from './fimJogoPopUp.js';
import Person from './Person.js';
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './ConstantesViewport.js';

setTimeout(() => {
    const contagemContainer = document.querySelector('#contagem');
    contagemContainer.remove();
    iniciarJogo();
}, 4000);

function iniciarJogo() {
    const TEMPO_LIMITE_JOGO = 1 * 60 * 1000;
    const TEMPO_RAGE = TEMPO_LIMITE_JOGO * 0.7;
    const RAGE_BUFF_PERCENT = 30;

    const teclasPressionadas = {};
    window.addEventListener('keydown', (e) => {
        const teclaToLower = e.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(teclaToLower)) teclasPressionadas[teclaToLower] = true;
    });
    window.addEventListener('keyup', (e) => {
        const teclaToLower = e.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(teclaToLower)) teclasPressionadas[teclaToLower] = false;
    });

    const CTX = (() => {
        /** @type HTMLCanvasElement */
        const canva = document.querySelector('#root canvas');
        canva.height = VIEWPORT_HEIGHT;
        canva.width = VIEWPORT_WIDTH;
        return canva.getContext('2d');
    })();

    const gustin = (() => {
        const gustinSpriteImg = document.querySelector('img#gustin');
        return new Person(CTX, gustinSpriteImg, 450);
    })();

    const giddy = (() => {
        const giddyNormalSprite = document.querySelector('img#giddyNormal');
        return new Person(CTX, giddyNormalSprite, 250);
    })();

    gustin.setPosition(
        VIEWPORT_WIDTH / 2 - gustin.width / 2,
        VIEWPORT_HEIGHT * 0.9 - gustin.height,
    );
    giddy.setPosition(VIEWPORT_WIDTH / 2 - giddy.width / 2, VIEWPORT_HEIGHT * 0.1);

    // Rage Timer
    setTimeout(() => {
        giddy.setSprite(document.querySelector('img#giddyRage'));
        giddy.setSpeed(Number.parseInt(giddy.velocity * (1 + RAGE_BUFF_PERCENT/100)));
    }, TEMPO_RAGE);

    let timestampInicial;
    let timestampAnterior;
    requestAnimationFrame(function atualizarTick(timestamp) {
        if (!timestampInicial) timestampInicial = timestampAnterior = timestamp;

        const variacaoTempoSegundos = (timestamp - timestampAnterior) / 1000;
        timestampAnterior = timestamp;

        const tempoAcabou = timestamp >= timestampInicial + TEMPO_LIMITE_JOGO;
        if (tempoAcabou) {
            fimJogoPopUp(true, Math.round((timestamp - 4000) / 100));
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
        if (aPressionado) multiplicadorDirecaoGustin.x -= 1;
        if (dPressionado) multiplicadorDirecaoGustin.x += 1;

        if (wPressionado) multiplicadorDirecaoGustin.y -= 1;
        if (sPressionado) multiplicadorDirecaoGustin.y += 1;

        const deslocamentoGustin = {
            x:
                gustin.velocity *
                variacaoTempoSegundos *
                multiplicadorDirecaoGustin.x *
                decomposicaoDiagonalGustin,
            y:
                gustin.velocity *
                variacaoTempoSegundos *
                multiplicadorDirecaoGustin.y *
                decomposicaoDiagonalGustin,
        };

        // Movimentação do npc
        const diferencaX = gustin.xPositionLeft - giddy.xPositionLeft;
        const diferencaY = gustin.yPositionTop - giddy.yPositionTop;
        /* Avaliar se é 0 para evitar NaN */
        const multiplicadorDirecaoGiddy = {
            x: diferencaX === 0 ? 0 : diferencaX / Math.abs(diferencaX),
            y: diferencaY === 0 ? 0 : diferencaY / Math.abs(diferencaY),
        };

        const decomposicaoDiagonalGiddy =
            multiplicadorDirecaoGiddy.x !== 0 && multiplicadorDirecaoGiddy.y !== 0 ? 0.7 : 1;

        const deslocamentoGiddy = {
            x:
                giddy.velocity *
                variacaoTempoSegundos *
                multiplicadorDirecaoGiddy.x *
                decomposicaoDiagonalGiddy,
            y:
                giddy.velocity *
                variacaoTempoSegundos *
                multiplicadorDirecaoGiddy.y *
                decomposicaoDiagonalGiddy,
        };

        // Redesenhar frame
        CTX.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        gustin.mover(deslocamentoGustin.x, deslocamentoGustin.y);
        giddy.mover(deslocamentoGiddy.x, deslocamentoGiddy.y);

        const houveGameOver = Person.verificarColisaoPersons(gustin, giddy);
        if (houveGameOver) {
            fimJogoPopUp(false, Math.round((timestamp - 4000) / 100));
            return;
        }

        requestAnimationFrame(atualizarTick);
    });
}
