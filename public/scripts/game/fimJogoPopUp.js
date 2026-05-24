import enviarNovoRecorde from './enviarNovoRecorde.js';

export default async function fimJogoPopUp(ganhouJogo, pontuacao) {
    const template = document.querySelector('#popUpTemplate');
    const popUp = document.importNode(template.content, true);

    const recordeAntigo = localStorage.getItem('recordeAtual');
    const bateuRecorde = pontuacao > recordeAntigo;
    if (bateuRecorde) enviarNovoRecorde(pontuacao);
    
    popUp.querySelector('h1#titulo').innerHTML = ganhouJogo ? 'Você venceu!' : 'Fim de jogo!';
    popUp.querySelector('h2#mensagemPontuacao').innerHTML = bateuRecorde
        ? `Novo recorde: <span id='destaquePontuacao'>${pontuacao}!</span>`
        : `Pontuação: ${pontuacao}`;

    document.body.append(popUp);
}
