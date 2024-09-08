const campeoes = [
  {
    nome: "KORA",
    imagem: "/jogo_desafio_dos_campeos/assets/warrior1.svg",
    habilidades: 11,
    energia: 12,
    sorte: 9,
    equipamentos: [
      { nome: "Espada", atributos: ["Dano", "Velocidade"] },
      { nome: "Escudo Antigo", atributos: ["Defesa"] },
    ],
  },
  {
    nome: "GROTY",
    imagem: "caminho/para/imagem.jpg",
    habilidades: 9,
    energia: 22,
    sorte: 7,
    equipamentos: [
      { nome: "Espada", atributos: ["Dano", "Velocidade"] },
      { nome: "Escudo Antigo", atributos: ["Defesa"] },
    ],
  },

  // ... outros campeões
];

const criaturas = [
  {
    id: 1,
    nome: "GUARDA DA PRISÃO",
    habilidade: 6,
    referencia_imagem: "caminho/para/guarda_prisao.jpg",
    energia: 6,
  },
  {
    id: 2,
    nome: "SOLDADO DA ILHA DE SANGUE",
    habilidade: 8,
    referencia_imagem: "caminho/para/soldado_ilha.jpg",
    energia: 7,
  },
  {
    id: 3,
    nome: "CAPITÃO DO GUARDAS",
    habilidade: 9,
    referencia_imagem: "caminho/para/capitao_guardas.jpg",
    energia: 8,
  },
  {
    id: 4,
    nome: "SERVO DO CASTELO",
    habilidade: 5,
    referencia_imagem: "caminho/para/servo_castelo.jpg",
    energia: 5,
  },
  {
    id: 5,
    nome: "GUARDIÃO DO PORTÃO",
    habilidade: 10,
    referencia_imagem: "caminho/para/guardiao_portao.jpg",
    energia: 9,
  },
  {
    id: 6,
    nome: "ESPECTRO DAS PROFUNDEZAS",
    habilidade: 7,
    referencia_imagem: "caminho/para/espectro_profundezas.jpg",
    energia: 5,
  },
  {
    id: 7,
    nome: "GUARDIÃO DO LIVRO",
    habilidade: 8,
    referencia_imagem: "caminho/para/guardiao_livro.jpg",
    energia: 6,
  },
  {
    id: 8,
    nome: "GUARDIÃO DE PEDRA",
    habilidade: 10,
    referencia_imagem: "caminho/para/guardiao_pedra.jpg",
    energia: 9,
  },
];

