import Entidade from './Entidade.js';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../ConstantesViewport.js';

export default class Objeto extends Entidade {
    /**
     * @param {CanvasRenderingContext2D} contextoCanvas Contexto 2D do canvas do jogo
     * @param {HTMLImageElement} sprite Elemento <img> com o sprite da entidade
     */
    constructor(contextoCanvas, sprite) {
        super(contextoCanvas, sprite);
        this.gerarDimensoes(12);
    }

    /**
     * Gera uma posicionamente para o obstaculo de forma à não sobrepor outras entidades.
     * @param {Array<Entidade>} entidadesPresentes Array de objetos filhos de entidade(instâncias de Personagem ou Entidade)
     *  presentes no jogo, utilizadas para evitar a sobreposição de entidades.
     */
    gerarPosicionamentoSeguro(entidadesPresentes = []) {
        const MAX_WIDTH = VIEWPORT_WIDTH - this.width;
        const MAX_HEIGHT = VIEWPORT_HEIGHT - this.height;

        let randomXPos;
        let randomYPos;
        do randomizarPosicoes(); 
        while (this.colideCom(entidadesPresentes));
        
        this.setPosition(randomXPos, randomYPos);
        
        function randomizarPosicoes() {
            randomXPos = parseFloat(Math.random().toFixed(2)) * MAX_WIDTH;
            randomYPos = parseFloat(Math.random().toFixed(2)) * MAX_HEIGHT;
        }
    }
}
