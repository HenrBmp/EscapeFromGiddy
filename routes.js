import express from 'express';
import { join } from 'path';
import RankControllers from './src/controllers/rankControllers.js';
import ValidacaoCorpoRequisicao from './src/middlewares/validacaoCorpoRequisicao.js';
import getPage from './src/libs/getPage.js';

const router = express.Router();

// =======================Pagina Inicial=======================
router.get('/', (req, res) =>
    res.setHeader('content-type', 'text/html; charset=utf-8').status(200).sendFile(getPage('index')),
);

// =======================Pagina do Ranking=======================
router.get('/ranking', (req, res) =>
    res.setHeader('content-type', 'text/html; charset=utf-8').status(200).sendFile(getPage('rank')),
);

// =======================Ranking=======================
router.get('/rank', RankControllers.obterRanking);
router.get('/rank/:nomeJogador', RankControllers.obterRecordeJogador);
router.patch(
    '/rank',
    ValidacaoCorpoRequisicao.verificarCorpo_e_Nome,
    ValidacaoCorpoRequisicao.validarRecorde,
    RankControllers.atualizarRecorde,
);

// =======================Arquivos estaticos=======================
router.use('/styles', express.static(join('public', 'styles')));
router.use('/scripts', express.static(join('public', 'scripts')));
router.use('/media', express.static(join('public', 'media')));

export default router;
