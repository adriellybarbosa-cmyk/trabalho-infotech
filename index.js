

/* IDENTIFICAR E GERAR A PÁGINA CORRETA*/

function carregarPagina() {

    const area = document.getElementById("conteudo-dinamico");

    if (!area) {
        return;
    }

    const pagina = decodeURIComponent(
        window.location.pathname
    ).toLowerCase();

    if (pagina.includes("conheca")) {

        gerarCartoes(conteudoConheca, area);

    } else if (pagina.includes("impactos")) {

        area.innerHTML = `
            <h1>Os impactos do consumo excessivo de água</h1>

            <div class="area-busca">
                <input
                    type="text"
                    id="buscaImpactos"
                    placeholder="Pesquisar impactos..."
                >

                <p id="mensagemBusca"></p>
            </div>

            <div id="listaImpactos"></div>

            <div id="atividadeGeografia"></div>
        `;

        gerarCartoes(
            conteudoImpactos,
            document.getElementById("listaImpactos")
        );

        iniciarBusca();
        gerarQuiz();

    } else if (pagina.includes("conclus")) {

        gerarCartoes(conteudoConclusao, area);

    }

}


/*  4. BUSCA E FILTRO COM FILTER() E FIND()*/

function iniciarBusca() {

    const campo = document.getElementById("buscaImpactos");

    const lista = document.getElementById("listaImpactos");

    const mensagem = document.getElementById("mensagemBusca");

    if (!campo || !lista) {
        return;
    }

    campo.addEventListener("input", function() {

        const pesquisa = campo.value.toLowerCase().trim();

        const resultados = conteudoImpactos.filter(function(item) {

            const textoCompleto = (
                item.titulo + " " +
                item.paragrafos.join(" ") + " " +
                item.itens.join(" ")
            ).toLowerCase();

            return textoCompleto.includes(pesquisa);

        });

        gerarCartoes(resultados, lista);

        if (mensagem) {

            if (resultados.length === 0) {
                mensagem.textContent = "Nenhum resultado encontrado.";
            } else {
                mensagem.textContent =
                    resultados.length + " seção(ões) encontrada(s).";
            }

        }

    });

    // Exemplo de utilização do find()

    const impactoAmbiental = conteudoImpactos.find(function(item) {

        return item.titulo.includes("ambientais");

    });

    console.log("Impacto localizado:", impactoAmbiental);

}



/* QUIZ INTERATIVO DE GEOGRAFIA */

function gerarQuiz() {

    const local = document.getElementById("atividadeGeografia");

    if (!local) {
        return;
    }

    const perguntas = [

        {
            pergunta: "Qual é uma das principais consequências do consumo excessivo de água pelos data centers?",

            alternativas: [
                "Aumento da disponibilidade de água.",
                "Pressão sobre o abastecimento das comunidades.",
                "Diminuição da necessidade de energia."
            ],

            correta: 1,

            explicacao: "Correto! O consumo industrial pode aumentar a pressão sobre os sistemas públicos de abastecimento."
        },

        {
            pergunta: "Qual região brasileira é mencionada no trabalho como uma área que precisa de atenção em relação à disponibilidade de água?",

            alternativas: [
                "Alto Tietê e bacias PCJ.",
                "Região Amazônica exclusivamente.",
                "Pantanal e litoral nordestino."
            ],

            correta: 0,

            explicacao: "Correto! O trabalho destaca as regiões do Alto Tietê e Piracicaba, Capivari e Jundiaí (PCJ)."
        },

        {
            pergunta: "Qual alternativa pode ajudar a reduzir o consumo de água nos data centers?",

            alternativas: [
                "Aumentar a evaporação.",
                "Eliminar o tratamento da água.",
                "Utilizar circuitos fechados e água de reúso."
            ],

            correta: 2,

            explicacao: "Correto! Circuitos fechados e água de reúso ajudam a diminuir a necessidade de captar água nova."
        }

    ];

    let perguntaAtual = 0;
    let pontuacao = 0;

    function mostrarPergunta() {

        const pergunta = perguntas[perguntaAtual];

        let alternativasHTML = "";

        pergunta.alternativas.forEach(function(alternativa, indice) {

            alternativasHTML += `
                <label>
                    <input
                        type="radio"
                        name="respostaQuiz"
                        value="${indice}"
                    >
                    ${alternativa}
                </label>
                <br>
            `;

        });

        local.innerHTML = `

            <section class="quiz">

                <h2>Atividade interativa de Geografia</h2>

                <p>
                    Questão ${perguntaAtual + 1} de ${perguntas.length}
                </p>

                <h3>${pergunta.pergunta}</h3>

                <div class="alternativas">
                    ${alternativasHTML}
                </div>

                <button type="button" id="responderQuiz">
                    Responder
                </button>

                <p id="resultadoQuiz"></p>

            </section>

        `;

        document.getElementById("responderQuiz")
            .addEventListener("click", verificarResposta);

    }

    function verificarResposta() {

        const selecionada = document.querySelector(
            'input[name="respostaQuiz"]:checked'
        );

        const resultado = document.getElementById("resultadoQuiz");

        if (!selecionada) {

            resultado.textContent = "Selecione uma alternativa.";

            return;

        }

        const resposta = Number(selecionada.value);

        if (resposta === perguntas[perguntaAtual].correta) {

            pontuacao++;

            resultado.textContent =
                perguntas[perguntaAtual].explicacao;

        } else {

            resultado.textContent =
                "Resposta incorreta. " +
                perguntas[perguntaAtual].explicacao;

        }

        const botao = document.getElementById("responderQuiz");

        botao.textContent =
            perguntaAtual === perguntas.length - 1
                ? "Ver resultado"
                : "Próxima questão";

        botao.removeEventListener("click", verificarResposta);

        botao.addEventListener("click", proximaPergunta);

    }

    function proximaPergunta() {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultadoFinal();

        }

    }

    function mostrarResultadoFinal() {

        local.innerHTML = `

            <section class="quiz">

                <h2>Resultado da atividade</h2>

                <p>
                    Você acertou ${pontuacao} de ${perguntas.length} questões!
                </p>

                <p>
                    A atividade ajudou a compreender a relação
                    entre tecnologia, recursos naturais e Geografia.
                </p>

                <button type="button" id="reiniciarQuiz">
                    Refazer atividade
                </button>

            </section>

        `;

        document.getElementById("reiniciarQuiz")
            .addEventListener("click", function() {

                perguntaAtual = 0;
                pontuacao = 0;

                mostrarPergunta();

            });

    }

    mostrarPergunta();

}


/* INICIALIZAÇÃO DO SITE */

document.addEventListener("DOMContentLoaded", function() {

    carregarPagina();

    iniciarMenu();

    iniciarTema();

});
