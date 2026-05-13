export default async function atualizarRecordeCliente(nomeJogador) {
    const resposta = await fetch(`/rank/${nomeJogador}`);
    if (resposta.status === 500) {
        console.log('Não foi possivel obter o recorde.');
        console.error(await resposta.json());
        return localStorage.getItem('recordeAtual') ?? 0;
    }
    const recordeAtualizado = await resposta.text();

    if (await recordeAtualizado.includes('error')) {
        return localStorage.getItem('recordeAtual') ?? 0;
    } else {
        localStorage.setItem('recordeAtual', await recordeAtualizado);
        return await recordeAtualizado;
    }
}
