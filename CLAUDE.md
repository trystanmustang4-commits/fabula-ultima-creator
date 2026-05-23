# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Criador de personagens para o RPG de mesa **Fabula Ultima** (edição pt-BR), desktop Windows via Electron. Fluxo tipo D&D Beyond: wizard passo-a-passo onde cada escolha influencia as próximas. **Todo o texto da interface deve estar em pt-BR.** Os PDFs do livro básico e expansões (High Fantasy, Natural Fantasy, Techno Fantasy, Herdeiros da Supernova) ficam na raiz do repositório e são a fonte de verdade para regras e dados do sistema.

## Commands

```bash
# Instalar dependências (só necessário uma vez)
npm install

# Rodar o app em modo desenvolvimento
npm start        # equivale a: electron .

# Empacotar para distribuição Windows (requer electron-builder instalado)
npm run build
```

Não há linter, testes automatizados ou build step para o renderer — as alterações no HTML/CSS/JS são aplicadas diretamente ao recarregar o app (`Ctrl+R` na janela Electron com DevTools aberto).

## Arquitetura

O projeto é um app **Electron** com separação estrita entre processo principal e renderer:

```
main.js                  ← Processo principal Node.js (IPC handlers, janela)
preload.js               ← Bridge segura: expõe window.electronAPI ao renderer
renderer/
  index.html             ← Três telas: #tela-inicio, #tela-wizard, #tela-ficha
  styles.css             ← CSS variables + tema dark fantasy (sem framework)
  app.js                 ← Todo o estado e lógica do app (~2000 linhas, objeto App)
  data/
    gamedata.js          ← Dados do sistema (const GAMEDATA, carregado antes de app.js)
```

### Estado global e fluxo de dados

`app.js` expõe dois objetos globais:

- **`Estado`** — objeto único com `passoAtual` (0–7) e `personagem` (todos os dados do PJ em criação). É a única fonte de verdade; nunca existe estado local nos componentes.
- **`App`** — objeto com todos os métodos do app (renderização, navegação, cálculos, IO).

O ciclo de vida de uma mudança é sempre: evento DOM → método `App.*` → muta `Estado.personagem` → chama o método de renderização correspondente (re-renderiza só a seção afetada, não o passo inteiro, exceto quando necessário).

### Wizard de 8 passos

Cada passo tem uma função `renderPasso*` que recebe `container` (o `#wizard-main`) e define seu `innerHTML`. A validação para avançar está em `passoCompleto(idx)` — ao adicionar um passo ou mudar uma regra de validação, esse switch é o ponto central.

| Índice | ID | Dados salvos em `Estado.personagem` |
|--------|----|--------------------------------------|
| 0 | identidade | `identidade` |
| 1 | origem | `origem`, `origemDesc` |
| 2 | tema | `tema`, `temaCustom`, `temaDescricao` |
| 3 | classes | `classes: { [id]: { niveis, poderes[] } }` |
| 4 | atributos | `atributos: { des, vig, ast, von }`, `perfilAtrib` |
| 5 | estatísticas | (calculado em `calcularStats()`, não salvo) |
| 6 | equipamento | `equipamento: { armas[], armadura, escudo }` |
| 7 | finalização | `nome`, `pronomes`, `aparencia`, `descricao` |

### Cálculo de estatísticas (`calcularStats`)

- **PV** = nível + (VIG × 5) + bônus de classe
- **PM** = nível + (VON × 5) + bônus de classe
- **PI** = 6 + bônus de classe
- **Defesa** = valor numérico do dado de DES (ex: d8 → 8)
- **Defesa Mágica** = valor numérico do dado de AST
- Bônus de classe são lidos de `cl.beneficiosIniciais` — strings que começam com `'+5 PV'`, `'+5 PM'` ou `'+2 PI'`.
- Armadura pode substituir DEF/DefM por fórmulas como `"DES"`, `"DES+2"`, `"10"` — tratadas por `parseFormula()`.

