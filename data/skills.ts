import { projects } from '@/data/projects';

export type StudyTopic = {
  name: string;
  description: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
};

export const studyTopics: StudyTopic[] = [
  {
    name: 'React e Next.js',
    description:
      'Aprofundando componentização, gerenciamento de estado, renderização no servidor e interfaces acessíveis.',
  },
  {
    name: 'Testes de interface',
    description:
      'Testando componentes, contratos de API simulada e fluxos de usuário para entregar com segurança.',
  },
  {
    name: 'SQL',
    description:
      'Praticando modelagem de dados, consultas e integração com aplicações back-end.',
  },
  {
    name: 'Python',
    description:
      'Desenvolvendo APIs e consolidando fundamentos da linguagem com projetos práticos.',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: 'Front-end',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'React Query',
      'Zustand',
      'Zod',
      'Vitest',
    ],
  },
  {
    name: 'Back-end',
    skills: ['Go', 'Python', 'FastAPI', 'APIs REST'],
  },
  {
    name: 'Dados',
    skills: ['SQL', 'PostgreSQL', 'SQLite', 'SQLAlchemy'],
  },
  {
    name: 'Ferramentas',
    skills: ['Git', 'GitHub', 'Docker', 'Docker Compose'],
  },
];

// Compara nomes ignorando caixa, espaços e pontuação ("Tailwind CSS" = "tailwindcss").
function normalize(name: string) {
  return name.toLowerCase().replaceAll(/[^a-z0-9+#]/g, '');
}

export const totalProjects = projects.length;

// Quantos projetos de data/projects.ts listam a tecnologia.
export function countProjectsUsing(skill: string) {
  const target = normalize(skill);
  return projects.filter((project) =>
    project.technologies.some((tech) => normalize(tech) === target),
  ).length;
}
