# Design: migração do portfólio para blog em Hugo

**Data:** 2026-08-19
**Status:** aprovado, aguardando plano de implementação
**Repositório:** heltonteixeira92/heltonteixeira92.github.io
**Domínio:** https://www.heltonteixeira.dev

## Contexto

O site é hoje uma SPA em React 18 + Vite, derivada de um template de tutorial
do YouTube. Tem quatro seções (Hero, About, Experience, Contact), deploy manual
via `gh-pages -d dist`, e conteúdo de portfólio em JSON.

O objetivo é transformá-lo num blog pessoal com identidade própria, onde o autor
escreve sobre desenvolvimento backend e sobre viagens de moto. O blog passa a ser
a página principal; o portfólio vira uma página secundária.

### Propósito

Um cantinho pessoal na internet. O autor escreve primeiro para si mesmo, não para
recrutadores nem para uma audiência a ser otimizada. Essa decisão orienta todo o
resto do design: sem analytics, sem newsletter, sem SEO agressivo, sem "Hire me".

### Critérios de sucesso

1. Publicar um post custa: escrever markdown, `git push`. Nada mais.
2. O site não parece um template.
3. Daqui a três anos o projeto ainda builda sem arqueologia de dependências.
4. Posts de código e de estrada convivem sem que o site pareça dividido.

## Decisões

| Decisão | Escolha | Motivo |
|---|---|---|
| Gerador | Hugo | Zero dependências, binário único, longevidade. Templating próximo do Django, que o autor já conhece. |
| Idioma | Português (pt-BR) | O autor escreve na língua em que pensa. |
| Organização | Feed único cronológico com filtro | A mistura de assuntos é a identidade do site, não um problema a resolver. |
| Escrita | Markdown no repo + git push | Sem CMS, sem serviço externo. Permite postar do celular via github.com. |
| Estética | Editorial com sotaque monoespaçado | Confortável em texto longo; identidade técnica nas bordas, não no miolo. |
| Tema | Escrito do zero | Tema pronto é template — exatamente o que se quer evitar. |
| Deploy | GitHub Actions → GitHub Pages | Elimina o passo manual de publicação. |
| Código legado | Removido | Histórico do git preserva tudo. |

### Alternativas descartadas

**Astro.** Superior para iterar em layout (componentes com props) e valida
frontmatter por schema. Descartado em favor de Hugo pelo custo de manutenção de
longo prazo: `node_modules` num projeto que fica meses em hibernação é passivo.
A perda de validação de frontmatter é aceita conscientemente (ver Riscos).

**React + Vite com blog acoplado.** Exigiria construir à mão o que os dois
geradores entregam prontos (RSS, sitemap, highlight, imagens responsivas), além
do hack de `404.html` para deep-links em SPA no GitHub Pages.

**Eleventy.** Mesmos benefícios do Hugo sem a vantagem do binário único.

## Arquitetura de conteúdo

```
content/
├── _index.md                        # texto de abertura da home
├── sobre.md                         # página /sobre
└── posts/
    ├── fila-com-redis.md            # post só de texto
    └── serra-do-rio-do-rastro/      # page bundle: post com fotos
        ├── index.md
        ├── curva-01.jpg
        └── mirante.jpg
```

Posts com fotos usam **page bundles**: as imagens moram na pasta do post. Não há
diretório global de mídia, não é preciso inventar nomes únicos, e apagar o post
apaga as fotos junto.

### Frontmatter

```yaml
---
title: "Serra do Rio do Rastro em dois dias"
date: 2026-08-19
categoria: estrada          # obrigatório: 'codigo' ou 'estrada'
tags: ["santa-catarina", "solo"]
resumo: "Saí de Sampa achando que o frio era o problema."
draft: true
---
```

Dois eixos de classificação, com papéis distintos:

- **`categoria`** — fechada em dois valores. Alimenta o filtro da home. Sendo
  fechada, o filtro nunca cresce nem desarruma.
- **`tags`** — livre e opcional. Aparecem no rodapé do post; o Hugo gera
  `/tags/<tag>/` automaticamente.

### Filtro sem JavaScript

O filtro `tudo · ~/codigo · ~/estrada` são três links para páginas que o Hugo já
gera, não filtragem client-side:

- `/` — todos os posts
- `/categorias/codigo/`
- `/categorias/estrada/`

Ganhos: funciona sem JS, cada filtro tem URL compartilhável, o botão voltar
funciona, e cada visão é indexável. Custo: um recarregamento de página, que num
site estático é imperceptível.

### Dados de portfólio

`src/data/history.json` migra para `data/experiencias.yaml`, com o conteúdo
intacto. YAML por ser mais confortável de editar à mão (sem vírgula sobrando,
aceita comentários).