### Restrição de equipamento marcial

`podeUsarMarcial()` percorre as classes do PJ e coleta os itens de `cl.marcialEquip` de cada uma. O resultado é `{ armas_corpo_a_corpo, armas_distancia, armaduras, escudos }`. Itens bloqueados ficam com classe CSS `bloqueado` e `onclick = null`.

### IPC (comunicação renderer ↔ main)

`preload.js` expõe quatro métodos via `contextBridge`:
- `salvarPersonagem(dados)` → abre diálogo de salvar → escreve JSON
- `carregarPersonagem()` → abre diálogo de abrir → retorna JSON parseado
- `carregarPersonagemDireto(caminho)` → lê arquivo pelo caminho (para recentes)
- `exportarPDF()` → abre diálogo de salvar → escreve PDF preenchido

Todos retornam `{ sucesso: boolean }`. No renderer, sempre verificar `if (!window.electronAPI)` antes de chamar (protege caso o arquivo seja aberto fora do Electron).

### Exportação de PDF — requisito obrigatório

O export **não deve** usar `webContents.printToPDF` (que gera uma impressão da tela HTML). O comportamento correto é:

1. Usar a **ficha oficial do Fabula Ultima em PDF** (arquivo da ficha original do jogo) como template.
2. Preencher os campos do formulário PDF (AcroForm) com os dados do `Estado.personagem`.
3. Gerar um **PDF editável** — os campos devem continuar editáveis pelo usuário no leitor de PDF após a exportação.

