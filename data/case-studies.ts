// Diário de cada missão: o problema, as decisões técnicas e o que deu trabalho.
// Os textos seguem o README de cada repositório.

export type CaseStudyMedia = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  // GIFs ficam parados até a pessoa pedir para ver a animação.
  animation?: string;
  shape?: 'wide' | 'phone';
};

export type CaseStudyNote = {
  title: string;
  text: string;
};

export type CaseStudy = {
  briefing: string[];
  media?: CaseStudyMedia[];
  decisions: CaseStudyNote[];
  obstacles?: CaseStudyNote[];
  next?: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  dungenlab: {
    briefing: [
      'Geração procedural é fácil de descrever e difícil de enxergar: o algoritmo roda em milissegundos e só o mapa pronto aparece. O DunGenLab desacelera esse processo e mostra cada passo em um canvas, com um texto dizendo o que o algoritmo está fazendo naquele momento.',
      'Dá para escolher entre três algoritmos, pausar, avançar um passo de cada vez, mudar a velocidade, medir o resultado e exportar em PNG ou JSON. A mesma seed com os mesmos parâmetros gera sempre o mesmo mapa, em qualquer navegador.',
    ],
    media: [
      {
        src: '/media/missoes/dungenlab/tela.webp',
        alt: 'Tela do DunGenLab com um mapa gerado por BSP no centro e os painéis de algoritmo, parâmetros e métricas em volta',
        caption:
          'Mapa gerado por BSP, com os painéis no estilo de menu de RPG.',
        width: 1366,
        height: 768,
        shape: 'wide',
      },
      {
        src: '/media/missoes/dungenlab/drunkards-walk-poster.webp',
        animation: '/media/missoes/dungenlab/drunkards-walk.gif',
        alt: "Caverna escavada pelo Drunkard's Walk",
        caption:
          "Drunkard's Walk: um andarilho sorteia direções e abre chão por onde passa.",
        width: 480,
        height: 320,
      },
      {
        src: '/media/missoes/dungenlab/cellular-automata-poster.webp',
        animation: '/media/missoes/dungenlab/cellular-automata.gif',
        alt: 'Cavernas formadas pelo Cellular Automata a partir de ruído',
        caption:
          'Cellular Automata: o ruído vira caverna em quatro ou cinco rodadas.',
        width: 480,
        height: 320,
      },
      {
        src: '/media/missoes/dungenlab/bsp-poster.webp',
        animation: '/media/missoes/dungenlab/bsp.gif',
        alt: 'Masmorra de salas e corredores gerada por BSP',
        caption:
          'BSP: o mapa é cortado em uma árvore e cada folha ganha uma sala.',
        width: 480,
        height: 320,
      },
      {
        src: '/media/missoes/dungenlab/tela-celular.webp',
        alt: 'DunGenLab no celular, com o mapa no topo e os painéis em abas',
        caption: 'No celular, as janelas viram abas e o mapa fica no topo.',
        width: 390,
        height: 1084,
        shape: 'phone',
      },
    ],
    decisions: [
      {
        title: 'Algoritmos como generators',
        text: 'Cada algoritmo é uma function* que altera o grid e faz yield a cada passo. A mesma função serve para animar, pausar, avançar um passo ou gerar tudo de uma vez, então não existe uma versão "animada" e outra "instantânea" para manter em sincronia.',
      },
      {
        title: 'PRNG com seed',
        text: 'Nada no núcleo usa Math.random. Os algoritmos recebem um gerador mulberry32 alimentado por um hash xmur3 do texto da seed. É isso que torna os mapas reproduzíveis e permite testar que a mesma seed produz exatamente o mesmo grid.',
      },
      {
        title: 'Núcleo sem React',
        text: 'Tudo em src/core é TypeScript puro, sem React e sem DOM. Algoritmos, métricas e importação rodam nos testes sem navegador. Quem conversa com o núcleo é um único hook, useGeneration.',
      },
      {
        title: 'Grid em Uint8Array, fora do estado',
        text: 'O mapa é um array de bytes guardado em uma ref. Os algoritmos alteram o grid no lugar e um contador de versão avisa o canvas para redesenhar. Colocar o grid inteiro no estado do React a cada quadro deixaria a animação lenta.',
      },
      {
        title: 'Escala inteira para o pixel art',
        text: 'O tile na tela tem sempre um número inteiro de pixels do aparelho, o maior que cabe no espaço medido por um ResizeObserver. Com tile fracionário, uns quadrados sairiam maiores que outros.',
      },
    ],
    obstacles: [
      {
        title: 'Flood fill que estoura a pilha',
        text: 'A versão recursiva da contagem de regiões é mais curta, mas estoura a pilha em mapas grandes com uma região comprida. A contagem usa busca em largura com fila.',
      },
      {
        title: 'Vizinhos que mudam no meio da rodada',
        text: 'No Cellular Automata, cada rodada é calculada em um buffer separado, para que nenhum tile enxergue um vizinho que já mudou na mesma rodada.',
      },
      {
        title: 'Arquivo JSON não confiável',
        text: 'A importação confere versão, tipos, dimensões e o conteúdo dos tiles, e mostra uma mensagem na tela em vez de quebrar. Os parâmetros também são presos aos limites de cada algoritmo antes de gerar.',
      },
    ],
  },

  patchnotes: {
    briefing: [
      'O Patchnotes reúne em um só lugar o progresso de um jogo em desenvolvimento: dashboard de métricas, devlog, perfil e um assistente para apoiar a criação de mecânicas.',
      'A interface foi construída antes do backend, sobre uma API simulada com Mock Service Worker. Os contratos ficaram documentados em um arquivo só, e na segunda etapa a API em FastAPI implementou esses mesmos contratos sem mudar o front.',
    ],
    decisions: [
      {
        title: 'Contrato antes do backend',
        text: 'Endpoints, payloads e erros ficam em docs/API_CONTRACTS.md, a fonte única para os dois lados. O front e os handlers do MSW seguem esse arquivo, e os testes conferem os contratos.',
      },
      {
        title: 'Cenários de erro reproduzíveis',
        text: 'Qualquer página aceita o parâmetro mock, como ?mock=dashboard:server-error ou ?mock=profile:invalid-payload, para ver as telas de vazio, 400, 401 e 500 sem depender de o servidor falhar. Um aviso no topo indica o cenário ativo.',
      },
      {
        title: 'Módulos por domínio',
        text: 'O código fica dividido em auth, dashboard, devlog, chat e profile. React Query cuida dos dados do servidor e Zustand guarda só o estado global da interface.',
      },
      {
        title: 'Resposta em streaming',
        text: 'Com o backend real, o assistente mostra a resposta token a token via WebSocket. Sem a variável do WebSocket, ou com o MSW, o chat usa a rota REST.',
      },
      {
        title: 'Sessão com refresh token',
        text: 'O backend usa JWT com refresh token rotacionado em cookie httpOnly. O front renova a sessão sozinho e, no logout, revoga a sessão no servidor.',
      },
    ],
    obstacles: [
      {
        title: 'Mock que não inicia',
        text: 'Se o service worker não sobe, o app não faz nenhuma chamada sem mock: mostra a tela "A API simulada não iniciou" com o motivo e um botão para tentar de novo.',
      },
      {
        title: 'Sessão expirada no meio do uso',
        text: 'Um 401 encerra a sessão e leva de volta ao login, e esse caminho também tem cenário simulado para ser testado.',
      },
    ],
    next: [
      'Edição e gerenciamento completo das entradas do devlog',
      'Upload e armazenamento de imagens de perfil',
      'Mais testes end-to-end',
      'Ambiente de produção e publicação da aplicação',
    ],
  },

  questboard: {
    briefing: [
      'Um Kanban para acompanhar o desenvolvimento de jogos em que cada tarefa é uma quest: concluir cards rende XP por raridade, e o projeto sobe de level e de rank.',
      'Construí do zero com Go, net/http, html/template, CSS puro e JavaScript vanilla. O objetivo era aprender engenharia de software com algo real, sem framework escondendo as partes.',
    ],
    decisions: [
      {
        title: 'Camadas com responsabilidade única',
        text: 'Handler lê a requisição e renderiza o template, service guarda as regras de negócio e os erros sentinela, storage lê e escreve os dados, model tem as structs e os métodos de domínio. Handlers nunca acessam o storage direto.',
      },
      {
        title: 'JSON no dia a dia, SQLite no deploy',
        text: 'Localmente os dados vão para um arquivo JSON criado na primeira gravação. Em produção, SQLite usa um único arquivo de banco e funciona bem com volume persistente. Uma ferramenta em cmd/migrate converte um no outro.',
      },
      {
        title: 'Pronto para container',
        text: 'Imagem Docker com volume em /data, healthcheck em GET /healthz e porta configurável por PORT, para a plataforma de deploy controlar.',
      },
      {
        title: 'Drag and drop que persiste',
        text: 'Os cards mudam de coluna e de ordem arrastando, e status e ordem continuam iguais ao recarregar a página.',
      },
    ],
    obstacles: [
      {
        title: 'Sem autenticação nesta versão',
        text: 'Os formulários não têm login nem proteção CSRF. Para uso público, o app precisa ficar atrás de uma proteção externa, como acesso privado da plataforma, VPN ou basic auth no proxy.',
      },
      {
        title: 'Dados que somem no redeploy',
        text: 'Sem volume persistente em /data, os dados se perdem em rebuild ou redeploy do container.',
      },
      {
        title: 'Go no WSL',
        text: 'Acessando o projeto por \\\\wsl.localhost, o Go pode falhar com erro de lock no go.mod. A saída é rodar os comandos dentro do WSL.',
      },
    ],
    next: [
      'Filtro e busca de cards',
      'Tags e responsáveis por card',
      'API REST',
      'Operação e observabilidade',
    ],
  },

  portfolio: {
    briefing: [
      'Este site. A ideia era apresentar meus projetos de um jeito que tivesse a minha cara: um menu de RPG de 16 bits, sem perder a clareza para quem só quer ver o código e as decisões.',
      'É uma página estática gerada no build e publicada na Vercel. Projetos, competências e textos vêm de arquivos de dados tipados, então atualizar o portfólio é editar uma lista.',
    ],
    media: [
      {
        src: '/media/missoes/portfolio/tela.webp',
        alt: 'Página inicial do portfólio no tema escuro, com a ficha de personagem e o menu de pausa',
        caption: 'A ficha de personagem que abre o site.',
        width: 1366,
        height: 768,
        shape: 'wide',
      },
    ],
    decisions: [
      {
        title: 'Paleta como tokens',
        text: 'A paleta Brasa fica em tokens OKLCH com versão clara e escura, e nenhum componente usa cor fixa. A profundidade vem de sombras sólidas e bordas, como em pixel art, sem brilho neon.',
      },
      {
        title: 'Um relógio de 8 quadros por segundo',
        text: 'Cursores que piscam, a Brasinha andando e o NPC do contato usam um único relógio que roda a 8 quadros por segundo e para quando a aba fica escondida, em vez de animações CSS infinitas.',
      },
      {
        title: 'Efeitos que respeitam quem lê',
        text: 'Com prefers-reduced-motion ligado, faíscas, transições e o relógio são desligados. Efeitos de hover só existem em aparelhos com mouse, e todo link mostra o cursor ▶ também no foco do teclado.',
      },
      {
        title: 'Conteúdo separado da interface',
        text: 'Cada projeto é um objeto tipado em data/projects.ts, e os diários como este ficam em data/case-studies.ts. As páginas são geradas no build a partir dessas listas.',
      },
    ],
    obstacles: [
      {
        title: 'Firefox gastando CPU parado',
        text: 'Com a página parada, o Firefox usava de 24% a 28% de CPU: cada animação CSS infinita força uma nova pintura a todo quadro. Depois de trocar as animações pelo relógio de 8 quadros, caiu para cerca de 4%.',
      },
      {
        title: 'Linhas de CRT que não apareciam',
        text: 'O Firefox não desenhava as listras de um repeating-linear-gradient de 2px no filtro de CRT. Um linear-gradient comum repetido com background-size resolveu nos dois navegadores.',
      },
    ],
  },

  'gameshelf-api': {
    briefing: [
      'API REST para organizar uma coleção pessoal de jogos: cadastro, filtros por status e plataforma, acompanhamento de progresso e um resumo estatístico da coleção.',
      'Foi um projeto de estudo para aprender a montar uma API do jeito que ela existe em produção: banco de verdade, migrations versionadas, testes isolados e configuração fora do código.',
    ],
    decisions: [
      {
        title: 'Arquitetura em camadas',
        text: 'Controller cuida do HTTP e converte erros em respostas, service guarda as regras de negócio, repository faz as consultas com a Session e os schemas Pydantic definem os contratos de entrada e saída.',
      },
      {
        title: 'Banco versionado com Alembic',
        text: 'A evolução do PostgreSQL é feita por migrations. As geradas com --autogenerate são revisadas antes de rodar o upgrade.',
      },
      {
        title: 'Testes com SQLite isolado',
        text: 'Os testes fazem requisições HTTP de verdade contra um SQLite separado, então rodam sem depender do PostgreSQL local.',
      },
      {
        title: 'Segredos fora do repositório',
        text: 'DATABASE_URL e SECRET_KEY vêm de um .env ignorado pelo Git, com um .env.example como modelo. O PostgreSQL local sobe com Docker Compose.',
      },
    ],
  },

  'dungeon-meowster': {
    briefing: [
      'Uma aventura felina retrô em desenvolvimento no GameMaker, com sprites feitos no Aseprite.',
      'É um roguelike com inimigos diferentes, melhorias por cartas e progressão por fases. A regra que sigo é manter o escopo pequeno, mas completo, e construir sem depender de tutoriais.',
    ],
    decisions: [],
  },
};

export function getCaseStudy(id: string) {
  return caseStudies[id];
}
