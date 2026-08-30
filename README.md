# Portfólio pessoal

Portfólio de Hayverson para apresentar projetos, decisões técnicas e aprendizados em Go e desenvolvimento web.

## Tecnologias

- React e TypeScript
- Vinext e Vite
- Tailwind CSS
- Sites e Cloudflare Workers

## Desenvolvimento local

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

O site fica disponível em `http://localhost:3000`.

## Manutenção

Os projetos exibidos no portfólio ficam em `data/projects.ts`. Cada registro contém descrição, tecnologias, evidências técnicas, aprendizado e link para o repositório.

Antes de publicar uma alteração, execute:

```bash
npm run format
npm run lint
npm run build
```

## Estrutura principal

```text
app/                    página, layout e estilos globais
components/portfolio/   componentes específicos do portfólio
components/ui/          componentes de interface reutilizados
data/                   conteúdo estruturado dos projetos
public/                 imagens e arquivos públicos
```
