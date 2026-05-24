import atualizarRecordeCliente from '/scripts/atualizarRecordeCliente.js';
import popUpNomeJogador from '/scripts/popUpNomeJogador.js';
import mostrarInformacoesNaHome from '/scripts/mostrarInformacoesNaHome.js';
import nomeJogadorEhValido from '/scripts/validarNomejogador.js';

(async () => {
    let nomeJogador;
    const nomeLocal = localStorage.getItem('nomeJogador');
    if (nomeLocal && nomeJogadorEhValido(nomeLocal)) nomeJogador = nomeLocal;
    else nomeJogador = await popUpNomeJogador();

    const pontuacao = await atualizarRecordeCliente(nomeJogador);
    mostrarInformacoesNaHome(nomeJogador, pontuacao);
})();
