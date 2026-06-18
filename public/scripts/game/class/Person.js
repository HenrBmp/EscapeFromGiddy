import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '../ConstantesViewport.js';
import Entidade from './Entidade.js';

export default class Personagem extends Entidade {
    /** @type Number */
    #velocity_PixelPorSec;

    /**
     * @param {CanvasRenderingContext2D} contextoCanvas
     * @param {HTMLImageElement} sprite
     * @param {Number} velocity
     */
    constructor(contextoCanvas, sprite, velocity) {
        super(contextoCanvas, sprite);
        this.setSpeed(velocity);
        this.gerarDimensoes(6);
    }

    /**
     * @param {Number} deslocamentoEmX
     * @param {Number} deslocamentoEmY
     */
    mover(deslocamentoEmX, deslocamentoEmY) {
        this.xPositionLeft += deslocamentoEmX;
        this.yPositionTop += deslocamentoEmY;

        this.evitarColisaoParede();

        this.setPosition(this.xPositionLeft, this.yPositionTop);
    }

    /**
     * Caso haja colisão com a parede, deslocamento é reduzido para manter-se dentro do espaço seguro.
     */
    evitarColisaoParede() {
        if (this.xPositionLeft < 0) this.xPositionLeft = 0;
        else if (this.xPositionRight > VIEWPORT_WIDTH)
            this.xPositionLeft = VIEWPORT_WIDTH - this.width;

        if (this.yPositionTop < 0) this.yPositionTop = 0;
        else if (this.yPositionBottom > VIEWPORT_HEIGHT)
            this.yPositionTop = VIEWPORT_HEIGHT - this.height;
    }

    /** @param {Number} newSpeed */
    setSpeed(newSpeed) {
        if (!Number.isInteger(newSpeed))
            throw new Error('newSpeed deve ser um inteiro, recebido ' + typeof newSpeed);
        this.#velocity_PixelPorSec = newSpeed;
    }

    /**
     * Verifica a colisão entre 2 personagens.
     * @param {Personagem} personA
     * @param {Personagem} personB
     */
    static verificarColisaoPersons(personA, personB) {
        if (!(personA instanceof Personagem) || !(personB instanceof Personagem)) {
            throw new Error('Os argumentos devem ser do tipo Person');
        }
        const houveColisao = this.verificarColisaoAABB(personA, personB);
        return houveColisao;
    }

    get velocity() {
        return this.#velocity_PixelPorSec;
    }
}
