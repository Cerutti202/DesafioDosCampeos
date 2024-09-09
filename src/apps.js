// =========== SELEÇÃO DE CAMPEÃO ===========
// Função para salvar o campeão escolhido no localStorage
function selecionarCampeao(nome) {
  const campeao = campeoes.find((c) => c.nome === nome); // Encontrar o campeão pelo nome
  if (!campeao) {
    console.error("Campeão não encontrado.");
    return;
  }
  localStorage.setItem("campeaoSelecionado", JSON.stringify(campeao)); // Salvar o campeão no localStorage
  window.location.href = "/history.html"; // Redirecionar para a página da história
}

// Função para redirecionar para a página de criação de personagem
function criarPersonagem() {
  window.location.href = "/MP.html"; // Página de criação de personagem
}

// =========== CARREGAR CAMPEÃO NA PÁGINA DE HISTÓRIA ===========
// Função que é chamada apenas quando a página de história é carregada
function carregarCampeao() {
  const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado")); // Pega o campeão salvo no localStorage
  if (!campeao) {
    console.warn("Nenhum campeão salvo no localStorage. Selecione um campeão.");
    return; // Se não tiver campeão, não faz nada
  }

  // Atualizar a imagem e as estatísticas do campeão
  document.querySelector(".champion-img").src =
    campeao.imagem || "/assets/default-character.svg";
  document.querySelector(".heart").textContent = campeao.energia;
  document.querySelector(".attack").textContent = campeao.habilidades;
  document.querySelector(".defense").textContent = campeao.sorte;

  // Carregar os equipamentos do campeão
  const ul = document.querySelector(".champion-items ul");
  if (ul) {
    ul.innerHTML = ""; // Limpar lista anterior
    campeao.equipamentos.forEach((eq) => {
      const li = document.createElement("li");
      li.textContent = eq.nome;
      ul.appendChild(li);
    });
  }
}

// =========== CARREGAR HISTÓRIA E VERIFICAR CRIATURAS ===========
// Função para carregar a história
function carregarHistoria(id) {
  const historia = historias.find((h) => h.id === id); // Encontrar a história pelo ID
  if (!historia) {
    console.error("História não encontrada.");
    return; // Se a história não existir, sair da função
  }

  document.querySelector(".story-text").textContent = historia.texto_base; // Atualizar o texto da história

  const choicesDiv = document.querySelector(".choices");
  choicesDiv.innerHTML = ""; // Limpar opções anteriores

  // Verifica se a história contém uma criatura para iniciar batalha
  if (historia.criatura) {
    const batalhaBtn = document.createElement("button");
    batalhaBtn.textContent = "Continuar Lutando";
    batalhaBtn.onclick = () =>
      iniciarBatalha(historia.criatura, historia.opcoes[0].proximaHistoria); // Iniciar batalha ao clicar
    choicesDiv.appendChild(batalhaBtn);

    const desistirBtn = document.createElement("button");
    desistirBtn.textContent = "Desistir da Luta";
    desistirBtn.onclick = () =>
      carregarHistoria(historia.opcoes[1].proximaHistoria); // Carregar história de desistência
    choicesDiv.appendChild(desistirBtn);
  } else {
    carregarOpcoes(historia); // Carregar as opções normalmente se não houver criatura
  }
}

// Função para carregar opções normais (sem criatura)
function carregarOpcoes(historia) {
  const choicesDiv = document.querySelector(".choices");
  if (!choicesDiv) return;

  choicesDiv.innerHTML = ""; // Limpar opções anteriores
  historia.opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.textContent = opcao.texto;
    btn.className = "choice-btn";
    btn.onclick = () => carregarHistoria(opcao.proximaHistoria); // Carregar a próxima história ao clicar
    choicesDiv.appendChild(btn);
  });
}

// Função para iniciar a batalha e redirecionar para a página de batalha
function iniciarBatalha(criatura, proximaHistoria) {
  const criaturaSelecionada = criaturas.find((c) => c.id === criatura.id); // Encontrar a criatura pelo ID
  if (!criaturaSelecionada) {
    console.error("Criatura não encontrada.");
    return;
  }
  localStorage.setItem("criaturaAtual", JSON.stringify(criaturaSelecionada)); // Salvar a criatura
  localStorage.setItem("proximaHistoria", proximaHistoria); // Salvar a próxima história para ir após a vitória
  window.location.href = "/Batalha.html"; // Redirecionar para a batalha
}

// Carregar a primeira história ao carregar a página de história
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const historiaInicial = parseInt(params.get("id")) || 1; // ID da história inicial, pegar de URL se disponível
  if (isNaN(historiaInicial)) {
    console.error("ID de história inválido.");
    return;
  }

  carregarCampeao(); // Carregar o campeão somente se já foi selecionado
  carregarHistoria(historiaInicial); // Carregar a primeira história
});

