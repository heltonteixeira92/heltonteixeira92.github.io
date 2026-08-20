# heltonteixeira.dev

Blog pessoal sobre desenvolvimento backend e viagens de moto.
Site estático em [Hugo](https://gohugo.io), publicado no GitHub Pages.

## Requisitos

**Hugo extended, versão 0.165.0.** A edição *extended* não é opcional:
a conversão das fotos para WebP só existe nela.

```bash
curl -sSLO https://github.com/gohugoio/hugo/releases/download/v0.165.0/hugo_extended_0.165.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.165.0_linux-amd64.deb
hugo version    # precisa dizer "extended"
```

Para publicar fotos, o script usa Pillow (Python) — já vem com o Python do
sistema, nada para instalar.

## Escrever um post

```bash
hugo new content posts/nome-do-post.md
```

Nasce com `draft: true` e a categoria pré-preenchida. Escreva, e quando estiver
pronto troque para `draft: false`.

```bash
hugo server -D      # http://localhost:1313 — inclui rascunhos, recarrega sozinho
```

Rascunho aparece aqui e **não** vai para o ar. Dá para commitar texto pela metade
sem risco.

## Frontmatter

```yaml
---
title: "Título do post"
date: 2026-08-19
categorias: ["codigo"]      # "codigo", "fora", ou os dois
tags: ["redis", "filas"]    # livre, opcional
resumo: "Uma linha que aparece na listagem."
draft: true
---
```

`categorias` alimenta o filtro da home e aceita dois valores possíveis:
`codigo` e `fora`. `fora` é tudo longe do computador — moto, camping, avião,
carro.

Normalmente você usa um. Use os dois quando o post for genuinamente os dois
assuntos — uma viagem de moto até um evento de tecnologia, por exemplo. Ele
aparece nas duas visões filtradas e uma vez só na home.

O Hugo não valida isso: se você escrever `codgio`, o post some do filtro em
silêncio. Use sempre o `hugo new`, que já preenche certo.

## Post com fotos

Post com foto vira uma pasta, com as imagens junto do texto:

```bash
hugo new content posts/nome-da-viagem/index.md
scripts/foto.sh ~/fotos/viagem/*.jpg content/posts/nome-da-viagem/
```

O script reduz para no máximo 2000px, qualidade 82, e **remove os metadados EXIF
— incluindo as coordenadas de GPS**. Rode sempre antes de commitar: git nunca
esquece, e uma foto de 8 MB fica no histórico para sempre.

No texto:

```markdown
{{< foto src="curva-01.jpg" legenda="A subida, já dentro da neblina." >}}
```

A legenda também vira o texto alternativo. `src` errado derruba o build em vez de
publicar imagem quebrada.

## Publicar

```bash
git add . && git commit -m "post: título" && git push
```

O GitHub Actions constrói e publica em cerca de 40 segundos. Não existe passo
manual de deploy.

Dá para escrever pelo `github.com` direto do celular — útil na estrada.

## Como o site é organizado

| Caminho | O que é |
|---|---|
| `content/posts/` | Os posts |
| `content/sobre/` | A página /sobre |
| `content/_index.md` | Texto de abertura da home |
| `data/experiencias.yaml` | Histórico profissional |
| `layouts/` | O tema (escrito à mão, sem tema de terceiros) |
| `assets/css/main.css` | Todo o CSS |
| `static/fonts/` | Fontes self-hosted |
| `scripts/foto.sh` | Redimensiona fotos antes do commit |

O site não tem JavaScript. O filtro de categorias são links para páginas que o
Hugo gera. O modo escuro segue o sistema operacional, via `prefers-color-scheme`.

## Design

O design e as decisões estão em `docs/superpowers/specs/`, e o plano de
implementação em `docs/superpowers/plans/`.
