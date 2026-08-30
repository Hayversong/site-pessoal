export type Project = {
  title: string;
  description: string;
  status: string;
  technologies: string[];
  repository?: string;
};

export const projects: Project[] = [
  {
    title: "Portfólio pessoal",
    description:
      "Meu espaço para praticar desenvolvimento web, organizar projetos e registrar minha evolução em programação.",
    status: "Em desenvolvimento",
    repository: "https://github.com/Hayversong/site-pessoal",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "QuestBoard",
    description:
      "Kanban gamificado para acompanhar o desenvolvimento de jogos, construido do zero com Go.",
    status: "Finalizado.",
    repository: "https://github.com/Hayversong/questboard",
    technologies: ["HTML", "CSS", "go", "docker"],
  },
  {
    title: "To-Do App — Meu primeiro projeto web com Go",
    description:
      "Uma aplicação web simples de lista de tarefas desenvolvida em Go durante meus estudos da linguagem.",
    status: "Finalizado.",
    repository: "https://github.com/Hayversong/todo-app-go",
    technologies: ["HTML", "CSS", "go"],
  },
];
