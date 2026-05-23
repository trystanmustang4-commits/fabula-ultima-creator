# KB Cleanup Plan — Fase 2.4

> Gerado em 2026-05-17. **Aguardando aprovação antes de aplicar.**

---

## 1. Bug: Rincewind

**Entrada #31** — `arquetipo: 'andarilho'` é inválido (ID de classe, não de arquétipo).

**Decisão:** → `mago-arcano`

**Justificativa:** Rincewind reivindica a identidade de mago (Universidade Invisível, chapéu com "FEITICEIRO"), mesmo sendo péssimo nisso. `mago-arcano` (Simbolista + Arcanista) captura o mago-de-biblioteca que sobrevive pela astúcia e evasão, não pelo poder bruto. `explorador-furtivo` descreveria melhor a *mecânica* de fuga, mas a *identidade* de Rincewind é de mago fracassado — e é isso que ele defende.

---

## 2. Duplicatas Detectadas

### 2.1 Hermione — ×3 entradas → **Tipo B** (erro/consolidar)

| # | `nome` | `aliases` | `lacos` | Status |
|---|--------|-----------|---------|--------|
| #26 | `'Hermione Granger'` | `['hermione', 'harry potter hermione']` | 2 | ✅ Entrada completa — **manter** |
| #34 | `'Hermione'` | `[]` | 0 | ❌ Fragmento vazio — **remover** |
| #36 | `'Hermione Granger'` | `[]` | 0 | ❌ Duplicata seca — **remover** |

Todas as três são `tatico-erudito`. Não há segundo ângulo válido. Consolida em #26 (a entrada mais completa), remove #34 e #36.

**Resultado:** 76 → 74 entradas após remoção das duas.

---

### 2.2 Geralt de Rívia — ×2 entradas → **Tipo A** (legítimo/diferenciar)

| # | `arquetipo` | `tema` | `aliases` | `lacos` |
|---|-------------|--------|-----------|---------|
| #2 | `sombra-selvagem` | 'O mal menor' | `['geralt','bruxo','witcher']` | Ciri, Yennefer |
| #56 | `explorador-furtivo` | 'O neutro num mundo de escolhas' | `[]` | (vazio) |

**Ângulos distintos:**
- **Witcher** (`sombra-selvagem`): Geralt como mutante, caçador de monstros, alguém que vive na fronteira entre humanos e monstros. O Geralt das Saga dos Bruxos.
- **Sobrevivente neutro** (`explorador-furtivo`): Geralt como andarilho que navega guerras políticas sem tomar partido, usando furtividade e pragmatismo. O Geralt dos jogos.

**Ação:** Manter ambos. Diferenciar IDs e completar a entrada #56 (adicionar aliases e lacos).

**IDs propostos:**
- #2 → `id` implícito: manter `nome: 'Geralt de Rívia'` como entrada principal (witcher)
- #56 → `nome: 'Geralt de Rívia (Neutro)'`, aliases: `['geralt neutro', 'geralt games']`, lacos com Dandelion/Triss

*(O KB não usa IDs explícitos por personagem — diferenciação é pelo nome + aliases.)*

---

### 2.3 Rand al'Thor — ×2 entradas → **Tipo B** (erro/consolidar)

| # | `nome` | `aliases` | `lacos` | Status |
|---|--------|-----------|---------|--------|
| #70 | `"Rand al'Thor"` | `['rand','wheel of time rand','dragon reborn']` | 2 | ✅ Entrada completa — **manter** |
| #72 | `"Rand al'Thor (mago)"` | `[]` | 0 | ❌ Fragmento vazio — **remover** |

Ambos são `mago-elemental`. A segunda entrada não acrescenta nenhum ângulo diferente — só repete com nome deformado e sem dados. Remove #72.

**Resultado:** -1 entrada adicional.

---

## 3. Remapeamentos Pós-Revisão de Arquétipos

