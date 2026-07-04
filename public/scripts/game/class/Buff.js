import Objeto from './Objeto.js';
import Personagem from './Personagem.js';

export default class Buff extends Objeto {
    static BUFF_VELOCIDADE_PORCENTO = 15;
    duracao_ms = 5_000;

    constructor(contextoCanvas) {
        const numeroAleatorio = parseInt(Math.random() * 10);
        const efeito = numeroAleatorio % 2 === 0 ? 'flower' : 'shield';
        const sprite = document.querySelector(`img#${efeito}Sprite`);

        super(contextoCanvas, sprite);
        this.efeitoAleatorio = efeito;
    }

    /**
     * @param {Personagem} alvo Person a qual o buff será aplicado
     */
    aplicarBuff(alvo) {
        if (!(alvo instanceof Personagem))
            throw new TypeError(`alvo deve ser do tipo Personagem, recebido ${typeof alvo}`);

        const velocidadeOriginal = alvo.speed;

        if (this.efeitoAleatorio === 'flower') {
            alvo.speed *= 1 + Buff.BUFF_VELOCIDADE_PORCENTO / 100;
        } else if (this.efeitoAleatorio === 'shield') alvo.possuiEscudo = true;

        setTimeout(() => {
            if (this.efeitoAleatorio === 'flower') alvo.speed = velocidadeOriginal;
            else if (this.efeitoAleatorio === 'shield') alvo.possuiEscudo = false;
        }, this.duracao_ms);
    }
}
