# Fabula Ultima Creator

App desktop para criação de personagens do RPG de mesa **Fabula Ultima** (edição pt-BR).

## Funcionalidades

### Wizard de criação (8 passos)
Crie personagens passo a passo: identidade, origem, tema, classes e poderes, atributos, estatísticas, equipamento e finalização com imagem e laços.

### Gerador de PJ
Gere personagens em segundos a partir de um arquétipo ou inspirados em personagens famosos de animes, games, filmes e HQs:
- **Aleatório** — escolha um dos 33 arquétipos, o app monta o personagem completo
- **Inspirado** — busque "Cloud", "Yennefer", "Miles Morales" etc. — o app encontra o arquétipo certo e gera um PJ temático
- **Banco de personagens** — navegue pelos 730 personagens do banco, filtre por categoria, franquia ou arquétipo
- **Sugestão de nome** — botão 🎲 sugere um nome de fantasia temático para o arquétipo gerado

### Ficha oficial
Visualize a ficha completa no formato oficial Fabula Ultima com todas as estatísticas calculadas.

### Exportação PDF
Exporta a ficha preenchida para PDF editável usando o template oficial do jogo (campos AcroForm permanecem editáveis).

### Persistência
- Auto-save de rascunho em progresso
- Salvar/carregar personagens em JSON
- Histórico dos últimos 5 arquivos abertos

## Instalação (usuário final)

### Windows

1. Baixe `Fabula Ultima Creator Setup 1.1.0.exe`
2. Execute o instalador — pode escolher a pasta de destino
3. Abra pelo atalho na área de trabalho ou no Menu Iniciar

Não requer Node.js, Python nem nenhuma dependência adicional.

### Android

1. Baixe `fabula-ultima-creator-1.1.0.apk` na página de releases do GitHub
2. No celular, permita instalar apps de fontes desconhecidas para o navegador ou gerenciador de arquivos
3. Abra o APK e instale (Android 6.0 ou superior)

Personagens e fichas em PDF ficam em **Documentos/FabulaUltima**. Exportar PDF abre a folha de compartilhamento do Android (salvar no Drive, enviar por WhatsApp etc.).

## Fluxo principal

| O que fazer | Como |
|-------------|------|
| Criar personagem do zero | Tela inicial → **Criar Personagem** |
| Gerar PJ por arquétipo | Tela inicial → **Gerador de PJ** → Aleatório |
| Gerar PJ inspirado em personagem famoso | Gerador de PJ → Inspirado → digita o nome (ex: "Cloud") |
| Navegar banco de personagens | Gerador de PJ → Navegar Banco |
| Exportar ficha em PDF | Na tela Ficha → botão **Exportar PDF** |
| Salvar personagem | Na tela Ficha → botão **Salvar** |
| Continuar rascunho | Tela inicial → **Continuar Rascunho** (se houver) |

**Atalhos de teclado:**
- `F12` ou `Ctrl+Shift+I` — abre DevTools (diagnóstico)

## Reportar bugs

Anote em [KNOWN-ISSUES.md](KNOWN-ISSUES.md) com: o que tentou fazer, o que esperava, o que aconteceu.

## Desenvolvimento

**Requisitos:** Windows 10/11, Node.js 18+

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm start

# Empacotar para distribuição
npm run build:win
```

## Estrutura de pastas relevante

```
main.js                         Processo principal Electron (IPC, janela)
preload.js                      Bridge contextBridge → window.electronAPI
renderer/
  index.html                    HTML das telas (inicio, wizard, ficha, gerador-pj)
  styles.css                    Tema dark fantasy com CSS custom properties
  app.js                        Lógica do wizard/ficha (~2500 linhas)
  gerador-pj.js                 Gerador de PJ (~1150 linhas, IIFE GeradorPJ)
  matcher/
    matcher.js                  Orquestrador do cascade de busca
    fuzzy.js                    Wrapper Fuse.js
    fallbacks.js                Lógica do fallback modal + badges
  data/
    archetypes.js               33 arquétipos com progressão por nível
    gamedata.js                 Dados do sistema (classes, armas, atributos…)
    nomes-sugeridos.js          Listas de nomes por categoria de arquétipo
    character-kb/               Banco de 730 personagens por franquia
  lib/
    fuse-browser.js             Build browser-compatível do Fuse.js 7.x
assets/
  ficha-template.pdf            Template oficial para exportação
tools/
  screenshot-driver-56.mjs     Driver de validação Fase 5.6
  console-audit-6.mjs          Driver de audit de console Fase 6
```

## Tecnologias

- **Electron** — container desktop, processo principal + renderer separados
- **pdf-lib** — preenchimento de AcroForm em PDF (sem flatten, campos editáveis)
- **Fuse.js** — busca fuzzy offline para o matcher de personagens
- Renderer: HTML/CSS/JS vanilla, sem framework, sem bundle step