**Biblioteca recomendada:** [`pdf-lib`](https://pdf-lib.js.org/) — pura JS, sem dependências nativas, suporta leitura e preenchimento de AcroForm fields. Instalar com `npm install pdf-lib`.

**Fluxo de implementação:**
- O template PDF da ficha deve ficar em `assets/ficha-template.pdf`.
- O handler IPC `exportar-pdf` em `main.js` deve: ler o template com `fs.readFileSync`, usar `pdf-lib` para localizar e preencher cada campo pelo nome, salvar com `PDFDocument.save()` mantendo `updateFieldAppearances: true`.
- Mapear os nomes dos campos AcroForm do template para as propriedades de `Estado.personagem` (inspecionar com `pdfDoc.getForm().getFields().map(f => f.getName())`).

**Mapeamento de campos confirmado visualmente:**
- Nome (pág.1): `Nome` | Pág.2: `Campo testo 252` | Pág.3: `Campo testo 236`
- PV máx: `Campo testo 280`, PV atual: `Campo testo 282`
- PM máx: `Campo testo 278`, PM atual: `Campo testo 283`
- PI máx: `Campo testo 279`, PI atual: `Campo testo 284`
- Crise: `Campo testo 281` | Nível: `Campo testo 10207`
- Classe 1: nome=`Campo testo 285`, nível=`Campo testo 286`, poderes=`Campo testo 10208`
- Classe 2: nome=`Campo testo 287`, nível=`Campo testo 288`, poderes=`Campo testo 10209`
- Classe 3: nome=`Campo testo 289`, nível=`Campo testo 290`, poderes=`Campo testo 102010`

### gamedata.js — estrutura de dados chave

```js
GAMEDATA.classes[]          // 15 classes com .id, .nome, .beneficiosIniciais[], 
                            // .marcialEquip[], .poderes[{ id, nome, repeticoes, descricao }]
GAMEDATA.armas[]            // .id, .nome, .custo, .precisao, .dano, .maos, .alcance,
                            // .marcial (bool), .categoria
GAMEDATA.armaduras[]        // .id, .nome, .custo, .defesa (fórmula string), .defMagica,
                            // .iniciativa (número, pode ser negativo), .marcial
GAMEDATA.escudos[]          // igual armaduras, sem .iniciativa
GAMEDATA.emocoes[]          // .id, .nome, .par (string), .descricao — 6 emoções em 3 pares
GAMEDATA.temas[]            // .id, .nome, .descricao
GAMEDATA.perfisAtributos[]  // .id, .nome, .dados[] (ex: ["d10","d10","d6","d6"])
GAMEDATA.atributos[]        // [des, vig, ast, von] — ordem importa para renderização
GAMEDATA.personagensClassicos[] // 10 PJs pré-construídos (Alquimista, Apostador, etc.)
                                // Estrutura: { nome, des, vig, ast, von,
                                //   classes: [{ classe, niveis, poderes[] }],
                                //   equipamento: [ids de arma/armadura/escudo] }
GAMEDATA.regras             // objeto com constantes: nivelInicial, orcamentoEquip, etc.
```

### CSS — variáveis principais

```css
--cor-fundo: #0f0f1a          /* fundo principal */
--cor-primaria: #7c5cbf        /* roxo — ações primárias */
--cor-dourado: #e8c56a         /* dourado — destaques */
--cor-texto: #e8e0f0           /* texto principal */
--cor-texto-muted: #9990b0     /* texto secundário */
--cor-borda: rgba(124,92,191,0.25)
```

## Estado global — campos de `Estado.personagem`

```js
{
  identidade, tema, temaCustom, temaDescricao, origem, origemDesc,
  classes: { [id]: { niveis, poderes[] } },
  atributos: { des, vig, ast, von },   // dado selecionado: 'd6'|'d8'|'d10'|'d12'
  perfilAtrib,                          // id do perfil escolhido (pode ser '_sug_esp' etc.)
  equipamento: { armas: [id,...], armadura: id|'sem_armadura', escudo: id|'' },
  lacos: [{ alvo, emocoes: [id,...] }], // até 6
  nome, pronomes, aparencia, descricao,
  imagem,                               // base64 string (upload local, máx 5 MB)
  nivel,                                // inteiro ≥ 1, padrão 5
  pontosFabula                          // sempre 3
}
```

## Constantes globais em app.js

```js
NOMES_MASC[]        // 300 nomes masculinos de fantasia (por categorias)
NOMES_FEM[]         // 300 nomes femininos de fantasia
ICONES_CLASSES{}    // { classeId: emoji } — 15 entradas
CLASSES_ATRIBS{}    // { classeId: { prim, sec } } — atributo primário/secundário por classe
```

## Funcionalidades implementadas

### Persistência e recuperação
- **Auto-save em rascunho** — `App.autoSalvar()` salva `Estado.personagem` no `localStorage` a cada navegação de passo. `App.temRascunho()` detecta rascunho existente. A tela inicial oferece botão "Continuar Rascunho" se houver rascunho.
- **Histórico de recentes** — após salvar/carregar, `App.adicionarRecente(caminho, nome)` persiste em `localStorage`. A tela inicial lista os últimos 5 arquivos com botão de abrir direto via `window.electronAPI.carregarPersonagemDireto(caminho)`.
- **Modo edição** — carregar um personagem abre o wizard no passo 0 para edição completa; a tela de ficha mostra o personagem já completo e "Editar" retorna ao wizard.

### Painel de stats ao vivo
- `App.atualizarStatsVivo()` atualiza o painel `#stats-vivo` (fixo no canto da tela de wizard) com PV/PM/PI/DEF/DefM/Init calculados em tempo real. Chamado automaticamente a cada mudança relevante (classes, atributos, equipamento, troca de passo).

### Personagens de exemplo
- Botão "Ver Exemplos" na tela inicial abre modal com 10 PJs pré-construídos de `GAMEDATA.personagensClassicos`. `App.carregarPersonagemClassico(idx)` converte o formato simplificado para o formato completo de `Estado.personagem` e abre o wizard no passo 7 (finalização — para nomear e descrever).

### Busca de poderes
- `App._filtroPoderes` e `App.filtrarPoderes(texto)` — o passo de classes mostra um campo de busca; quando preenchido, exibe uma lista plana de poderes de todas as classes que contêm o texto (nome ou descrição), com o nome da classe de origem.

### Copiar stats para clipboard
- `App.copiarStats()` — botão na ficha final gera um bloco de texto formatado (nome, classes, atributos, PV/PM/PI, DEF/Init) e copia para a área de transferência via `navigator.clipboard`.

### Comparação de equipamentos
- Hover em item de equipamento não-equipado mostra tooltip flutuante `#comparacao-popup` com stats do item hoverado vs. item atualmente equipado no mesmo slot. `App.mostrarComparacao(itemId, tipo, evt)` / `App.ocultarComparacao()`.

### Tooltips de regras inline
- Atributos, emoções e campos com regras específicas usam `data-tooltip="..."` + CSS puro para tooltips ao hover, sem JS.

### Poderes com repetições (⟳)
- Poderes com `repeticoes > 1` exibem controle `−` / contador / `+` no passo Classes. `App.adicionarPoderUm(classeId, poderId)` adiciona uma instância; `App.removerPoderUm(classeId, poderId)` remove a última. O botão `+` fica desabilitado quando slots da classe estão cheios ou o máximo de repetições foi atingido.

### Nível do personagem configurável
- `Estado.personagem.nivel` aceita qualquer valor inteiro ≥ 1 (padrão 5). Controle `−` / input / `+` exibido no passo Estatísticas. Ao reduzir o nível abaixo do total de níveis de classe distribuídos, `App.setNivel()` remove automaticamente o excesso da classe com mais níveis. `passoCompleto(3)` valida `niveisUsados() === p.nivel`.

### Perfis de atributos dinâmicos baseados em classes
- `App._sugerirPerfisParaClasses()` — gera 3 perfis sugeridos (ids `_sug_esp`, `_sug_med`, `_sug_ver`) a partir de `CLASSES_ATRIBS`, pontuando cada atributo (+2 primário, +1 secundário) pelas classes escolhidas. Exibidos antes dos 3 perfis base, marcados com tag "✨ Recomendado".
- `App._perfilAtual()` — resolve o perfil atual buscando tanto nos sugeridos quanto em `GAMEDATA.perfisAtributos`.
- **Enforce de dados** — `renderizarDistribuicaoAtribs()` desabilita opções de dado já esgotadas para os outros atributos. `setAtributo()` faz auto-swap: se o dado escolhido está todo ocupado, troca o atributo que o usava pelo valor anterior.

### Equipamento — restrições e múltiplos
- **Sem zênites** — itens não-selecionados cujo custo excede o saldo ficam com classe `.sem-zeni` (acinzentados, não clicáveis, etiqueta vermelha).
- **Múltiplas armas iguais** — `App.toggleArma(id)` sempre adiciona uma cópia (array pode ter duplicatas). `App.removerArmaUm(id)` remove a última ocorrência. Cada arma na lista exibe `− / quantidade / +`. O inventário agrupa por id (`×2`, `×3`…) com botão `−` por linha.

### Laços — foco preservado ao digitar
- `App.setLacoAlvo(idx, v)` só chama `renderizarLacos()` quando o campo muda de vazio para preenchido (ou vice-versa), para exibir/ocultar o bloco de emoções. Durante digitação normal, o input não perde o foco. Após re-render, `setTimeout` restaura foco e posição do cursor.

### Biblioteca de nomes de fantasia + Gerador
- `NOMES_MASC` (300) e `NOMES_FEM` (300) divididos em categorias: Medieval/Cavaleiros, Nórdico/Germânico, Oriental, Élfico/Alta Fantasia, Sombrio/Arcano, Natureza/Elemental, RPG Clássico, Exótico/Inventado, Eslavo/Bizântino, Antigo/Greco-romano.
- Gerador no passo Finalização: seleciona gênero (♂/♀/Qualquer) e tipo (Simples/Composto). Composto concatena dois nomes aleatórios da pool. `App.gerarNome()`, `App.setGenNomeGenero()`, `App.setGenNomeTipo()`.

### Imagem do personagem
- Campo de upload de imagem no passo Finalização (`.imagem-upload-area`, clique abre `<input type=file>`). `App.carregarImagem(input)` lê como base64 via `FileReader`. Sem limite de tamanho explícito — imagens são redimensionadas via canvas para no máximo 800px (JPEG 0.85), garantindo que o base64 fique abaixo de ~250KB. Salva em `Estado.personagem.imagem`. Exibida na ficha final no lugar do ícone genérico (`.ficha-avatar-img`). `App.removerImagem()` limpa o campo.

### Ícones de classe
- `ICONES_CLASSES` mapeia cada `classeId` para um emoji. Exibido no header de cada classe-card no passo Classes e como avatar fallback na ficha final quando não há imagem.

### Cálculo de defesa com escudo
- `calcularStats()` aplica o bônus do escudo somado ao DEF/DefM base da armadura. Escudos têm `defesa: "+2"` e `defMagica: "+2"` (strings com sinal). `parseInt("+2") === 2` — aplicado como bônus aditivo. O passo de Estatísticas mostra "+ escudo" na fórmula quando um escudo está equipado.

### Perguntas de Roleplay na Finalização
- `App._gerarPerguntasRoleplay()` — renderiza um `<details>` colapsável no passo 7 com as perguntas de cada classe selecionada (`cl.perguntas[]`), como prompts de escrita para a descrição do personagem. Usa o mesmo ícone de `ICONES_CLASSES`.

### Iniciativa na ficha final
- A ficha final (`gerarFicha()`) inclui Iniciativa como 7ª coluna no bloco de estatísticas, após DEF e DefM.

## Regras do sistema Fabula Ultima relevantes

- Personagens começam no **nível 5** por padrão (configurável).
- Distribuir exatamente **N níveis** (= `Estado.personagem.nivel`) entre **2 a 3 classes** (mínimo 1 nível por classe).
- Cada nível numa classe = 1 poder escolhido daquela classe.
- Poderes com `repeticoes > 1` podem ser selecionados múltiplas vezes (até `repeticoes` vezes).
- Orçamento de equipamento: **500 zênites**.
- Laços (Bonds): até **6 laços**, cada um com até 3 emoções (uma de cada par).
- Pontos de Fábula iniciais: **3**.
- Atributos são dados (d6/d8/d10/d12); o valor numérico do dado é usado diretamente nas fórmulas.

## Gerador de PJ — arquitetura (Fases 3–6)

O Gerador de PJ é uma tela separada (`#tela-gerador-pj`) implementada como um IIFE global `GeradorPJ`. É **aditivo** — não modifica o wizard, a ficha ou o exportador PDF existentes.

### Máquina de estados (5 views)

| View | Descrição |
|------|-----------|
| `modo` | Tela inicial com 2 cards: Aleatório / Inspirado |
| `aleatorio` | Grid de cards de arquétipos |
| `inspirado` | Campo de busca de personagem-referência |
| `resultado` | Personagem gerado com badge, atributos, classes, level-up log, ações |
| `navegacao` | Banco de 730 personagens com filtros e paginação |

### Cascade do Matcher (matcher.js)

1. Match exato em `aliases[]` (normalização: minúsculo + sem acentos)
2. Fuse.js fuzzy nos campos `nome` + `aliases[]` (threshold 0.3)
3. Fuse.js fuzzy nos nomes dos 33 arquétipos
4. `sem_match` honesto — modal "Não encontrei" com escolha manual

### Banco de personagens (KB)

- 730 entradas em `renderer/data/character-kb/` — divididas por franquia/universo
- Schema por entrada: `{ id, nome, aliases[], arquetipo, source, tema, origem, atributos, lacos, descricao, keyTraits, suggestedQuirks, bondHints }`
- `arquetipo` é sempre um dos 33 IDs de `ARQUETIPOS`
- Carregado por `renderer/data/character-kb.js` (ponto de entrada) + sub-arquivos

### Sugestão de nome (Fase 6)

`GeradorPJ.sugerirNome()` mapeia o arquétipo do PJ gerado para uma das 6 categorias (`guerreiro`, `mago`, `suporte`, `ladino`, `invocador`, `generalista`), escolhe aleatoriamente `PrimeiroNome Sobrenome` de listas em `renderer/data/nomes-sugeridos.js`, e atualiza o DOM sem re-renderizar a view inteira.

### levelUpLog

Campo `personagem.levelUpLog: [{nivel, classeNome, poder}]` (formato interno do gerador) ainda não normalizado para o schema canônico do wizard `{level, classGained, skillChange}`. Documentado como dívida técnica — normalizar na Fase 7+ se necessário.

### App.mostrarTela() — armadilha de prefixo

`App.mostrarTela(id)` faz `getElementById('tela-' + id)` internamente. Sempre passar só o ID sem prefixo: `mostrarTela('wizard')`, `mostrarTela('gerador-pj')`, nunca `mostrarTela('tela-wizard')`.

### IPC adicionados
- `salvar-json` → `window.electronAPI.salvarJSON(dados, nome, titulo)` — abre diálogo de salvar e grava JSON genérico (usado por NPC e encontro).

### Gerador de NPC — funções principais
- `_calcEquipNPC(cl)` — seleciona equipamento aleatório baseado em `cl.marcialEquip`
- `_calcStatsNPC(nivel, cl, atribs)` — calcula PV/PM/PI/Crise/valores de atributos
- `_calcDefNPC(desVal, astVal, armadura, escudo)` — calcula DEF/DefM/Init com parseFormula
- `gerarNPC(nivel?, tipo?, classeId?)` — cria NPC completo; sem args usa configurações da UI
- `_npcParaFoundry(npc)` — converte NPC para formato Foundry VTT (project-fu)
- `exportarNPCJSON(npcData?)` — salva NPC como JSON Foundry
- `exportarNPCPDF(npcData?)` — salva NPC via template PDF existente

### Encontro aleatório — fórmulas de quantidade
- Fácil: `ceil(jogadores × 0.75)` | Médio: `jogadores` | Difícil: `ceil(jogadores × 1.25)` | Épico: `ceil(jogadores × 1.5)`
- Chefe: nível = `nivel + delta` onde delta: Fácil=-2, Médio=0, Difícil=+2, Épico=+5

### Diretrizes de interface — tema Fabula Ultima
- Paleta: roxo (`#7c5cbf`), dourado (`#e8c56a`), fundo escuro (`#0f0f1a`), azul-noite (`#1a1a2e`)
- Elementos decorativos: `✦`, `⟡`, `◈`, bordas com gradiente dourado-roxo, glows sutis
- Cards de classe: usar a cor do ícone como accent individual
- Passo atual no wizard: barra de progresso com brilho animado
- Botões primários: gradiente roxo→azul, hover com glow
- Headers de seção: linha decorativa dourada acima, versalete

## Regra permanente — Gerador de PJ não modifica o que já existe

O app já tem funcionando, desde antes do Gerador de PJ:
- Renderização da ficha no formato oficial Fábula Ultima (`gerarFicha()`)
- Wizard de criação de 8 passos (`renderPasso*`)
- Exportação de PDF via template AcroForm (`exportar-pdf` IPC)
- `Estado.personagem` como estrutura central

**Essas peças não são modificadas nas Fases 3.6, 4, 5 ou 6.** O Gerador de PJ apenas alimenta essas peças — o output final é um objeto compatível com `Estado.personagem` que entra no wizard pelo botão "Editar no Wizard".

Regras derivadas:
1. **Não refatorar** `gerarFicha()`, o exportador PDF, nem o wizard de 8 passos.
2. **Toda nova UI do Gerador** (telas Aleatório/Inspirado, busca, badges, banco, editor, levelUpLog, config de IA) é **adicional** — não substitui o que existe.
3. **Integração obrigatória**: o resultado da geração carrega via `Estado.personagem` direto no wizard, aproveitando todo o fluxo existente.
4. **Campos novos** na ficha (necessários em Fase 4 ou Fase 5 UI) são **campos opcionais** no schema — não quebram nada que já consome `Estado.personagem`.

## Fase 4 — Matcher Offline (Fuse.js) — DECISÃO PERMANENTE

**Não haverá integração com IA online neste projeto.** Razões: custo de API, barreira de entrada pro usuário, dependência de conexão, imprevisibilidade de respostas. Toda referência a Anthropic API, OpenAI, @xenova/transformers, embeddings, RAG, Claude API está fora do roadmap — **não reintroduzir**.

A Fase 4 implementa um **matcher 100% offline** usando [Fuse.js](https://fusejs.io/) como fuzzy search engine. O `gerador-pj.js` já tem `_normalizar()`, `_fuzzyScore()` e `_buscarPersonagem()` homemade (linhas 48–87) que apenas pesquisam os 91 entries de `CHARACTER_KB` — a Fase 4 expande isso para os 730 entries do banco completo.

### Cascade de busca (4 níveis)

1. **Match exato** — busca `aliases[]` de todas as 730 entradas; retorna imediato se `score === 100`
2. **Fuse.js fuzzy** — threshold 0.3 sobre os campos `nome` + `aliases[]`; retorna top-5
3. **Fuzzy em nomes de arquétipo** — se query não matchou personagem, tenta os 33 nomes de arquétipo diretamente
4. **Fallback modal honesto** — se nada achou com confiança, mostra modal "Não encontrei [query]" com sugestão de preencher manualmente

### Estrutura de arquivos alvo (Fase 4)

```
renderer/
  matcher/
    matcher.js     ← orquestrador do cascade (carrega todos os arrays KB)
    fuzzy.js       ← wrapper Fuse.js + _normalizar/_fuzzyScore melhorado
    fallbacks.js   ← lógica do fallback modal + badge types
```

### Fuse.js — instalação

```bash
npm install fuse.js
```

Fuse.js 7.x não distribui um build UMD/browser via `fuse.min.js`. Um wrapper browser-compatível está em `renderer/lib/fuse-browser.js` (gerado na Fase 6). Referenciar no `index.html` **antes** de `matcher/fuzzy.js`:
```html
<script src="lib/fuse-browser.js"></script>
```

### Badge types (resultado do matcher)

| Tipo | Cor | Critério |
|------|-----|----------|
| `exact` | verde | score 100, alias match perfeito |
| `fuzzy-high` | azul | Fuse score ≤ 0.15 |
| `fuzzy-mid` | amarelo | Fuse score 0.16–0.30 |
| `archetype` | roxo | match por arquétipo, não personagem |
| `manual` | cinza | fallback — nenhum match confiável |

### Casos especiais

- **Ambiguidade Geralt**: `witcher-geralt-witcher` e `witcher-geralt-survivor` são dois entries distintos — o matcher deve oferecer desambiguação explícita quando a query for "Geralt".
- **IDs migrados (aviso Fase 5)**: IDs de KB não devem ser usados para persistência em localStorage ainda — verificar antes de usar na camada de dados.

## Como abrir o app em desenvolvimento

```bash
# No terminal Windows (fora do Claude Code, que define ELECTRON_RUN_AS_NODE=1):
cd "e:\app fabula ultima\fabula-ultima-creator"
npm start

# Ou diretamente (dentro do Claude Code):
env -u ELECTRON_RUN_AS_NODE node_modules/electron/dist/electron.exe .
```

> **Atenção**: O ambiente do Claude Code define `ELECTRON_RUN_AS_NODE=1`, que faz o Electron se comportar como Node.js puro. Sempre usar `env -u ELECTRON_RUN_AS_NODE` ao abrir pelo terminal interno.
