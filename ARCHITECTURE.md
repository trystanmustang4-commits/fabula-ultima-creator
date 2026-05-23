# Architecture — Fabula Ultima Creator

## Overview

Electron desktop app (Windows). Renderer is pure HTML/CSS/JS — no framework, no bundler. All logic runs in two global IIFE objects (`App` and `GeradorPJ`) plus helper globals (`Matcher`, `ARQUETIPOS`, `GAMEDATA`, etc.).

```
┌────────────────────────────────────────────┐
│  main.js  (Node.js / Electron main process) │
│  - BrowserWindow, IPC handlers              │
│  - PDF export via pdf-lib                   │
│  - File save/load dialogs                   │
└──────────────────────┬─────────────────────┘
                       │ contextBridge (IPC)
                       │ window.electronAPI.*
┌──────────────────────▼─────────────────────┐
│  renderer/index.html  (Chromium renderer)   │
│  - #tela-inicio  #tela-wizard               │
│  - #tela-ficha   #tela-gerador-pj           │
│                                             │
│  app.js      → App + Estado (wizard/ficha)  │
│  gerador-pj.js → GeradorPJ (IIFE)           │
│  matcher/    → Matcher (fuzzy search)       │
│  data/       → GAMEDATA, ARQUETIPOS, KB     │
└────────────────────────────────────────────┘
```

## State management

### Wizard / Ficha (app.js)

Single source of truth: **`Estado.personagem`** — a plain JS object mutated in-place. No reactive framework. Cycle:

```
DOM event → App.method() → mutate Estado.personagem → re-render section
```

`Estado.passoAtual` (0–7) drives which wizard step is shown. `App.renderizarPasso()` re-renders the entire active step. Most methods only re-render the section they touch.

### Gerador de PJ (gerador-pj.js)

Internal state: **`_estado`** (private to the IIFE). 5-view state machine:

```
modo ──► aleatorio ──► resultado ──► [carregarNoWizard] ──► wizard
     └──► inspirado ──► resultado
     └──► navegacao ──► resultado
```

`_navegarPara(view)` switches views by rebuilding `gpj-conteudo` innerHTML. No persistent state between navigation — all data lives in `_estado.*`.

## Data flow: character generation

```
User input (query / archetype choice)
    │
    ▼
Matcher.buscar(query)
    │
    ├─► Level 1: exact alias match in KB (730 entries)
    ├─► Level 2: Fuse.js fuzzy on nome+aliases
    ├─► Level 3: Fuse.js fuzzy on archetype names
    └─► Level 4: sem_match → manual modal
    │
    ▼
GeradorPJ._arquetipoParaPersonagem(arq, nivel, overrides)
    │  Uses arq.progressao[nivel] → classes + poderes
    │  Generates random: origem, lacos, nome (_rndNome)
    │
    ▼
_estado.pjGerado = { personagem, arquetipo, fonte, referencia }
    │
    ▼
_navegarPara('resultado') → _htmlViewResultado()
    │
    ▼
GeradorPJ.carregarNoWizard()
    │  Estado.personagem = JSON.parse(JSON.stringify(p))
    │  App.mostrarTela('wizard')
    │  App.renderizarPasso()
    │
    ▼
Normal wizard flow (user edits, saves, exports PDF)
```

## Matcher cascade (matcher/matcher.js)

```
matcher.js ──── fuzzy.js (Fuse.js wrapper)
           └─── fallbacks.js (modal + badge types)
```

Fuse.js 7.x doesn't ship a browser UMD build. A wrapper is generated at `renderer/lib/fuse-browser.js` (wraps `fuse.min.cjs` in an IIFE that sets `window.Fuse`).

Score thresholds: ≥0.90 = "Match quase exato", ≥0.75 = "Bom match", else = "Match aproximado".

## Data files

