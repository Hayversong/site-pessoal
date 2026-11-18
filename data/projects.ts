export type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  technologies: string[];
  highlights: string[];
  learning: string;
  repository?: string;
  demoUrl?: string;
  itchUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'dungenlab',
    title: 'DunGenLab',
    description:
      'Visualizador de geração procedural de masmorras: escolha o algoritmo, a seed e os parâmetros e assista ao mapa ser construído passo a passo em um canvas, com interface de menu de RPG 16 bits.',
    status: 'No ar',
    repository: 'https://github.com/Hayversong/DunGenLab',
    demoUrl: 'https://hayversong.github.io/DunGenLab/',
    technologies: ['React', 'TypeScript', 'Canvas', 'Vite', 'Vitest'],
    highlights: [
      "Drunkard's Walk, Cellular Automata e BSP animados com play, pause e passo manual",
      'Seed determinística: o mesmo mapa em qualquer navegador, com exportação em PNG e JSON',
      'Layout responsivo com abas no celular, atalhos de teclado e deploy contínuo no GitHub Pages',
    ],
    learning:
      'Aprendi a separar a lógica dos algoritmos da renderização, a animar estados no canvas sem travar a interface e a testar código determinístico.',
  },
  {
    id: 'patchnotes',
    title: 'Patchnotes',
    description:
      'Aplicação para organizar o desenvolvimento de jogos, com dashboard de métricas, devlog, assistente e perfil. O front evolui sobre uma API simulada com contratos documentados.',
    status: 'Em evolução',
    repository: 'https://github.com/Hayversong/app-patchnotes',
    technologies: [
      'Next.js',
      'TypeScript',
      'React Query',
      'Zustand',
      'Zod',
      'MSW',
    ],
    highlights: [
      'Autenticação com rotas protegidas e tratamento de sessão expirada',
      'Estados de carregamento, erro, nova tentativa e vazio em todas as telas',
      'Mock Service Worker com cenários 400, 401 e 500 reproduzíveis e testes dos contratos',
    ],
    learning:
      'Pratiquei arquitetura por módulos, cache e mutações com React Query, validação com Zod e como desenvolver o front antes do backend sem perder o contrato.',
  },
  {
    id: 'questboard',
    title: 'QuestBoard',
    description:
      'Kanban gamificado em que tarefas viram quests, conclusões geram XP e cada projeto evolui em nível e rank.',
    status: 'Concluído',
    repository: 'https://github.com/Hayversong/questboard',
    technologies: ['Go', 'SQLite', 'JavaScript', 'Docker'],
    highlights: [
      'Arquitetura separada em handlers, serviços, storage e domínio',
      'Persistência em JSON e SQLite, com ferramenta de migração',
      'Testes automatizados, healthcheck e imagem Docker',
    ],
    learning:
      'Aprofundei regras de negócio, persistência, testes e a organização de uma aplicação Go que vai além de um CRUD básico.',
  },
  {
    id: 'portfolio',
    title: 'Portfólio pessoal',
    description:
      'Portfólio responsivo criado para transformar minha evolução em uma apresentação clara, acessível e fácil de atualizar.',
    status: 'No ar',
    repository: 'https://github.com/Hayversong/site-pessoal',
    demoUrl: 'https://hayversong.vercel.app',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    highlights: [
      'Interface responsiva com identidade visual própria',
      'Projetos organizados a partir de uma fonte de dados tipada',
      'Metadados para SEO e compartilhamento em redes sociais',
    ],
    learning:
      'Pratiquei componentização, responsividade, acessibilidade e construção de uma experiência consistente.',
  },
  {
    id: 'gameshelf-api',
    title: 'GameShelf API',
    description:
      'API REST para organizar uma coleção pessoal de jogos, com CRUD, filtros, acompanhamento de progresso e resumo estatístico. Os dados são persistidos em PostgreSQL por meio do SQLAlchemy, e a evolução do banco é controlada pelo Alembic.',
    status: 'Projeto de estudo',
    repository:
      'https://github.com/Hayversong/fastcamp-LAMIA/tree/main/card-9/codigo_pessoal',
    technologies: [
      'Python 3.11+',
      'FastAPI e Pydantic',
      'PostgreSQL 16',
      'Docker Compose para o banco local',
    ],
    highlights: [
      'CRUD completo de jogos com filtros por status e plataforma',
      'Atualização de progresso e resumo estatístico da coleção',
      'Arquitetura em camadas com FastAPI, SQLAlchemy e PostgreSQL',
    ],
    learning:
      'Aprendi rotas HTTP, schemas de validação, CRUD com ORM, testes automatizados, injeção de dependências e os fundamentos de arquitetura e desenvolvimento de APIs RESTful.',
  },
  {
    id: 'dungeon-meowster',
    title: 'Dungeon Meowster',
    description: 'Uma aventura felina retrô em desenvolvimento.',
    status: 'Em evolução',
    itchUrl: 'https://hayversong.itch.io/dungeon-meowster',
    technologies: ['GameMaker', 'Aseprite'],
    highlights: [
      'Experiência roguelike com diferentes inimigos',
      'Sistema de melhorias por cartas e progressão por fases',
    ],
    learning:
      'Aprendi a desenvolver um jogo roguelike sem depender de tutoriais, mantendo um escopo pequeno, mas completo.',
  },
];

export function getProjectNumber(project: Project) {
  return String(projects.indexOf(project) + 1).padStart(2, '0');
}