**Pendência de conteúdo:** a entrada da Magalu Cloud está com `experiences: []`
vazio. É o emprego atual e o mais relevante. O campo fica pronto no design; o
texto só o autor pode escrever.

## Design visual

### Tipografia

Duas fontes, **self-hosted** (sem CDN de terceiros: mais rápido, sem rastreio, e
imune a CDN fora do ar).

- **Corpo:** **Source Serif 4** (alternativa equivalente: Literata). Escolha
  deliberada: o site terá textos longos, e serifada é mais confortável em leitura
  prolongada.
- **Acentos:** **JetBrains Mono** (alternativa: IBM Plex Mono). Usada em datas,
  tags, navegação, marcadores de categoria e blocos de código. **Nunca** em texto
  corrido.

Essa divisão é a identidade: técnica nas bordas, confortável no miolo. O oposto
do terminal-em-tudo, que cansa em leitura longa.

### Marcador de categoria

Categorias são marcadas por um path em monoespaçada — `~/codigo` e `~/estrada` —
em vez de cores de card ou ícones. Discreto, inequívoco, e resolve visualmente o
feed misturado sem transformar o site num terminal.

### Cor

- Fundo off-white quente; texto quase-preto. Nem branco nem preto puros.
- Uma única cor de acento, para links e estado ativo. O tom exato é definido na
  implementação, sob duas restrições: contraste mínimo AA (4.5:1) sobre o fundo
  em **ambos** os modos, e nenhuma relação com o azul `#576cbc` atual, que veio
  do template.
- Modo escuro via `prefers-color-scheme`, seguindo o sistema. **Sem botão de
  alternar** — é JavaScript e estado desnecessários; adicionável depois.
- Sem gradiente, sombra ou blur. Os `topBlur`/`bottomBlur` do Hero atual são
  exemplo do que data um site.

### Layout da home

```
┌──────────────────────────────────────────────┐
│  helton teixeira            sobre    rss     │  mono, pequeno
│                                              │
│  Escrevo sobre backend, e sobre o que        │  serif
│  vejo quando desligo o computador e ando     │
│  de moto.                                    │
│  ────────────────────────────────────────    │
│  tudo · ~/codigo · ~/estrada                 │  mono, links
│  ────────────────────────────────────────    │
│  2026-08-19            ~/estrada             │  mono
│  Serra do Rio do Rastro em dois dias         │  serif, grande
│  Saí de Sampa achando que o frio era o       │
│  problema.                                   │
└──────────────────────────────────────────────┘
```

- **Sem miniaturas na listagem**, inclusive nos posts de estrada. Thumbnail
  quebra o ritmo vertical, obriga toda publicação a ter uma imagem boa, e rebaixa
  o título. As fotos aparecem generosamente dentro do post.
- Sem foto de perfil na home; ela vai para `/sobre`.
- Coluna única, ~65 caracteres de largura de leitura, sem sidebar.

### Estrutura do tema

Tema próprio, CSS puro com custom properties. Sem Tailwind, sem Sass, sem etapa
de build de CSS — o que dispensa a versão *extended* do Hugo.

```
layouts/
├── index.html            # home: feed com filtro
├── _default/
│   ├── baseof.html
│   ├── single.html       # post
│   ├── list.html         # índice de uma taxonomia (ex: /tags/)
│   └── term.html         # posts de um termo (ex: /categorias/estrada/)
├── partials/
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── post-item.html
└── shortcodes/
    └── foto.html         # imagem otimizada com legenda
assets/css/main.css
static/CNAME
```

## Deploy

### Estado atual verificado

- DNS correto: apex → 185.199.108.153; `www` → CNAME para
  `heltonteixeira92.github.io`.
- Site no ar: `www` responde 200, apex redireciona 301 para `www`.
- Custom domain configurado nas Settings do repositório.
- **`CNAME` ausente do branch publicado.** O arquivo está na raiz do projeto, mas
  o Vite só copia para `dist/` o que está em `public/`. Risco de reset do custom
  domain; não é um estrago em curso, já que a configuração persiste nas Settings.
- `dist/` está commitado no repositório apesar de constar no `.gitignore` — foi
  adicionado antes da regra.

### Alvo

Workflow em `.github/workflows/deploy.yml`, disparado a cada push em `master`:

1. Checkout
2. Instala Hugo em **versão fixada explicitamente** (não `latest`, para que um
   release novo nunca quebre o site sem intenção)
3. Restaura cache de `resources/_gen`
4. `hugo --minify`
5. `actions/upload-pages-artifact` → `actions/deploy-pages@v4`

**Passo manual obrigatório:** em Settings → Pages, trocar o source de "Deploy
from a branch" para "GitHub Actions". Não é automatizável por código.

