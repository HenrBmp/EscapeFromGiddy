import express from 'express';
import { join } from 'path';
import RankControllers from './src/controllers/rankControllers.js';
import ValidacaoCorpoRequisicao from './src/middlewares/validacaoCorpoRequisicao.js';
import StaticPagesControllers from './src/controllers/staticPagesControllers.js';

const router = express.Router();

// =======================Pagina Inicial=======================
router.get('/', StaticPagesControllers.homePage);

// =======================Pagina do Ranking=======================
router.get('/ranking', StaticPagesControllers.rankPage);

// =======================Jogo=======================
router.get('/game', StaticPagesControllers.gamePage);

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
