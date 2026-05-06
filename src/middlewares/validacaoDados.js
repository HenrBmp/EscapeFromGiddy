import StatusHttp from '../libs/HttpStatus.js';

export default class ValidacaoDados {
    /**
     *
     * @param {import('express').Request} req Requisição
     * @param {import('express').Response} res Resposta
     * @param {import('express').next} next Proximo middleware
     */
    static validarRecorde(req, res, next) {
        const { nomeJogador, novoRecorde } = req.body;
        if (Number.isInteger(novoRecorde)) next();
        else {
            const header = new Headers({
                'Content-Type': 'application/json; charset=utf-8',
            });
            res.setHeaders(header).status(StatusHttp.REQUISICAO_INVALIDA).json({
                message: 'Valor do recorde deve ser um inteiro.',
            });
        }
    }

    /**
     *
     * @param {import('express').Request} req Requisição
     * @param {import('express').Response} res Resposta
     * @param {import('express').next} next Proximo middleware
     */
    static verificarCorpo_e_Nome(req, res, next) {
        const header = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        });
        res.setHeaders(header).status(StatusHttp.REQUISICAO_INVALIDA);
        if (!req.body) {
            res.json({
                message: 'Corpo da requisicao ausente.',
                code: 'INVALID_BODY',
            });
        } else if (!req.body.nomeJogador || 2 < req.body.nomeJogador.length < 30) {
            req.json({
                message: 'Nome de jogador inválido.',
                code: 'INVALID_NAME',
            });
        }
    }
}
