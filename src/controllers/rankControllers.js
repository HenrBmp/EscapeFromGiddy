import mysql from '../../database.js';
import StatusHttp from '../libs/HttpStatus.js';

const jsonHeader = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
});

export default class RankControllers {
    /**
     * Envia ao cliente os jogadores e seu recorde de pontuação em ordem decrescente.
     * @param {import("express").Request} req Requisição
     * @param {import("express").Response} res Resposta
     */
    static async obterRanking(req, res) {
        res.setHeaders(jsonHeader);
        try {
            const [result] = await mysql.query(
                `SELECT nome, maior_pontuacao FROM jogador ORDER BY maior_pontuacao DESC;`,
            );
            res.status(StatusHttp.OK).json(result);
        } catch (error) {
            res.status(StatusHttp.ERRO_INTERNO_DO_SERVIDOR).json({
                message: 'Houve um erro na consulta ao banco de dados.',
                error: {
                    code: error.code,
                    errno: error.errno,
                },
            });
        }
    }

    /**
     * Atualiza o recorde de pontuação de um jogador no banco de dados.
     * @param {import("express").Request} req Requisição
     * @param {import("express").Response} res Resposta
     */
    static async atualizarRecorde(req, res) {
        const { nomeJogador, novoRecorde } = req.body;
        res.setHeaders(jsonHeader);
        try {
            const [result] = await mysql.query(
                'UPDATE jogador SET maior_pontuacao = ? WHERE nome = ?',
                [novoRecorde, nomeJogador],
            );
            res.status(StatusHttp.OK).json(result);
        } catch (error) {
            res.status(StatusHttp.ERRO_INTERNO_DO_SERVIDOR).json({
                message: 'Houve um erro na consulta ao banco de dados.',
                error: {
                    code: error.code,
                    errno: error.errno,
                },
            });
        }
    }

    /**
     * Envia ao cliente o recorde do jogador cujo nome foi recebido pelo corpo da requisição.
     * Criará o jogador no banco de dados caso o mesmo nao exista, consequentemente enviando 0 como recorde.
     * @param {import("express").Request} req Requisição
     * @param {import("express").Response} res Resposta
     */
    static async obterRecordeJogador(req, res) {
        const { nomeJogador } = req.params;
        try {
            await mysql.query('INSERT IGNORE INTO jogador VALUES (?, null)', [nomeJogador]);
            const [result] = await mysql.query(
                'SELECT maior_pontuacao FROM jogador WHERE nome = ?',
                [nomeJogador],
            );
            res.setHeader('content-type', 'plain/text; charset=utf8')
                .status(StatusHttp.OK)
                .send(result[0].maior_pontuacao.toString());
        } catch (error) {
            console.error(error);
            res.setHeaders(jsonHeader)
                .status(StatusHttp.ERRO_INTERNO_DO_SERVIDOR)
                .json({
                    message: 'Houve um erro na consulta ao banco de dados.',
                    error: {
                        code: error.code,
                        errno: error.errno,
                    },
                });
        }
    }
}
