// =========== SELEÇÃO DE CAMPEÃO ===========
// Função para salvar o campeão escolhido no localStorage
// Esta função é chamada na página "indexCS.html" ou "indexMP.html"
// quando o usuário seleciona um campeão.
function selecionarCampeao(nome) {
  const campeao = campeoes.find((c) => c.nome === nome); // Encontrar o campeão pelo nome
  if (!campeao) {
    console.error("Campeão não encontrado.");
    return;
  }
  localStorage.setItem("campeaoSelecionado", JSON.stringify(campeao)); // Salvar o campeão no localStorage
  window.location.href = "/indexhistory.html"; // Redirecionar para a página da história
}

// Função para redirecionar para a página de criação de personagem
// Esta função é chamada no botão "Criar seu personagem" em "indexMP.html".
function criarPersonagem() {
  window.location.href = "/indexMP.html"; // Página de criação de personagem
}

// =========== CARREGAR CAMPEÃO NA PÁGINA DE HISTÓRIA ===========
// Função para carregar o campeão na página de história
// Esta função é chamada em "indexhistory.html" para exibir os status do campeão na barra lateral.
function carregarCampeao() {
  const campeao = JSON.parse(localStorage.getItem("campeaoSelecionado")); // Pega o campeão salvo no localStorage
  if (!campeao) {
    console.error("Nenhum campeão salvo no localStorage.");
    return; // Se não tiver campeão, sair da função
  }

  // Atualizar a imagem e as estatísticas do campeão
  document.querySelector(".champion-img").src = campeao.imagem || "/assets/default-character.svg";
  document.querySelector(".heart").textContent = campeao.energia;
  document.querySelector(".attack").textContent = campeao.habilidades;
  document.querySelector(".defense").textContent = campeao.sorte;

  // Carregar os equipamentos do campeão
  const ul = document.querySelector(".champion-items ul");
  ul.innerHTML = ""; // Limpar lista anterior
  campeao.equipamentos.forEach((eq) => {
    const li = document.createElement("li");
    li.textContent = eq.nome;
    ul.appendChild(li);
  });
}

// =========== CARREGAR HISTÓRIA E VERIFICAR CRIATURAS ===========
// Função para carregar a história com base no ID
// Esta função é chamada em "indexhistory.html" para carregar a história inicial e todas as opções subsequentes.
function carregarHistoria(id) {
  const historia = historias.find((h) => h.id === id);  // Encontrar a história pelo ID
  if (!historia) {
    console.error("História não encontrada.");
    return;  // Se a história não existir, sair da função
  }

  document.querySelector(".story-text").textContent = historia.texto_base;  // Atualizar o texto da história

  const choicesDiv = document.querySelector(".choices");
  choicesDiv.innerHTML = "";  // Limpar opções anteriores

  // Verifica se a história contém uma criatura
  if (historia.criatura) {
    // Adicionar botão para iniciar batalha
    const batalhaBtn = document.createElement("button");
    batalhaBtn.textContent = "Continuar Lutando";
    batalhaBtn.onclick = () => iniciarBatalha(historia.criatura, historia.opcoes[0].proximaHistoria);  // Iniciar batalha ao clicar
    choicesDiv.appendChild(batalhaBtn);

    // Adicionar botão para desistir da luta
    const desistirBtn = document.createElement("button");
    desistirBtn.textContent = "Desistir da Luta";
    desistirBtn.onclick = () => carregarHistoria(historia.opcoes[1].proximaHistoria);  // Carregar história de desistência
    choicesDiv.appendChild(desistirBtn);
  } else {
    carregarOpcoes(historia);  // Carregar as opções normalmente se não houver criatura
  }
}

// Função para carregar opções normais (sem criatura)
function carregarOpcoes(historia) {
  const choicesDiv = document.querySelector(".choices");
  choicesDiv.innerHTML = "";  // Limpar opções anteriores
  historia.opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.textContent = opcao.texto;
    btn.className = "choice-btn";
    btn.onclick = () => carregarHistoria(opcao.proximaHistoria);  // Carregar a próxima história ao clicar
    choicesDiv.appendChild(btn);
  });
}

// Função para iniciar a batalha
function iniciarBatalha(criatura, proximaHistoria) {
  const criaturaSelecionada = criaturas.find(c => c.id === criatura.id); // Encontrar a criatura pelo ID
  if (!criaturaSelecionada) {
    console.error("Criatura não encontrada.");
    return;
  }
  localStorage.setItem("criaturaAtual", JSON.stringify(criaturaSelecionada));  // Salvar a criatura
  localStorage.setItem("proximaHistoria", proximaHistoria);  // Salvar a próxima história para ir após a vitória
  window.location.href = "/indexBatalha.html";  // Redirecionar para a batalha
}

// Carregar a primeira história ao carregar a página de história
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const historiaInicial = parseInt(params.get('id')) || 1; // ID da história inicial, pegar de URL se disponível e garantir que seja um número
  if (isNaN(historiaInicial)) {
    console.error("ID de história inválido.");
    return;
  }
  carregarCampeao(); // Carregar o campeão no painel
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
  window.location.href = "/indexhistory.html"; // Redirecionar para a página de história
}

