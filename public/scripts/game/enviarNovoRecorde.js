export default function enviarNovoRecorde(novoRecorde) {
    const nomeJogador = localStorage.getItem('nomeJogador');
    localStorage.setItem('recordeAtual', novoRecorde);

    const atrasoAteNovaTentativa = 15 * 1000;

    function tentarRequisicao() {
        return fetch('/rank', {
            method: 'PATCH',
            body: JSON.stringify({
                nomeJogador,
                novoRecorde,
            }),
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            keepalive: true,
        });
    }
    tentarRequisicao()
        .then(async (data) => {
            if (data.status === 500) {
                data.json()
                    .then(console.error)
                    .catch((error) =>
                        console.error(`Impossível converter resposta em json. ${error}`),
                    );
                /* Tentar novamente em 'atrasoAteNovaTentativa' segundos */
                setTimeout(tentarRequisicao, atrasoAteNovaTentativa);
            }
        })
        .catch(console.error);
}
