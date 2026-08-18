# gdias.tech — Currículo Digital

Currículo digital de **Gabriel Dias**, desenvolvedor full stack. Site de página única (single-page), construído com React + Vite e estilizado com Tailwind CSS, num visual "terminal/dev" — mono para títulos e labels, sans para texto corrido, paleta escura com um verde-limão neon de destaque.

## Stack

- **[React 19](https://react.dev)** — biblioteca de UI
- **[Vite 8](https://vite.dev)** — build tool e dev server
- **[Tailwind CSS 4](https://tailwindcss.com)** — estilização utilitária (via `@tailwindcss/vite`, config CSS-first em `src/index.css`)
- **[Inter](https://fonts.google.com/specimen/Inter)** (400/600) e **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** (500/700) via Google Fonts
- **Oxlint** — lint

Sem dependências extras de UI/animação — carrossel, acordeão e scroll suave são implementados na mão sobre CSS/DOM nativos.

## Como rodar

```bash
npm install
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # oxlint
```

## Estrutura

```
src/
├── App.jsx                  # monta as seções na ordem final
├── index.css                # fontes, paleta (@theme), reset global
└── components/
    ├── Navbar.jsx            # nav sticky, menu mobile, scroll suave até cada seção
    ├── Hero.jsx               # headline, disponibilidade, bio, localização
    ├── Stack.jsx              # tecnologias em acordeão, 2 colunas fixas no desktop
    ├── Experience.jsx         # carrossel infinito (fotos + experiências), autoplay, bolinhas
    ├── CTA.jsx                # "Vamos iniciar?" + botão de e-mail
    ├── Footer.jsx              # redes sociais + status online
    ├── Divider.jsx             # linha divisória fina entre seções
    └── BackToTop.jsx           # botão flutuante de voltar ao topo
```

## Paleta

Definida em `src/index.css`, dentro do bloco `@theme` (gera classes Tailwind como `bg-primary`, `text-border` etc.):

| Token                 | Valor                                | Uso                          |
| --------------------- | ------------------------------------ | ---------------------------- |
| `primary`             | `oklch(0.925 0.235 122)` (`#C8FF3D`) | destaque, CTAs, links ativos |
| `secondary` / `muted` | `oklch(0.23 0 0)` (`#2A2A2A`)        | chips, blocos de apoio       |
| `background`          | `oklch(0.145 0 0)` (`#181818`)       | fundo geral                  |
| `card`                | `oklch(0.178 0 0)` (`#1E1E1E`)       | cards                        |
| `border`              | `oklch(0.269 0 0)` (`#333`)          | bordas                       |
| `tertiary`            | `oklch(0.63 0.24 27)` (`#E0402A`)    | vermelho de apoio/destrutivo |

## Pendências / customização

- **Fotos do carrossel** (`public/experiences/`): já com as 6 imagens reais.
- **Experiências** (`Experience.jsx`, array `EXPERIENCES`): dados reais preenchidos — editar aqui em mudanças de carreira.
- **E-mail de contato** (`CTA.jsx`): `mailto:contatogbd@gmail.com` — trocar se preferir outro endereço público.
- **Redes sociais** (`Footer.jsx`, array `SOCIALS`): GitHub, LinkedIn e Instagram.
- Seções `Projetos` (já linkada na navbar) ainda não foi construída.
