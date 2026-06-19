import { MENOR_LARGURA } from '../ConstantesViewport.js';
export default class Entidade {
    /** @type Number */
    xPositionLeft;

    /** @type Number */
    yPositionTop;

    /** @type Number */
    #width;

    /** @type Number */
    #height;

    /** @type HTMLImageElement  */
    #sprite;

    /** @type CanvasRenderingContext2D */
    #contextoCanvas;

    constructor(contextoCanvas, sprite) {
        if (!(contextoCanvas instanceof CanvasRenderingContext2D))
            throw new Error(
                `contextoCanvas deve ser do tipo CanvasRenderingContext2D, recebido ${typeof contextoCanvas}`,
            );
        this.#contextoCanvas = contextoCanvas;

        this.setSprite(sprite);
        this.sprite = sprite;
    }

    /**
     * Gera as dimensões da entidade com base em uma fração desejada da menor largura do canvas.
     * @param {Number} fracaoDaMenorLargura Fracao desejada da menor largura do canvas.
     */
    gerarDimensoes(fracaoDaMenorLargura) {
        const proporcaoSprite = this.#sprite.width / this.#sprite.height;
        const finalHeight = MENOR_LARGURA / fracaoDaMenorLargura;
        const finalWidth = proporcaoSprite * finalHeight;

        this.#height = finalHeight;
        this.#width = finalWidth;
    }

    /**
     * @param {Number} xPos
     * @param {Number} yPos
     */
    setPosition(xPos, yPos) {
        if (
            typeof xPos !== 'number' ||
            typeof yPos !== 'number' ||
            isNaN(xPos) ||
            isNaN(yPos) ||
            !isFinite(xPos) ||
            !isFinite(yPos)
        ) {
            throw new Error(
                `Ambos parâmetros devem ser números racionais positivos, recebido ${xPos} e ${yPos}`,
            );
        }

        this.xPositionLeft = xPos;
        this.yPositionTop = yPos;
    }

    desenhar() {
        this.#contextoCanvas.drawImage(
            this.#sprite,
            this.xPositionLeft,
            this.yPositionTop,
            this.#width,
            this.#height,
        );
    }

    /**
     * Verifica colisão entre a instancia de Obstaculo e uma ou mais entidades.
     * @param {Array<Entidade>} entidades Entidades com as quais será verificada a colisão.
     * @returns True se houver colisão.
     */
    colideCom(...entidades) {
        return entidades.some(entidade => {
            if (!(entidade instanceof Entidade)) {
                throw new TypeError(
                    `Parâmetro entidade deve ser filha da classe Entidade(Personagem ou Obstaculo), recebido ${typeof entidade}`,
                );
            }
    
            const colideHorizontal =
                this.xPositionLeft < entidade.xPositionRight &&
                this.xPositionRight > entidade.xPositionLeft;
            const colideVertical =
                this.yPositionBottom > entidade.yPositionTop &&
                this.yPositionTop < entidade.yPositionBottom;
    
            return colideHorizontal && colideVertical;
        })
    }

    /** @param {HTMLImageElement} newSprite */
    setSprite(newSprite) {
        if (!(newSprite instanceof HTMLImageElement))
            throw new Error(
                `sprite deve ser do tipo HTMLImageElement, recebido ${typeof newSprite}`,
            );
        this.#sprite = newSprite;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get xPositionRight() {
        return this.xPositionLeft + this.#width;
    }

    get yPositionBottom() {
        return this.yPositionTop + this.#height;
    }
}
