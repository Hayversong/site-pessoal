export type Project = {
  title: string;
  description: string;
  status: string;
  technologies: string[];
  highlights: string[];
  learning: string;
  repository?: string;
};

export const projects: Project[] = [
  {
    title: 'Portfólio pessoal',
    description:
      'Portfólio responsivo criado para transformar minha evolução em uma apresentação clara, acessível e fácil de atualizar.',
    status: 'Em evolução',
    repository: 'https://github.com/Hayversong/site-pessoal',
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
    title: 'To-Do App — Meu primeiro projeto web com Go',
    description:
      'Minha primeira aplicação web em Go: uma lista de tarefas simples, construída sem frameworks para entender cada etapa do fluxo HTTP.',
    status: 'Projeto de estudo',
    repository: 'https://github.com/Hayversong/todo-app-go',
    technologies: ['Go', 'HTML', 'CSS', 'JSON'],
    highlights: [
      'Criação, conclusão e exclusão de tarefas',
      'Servidor com net/http e renderização com html/template',
      'Fluxo POST → Redirect → GET para evitar reenvios',
    ],
    learning:
      'Aprendi rotas HTTP, formulários, structs, slices, templates e os fundamentos de integração entre backend e frontend.',
  },
  {
    title: 'GameShelf API',
    description: 'API REST para organizar uma coleção pessoal de jogos, com CRUD, filtros, acompanhamento de progresso e resumo estatístico. Os dados são persistidos em PostgreSQL por meio do SQLAlchemy, e a evolução do banco é controlada pelo Alembic.',
    status: 'Projeto de estudo',
    repository: 'https://github.com/Hayversong/fastcamp-LAMIA/tree/main/card-9/codigo_pessoal',
    technologies: ['Python 3.11+', 'FastAPI e Pydantic', 'PostgreSQL 16', 'Docker Compose para o banco local'],
    highlights: [
      'Criação, conclusão e exclusão de tarefas',
      'Servidor com net/http e renderização com html/template',
      'Controller (HTTP) → Service (regras de negócio) → Repository (consultas e persistência) → Model SQLAlchemy ↔ PostgreSQL',
    ],
    learning:
      'Aprendi rotas HTTP, schemas de validação, CRUD com ORM, testes automatizados, injeção de dependências e os fundamentos de arquitetura e desenvolvimento de APIs RESTful.'
  }
];
