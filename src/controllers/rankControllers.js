import mysql from '../../database.js';
export default class RankControllers {
    /**
     * Envia os jogadores e seu recorde de pontuação em ordem decrescente.
     * @param {import("express").Request} req Requisição
     * @param {import("express").Response} res Resposta
     */
    static async getRanking(req, res) {
        const [result] = await mysql.query(
            `SELECT nome, maior_pontuacao FROM jogador ORDER BY maior_pontuacao DESC;`,
        );
        const haJogadores = result.length > 0;
        res.setHeader('content-type', 'application/json; charset=utf-8').status(200).send(result);
    }

    /**
     * Atualiza o recorde de pontuação de um jogador.
     * @param {import("express").Request} req Requisição
     * @param {import("express").Response} res Resposta
     */
    static insertRecord(req, res) {}
}
