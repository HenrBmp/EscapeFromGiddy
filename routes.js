import express from 'express';
import { join } from 'path';
import RankControllers from './src/controllers/rankControllers.js';
import ValidacaoCorpoRequisicao from './src/middlewares/validacaoCorpoRequisicao.js';

const router = express.Router();

/**
 * Obtem o caminho absoluto para uma página html em public/pages com base no caminho relativo a 'routes.js'.
 * @param {string} fileName Nome do arquivo a ser procurado (não é necessário a extensão).
 * @returns Caminho absoluto para o arquivo.
 */
function getPage(fileName) {
    return join(import.meta.dirname, 'public', 'pages', fileName.replace('.html', '') + '.html');
}

// =======================Pagina Inicial=======================
router.get('/', (req, res) => {
    res.sendFile(getPage('index'));
});

// =======================Ranking=======================
router.get('/rank', ValidacaoCorpoRequisicao.verificarCorpo_e_Nome, RankControllers.obterRanking);
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
