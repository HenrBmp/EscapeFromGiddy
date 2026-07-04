import Objeto from './Objeto.js';

export default class Obstaculo extends Objeto {
    /**
     * @param {CanvasRenderingContext2D} contextoCanvas Contexto 2D do canvas do jogo
     */
    constructor(contextoCanvas) {
        const sprite = document.querySelector("img#rockObstaculo");
        super(contextoCanvas, sprite);
    }
}