### Cache de imagens processadas

O Hugo processa fotos durante o build. Sem cache, reprocessa todas as imagens a
cada push, inclusive em correções de texto.

A documentação do Hugo sugere commitar `resources/`. **Rejeitado:** dobraria o
peso das imagens no repositório. Usa-se `actions/cache` sobre `resources/_gen`,
que dá o mesmo ganho sem sujar o repo.

### Configuração

- `baseURL = "https://www.heltonteixeira.dev/"`
- `CNAME` movido para `static/CNAME` (o Hugo copia `static/` para a raiz)
- `refLinksErrorLevel = "ERROR"`
- RSS em `/index.xml` — gerado nativamente, sem configuração

### Limpeza do repositório

Removidos: `src/`, `old/`, `dist/`, `react-portfolio/`, `node_modules/`,
`package.json`, `package-lock.json`, `vite.config.js`, `index.html`,
`.eslintrc.cjs`, e o README de template. O histórico do git preserva tudo.

Os assets em `assets/history/` (logos de empresa) e `assets/hero/Profile.jpeg`
são preservados — são conteúdo real, não template. Destino: os logos vão para
`assets/experiencias/` (processáveis por Hugo Pipes, referenciados pelo
`experiencias.yaml`); a foto de perfil vira parte do page bundle de `/sobre`.
Os ícones PNG de skills e os ícones decorativos de `assets/about/` são
descartados junto com o template.

O branch `gh-pages` fica órfão. **Não é apagado durante a migração**; só depois
que o site novo estiver confirmado no ar. É a rede de segurança até lá.

## Fluxo de trabalho do autor

### Publicar um post

```
hugo new posts/nome-do-post.md    # cria com frontmatter e draft: true
# escrever
hugo server -D                    # preview local com rascunhos
# trocar draft para false
git add . && git commit && git push
```

### Publicar fotos de viagem

```
hugo new posts/nome-da-viagem/index.md
scripts/foto.sh ~/fotos/viagem/*.jpg content/posts/nome-da-viagem/
```

`scripts/foto.sh` redimensiona para no máximo 2000px de largura, qualidade 82,
antes das fotos entrarem no repositório. Reduz ~4MB para ~400KB por foto, com
perda visual imperceptível em tela. Depende de ImageMagick
(`sudo apt install imagemagick`), ausente na máquina atual.

A disciplina precisa estar **na porta de entrada**: git nunca esquece, e uma foto
grande commitada por engano permanece no histórico para sempre.

## Verificação

Site estático não comporta suíte de testes unitários. O que efetivamente protege:

- **`hugo server -D`** — preview local antes de qualquer push. Principal controle
  de qualidade.
- **`draft: true`** — rascunhos aparecem no servidor local e não vão ao ar.
  Permite commitar texto pela metade sem risco.
- **`refLinksErrorLevel = "ERROR"`** — link interno quebrado derruba o build no
  CI, e o site no ar permanece intacto. Vale apenas para links escritos com os
  shortcodes `ref`/`relref`; links markdown crus não são verificados. O archetype
  e a documentação do repo orientam a usar `ref` entre posts.
- **Checagem pós-deploy** — confirmar o custom domain respondendo, uma vez na
  migração.

## Riscos e limitações aceitas

**Frontmatter não é validado.** O Hugo não tem schema de conteúdo. `categoria:
codgio` faz o post sumir do filtro silenciosamente. O archetype mitiga ao
pré-preencher, mas não substitui validação. É o preço da simplicidade escolhida,
aceito conscientemente.

**Lookup de templates do Hugo.** Fora do caminho feliz, a ordem de resolução de
templates é confusa e as mensagens de erro são ruins. É onde o tempo de
aprendizado será gasto.

**Iterar em layout é mais lento** do que seria com componentes React/Astro.
Mitigado por manter o tema pequeno e o CSS num arquivo só.

**Peso do repositório ao longo do tempo.** Fotos são o único vetor de crescimento
descontrolado. Mitigado por `scripts/foto.sh` na entrada.

## Fora de escopo (deliberadamente)

Nenhum destes entra agora; todos são adicionáveis depois:

- **Comentários** — obrigam a moderar, e moderação mata cantinho pessoal
- **Analytics** — o autor não escreve para métrica
- **Busca** — inútil abaixo de ~30 posts
- **Newsletter** — cria compromisso com desconhecidos
- **Mapa interativo de rota** — JavaScript e API externa num site que acabou de
  ganhar zero dependências. Reavaliar depois de algumas viagens publicadas
- **Paginação** — desnecessária até ~40 posts

O princípio: o projeto só carrega peso que já se sentiu falta.
