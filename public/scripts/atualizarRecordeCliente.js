export default async function atualizarRecordeCliente(nomeJogador) {
    const resposta = await fetch(`/rank/${nomeJogador}`);
    const recordeAtualizado = await resposta.text();

    localStorage.setItem('recordeAtual', await recordeAtualizado);

    if (await recordeAtualizado.hasOwnPropertie('error')) {
        return localStorage.getItem('recordeAtual') ?? 0;
    } else {
        return await recordeAtualizado;
    }
}
