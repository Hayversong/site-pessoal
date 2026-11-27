# Sistema de design

Referência visual do portfólio. Antes de mudar cores, fontes, espaçamento ou animações, confira aqui.

## Contexto

- **O que é:** portfólio pessoal de um desenvolvedor fullstack com foco em frontend (React, TypeScript, Go, Python) que também cria jogos.
- **Para quem:** recrutadores, colegas e quem chega pelos links do GitHub e do itch.io.
- **Tipo:** site estático: a página inicial e um diário por projeto em `/missoes/[id]`.

## Direção

- **Tema:** RPG retrô de 16 bits. A interface lembra os menus de um JRPG: janelas com borda dupla, cursor ▶, ficha de personagem, registro de missões e inventário.
- **Sem neon:** nada de brilho, glow ou gradiente saturado. A profundidade vem de sombras sólidas deslocadas e bordas, como em pixel art.
- **Decoração:** intencional. Textura leve de dithering no fundo, bordas pixeladas, ícones simples.
- **Regra de ouro:** o conteúdo real (projetos, código, aprendizados) vem primeiro. O vocabulário de RPG enfeita, não substitui a informação.

## Tipografia

| Papel          | Fonte                                      | Uso                                                                                        |
| -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Títulos e nome | Pixelify Sans (`font-pixel`, `.rpg-title`) | h1, h2, h3                                                                                 |
| HUD            | Silkscreen (`font-hud`, `.rpg-kicker`)     | rótulos, menu, botões, status. Sempre em caixa alta e em tamanhos pequenos (0.65 a 0.8rem) |
| Texto corrido  | Geist (`font-sans`)                        | parágrafos e descrições                                                                    |
| Tags e código  | Geist Mono (`font-mono`)                   | tecnologias, e-mail                                                                        |

Silkscreen só tem letras maiúsculas legíveis em tamanho pequeno. Nunca use em texto corrido.

## Cores

Paleta Brasa, definida como tokens em `app/globals.css`. Use sempre os tokens, nunca cores fixas.

| Token              | Escuro (masmorra)                               | Claro (pergaminho)      | Uso                                 |
| ------------------ | ----------------------------------------------- | ----------------------- | ----------------------------------- |
| `--background`     | grafite quente                                  | pergaminho              | fundo                               |
| `--card`           | grafite um pouco mais claro                     | pergaminho claro        | janelas                             |
| `--primary`        | laranja-chama                                   | laranja queimado        | destaque, botão principal, cursor ▶ |
| `--ember` / `--hp` | coral                                           | coral escuro            | segundo acento, barra de HP         |
| `--mp`             | azul acinzentado                                | azul acinzentado escuro | barra de MP                         |
| `--xp`             | ouro fosco                                      | ouro escuro             | barra de XP, nível                  |
| `--success`        | verde                                           | verde escuro            | estado concluído/ativo              |
| `--panel-border`   | borda das janelas                               |                         |                                     |
| `--panel-inner`    | linha interna da borda dupla e fundo das barras |                         |                                     |
| `--shadow-hard`    | sombra sólida deslocada                         |                         |                                     |

## Componentes base (`app/styles/rpg.css`)

- `.pixel-panel`: janela com borda dupla e sombra sólida de 6px.
- `.pixel-dialog`: caixa de diálogo (borda tripla).
- `.pixel-btn`: botão com "altura". Sobe 2px no hover e afunda 4px no clique, com a sombra sólida acompanhando. Use `data-variant="ghost"` para a versão secundária.
- `.rpg-cursor`: mostra ▶ à esquerda no hover, no foco, em `aria-current="location"` e em `aria-pressed="true"`.
- `.stat-bar`: barra segmentada. Controle com `--value` (0 a 1) e `--bar-color`. Dentro de um `ScrollReveal`, enche quando aparece.
- `.rpg-kicker` e `.rpg-title`: rótulo e título de seção.
- `.bg-dither`: textura de fundo.

Efeitos de jogo ficam em `lib/retro-fx.ts` e `app/styles/retro-fx.css`:

- **Brasinha** (`brasinha-sprite.tsx`): mascote em pixel art 16x16 que anda sobre a barra de XP conforme a rolagem.
- **Transição de batalha:** blocos fecham e abrem a tela nos links internos (`warp`).
- **Faíscas** ao clicar em `.pixel-btn` (`burst`) e **texto flutuante** de item obtido (`popText`).
- **LEVEL UP!** ao chegar ao fim da página.
- **Troca de tema** com fade de paleta em degraus (`html[data-transition='theme']`).
- **Modo CRT:** ↑↑↓↓←→←→BA liga linhas de varredura estáticas.

Cada seção tem o próprio CSS em `app/styles/<seção>.css`.

## Diário da missão (`app/missoes/[id]`, `app/styles/mission.css`)

- Uma página por projeto, gerada no build a partir de `data/projects.ts` e `data/case-studies.ts`.
- Seções: Briefing, Registro visual, Objetivos concluídos, Estratégia (decisões técnicas), Armadilhas (o que deu trabalho) e Próximas fases. Seção sem conteúdo não aparece.
- Imagens ficam em `public/media/missoes/<id>/`, nunca em `public/missoes/`, para não colidir com a rota.
- GIFs começam parados no último quadro e só animam quando a pessoa clica em "Ver animação".
- Links entre páginas usam `<a>` comum: o `Link` do vinext quebra a navegação no build estático. A transição de batalha fecha a tela antes de trocar de página e abre de novo na chegada.

## Forma e espaçamento

- **Cantos:** retos (`border-radius: 0`) em janelas e botões. Nada de pílulas.
- **Borda:** `--pixel` (3px).
- **Espaçamento:** base de 4px; seções com `py-24 sm:py-32`; largura máxima de 70rem (`.section-shell`).

## Movimento

- **Curvas:** `--ease-out` para micro-interações e `--ease-out-expo` para deslocamentos maiores.
- **Durações:** 90ms (clique), 200–260ms (hover), 400–550ms (indicadores), 800–1200ms (entradas e barras).
- **Toque de jogo:** botões que afundam, cursor ▶ balançando, barras enchendo, texto de diálogo digitado.
- **Nada de animação CSS infinita.** O Firefox redesenha a tela a cada quadro enquanto ela roda, mesmo com a página parada (o site chegou a 28% de CPU parado). O que se repete usa o relógio retrô de 8 quadros por segundo: `html[data-beat]` alterna a cada 500ms para piscadas e cursores, e `onRetroFrame` troca os quadros de sprites.
- **Hover só com mouse:** efeitos de `:hover` ficam dentro de `@media (hover: hover)`, para não ficarem presos no toque.
- **Acessibilidade:** tudo é desligado com `prefers-reduced-motion: reduce`, e o conteúdo nunca depende da animação para aparecer.

## Registro de decisões

| Data       | Decisão                                                 | Motivo                                                                            |
| ---------- | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 2026-11-14 | Tema RPG retrô 16-bit sem neon, mantendo a paleta Brasa | Dar identidade própria ao portfólio, ligada ao lado de desenvolvimento de jogos   |
| 2026-11-18 | Relógio retrô de 8 fps no lugar de animações infinitas  | CPU com a página parada no Firefox caiu de ~25% para ~3,5%                        |
| 2026-11-27 | Diário por projeto em `/missoes/[id]`                   | Mostrar decisões e problemas reais de cada projeto, não só a lista de tecnologias |