### 3.1 Aerith Gainsborough
**Status no KB:** ❌ **Não existe.** Nenhuma entrada.
**Ação:** Nada a remapear em 2.4. Entrada nova será criada na Fase 3 (expansão para 685+).
*(Arquétipo alvo confirmado: `curandeiro`.)*

### 3.2 Tifa Lockhart
**Status no KB:** ❌ **Não existe.** Nenhuma entrada.
**Ação:** Nada a remapear em 2.4. Entrada nova será criada na Fase 3.
*(Arquétipo alvo confirmado: `dançarino`.)*

### 3.3 Ichigo Kurosaki
**Status no KB:** ✅ Entrada #49, `guerreiro-arcano` — **já correto.** Nenhuma ação.

### 3.4 Personagens em `mago-sombrio` (agora com Simbolista)
Loki (#22), Hannibal (#23), Raistlin (#32) — todos `mago-sombrio`.
O arquétipo trocou `guerreiro_sombrio` por `simbolista`. Os keyTraits continuam válidos:
- Loki: ilusão, simbolismo, manipulação → encaixa ainda melhor com Simbolista.
- Hannibal: refinamento, simbolismo psicológico → idem.
- Raistlin: arcanismo sombrio, magia proibida → idem.

**Ação:** Nenhuma alteração necessária.

### 3.5 Personagens em `barbaro-furioso` (agora com Mutante)
Thor (#3), Naruto (#43), Goku (#45), Luffy (#47), Conan (#68).
O arquétipo incorporou `mutante`. Os quirks do arquétipo (`suggestedQuirks`) são definidos no arquétipo, não por personagem individual no KB — sem impacto direto.
- Naruto/Goku/Luffy: transformações (Kurama/Super Saiyajin/Gear) encaixam perfeitamente com Mutante.
- Thor: divindade como "mutação cósmica" — aceitável.
- Conan: sem transformação; dominado por `furioso` na progressão — continua válido.

**Ação:** Nenhuma alteração necessária.

---

## 4. Bônus: Typos de Atributo

**12 entradas** com `;d` em vez de `d` nos atributos (ponto-e-vírgula acidental antes do dado):

| # | Nome |
|---|------|
| #54 | Solid Snake |
| #58 | Dante |
| #59 | Noctis Lucis Caelum |
| #64 | Rey |
| #65 | Arya Stark |
| #67 | Eowyn |
| #70 | Rand al'Thor |
| #71 | Kvothe |
| #72 | Rand al'Thor (mago) — será removido de qualquer forma |
| #73 | Vin |
| #74 | Kaladin Stormblessed |
| #75 | Fitz |

**Ação proposta:** Corrigir todos os `;d` → `d` durante a mesma execução (não são dados de gameplay, são strings de atributo usadas pelo app).

---

## 5. Cobertura dos 9 Novos Arquétipos

Todos os 9 arquétipos da Fase 2.2 têm **0 entradas** no KB. Abaixo as sugestões de 1-2 personagens por arquétipo para cobertura mínima.

> **Escopo 2.4:** Adicionar apenas os personagens listados abaixo — sem expansão de KB além disso (Fase 3).

### A. `dançarino` — Dançarino de Batalha
| Nome | Aliases | Arquétipo | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|-----------|------|--------|-----------|-------|-----------|
| Tifa Lockhart | `['tifa', 'ff7 tifa', 'final fantasy 7 tifa']` | `dançarino` | Arte marcial e lealdade | Barista/Lutadora | des d12, vig d8, ast d6, von d8 | Cloud (amor), Avalanche (dever) | Uma lutadora de artes marciais que transforma cada golpe em dança — a força silenciosa que mantém a equipe viva. |
| Rock Lee | `['rock lee', 'naruto rock lee', 'taijutsu']` | `dançarino` | Esforço sem talento mágico | Ninja | des d12, vig d10, ast d6, von d6 | Guy-sensei (mentoria), Sakura (amor não correspondido) | Um ninja sem nenhum poder especial que superou todos pela pura força do esforço e da velocidade. |

### B. `floralista` — Floralista Espiritual
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Yuna (FFX-2) | `['yuna', 'final fantasy 10 yuna', 'yuna gunner']` | Libertação e identidade | Invocadora/Cantora | des d8, vig d6, ast d10, von d10 | Tidus (amor), Rikku (amizade) | A Grande Invocadora que trocou a morte certa por uma jornada de autodescoberta — florista de um mundo renascido. |
| Saria | `['saria zelda', 'kokiri forest saria', 'sages zelda']` | Conexão com a natureza | Kokiris/Sábia | des d6, vig d6, ast d10, von d12 | Link (amizade), Floresta Kokiri (dever) | A sábia da floresta que sacrificou sua forma mortal para proteger o mundo eterno de Hyrule. |

### C. `gourmet` — Gourmet Inventor
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Sanji | `['sanji vinsmoke', 'one piece sanji', 'black leg sanji', 'cuisinier']` | Arte culinária como poder | Cozinheiro/Pirata | des d10, vig d10, ast d8, von d6 | Luffy (lealdade), Zeff (gratidão) | O Cozinheiro Negro que nunca usa as mãos para lutar — porque mãos são para cozinhar. Sua perna é uma chama. |
| Toriko | `['toriko anime', 'gourmet hunter toriko']` | Caça ao ingrediente perfeito | Caçador Gourmet | des d8, vig d12, ast d8, von d6 | Komatsu (amizade), IGO (dever) | Um caçador gourmet que enfrenta bestas impossíveis em busca do ingrediente que vai completar o menu da sua vida. |

### D. `esper` — Esper Arcanista
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Mob | `['mob psycho', 'shigeo kageyama', 'mob psycho 100']` | Poder que assusta o próprio dono | Estudante | des d6, vig d8, ast d12, von d8 | Reigen (mentoria), Ritsu (amor fraternal) | Um menino com poder psíquico absoluto que escolhe deliberadamente não usá-lo — porque ser humano importa mais. |
| Akira | `['akira kaneda', 'akira neo tokyo', 'esper akira']` | Poder sem controle | Cobaia/Pária | des d6, vig d10, ast d10, von d8 | Kaneda (amizade), Neo-Tóquio (destruição) | Um esper cuja evolução descontrolada criou e destruiu uma cidade — a prova de que poder sem estabilidade é apocalipse. |

### E. `piloto` — Piloto Atirador
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Amuro Ray | `['amuro', 'gundam amuro', 'white devil', 'mobile suit gundam']` | Evolução forçada pela guerra | Engenheiro/Piloto | des d10, vig d8, ast d10, von d6 | Char (rivalidade), Bright (mentoria) | O piloto que se tornou um Newtype pelo trauma da batalha — sua consciência expandiu para além do cockpit. |
| Han Solo | `['han solo', 'star wars han', 'millennium falcon']` | Liberdade acima de tudo | Contrabandista | des d10, vig d8, ast d10, von d6 | Leia (amor), Chewbacca (amizade) | O melhor copiloto da galáxia que atira primeiro e nunca quer se envolver — mas sempre volta quando importa. |

### F. `astrologo` — Astrólogo Vidente
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Y'shtola | `['yshtola', 'ffxiv yshtola', 'final fantasy 14 yshtola', 'matoya']` | Conhecimento além da visão | Maga/Acadêmica | des d6, vig d8, ast d12, von d8 | Scion (lealdade), Hydaelyn (devoção) | Uma maga que perdeu a visão física mas ganhou o poder de ver as estrelas de dentro — conhecimento além dos sentidos. |
| Cassandra | `['cassandra troia', 'cassandra prophecy', 'cassandra greek myth']` | A profecia que ninguém ouve | Sacerdotisa | des d6, vig d6, ast d12, von d10 | Apolo (maldição), Tróia (dor) | A vidente que viu a queda de Tróia e não foi acreditada — o peso de saber o futuro sem poder mudá-lo. |

### G. `carteador` — Carteador Ladino
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Gambit | `['gambit xmen', 'remy lebeau', 'cajun thief']` | Charme e jogo perigoso | Ladrão/Mercenário | des d12, vig d8, ast d8, von d6 | Rogue (amor), X-Men (lealdade relutante) | O ladrão cajun que carrega cartas explosivas e um coração impossível de ler — mesmo para ele mesmo. |
| Setzer Gabbiani | `['setzer', 'final fantasy 6 setzer', 'ff6 gambler']` | A vida como aposta | Apostador/Piloto | des d10, vig d8, ast d8, von d8 | Daryl (amor perdido), Edgar (aliança) | O apostador voador que apostou a própria vida numa moeda — e descobriu que há coisas que valem mais que qualquer jackpot. |

### H. `forjador` — Forjador de Almas
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Soul Evans | `['soul eater', 'soul evans', 'death scythe soul']` | Tornar-se a arma perfeita | Estudante/Meistar | des d10, vig d10, ast d8, von d6 | Maka (parceria de alma), Death (dever) | Um Falcigero Demoníaco que moldou sua própria alma em arma para proteger sua parceira — a fusão literária entre ser e espada. |
| Ragna the Bloodedge | `['ragna', 'blazblue ragna', 'grim reaper ragna']` | Destruição como libertação | Renegado | des d10, vig d10, ast d8, von d6 | Jin (rivalidade/irmão), Rachel (aliança) | Um renegado cuja espada devora almas e consome sua própria existência — sacrifício que se recusa a chamar de sacrifício. |

### I. `necromante` — Necromante Arcanista
| Nome | Aliases | Tema | Origem | Atributos | Laços | Descrição |
|------|---------|------|--------|-----------|-------|-----------|
| Ainz Ooal Gown | `['ainz', 'overlord ainz', 'momonga overlord', 'lich overlord']` | Governar além da morte | Jogador/Lich | des d6, vig d8, ast d12, von d8 | Albedo (lealdade), Guild (saudade) | Um lich soberano que mantém a aparência de grandiosidade enquanto improvisa cada decisão — governante da morte que ainda não sabe o que quer. |
| Kel'Thuzad | `['kelthuzad', 'world of warcraft kelthuzad', 'naxxramas', 'lich wow']` | Devoção além da vida | Mago/Lich | des d6, vig d8, ast d12, von d8 | Lich King (devoção), Scourge (poder) | O arquilich que trocou a mortalidade pela servidão eterna — e encontrou na morte a mais completa expressão de sua magia. |

---

## 6. Sumário de Operações

| Operação | Entradas afetadas | Net |
|----------|-------------------|-----|
| Fix Rincewind | #31 | 0 |
| Remover Hermione #34 e #36 | #34, #36 | −2 |
| Diferenciar Geralt #56 | #56 | 0 |
| Remover Rand #72 | #72 | −1 |
| Corrigir `;d` typos | #54, #58, #59, #64, #65, #67, #70, #71, #73, #74, #75 | 0 |
| Adicionar 18 entradas novas (2 × 9 arquétipos) | novos | +18 |
| **Total final** | | **76 − 3 + 18 = 91** |

---

## 7. Não incluído nesta fase

- Aerith Gainsborough → `curandeiro` (não existe no KB, criação = Fase 3)
- Tifa Lockhart → `dançarino` (não existe no KB — a nova entrada acima é a criação)
- Expansão geral do KB de 91 → 685+ (Fase 3)
- Atualização de keyTraits/notas individuais de personagens em arquétipos revisados (sem impacto funcional confirmado)

---

*Aguardando aprovação. Após OK, executa e roda `npm run validate` + relatório final.*
