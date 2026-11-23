
/* ==========================================
   INFOTECH - JAVASCRIPT
   Mantém o HTML e o visual original do site.
========================================== */


/* ==========================================
   1. ARRAYS DE OBJETOS
   Aproveita o conteúdo que já está no HTML.
========================================== */

let conteudoConheca = [];
let conteudoImpactos = [];
let conteudoConclusao = [];
let cardsImpactos = [];


/* Captura os textos originais de cada página */

function carregarConteudos() {

    let pagina = window.location.pathname.toLowerCase();

    if (pagina.includes("conheca")) {

        let elementos = document.querySelectorAll(
            "#conteudo-dinamico h2, #conteudo-dinamico h3, #conteudo-dinamico p, #conteudo-dinamico li"
        );

        elementos.forEach(function(elemento) {

            conteudoConheca.push({
                tipo: elemento.tagName,
                texto: elemento.innerText
            });

        });

    }


    if (pagina.includes("impactos")) {

        let elementos = document.querySelectorAll(
            "main h2, main h3, main p, main li"
        );

        elementos.forEach(function(elemento) {

            conteudoImpactos.push({
                tipo: elemento.tagName,
                texto: elemento.innerText
            });

        });


        // Armazena os quatro cartões originais.

        let cartoes = document.querySelectorAll(
            ".cards-impactos .card"
        );

        cartoes.forEach(function(cartao) {

            cardsImpactos.push({

                titulo: cartao.querySelector("h3").innerText,

                texto: cartao.innerText,

                html: cartao.innerHTML

            });

        });

    }


    if (pagina.includes("conclus")) {

        let elementos = document.querySelectorAll(
            "#conteudo-dinamico h2, #conteudo-dinamico h3, #conteudo-dinamico p, #conteudo-dinamico li"
        );

        elementos.forEach(function(elemento) {

            conteudoConclusao.push({
                tipo: elemento.tagName,
                texto: elemento.innerText
            });

        });

    }

}


/* ==========================================
   2. FUNÇÃO PARA GERAR CARTÕES
   Mantém as classes e o HTML originais.
========================================== */

function gerarCartoes(lista) {

    let area = document.querySelector(".cards-impactos");

    if (!area) {
        return;
    }

    area.innerHTML = "";

    lista.forEach(function(cartao) {

        let novoCartao = document.createElement("article");

        novoCartao.className = "card";

        novoCartao.innerHTML = cartao.html;

        area.appendChild(novoCartao);

    });

}


/* ==========================================
   3. BUSCA E FILTRO COM FILTER E FIND
========================================== */

function iniciarBusca() {

    let area = document.querySelector(".cards-impactos");

    if (!area) {
        return;
    }

    // Cria o campo de busca sem substituir os cartões.

    let busca = document.createElement("input");

    busca.type = "text";

    busca.id = "buscaImpactos";

    busca.placeholder = "Pesquisar impactos...";

    busca.style.padding = "10px";

    busca.style.width = "100%";

    busca.style.maxWidth = "400px";

    busca.style.margin = "15px 0";


    area.parentNode.insertBefore(busca, area);


    busca.addEventListener("input", function() {

        let pesquisa = busca.value.toLowerCase();

        let resultado = cardsImpactos.filter(function(cartao) {

            return cartao.texto.toLowerCase().includes(pesquisa);

        });

        gerarCartoes(resultado);

    });


    // Exemplo de utilização do find().

    let impactoAmbiental = cardsImpactos.find(function(cartao) {

        return cartao.titulo.toLowerCase().includes("ambientais");

    });

    console.log("Impacto encontrado:", impactoAmbiental);

}


/* ==========================================
   4. MENU RESPONSIVO
========================================== */

// O menu original já possui responsividade no CSS.
// Aqui mantemos a navegação existente e seus links.

function menuResponsivo() {

    let menu = document.querySelector("header nav");

    if (!menu) {
        return;
    }

    menu.setAttribute("aria-label", "Menu principal");

    let links = menu.querySelectorAll("a");

    links.forEach(function(link) {

        link.addEventListener("click", function() {

            console.log("Página selecionada:", link.innerText);

        });

    });

}


/* ==========================================
   5. TEMA ESCURO
========================================== */