// Inicializar a criação de personagem ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const numeros = gerarNumerosAleatorios();
  mostrarNumerosSorteados(numeros);
  preencherAtributos(numeros);
  carregarEquipamentos();
});

// =========== LÓGICA DE BATALHA ===========

let campeao = JSON.parse(localStorage.getItem("campeaoSelecionado")); // Pega o campeão do localStorage
let criatura = JSON.parse(localStorage.getItem("criaturaAtual")); // Pega a criatura do localStorage
let proximaHistoria = localStorage.getItem("proximaHistoria"); // Pega a próxima história após a batalha

if (!campeao || !criatura) {
  alert("Erro: Dados do campeão ou da criatura não encontrados!");
  window.location.href = "/indexhistory.html"; // Redirecionar de volta à história se houver erro
}

// Atualizar os status iniciais na tela de batalha
document.addEventListener("DOMContentLoaded", () => {
  const energiaCampeaoElem = document.getElementById("energiaCampeao");
  const habilidadeCampeaoElem = document.getElementById("habilidadeCampeao");
  const energiaCriaturaElem = document.getElementById("energiaCriatura");
  const habilidadeCriaturaElem = document.getElementById("habilidadeCriatura");
  const imagemCriaturaElem = document.getElementById("imagemCriatura");

  if (!energiaCampeaoElem || !habilidadeCampeaoElem || !energiaCriaturaElem || !habilidadeCriaturaElem || !imagemCriaturaElem) {
    console.error("Elementos da batalha não foram encontrados no DOM.");
    return;
  }

  energiaCampeaoElem.textContent = campeao.energia;
  habilidadeCampeaoElem.textContent = campeao.habilidades;
  energiaCriaturaElem.textContent = criatura.energia;
  habilidadeCriaturaElem.textContent = criatura.habilidade;
  imagemCriaturaElem.src = criatura.referencia_imagem;

  salvarEstadoBatalha();
});

// Função para gerar número aleatório entre 1 e 6
function rolarDados() {
  return Math.floor(Math.random() * 6) + 1;
}

// Função de combate (ataque) chamada ao clicar no botão "Atacar"
function atacar() {
  let ataqueCampeao = rolarDados() + rolarDados() + campeao.habilidades;
  let ataqueCriatura = rolarDados() + rolarDados() + criatura.habilidade;

  document.getElementById("forcaCampeao").textContent = ataqueCampeao;
  document.getElementById("forcaCriatura").textContent = ataqueCriatura;

  if (ataqueCampeao > ataqueCriatura) {
    criatura.energia -= 2;
    alert("Você feriu a criatura!");
  } else if (ataqueCampeao < ataqueCriatura) {
    campeao.energia -= 2;
    alert("A criatura te feriu!");
  } else {
    alert("Ninguém se feriu nessa rodada.");
  }

  atualizarStatus();
  salvarEstadoBatalha();
  verificarMorte();
}

// Função para usar Sorte
function usarSorte() {
  if (campeao.sorte <= 0) {
    alert("Você está sem sorte!");
    return;
  }

  campeao.sorte--; // Consome 1 de sorte

  let ataqueCampeao = rolarDados() + rolarDados() + campeao.habilidades;
  let ataqueCriatura = rolarDados() + rolarDados() + criatura.habilidade;

  document.getElementById("forcaCampeao").textContent = ataqueCampeao;
  document.getElementById("forcaCriatura").textContent = ataqueCriatura;

  if (ataqueCampeao > ataqueCriatura) {
    criatura.energia -= 4; // Dano maior com sorte
    alert("Você usou sorte e causou grande dano!");
  } else {
    campeao.energia -= 1; // Dano reduzido
    alert("Você usou sorte, mas foi ferido levemente.");
  }

  atualizarStatus();
  salvarEstadoBatalha();
  verificarMorte();
}

// Função para fugir da batalha chamada ao clicar no botão "Fugir"
function fugir() {
  alert("Você fugiu da batalha!");
  localStorage.removeItem("criaturaAtual");
  const historiaDeOrigem = localStorage.getItem("historiaDeOrigem");
  window.location.href = /indexhistory.html?id=${historiaDeOrigem};
}

// Atualizar os status de energia na tela
function atualizarStatus() {
  document.getElementById("energiaCampeao").textContent = campeao.energia;
  document.getElementById("energiaCriatura").textContent = criatura.energia;
}

// Função para salvar o estado da batalha (campeão e criatura)
function salvarEstadoBatalha() {
  localStorage.setItem("campeaoSelecionado", JSON.stringify(campeao));
  localStorage.setItem("criaturaAtual", JSON.stringify(criatura));
  localStorage.setItem("proximaHistoria", proximaHistoria);
}

// Verificar se alguém morreu e finalizar a batalha
function verificarMorte() {
  if (campeao.energia <= 0) {
    alert("Você morreu! Fim de jogo.");
    window.location.href = "/gameover.html";
  } else if (criatura.energia <= 0) {
    alert("Você venceu a criatura!");
    salvarEstadoBatalha();
    const proximaHistoria = localStorage.getItem("proximaHistoria");
    if (proximaHistoria) {
      window.location.href = /indexhistory.html?id=${proximaHistoria};
    } else {
      alert("Erro: Próxima história não encontrada.");
      window.location.href = '/indexhistory.html';
    }
  }
}
