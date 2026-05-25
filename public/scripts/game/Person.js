import { MENOR_LARGURA, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './ConstantesViewport.js';

export default class Person {
    /** @type Number */
    #xPositionLeft;

    /** @type Number */
    #yPositionTop;

    /** @type Number */
    #width;

    /** @type Number */
    #height;

    /** @type Number */
    #velocity_PixelPorSec;

    /**@type CanvasRenderingContext2D*/
    #contextoCanvas;

    /** @type HTMLImageElement */
    #sprite;

    /**
     * @param {CanvasRenderingContext2D} contextoCanvas
     * @param {HTMLImageElement} sprite
     * @param {Number} velocity
     */
    constructor(contextoCanvas, sprite, velocity) {
        this.#contextoCanvas = contextoCanvas;

        this.setSprite(sprite);
        this.setSpeed(velocity);

        const proporcaoSprite = sprite.width / sprite.height;
        const newHeight = MENOR_LARGURA / 6;
        const newWidth = proporcaoSprite * newHeight;

        this.#width = newWidth;
        this.#height = newHeight;
    }

    setPosition(xPos, yPos) {
        if (typeof xPos !== 'number' || typeof yPos !== 'number') {
            throw new Error("Os parâmetros devem do tipo 'Number'");
        }

        this.#xPositionLeft = xPos;
        this.#yPositionTop = yPos;
        this.#contextoCanvas.drawImage(this.#sprite, xPos, yPos, this.#width, this.#height);
    }

    /**
     * @param {Number} deslocamentoEmX
     * @param {Number} deslocamentoEmY
     */
    mover(deslocamentoEmX, deslocamentoEmY) {
        this.#xPositionLeft += deslocamentoEmX;
        this.#yPositionTop += deslocamentoEmY;

        this.verificarColisaoParede();

        this.setPosition(this.#xPositionLeft, this.#yPositionTop);
    }

    /**
     * Caso haja colisão com a parede, deslocamento é reduzido para manter-se dentro do espaço seguro.
     */
    verificarColisaoParede() {
        if (this.#xPositionLeft < 0) this.#xPositionLeft = 0;
        else if (this.xPositionRight > VIEWPORT_WIDTH)
            this.#xPositionLeft = VIEWPORT_WIDTH - this.#width;

        if (this.#yPositionTop < 0) this.#yPositionTop = 0;
        else if (this.yPositionBottom > VIEWPORT_HEIGHT) 
            this.#yPositionTop = VIEWPORT_HEIGHT - this.#height;
    }

    /** @param {HTMLImageElement} newSprite */
    setSprite(newSprite) {
        if (newSprite instanceof HTMLImageElement) this.#sprite = newSprite;
        else throw new Error("O argumento deve ser do tipo 'HTMLImageElement'");
    }

    /** @param {Number} newSpeed */
    setSpeed(newSpeed) {
        if (!Number.isInteger(newSpeed)) throw new Error('newSpeed deve ser um inteiro.');
        this.#velocity_PixelPorSec = newSpeed;
    }

    /**
     * Verifica a colisão entre 2 personagens.
     * @param {Person} personA
     * @param {Person} personB
     */
    static verificarColisaoPersons(personA, personB) {
        if (!(personA instanceof Person) || !(personB instanceof Person)) {
            throw new Error("Os argumentos devem ser do tipo 'Person'");
        }

        const colisaoHorizontal =
            personA.xPositionLeft < personB.xPositionRight &&
            personA.xPositionRight > personB.xPositionLeft;

        const colisaoVertical =
            personA.yPositionTop < personB.yPositionBottom &&
            personA.yPositionBottom > personB.yPositionTop;

        return colisaoHorizontal && colisaoVertical;
    }

    // GETTERS
    get xPositionLeft() {
        return this.#xPositionLeft;
    }

    get yPositionTop() {
        return this.#yPositionTop;
    }

    get xPositionRight() {
        return this.#xPositionLeft + this.#width;
    }

    get yPositionBottom() {
        return this.#yPositionTop + this.#height;
    }

    get velocity() {
        return this.#velocity_PixelPorSec;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }
}
