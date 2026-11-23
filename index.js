
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

function iniciarQuiz() {
  const principal = document.querySelector("main");
  if (!principal) return;

  const quiz = document.createElement("section");
  quiz.id = "quiz-sustentabilidade";

  const titulo = document.createElement("h2");
  titulo.textContent = "Teste seus conhecimentos!";

  const descricao = document.createElement("p");
  descricao.textContent =
    "Descubra o que você aprendeu sobre data centers, consumo de água e sustentabilidade.";

  quiz.append(titulo, descricao);
  principal.appendChild(quiz);

  mostrarPergunta(quiz);
}

function mostrarPergunta(quiz) {
  quiz.querySelector(".quiz-pergunta")?.remove();

  if (perguntaAtual >= perguntas.length) {
    mostrarResultado(quiz);
    return;
  }

  const atual = perguntas[perguntaAtual];

  const area = document.createElement("div");
  area.className = "quiz-pergunta";

  const progresso = document.createElement("p");
  progresso.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  const titulo = document.createElement("h3");
  titulo.textContent = atual.pergunta;

  area.append(progresso, titulo);

  atual.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = opcao;

    botao.addEventListener("click", () => {
      const botoes = area.querySelectorAll("button");
      botoes.forEach(b => b.disabled = true);

      const resultado = document.createElement("p");

      if (indice === atual.resposta) {
        pontos++;
        resultado.textContent = "Resposta correta!";
      } else {
        resultado.textContent =
          `Resposta incorreta. A resposta certa é: ${atual.opcoes[atual.resposta]}.`;
      }

      area.appendChild(resultado);

      const proximo = document.createElement("button");
      proximo.type = "button";
      proximo.textContent =
        perguntaAtual === perguntas.length - 1
          ? "Ver resultado"
          : "Próxima pergunta";

      proximo.addEventListener("click", () => {
        perguntaAtual++;
        mostrarPergunta(quiz);
      });

      area.appendChild(proximo);
    });

    area.appendChild(botao);
  });

  quiz.appendChild(area);
}

function mostrarResultado(quiz) {
  const resultado = document.createElement("div");
  resultado.className = "quiz-pergunta";

  const titulo = document.createElement("h3");
  titulo.textContent = "Quiz finalizado!";

  const pontuacao = document.createElement("p");
  pontuacao.textContent =
    `Você acertou ${pontos} de ${perguntas.length} perguntas.`;

  const reiniciar = document.createElement("button");
  reiniciar.type = "button";
  reiniciar.textContent = "Refazer atividade";

  reiniciar.addEventListener("click", () => {
  perguntaAtual = 0;
  pontos = 0;
  resultado.remove();
  mostrarPergunta(quiz);
});

resultado.append(titulo, pontuacao, reiniciar);
quiz.appendChild(resultado);
}

iniciarQuiz();

});
