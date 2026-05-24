import atualizarRecordeCliente from '/scripts/home/atualizarRecordeCliente.js';
import popUpNomeJogador from '/scripts/home/popUpNomeJogador.js';
import mostrarInformacoesNaHome from '/scripts/home/mostrarInformacoesNaHome.js';
import nomeJogadorEhValido from '/scripts/home/validarNomejogador.js';

(async () => {
    let nomeJogador;
    const nomeLocal = localStorage.getItem('nomeJogador');
    if (nomeLocal && nomeJogadorEhValido(nomeLocal)) nomeJogador = nomeLocal;
    else nomeJogador = await popUpNomeJogador();

    const pontuacao = await atualizarRecordeCliente(nomeJogador);
    mostrarInformacoesNaHome(nomeJogador, pontuacao);
})();
