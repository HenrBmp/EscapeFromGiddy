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
        this.speed = velocity;
        this.gerarDimensoes(7);
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
    set speed(newSpeed) {
        const dontIsNumber = typeof newSpeed !== "number";
        const isNan = Number.isNaN(newSpeed);
        const isInfinite = !isFinite(newSpeed);
        const isNegative = newSpeed < 0;
        if (dontIsNumber || isNan || isInfinite || isNegative)
            throw new Error(
                `newSpeed deve ser um número finito e positivo, recebido ${newSpeed}(${typeof newSpeed})`,
            );
        this.#velocity_PixelPorSec = newSpeed;
    }

    get speed() {
        return this.#velocity_PixelPorSec;
    }
}