// =========== CRIAÇÃO DE PERSONAGEM ===========
// Função para gerar 4 números aleatórios entre 1 e 6
function gerarNumerosAleatorios() {
  const numeros = [];
  while (numeros.length < 4) {
    const numero = Math.floor(Math.random() * 6) + 1;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }
  return numeros;
}

// Carregar a lista de equipamentos padrão na criação de personagem
function carregarEquipamentos() {
  const equipamentos = [
    { nome: "Espada", atributos: ["Dano", "Velocidade"] },
    { nome: "Escudo Antigo", atributos: ["Defesa"] },
  ];

  const ul = document.getElementById("listaEquipamentos");
  ul.innerHTML = ""; // Limpar lista
  equipamentos.forEach((eq) => {
    const li = document.createElement("li");
    li.textContent = eq.nome + " - " + eq.atributos.join(", ");
    ul.appendChild(li);
  });
}

// Preencher os selects de habilidade, energia e sorte com os números gerados
function preencherAtributos(numeros) {
  const habilidadeSelect = document.getElementById("habilidade");
  const energiaSelect = document.getElementById("energia");
  const sorteSelect = document.getElementById("sorte");

  numeros.forEach((numero) => {
    const habilidadeOption = document.createElement("option");
    habilidadeOption.value = numero;
    habilidadeOption.text = numero + " (Habilidade será " + (numero + 6) + ")";
    habilidadeSelect.appendChild(habilidadeOption);

    const energiaOption = document.createElement("option");
    energiaOption.value = numero;
    energiaOption.text = numero + " (Energia será " + (numero * 2 + 12) + ")";
    energiaSelect.appendChild(energiaOption);

    const sorteOption = document.createElement("option");
    sorteOption.value = numero;
    sorteOption.text = numero + " (Sorte será " + (numero + 6) + ")";
    sorteSelect.appendChild(sorteOption);
  });
}

// Mostrar os números sorteados na tela
function mostrarNumerosSorteados(numeros) {
  const div = document.getElementById("numerosSorteados");
  if (!div) {
    console.error("Elemento #numerosSorteados não encontrado.");
    return;
  }
  div.textContent = numeros.join(" - ");
}

// Função para salvar o personagem criado e redirecionar para a história
function comecarAventura() {
  const nome = document.getElementById("nome").value;
  const habilidade = parseInt(document.getElementById("habilidade").value) + 6;
  const energia = parseInt(document.getElementById("energia").value) * 2 + 12;
  const sorte = parseInt(document.getElementById("sorte").value) + 6;

  if (!nome) {
    alert("Por favor, insira um nome para o campeão.");
    return;
  }

  const personagemCriado = {
    nome: nome,
    habilidades: habilidade,
    energia: energia,
    sorte: sorte,
    equipamentos: [
      { nome: "Espada", atributos: ["Dano", "Velocidade"] },
      { nome: "Escudo Antigo", atributos: ["Defesa"] },
    ],
  };

  localStorage.setItem("campeaoSelecionado", JSON.stringify(personagemCriado));
  window.location.href = "/history.html"; // Redirecionar para a página de história
}

// Inicializar a criação de personagem ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const numeros = gerarNumerosAleatorios();
  mostrarNumerosSorteados(numeros);
  preencherAtributos(numeros);
  carregarEquipamentos();
});

// =========== LÓGICA DE BATALHA ===========

// funçaão para aplicar a animação de danos
function aplicarAnimacaoDano(elemento) {
  elemento.classList.add("hit-effect", "shake-effect");

  // Remove as classes de animação após 500ms (tempo da animação)
  setTimeout(() => {
    elemento.classList.remove("hit-effect", "shake-effect");
  }, 500);
}

// Função que é chamada quando a página de batalha é carregada
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("Batalha.html")) {
    const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado"));
    const criatura = JSON.parse(localStorage.getItem("criaturaAtual"));
    const proximaHistoria = localStorage.getItem("proximaHistoria");

    if (!campeao || !criatura) {
      alert("Erro: Dados do campeão ou da criatura não encontrados!");
      window.location.href = "/history.html"; // Redirecionar de volta à história se houver erro
      return;
    }

    // Atualiza os status iniciais da tela de batalha
    document.getElementById("energiaCampeao").textContent = campeao.energia;
    document.getElementById("habilidadeCampeao").textContent =
      campeao.habilidades;
    document.getElementById("energiaCriatura").textContent = criatura.energia;
    document.getElementById("habilidadeCriatura").textContent =
      criatura.habilidade;
    document.getElementById("imagemCriatura").src = criatura.referencia_imagem;

    // Salva o estado da batalha no localStorage
    salvarEstadoBatalha();
  }
});

