
document.addEventListener("DOMContentLoaded", () => {

  // 1. ARRAY DE OBJETOS: pega os cards que já existem no HTML
  const impactos = Array.from(
    document.querySelectorAll(".cards-impactos .card")
  ).map((card, index) => ({
    id: index + 1,
    titulo: card.querySelector("h2, h3, h4")?.textContent.trim() || "",
    texto: card.textContent.trim(),
    elemento: card
  }));

  // 2. FUNÇÃO PARA CRIAR UM CARD
  // Mantém o conteúdo e as classes do card original.
  function criarCard(item) {
    return item.elemento.cloneNode(true);
  }

  // 3. PESQUISA E FILTRO DOS CARDS EXISTENTES
  function pesquisarImpactos(palavra) {
    impactos.forEach(item => {
      const encontrou = item.texto
        .toLowerCase()
        .includes(palavra.toLowerCase());

      item.elemento.hidden = !encontrou;
    });
  }

  const areaCards = document.querySelector(".cards-impactos");

  if (areaCards && impactos.length > 0) {
    const pesquisa = document.createElement("input");

    pesquisa.type = "search";
    pesquisa.placeholder = "Pesquisar impactos...";
    pesquisa.setAttribute("aria-label", "Pesquisar impactos");

    pesquisa.addEventListener("input", () => {
      pesquisarImpactos(pesquisa.value);
    });

    areaCards.parentNode.insertBefore(pesquisa, areaCards);
  }

  // 4. MENU RESPONSIVO
  const botaoMenu = document.querySelector(
    ".menu-toggle, .hamburger, #menu-toggle"
  );

  const menu = document.querySelector(
    "nav ul, .menu"
  );

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
      menu.classList.toggle("ativo");

      const aberto = menu.classList.contains("ativo");
      botaoMenu.setAttribute("aria-expanded", aberto);
    });
  }

  // 5. ATIVIDADE INTERATIVA DE GEOGRAFIA
  const perguntas = [
  {
    pergunta: "Por que os data centers consomem tanta água?",
    opcoes: [
      "Para fabricar alimentos",
      "Para ajudar na refrigeração dos equipamentos",
      "Para limpar as telas dos computadores"
    ],
    resposta: 1
  },
  {
    pergunta: "Qual é uma consequência do consumo excessivo de água?",
    opcoes: [
      "Esgotamento de aquíferos",
      "Aumento das chuvas",
      "Diminuição da temperatura do planeta"
    ],
    resposta: 0
  },
  {
    pergunta: "Como os sistemas de circuito fechado ajudam o meio ambiente?",
    opcoes: [
      "Aumentam o consumo de água",
      "Impedem o funcionamento dos servidores",
      "Permitem reutilizar a água no resfriamento"
    ],
    resposta: 2
  },
  {
    pergunta: "O que é água de reúso?",
    opcoes: [
      "Água do mar sem tratamento",
      "Água tratada que pode ser utilizada novamente",
      "Água retirada diretamente dos aquíferos"
    ],
    resposta: 1
  },
  {
    pergunta: "Qual alternativa pode reduzir o consumo de água dos data centers?",
    opcoes: [
      "Utilizar captação da água da chuva",
      "Aumentar a retirada de água potável",
      "Desperdiçar água durante a refrigeração"
    ],
    resposta: 0
  }
];

  let perguntaAtual = 0;
  let pontos = 0;

  function iniciarAtividade() {
    const principal = document.querySelector("main");

    if (!principal) return;

    const atividade = document.createElement("section");
    atividade.id = "atividade-geografia";

    const titulo = document.createElement("h2");
    titulo.textContent = "Atividade de Geografia";

    atividade.appendChild(titulo);
    principal.appendChild(atividade);

    mostrarPergunta(atividade);
  }

  function mostrarPergunta(atividade) {
    atividade.querySelector(".pergunta-container")?.remove();

    if (perguntaAtual >= perguntas.length) {
      const resultado = document.createElement("p");
      resultado.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

      atividade.appendChild(resultado);
      return;
    }

    const dados = perguntas[perguntaAtual];

    const container = document.createElement("div");
    container.className = "pergunta-container";

    const pergunta = document.createElement("h3");
    pergunta.textContent = dados.pergunta;
    container.appendChild(pergunta);

    dados.opcoes.forEach(opcao => {
      const botao = document.createElement("button");

      botao.type = "button";
      botao.textContent = opcao;

      botao.addEventListener("click", () => {
        if (opcao === dados.resposta) {
          pontos++;
          alert("Resposta correta!");
        } else {
          alert(`Resposta incorreta! A resposta era ${dados.resposta}.`);
        }

        perguntaAtual++;
        mostrarPergunta(atividade);
      });

      container.appendChild(botao);
    });

    atividade.appendChild(container);
  }

  iniciarAtividade();

});