| File | Global | Contents |
|------|--------|----------|
| `data/gamedata.js` | `GAMEDATA` | Classes (15), armas, armaduras, escudos, temas, emoções, perfis de atributo |
| `data/archetypes.js` | `ARQUETIPOS` | 33 arquétipos com progressão por nível (5/10/15/20) |
| `data/character-kb.js` | `CHARACTER_KB` | Ponto de entrada; concatena todos os sub-arrays em `window.CHARACTER_KB` |
| `data/character-kb/*.js` | array constants | Entradas por franquia; cada arquivo exporta um array constant |
| `data/nomes-sugeridos.js` | `NOMES_SUGERIDOS`, `ARQUETIPO_CATEGORIA` | 30 nomes + 30 sobrenomes por categoria; mapa arquétipo→categoria |
| `lib/fuse-browser.js` | `Fuse` | Fuse.js 7.x build browser-compatível |

## KB entry schema

```js
{
  id:             string,           // '{franchise}-{slug}'
  nome:           string,           // nome canônico (PT ou original)
  aliases:        string[],         // termos de busca normalizados (lowercase)
  arquetipo:      string,           // um dos 33 IDs de ARQUETIPOS
  source: {
    franchise:    string,           // ex: 'Marvel', 'Final Fantasy'
    work:         string,           // ex: 'Final Fantasy VII (1997)'
    category:     string,           // 'video-game' | 'anime-manga' | 'comic' | 'film-tv' | 'literature' | 'mythology'
  },
  tema:           string,           // frase temática 1 linha
  origem:         string,           // origem narrativa (ex: 'Midgar, slums')
  atributos: { des, vig, ast, von }, // dados: 'd6'|'d8'|'d10'|'d12'
  lacos:          [{alvo, emocoes}],
  descricao:      string,
  keyTraits:      string[],         // 4-5 traits definidores
  suggestedQuirks: string[],        // IDs de quirks do sistema
  bondHints:      string[],         // dicas de laços narrativos
}
```

## PDF export

- Template: `assets/ficha-template.pdf` (ficha oficial AcroForm)
- Library: `pdf-lib` (pure JS, sem flatten — campos permanecem editáveis)
- Handler: IPC `exportar-pdf` em `main.js`
- **NUNCA** chamar `form.flatten()` — obrigatório manter campos editáveis
- Slot de imagem: x=432, y=400, w=118, h=125 (pág 1, coluna central)

## IPC interface (preload.js → window.electronAPI)

| Method | Main handler | Description |
|--------|-------------|-------------|
| `salvarPersonagem(dados)` | `salvar-personagem` | Diálogo salvar → JSON |
| `carregarPersonagem()` | `carregar-personagem` | Diálogo abrir → JSON |
| `carregarPersonagemDireto(path)` | `carregar-personagem-direto` | Lê JSON direto pelo caminho |
| `exportarPDF(dados)` | `exportar-pdf` | Preenche AcroForm → PDF |
| `salvarJSON(dados, nome, titulo)` | `salvar-json` | Diálogo salvar → JSON genérico |

## Archetype progression system

Each archetype in `ARQUETIPOS` has `progressao: { 5: {...}, 10: {...}, 15: {...}, 20: {...} }`. Each level object contains `classes: [{id, niveis, poderes[]}]`. For non-exact levels, `_interpolateProgressao()` finds the nearest defined level.

The 33 archetypes map to 6 name-suggestion categories:

| Category | Archetypes |
|----------|-----------|
| guerreiro | guerreiro-escudo, barbaro-furioso, guerreiro-versatil, furioso-guerreiro, guardiao-combatente, forjador, dançarino |
| mago | mago-elemental, mago-arcano, mago-sombrio, necromante, esper |
| suporte | curandeiro, orador-bardo, inventor, paladino-curandeiro, tatico-erudito, floralista, gourmet |
| ladino | espadachim-sombrio, ladino-arqueiro, assassino, explorador-furtivo, atirador-pistoleiro, carteador, apostador, sombra-selvagem |
| invocador | guerreiro-arcano, quimerista, invocador, astrologo |
| generalista | generalista, piloto |