const historias = [
  {
    id: 1,
    referencia_imagem: "caminho/para/imagem1.jpg",
    texto_base:
      "Na aurora do dia seguinte, você é despertado pelo som de passos. Dois guardas entram e oferecem comida.",
    opcoes: [
      { texto: "Aceitar a comida", proximaHistoria: 2 },
      { texto: "Tentar conversar com os guardas", proximaHistoria: 50 },
    ],
  },
  {
    id: 2,
    referencia_imagem: "caminho/para/imagem2.jpg",
    texto_base: "A sopa é deliciosa, e você sente suas forças retornarem.",
    opcoes: [
      { texto: "Ir para a Arena da Morte", proximaHistoria: 4 },
      { texto: "Procurar uma rota de fuga", proximaHistoria: 5 },
    ],
  },
  {
    id: 3,
    referencia_imagem: "caminho/para/imagem3.jpg",
    texto_base: "Você tenta dominar o guarda, mas ele reage rapidamente.",
    criatura: { id: 1, nome: "GUARDA DA PRISÃO" },
    opcoes: [
      { texto: "Desistir e negociar", proximaHistoria: 50 },
      { texto: "Voltar para a cela", proximaHistoria: 7 },
    ],
  },
  {
    id: 4,
    referencia_imagem: "caminho/para/imagem4.jpg",
    texto_base:
      "Você é levado para a Arena da Morte. A primeira prova é uma corrida. Os corredores ao seu lado parecem famintos e desesperados.",
    opcoes: [
      { texto: "Correr com força total", proximaHistoria: 8 },
      { texto: "Conservar energia", proximaHistoria: 9 },
    ],
  },
  {
    id: 5,
    referencia_imagem: "caminho/para/imagem5.jpg",
    texto_base:
      "Você tenta fugir pela porta dos fundos, mas ela está fortemente guardada.",
    criatura: { id: 2, nome: "SOLDADO DA ILHA DE SANGUE" },
    opcoes: [
      {
        texto: "Desistir da fuga e tentar encontrar aliados",
        proximaHistoria: 10,
      },
      { texto: "Procurar uma outra passagem secreta", proximaHistoria: 12 },
    ],
  },
  {
    id: 6,
    referencia_imagem: "caminho/para/imagem6.jpg",
    texto_base:
      "Você domina o guarda e consegue escapar da cela, mas percebe que há mais guardas pelo corredor.",
    opcoes: [
      { texto: "Correr para o castelo", proximaHistoria: 12 },
      { texto: "Se esconder no corredor e esperar", proximaHistoria: 13 },
    ],
  },
  {
    id: 7,
    referencia_imagem: "caminho/para/imagem7.jpg",
    texto_base:
      "Você desiste da luta e retorna à sua cela, frustrado, mas decidido a encontrar outro modo de escapar.",
    opcoes: [
      { texto: "Esperar por uma nova oportunidade", proximaHistoria: 50 },
      { texto: "Planejar uma fuga mais estratégica", proximaHistoria: 5 },
    ],
  },
  {
    id: 8,
    referencia_imagem: "caminho/para/imagem8.jpg",
    texto_base:
      "Você corre com todas as suas forças e fica à frente dos outros corredores, mas logo percebe uma armadilha à frente.",
    opcoes: [
      { texto: "Desviar da armadilha", proximaHistoria: 14 },
      { texto: "Avisar os outros corredores", proximaHistoria: 15 },
    ],
  },
  {
    id: 9,
    referencia_imagem: "caminho/para/imagem9.jpg",
    texto_base:
      "Você conserva energia, mas vê os corredores começarem a ultrapassá-lo. De repente, uma explosão ocorre à frente.",
    opcoes: [
      { texto: "Acelerar para ultrapassar o caos", proximaHistoria: 14 },
      { texto: "Parar e observar a explosão", proximaHistoria: 16 },
    ],
  },
  {
    id: 10,
    referencia_imagem: "caminho/para/imagem10.jpg",
    texto_base:
      "Você encontra um pequeno grupo de prisioneiros dispostos a ajudar. Eles sugerem um plano ousado de fuga.",
    opcoes: [
      { texto: "Aceitar o plano deles", proximaHistoria: 17 },
      { texto: "Sugerir uma abordagem mais cautelosa", proximaHistoria: 18 },
    ],
  },
  {
    id: 11,
    referencia_imagem: "caminho/para/imagem11.jpg",
    texto_base:
      "Você se rende à situação e é forçado a lutar na Arena da Morte novamente.",
    opcoes: [
      { texto: "Tentar vencer pela força", proximaHistoria: 4 },
      { texto: "Tentar fugir novamente", proximaHistoria: 5 },
    ],
  },
  {
    id: 12,
    referencia_imagem: "caminho/para/imagem12.jpg",
    texto_base:
      "Você corre em direção ao castelo, e em uma sala escondida, você encontra um mapa misterioso.",
    opcoes: [
      { texto: "Estudar o mapa para encontrar a saída", proximaHistoria: 19 },
      { texto: "Explorar a sala em busca de pistas", proximaHistoria: 20 },
    ],
  },
  {
    id: 13,
    referencia_imagem: "caminho/para/imagem13.jpg",
    texto_base:
      "Você se esconde no corredor, vendo os guardas passarem, mas ouve um som estranho ao seu redor.",
    opcoes: [
      { texto: "Investigar o som", proximaHistoria: 21 },
      { texto: "Ignorar e seguir em frente", proximaHistoria: 12 },
    ],
  },
  {
    id: 14,
    referencia_imagem: "caminho/para/imagem14.jpg",
    texto_base:
      "Você desvia da armadilha e é o primeiro a terminar a prova. Um mestre da Arena o observa com curiosidade.",
    opcoes: [
      { texto: "Falar com o mestre", proximaHistoria: 22 },
      { texto: "Fugir enquanto tem chance", proximaHistoria: 23 },
    ],
  },
  {
    id: 15,
    referencia_imagem: "caminho/para/imagem15.jpg",
    texto_base:
      "Ao alertar os outros corredores, eles formam uma aliança temporária com você.",
    opcoes: [
      { texto: "Continuar juntos até o final", proximaHistoria: 24 },
      { texto: "Romper a aliança e seguir sozinho", proximaHistoria: 14 },
    ],
  },
  {
    id: 16,
    referencia_imagem: "caminho/para/imagem16.jpg",
    texto_base:
      "Você observa a explosão, percebendo que foi uma armadilha detonada por guardas.",
    opcoes: [
      { texto: "Usar a explosão como distração e fugir", proximaHistoria: 23 },
      {
        texto: "Tentar explorar a área em busca de pistas",
        proximaHistoria: 25,
      },
    ],
  },
  {
    id: 17,
    referencia_imagem: "caminho/para/imagem17.jpg",
    texto_base:
      "O plano ousado parece funcionar. Vocês avançam por um corredor secreto.",
    opcoes: [
      { texto: "Seguir o plano até o fim", proximaHistoria: 26 },
      { texto: "Parar e verificar o caminho", proximaHistoria: 27 },
    ],
  },
  {
    id: 18,
    referencia_imagem: "caminho/para/imagem18.jpg",
    texto_base:
      "Você sugere uma abordagem mais cautelosa e consegue enganar os guardas.",
    opcoes: [
      { texto: "Escapar para o castelo", proximaHistoria: 12 },
      { texto: "Tentar explorar o local", proximaHistoria: 20 },
    ],
  },
  {
    id: 19,
    referencia_imagem: "caminho/para/imagem19.jpg",
    texto_base:
      "Você estuda o mapa e descobre uma passagem secreta que leva à liberdade.",
    opcoes: [
      { texto: "Seguir a passagem", proximaHistoria: 26 },
      { texto: "Explorar mais antes de sair", proximaHistoria: 20 },
    ],
  },
  {
    id: 20,
    referencia_imagem: "caminho/para/imagem20.jpg",
    texto_base:
      "Você continua explorando o castelo, encontrando um enigma gravado nas paredes.",
    opcoes: [
      { texto: "Tentar resolver o enigma", proximaHistoria: 28 },
      { texto: "Ignorar o enigma e seguir em frente", proximaHistoria: 19 },
    ],
  },
  {
    id: 21,
    referencia_imagem: "caminho/para/imagem21.jpg",
    texto_base:
      "O som estranho se intensifica. Você encontra uma passagem secreta atrás de uma parede falsa.",
    opcoes: [
      { texto: "Entrar na passagem", proximaHistoria: 29 },
      { texto: "Ignorar e continuar pelo corredor", proximaHistoria: 12 },
    ],
  },
  {
    id: 22,
    referencia_imagem: "caminho/para/imagem22.jpg",
    texto_base:
      "O mestre da Arena lhe oferece um desafio final: vencer um último enigma ou lutar até a morte.",
    opcoes: [
      { texto: "Aceitar o enigma", proximaHistoria: 28 },
      { texto: "Recusar e tentar fugir", proximaHistoria: 23 },
    ],
  },
  {
    id: 23,
    referencia_imagem: "caminho/para/imagem23.jpg",
    texto_base:
      "Você aproveita a distração e foge pela saída lateral da arena.",
    opcoes: [
      { texto: "Correr para a floresta", proximaHistoria: 30 },
      { texto: "Buscar outra passagem secreta", proximaHistoria: 24 },
    ],
  },
  {
    id: 24,
    referencia_imagem: "caminho/para/imagem24.jpg",
    texto_base:
      "Você encontra uma passagem secreta que leva para o lado externo do castelo.",
    opcoes: [
      { texto: "Seguir até a liberdade", proximaHistoria: 26 },
      { texto: "Voltar e tentar explorar mais", proximaHistoria: 20 },
    ],
  },
  {
    id: 25,
    referencia_imagem: "caminho/para/imagem25.jpg",
    texto_base:
      "Você explora a área destruída pela explosão e encontra um baú trancado.",
    opcoes: [
      { texto: "Tentar abrir o baú", proximaHistoria: 31 },
      { texto: "Ignorar o baú e sair", proximaHistoria: 23 },
    ],
  },
  {
    id: 26,
    referencia_imagem: "caminho/para/imagem26.jpg",
    texto_base:
      "Muito obrigado por testar meu sistema! Você chegou ao fim da demo do projeto!",
    opcoes: [
      {
        texto: "Me siga no LinkedIn",
        link: "https://www.linkedin.com/in/kaiocerutti/", // Coloque aqui o seu link do LinkedIn
        proximaHistoria: null,
      },
      {
        texto: "Dê uma olhada no GitHub",
        link: "https://github.com/Cerutti202/", // Coloque aqui o seu link do GitHub
        proximaHistoria: null,
      },
      {
        texto: "Vote em mim no Discord",
        link: "https://discord.com/", // Coloque aqui o link do Discord
        proximaHistoria: null,
      },
    ],
  },

  {
    id: 27,
    referencia_imagem: "caminho/para/imagem27.jpg",
    texto_base:
      "Você para para verificar o caminho, percebendo uma armadilha logo à frente.",
    opcoes: [
      { texto: "Desarmar a armadilha", proximaHistoria: 29 },
      { texto: "Ignorar e seguir em frente", proximaHistoria: 17 },
    ],
  },
  {
    id: 28,
    referencia_imagem: "caminho/para/imagem28.jpg",
    texto_base:
      "Você aceita o desafio do enigma. 'Qual a coisa mais poderosa e temida?'",
    opcoes: [
      { texto: "Responde 'O tempo'", proximaHistoria: 32 },
      { texto: "Responde 'O medo'", proximaHistoria: 33 },
    ],
  },
  {
    id: 29,
    referencia_imagem: "caminho/para/imagem29.jpg",
    texto_base:
      "Você encontra uma sala misteriosa cheia de pergaminhos antigos.",
    opcoes: [
      { texto: "Procurar por algo útil", proximaHistoria: 34 },
      { texto: "Deixar a sala rapidamente", proximaHistoria: 26 },
    ],
  },
  {
    id: 30,
    referencia_imagem: "caminho/para/imagem30.jpg",
    texto_base: "Você corre para a floresta, mas sente que está sendo seguido.",
    opcoes: [
      { texto: "Esconder-se", proximaHistoria: 35 },
      { texto: "Continuar correndo", proximaHistoria: 26 },
    ],
  },
  {
    id: 31,
    referencia_imagem: "caminho/para/imagem31.jpg",
    texto_base: "O baú se abre e dentro dele, você encontra uma chave dourada.",
    opcoes: [
      { texto: "Pegar a chave", proximaHistoria: 24 },
      { texto: "Deixar a chave e sair", proximaHistoria: 23 },
    ],
  },
  {
    id: 32,
    referencia_imagem: "caminho/para/imagem32.jpg",
    texto_base:
      "Sua resposta foi aceita, e o mestre da Arena o deixa passar para a liberdade.",
    opcoes: [{ texto: "Seguir em frente", proximaHistoria: 26 }],
  },
  {
    id: 33,
    referencia_imagem: "caminho/para/imagem33.jpg",
    texto_base:
      "Sua resposta está errada, e o mestre da Arena o expulsa para a prisão novamente.",
    opcoes: [{ texto: "Planejar uma fuga", proximaHistoria: 5 }],
  },
  {
    id: 34,
    referencia_imagem: "caminho/para/imagem34.jpg",
    texto_base:
      "Você encontra um pergaminho antigo com instruções para desativar as armadilhas do castelo.",
    opcoes: [
      { texto: "Usar as instruções", proximaHistoria: 27 },
      { texto: "Ignorar e sair", proximaHistoria: 26 },
    ],
  },
  {
    id: 35,
    referencia_imagem: "caminho/para/imagem35.jpg",
    texto_base: "Você se esconde na floresta, ouvindo passos se aproximando.",
    opcoes: [
      { texto: "Esperar em silêncio", proximaHistoria: 36 },
      { texto: "Sair do esconderijo", proximaHistoria: 26 },
    ],
  },
  {
    id: 36,
    referencia_imagem: "caminho/para/imagem36.jpg",
    texto_base: "Os passos passam, e você se sente seguro para continuar.",
    opcoes: [{ texto: "Correr para a liberdade", proximaHistoria: 26 }],
  },
];
