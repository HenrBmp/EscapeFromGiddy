(async () => {
    const rankTable = document.querySelector('#rankContainer');
    const tableBody = rankTable.querySelector('#tableBody');

    const response = await fetch('/rank');
    if (response.status === 500) {
        console.log('Não foi possivel obter o ranking.');
        console.error(await response.json());
        tableBody.innerHTML = '<td colspan="2">Não foi possivel obter o ranking</td>';
        return;
    }
    const data = await response.json();

    for await (const jogador of data) {
        tableBody.innerHTML += `<tr>
            <td>${jogador.nome}</td>
            <td>${jogador.maior_pontuacao}</td>
            </tr>`;
    }
})();