function iniciarTemaEscuro() {

    let cabecalho = document.querySelector("header");

    if (!cabecalho) {
        return;
    }

    let botaoTema = document.createElement("button");

    botaoTema.innerText = "Tema escuro";

    botaoTema.type = "button";

    botaoTema.id = "botaoTema";

    botaoTema.style.padding = "6px 10px";

    botaoTema.style.borderRadius = "8px";

    botaoTema.style.cursor = "pointer";

    cabecalho.appendChild(botaoTema);


    // Estilos do tema escuro.

    let estilo = document.createElement("style");

    estilo.textContent = `

        body.tema-escuro {
            background-color: #132442;
            color: white;
        }

        body.tema-escuro main p,
        body.tema-escuro main li,
        body.tema-escuro main h2,
        body.tema-escuro main h3 {
            color: white !important;
        }

        body.tema-escuro .card,
        body.tema-escuro .card-inicio {
            background-color: #233957;
        }

        body.tema-escuro footer {
            color: white;
        }

    `;

    document.head.appendChild(estilo);


    botaoTema.addEventListener("click", function() {

        document.body.classList.toggle("tema-escuro");

        if (document.body.classList.contains("tema-escuro")) {

            botaoTema.innerText = "Tema claro";

        } else {

            botaoTema.innerText = "Tema escuro";

        }

    });

}


/* ==========================================
   6. QUIZ DE GEOGRAFIA
========================================== */

function iniciarQuiz() {

    let pagina = window.location.pathname.toLowerCase();

    if (!pagina.includes("impactos")) {
        return;
    }

    let perguntas = [

        {
            pergunta: "Qual é uma consequência ambiental do consumo excessivo de água?",

            alternativas: [
                "Esgotamento de aquíferos.",
                "Aumento das chuvas.",
                "Diminuição da temperatura."
            ],

            correta: 0

        },

        {
            pergunta: "Qual atividade econômica pode ser prejudicada pela falta de água?",

            alternativas: [
                "Agricultura e pecuária.",
                "Somente o turismo.",
                "Somente o comércio digital."
            ],

            correta: 0

        },

        {
            pergunta: "Qual alternativa ajuda a reduzir o consumo de água nos data centers?",

            alternativas: [
                "Aumentar a evaporação.",
                "Utilizar circuitos fechados e água de reúso.",
                "Aumentar a captação de água potável."
            ],

            correta: 1

        }

    ];


    let area = document.createElement("section");

    area.id = "quizGeografia";

    area.style.marginTop = "35px";


    document.querySelector("main").appendChild(area);


    let perguntaAtual = 0;

    let pontos = 0;


    function mostrarPergunta() {

        let pergunta = perguntas[perguntaAtual];

        let conteudo = `

            <h2>Teste seus conhecimentos!</h2>

            <br>

            <h3>${pergunta.pergunta}</h3>

            <br>

        `;


        pergunta.alternativas.forEach(function(alternativa, indice) {

            conteudo += `

                <p>
                    <label>
                        <input type="radio"
                        name="resposta"
                        value="${indice}">

                        ${alternativa}
                    </label>
                </p>

            `;

        });


        conteudo += `

            <button id="responderQuiz" type="button">
                Responder
            </button>

            <p id="resultadoQuiz"></p>

        `;


        area.innerHTML = conteudo;


        document.getElementById("responderQuiz")
            .addEventListener("click", verificarResposta);

    }


    function verificarResposta() {

        let selecionada = document.querySelector(
            'input[name="resposta"]:checked'
        );

        let resultado = document.getElementById("resultadoQuiz");


        if (!selecionada) {

            resultado.innerText = "Selecione uma alternativa.";

            return;

        }


        let resposta = Number(selecionada.value);


        if (resposta === perguntas[perguntaAtual].correta) {

            pontos++;

            resultado.innerText = "Resposta correta! Parabéns!";

        } else {

            resultado.innerText = "Resposta incorreta. Continue estudando!";

        }


        let botao = document.getElementById("responderQuiz");

        botao.innerText = "Próxima questão";

        botao.onclick = proximaPergunta;

    }


    function proximaPergunta() {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    }


    function mostrarResultado() {

        area.innerHTML = `

            <h2>Resultado do quiz</h2>

            <p>
                Você acertou ${pontos} de ${perguntas.length} questões!
            </p>

            <button id="refazerQuiz" type="button">
                Refazer atividade
            </button>

        `;


        document.getElementById("refazerQuiz")
            .addEventListener("click", function() {

                perguntaAtual = 0;

                pontos = 0;

                mostrarPergunta();

            });

    }


    mostrarPergunta();

}


/* ==========================================
   7. INICIALIZAÇÃO
========================================== */

document.addEventListener("DOMContentLoaded", function() {

    carregarConteudos();

    menuResponsivo();

    iniciarTemaEscuro();

    iniciarBusca();

    iniciarQuiz();

});

