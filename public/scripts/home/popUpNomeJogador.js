import nomeJogadorEhValido from '/scripts/home/validarNomejogador.js';
export default function popUpNomeJogador() {
    return new Promise((resolve) => {
        const template = document.querySelector('#popUpTemplate');
        const popUp = document.importNode(template.content, true);
        document.body.append(popUp);

        const submitButton = document.querySelector('form#popUp button');
        submitButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const nomeJogador = document.querySelector('form#popUp #inputNomeJogador').value;

            if (!nomeJogadorEhValido(nomeJogador))
                window.alert('Seu nome deve ter no mínimo 3 caracteres e no máximo 30.');

            document.querySelector('form#popUp').remove();
            localStorage.setItem('nomeJogador', nomeJogador);

            resolve(nomeJogador);
        });
    });
}
