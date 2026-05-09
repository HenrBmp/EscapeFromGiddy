import atualizarRecordeCliente from '/scripts/atualizarRecordeCliente.js';
import popUpNomeJogador from '/scripts/popUpNomeJogador.js';
import mostrarInformacoesNaHome from '/scripts/mostrarInformacoesNaHome.js';
import nomeJogadorEhValido from '/scripts/validarNomejogador.js';

(async () => {
    const nomeJogador_localstorage = localStorage.getItem('nomeJogador');

    async function atualizarInformacoesNoCliente(nomeJogador_popup) {
        const pontuacao = await atualizarRecordeCliente(nomeJogador_popup);
        mostrarInformacoesNaHome(nomeJogador_popup, pontuacao);
    }

    if (nomeJogador_localstorage && nomeJogadorEhValido(nomeJogador_localstorage)) {
        atualizarInformacoesNoCliente(nomeJogador_localstorage);
    }
    else popUpNomeJogador(atualizarInformacoesNoCliente);
})();
