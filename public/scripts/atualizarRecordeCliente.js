export default async function atualizarRecordeCliente(nomeJogador) {
    const resposta = await fetch(`/rank/${nomeJogador}`);
    const recordeAtualizado = await resposta.text();

    localStorage.setItem('recordeAtual', await recordeAtualizado);

    return await recordeAtualizado;
}
