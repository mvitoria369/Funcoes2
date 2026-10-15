import { perguntas } from './perguntas.js';
import { aleatorio, nome } from './aleatorio.js';

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Substitui a palavra "você" pelo nome definido em aleatorio.js nas perguntas
function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        exibeResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function exibeResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}...`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "block";
}

function jogarNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.style.display = "none";
    mostraPergunta();
}

botaoJogarNovamente.addEventListener("click", jogarNovamente);

// Executa a substituição do nome ANTES de exibir a primeira pergunta
substituiNome();
mostraPergunta();