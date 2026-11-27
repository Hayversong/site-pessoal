import { ScrollProgress } from '@/components/portfolio/scroll-progress';
import { ThemeToggle } from '@/components/portfolio/theme-toggle';

// Menu de pausa reduzido das páginas de missão: voltar ao registro e trocar o tema.
export function MissionHeader() {
  return (
    <>
      <ScrollProgress />
      <header className="pause-header">
        <nav aria-label="Navegação" className="pause-menu">
          <a href="/" className="pause-link rpg-cursor">
            Início
          </a>
          <a href="/#projetos" className="pause-link rpg-cursor">
            Missões
          </a>
          <span aria-hidden="true" className="pause-divider" />
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
