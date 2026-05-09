export default async function mostrarInformacoesNaHome(nomeJogador, recorde) {
    const nomeSpan = document.querySelector('#username');
    nomeSpan.innerHTML = nomeJogador;
    
    const recordeSpan = document.querySelector('#recordeAtual');
    recordeSpan.innerHTML = await recorde;
}