// Função para gerar número aleatório entre 1 e 6
function rolarDados() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função de combate (ataque) chamada ao clicar no botão "Atacar"
function atacar() {
  const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado"));
  const criatura = JSON.parse(localStorage.getItem("criaturaAtual"));

  let ataqueCampeao = rolarDados() + rolarDados() + campeao.habilidades;
  let ataqueCriatura = rolarDados() + rolarDados() + criatura.habilidade;

  document.getElementById("forcaCampeao").textContent = ataqueCampeao;
  document.getElementById("forcaCriatura").textContent = ataqueCriatura;

  if (ataqueCampeao > ataqueCriatura) {
    criatura.energia -= 2;
    alert("Você feriu a criatura!");
    aplicarAnimacaoDano(document.querySelector(".criatura-container")); // Aplica animação no card da criatura
  } else if (ataqueCampeao < ataqueCriatura) {
    campeao.energia -= 2;
    alert("A criatura te feriu!");
    aplicarAnimacaoDano(document.querySelector(".campeao-container")); // Aplica animação no card do campeão
  } else {
    alert("Ninguém se feriu nessa rodada.");
  }

  atualizarStatus(campeao, criatura);
  salvarEstadoBatalha();
  verificarMorte();
}

// Função para usar Sorte durante a batalha
function usarSorte() {
  const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado"));
  const criatura = JSON.parse(localStorage.getItem("criaturaAtual"));

  if (campeao.sorte <= 0) {
    alert("Você está sem sorte!");
    return;
  }

  campeao.sorte--;

  let ataqueCampeao = rolarDados() + rolarDados() + campeao.habilidades;
  let ataqueCriatura = rolarDados() + rolarDados() + criatura.habilidade;

  document.getElementById("forcaCampeao").textContent = ataqueCampeao;
  document.getElementById("forcaCriatura").textContent = ataqueCriatura;

  if (ataqueCampeao > ataqueCriatura) {
    criatura.energia -= 4;
    alert("Você usou sorte e causou grande dano!");
    aplicarAnimacaoDano(document.querySelector(".criatura-container")); // Aplica animação no card da criatura
  } else {
    campeao.energia -= 1;
    alert("Você usou sorte, mas foi ferido levemente.");
    aplicarAnimacaoDano(document.querySelector(".campeao-container")); // Aplica animação no card do campeão
  }

  atualizarStatus(campeao, criatura);
  salvarEstadoBatalha();
  verificarMorte();
}

// Função para fugir da batalha
function fugir() {
  alert("Você fugiu da batalha!");
  localStorage.removeItem("criaturaAtual"); // Remove a criatura do localStorage
  const historiaDeOrigem = localStorage.getItem("historiaDeOrigem");

  if (historiaDeOrigem) {
    window.location.href = `/history.html?id=${historiaDeOrigem}`; // Redireciona de volta à história de origem
  } else {
    window.location.href = "/history.html"; // Redireciona para a página principal da história
  }
}

// Função para atualizar os status de energia na tela e no localStorage
function atualizarStatus(campeao, criatura) {
  if (!campeao || !criatura) {
    console.error(
      "Erro: Dados do campeão ou da criatura não estão disponíveis."
    );
    return;
  }

  // Atualiza os elementos da interface
  document.getElementById("energiaCampeao").textContent = campeao.energia;
  document.getElementById("energiaCriatura").textContent = criatura.energia;

  // Atualiza os dados no localStorage
  localStorage.setItem("campeaoSelecionado", JSON.stringify(campeao));
  localStorage.setItem("criaturaAtual", JSON.stringify(criatura));
}

// Função para salvar o estado da batalha (campeão e criatura) no localStorage
function salvarEstadoBatalha() {
  const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado"));
  const criatura = JSON.parse(localStorage.getItem("criaturaAtual"));

  if (!campeao || !criatura) {
    console.error(
      "Erro: Dados do campeão ou da criatura não estão disponíveis para salvar."
    );
    return;
  }

  localStorage.setItem("campeaoSelecionado", JSON.stringify(campeao));
  localStorage.setItem("criaturaAtual", JSON.stringify(criatura));
}

// Função para verificar se o campeão ou a criatura morreu
function verificarMorte() {
  const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado"));
  const criatura = JSON.parse(localStorage.getItem("criaturaAtual"));

  if (!campeao || !criatura) {
    console.error(
      "Erro: Dados do campeão ou da criatura não estão disponíveis para verificação."
    );
    return;
  }

  if (campeao.energia <= 0) {
    alert("Você morreu! Fim de jogo.");
    window.location.href = "/gameover.html"; // Redireciona para a página de game over
  } else if (criatura.energia <= 0) {
    alert("Você venceu a criatura!");
    salvarEstadoBatalha(); // Salva o estado final antes de continuar

    const proximaHistoria = localStorage.getItem("proximaHistoria");
    if (proximaHistoria) {
      window.location.href = `/history.html?id=${proximaHistoria}`; // Redireciona para a próxima história
    } else {
      alert("Erro: Próxima história não encontrada.");
      window.location.href = "/history.html"; // Redireciona de volta à página principal da história
    }
  }
}
