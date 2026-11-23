
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
      pergunta: "Qual é o maior bioma brasileiro?",
      opcoes: ["Caatinga", "Amazônia", "Pampa"],
      resposta: "Amazônia"
    },
    {
      pergunta: "Qual é a capital do Brasil?",
      opcoes: ["São Paulo", "Brasília", "Rio de Janeiro"],
      resposta: "Brasília"
    },
    {
      pergunta: "Em qual região fica o estado de São Paulo?",
      opcoes: ["Sul", "Nordeste", "Sudeste"],
      resposta: "Sudeste"
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
