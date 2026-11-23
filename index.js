const impactos = [
    {
        titulo: "Impactos ambientais",
        categoria: "Ambiente",
        descricao: "O consumo excessivo de água pode prejudicar rios, nascentes e ecossistemas."
    },

    {
        titulo: "Impactos sociais",
        categoria: "Sociedade",
        descricao: "O consumo industrial pode diminuir a disponibilidade de água para a população."
    },

    {
        titulo: "Impactos econômicos",
        categoria: "Economia",
        descricao: "A falta de água pode prejudicar a agricultura e aumentar os gastos das famílias."
    },

    {
        titulo: "Impactos climáticos",
        categoria: "Clima",
        descricao: "O calor intenso pode aumentar a necessidade de refrigeração dos data centers."
    }
];

function gerarImpactos(lista) {

    let conteudo = "";

    lista.forEach(function(impacto) {

        conteudo += `
            <article class="card-inicio">

                <h3>${impacto.titulo}</h3>

                <p>${impacto.descricao}</p>

                <small>${impacto.categoria}</small>

            </article>
        `;

    });

    document.getElementById("cardsImpactos").innerHTML = conteudo;

}

gerarImpactos(impactos);

const busca = document.getElementById("buscaImpacto");

if (busca) {

    busca.addEventListener("input", function() {

        let pesquisa = busca.value.toLowerCase();

        let resultado = impactos.filter(function(impacto) {

            return impacto.titulo.toLowerCase().includes(pesquisa) ||
                   impacto.descricao.toLowerCase().includes(pesquisa);

        });

        gerarImpactos(resultado);

    });

}
const botaoQuiz = document.getElementById("verificarResposta");

if (botaoQuiz) {

    botaoQuiz.addEventListener("click", function() {

        let resposta = document.getElementById("respostaQuiz").value;

        let resultado = document.getElementById("resultadoQuiz");

        if (resposta === "b") {

            resultado.textContent = "Parabéns! Você acertou!";

        } else if (resposta === "") {

            resultado.textContent = "Escolha uma resposta!";

        } else {

            resultado.textContent = "Resposta incorreta. Tente novamente!";

        }

    });

}
