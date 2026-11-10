# Portfólio — Pedro Ricarth Gonçalves Cabral

Site pessoal feito com React, Vite e Tailwind CSS, com tema claro e escuro.
Publicado no GitHub Pages em https://pedrorgc.github.io

## Editar o conteúdo

Todo o conteúdo fica no topo de `src/App.jsx`, nos objetos `PROFILE`, `EXPERIENCE`,
`EDUCATION`, `PROJECTS` e `CERTIFICATES`.

- **Certificados:** preencha `CERTIFICATES` e a seção aparece sozinha no site.
- **Currículo em PDF:** coloque o arquivo em `public/curriculo-pedro-cabral.pdf` e preencha
  `cvUrl: "/curriculo-pedro-cabral.pdf"` em `PROFILE`. O botão "Baixar CV" só aparece com `cvUrl` preenchido.
- **Demo do SportFlow:** descomente a linha `demo` no primeiro projeto.

## Rodar no computador

```bash
npm install
npm run dev
```

## Publicação

A cada `git push` na branch `main`, o GitHub Actions (`.github/workflows/deploy.yml`) gera o
build e publica o site.

Configuração feita uma única vez: em **Settings → Pages → Build and deployment**, escolha
**Source: GitHub Actions**.
