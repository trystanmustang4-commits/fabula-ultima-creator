#!/usr/bin/env node
// tools/seed-lol.js — Seed League of Legends champions into CHARACTER_KB
// Usage:
//   node tools/seed-lol.js --dry-run   → primeiros 10, imprime análise
//   node tools/seed-lol.js             → seed completo

const path = require('path');
const fs   = require('fs');

const DDRAGON_VERSIONS = 'https://ddragon.leagueoflegends.com/api/versions.json';
const CACHE_DIR  = path.resolve(__dirname, 'cache');
const CACHE_FILE = path.join(CACHE_DIR, 'lol-champions.json');
const OUTPUT_FILE = path.resolve(__dirname, '../renderer/data/character-kb/lol-champions.js');

const DRY_RUN = process.argv.includes('--dry-run');

// ── Camada 3: Overrides manuais (chave = ID da API) ──────────────
const MANUAL_OVERRIDES = {
  // Espadachim Sombrio
  Yasuo:        'espadachim-sombrio',
  Yone:         'espadachim-sombrio',
  // Guerreiro Escudo
  Garen:        'guerreiro-escudo',
  // Bárbaro Furioso
  Darius:       'barbaro-furioso',
  // Mago Elemental (previne false positives de keyword narrativa)
  Lux:          'mago-elemental',
  Anivia:       'mago-elemental',  // "morte" no blurb = ciclos, não mecânica
  Annie:        'mago-elemental',  // "sombra" no título ≠ dark mage
  // Mago Sombrio
  Ahri:         'mago-sombrio',
  Swain:        'mago-sombrio',    // "líder" teria ativado tatico-erudito; Swain é mago-corvo dark
  // Mago Arcano (artista simbólico)
  Hwei:         'mago-arcano',     // "sombra" no blurb = narrativa; kit = pintura/ritual
  // Necromante
  Thresh:       'necromante',
  Karthus:      'necromante',
  Yorick:       'necromante',
  // Orador Bardo
  Sona:         'orador-bardo',
  Seraphine:    'orador-bardo',
  Bard:         'orador-bardo',
  // Carteador
  TwistedFate:  'carteador',
  // Atirador Pistoleiro
  Gangplank:    'atirador-pistoleiro',
  // Atirador Pistoleiro (vigilante acrobático com rifle + grappling hook + execução oportunista)
  Akshan:       'atirador-pistoleiro',
  // Astrólogo
  Senna:        'astrologo',
  AurelionSol:  'astrologo',
  // Curandeiro
  Soraka:       'curandeiro',
  // Floralista
  Lulu:         'floralista',
  Zyra:         'floralista',
  Ivern:        'floralista',
  Maokai:       'floralista',
  // Inventor
  Heimerdinger: 'inventor',
  Jayce:        'inventor',
  Ekko:         'inventor',
  Viktor:       'inventor',
  // Piloto
  Camille:      'piloto',
  // Tático Erudito
  Ambessa:      'tatico-erudito',  // líder militar Noxiana; Fighter tag captura só a luta
};

// ── Camada 1: Tag primária → arquétipo default ────────────────────
const TAG_DEFAULT = {
  Tank:     'guardiao-combatente',
  Marksman: 'ladino-arqueiro',
  Mage:     'mago-elemental',
  Assassin: 'assassino',
  Fighter:  'guerreiro-versatil',
  Support:  'curandeiro',
};

// ── Camada 2: Regras de refinamento por keyword ───────────────────
// Avaliadas em ordem; primeira que casa vence dentro de cada tag.
const KEYWORD_RULES = [
  { kw: ['necro', 'morto', 'cadáver', 'lich'],
    tags: ['Mage'],                               result: 'necromante'        },
  { kw: ['shadow', 'dark', 'void', 'sombra', 'trevas', 'morte', 'darkness'],
    tags: ['Mage'],                               result: 'mago-sombrio'      },
  { kw: ['shadow', 'dark', 'void', 'sombra', 'morte'],
    tags: ['Fighter', 'Assassin'],                result: 'espadachim-sombrio' },
  { kw: ['blade', 'sword', 'swordsman', 'lâmina', 'espada'],
    tags: ['Fighter', 'Assassin'],                result: 'espadachim-sombrio' },
  { kw: ['rage', 'fury', 'berserker', 'fúria', 'furor', 'selvagem'],
    tags: ['Fighter'],                            result: 'barbaro-furioso'   },
  { kw: ['beast', 'transform', 'fera', 'besta', 'predator', 'savage'],
    tags: ['Fighter'],                            result: 'quimerista'        },
  { kw: ['soul', 'alma', 'espírito', 'forge', 'forja'],
    tags: ['Fighter'],                            result: 'forjador'          },
  { kw: ['shield', 'protect', 'escudo', 'proteção', 'defensor'],
    tags: ['Tank', 'Fighter'],                    result: 'guerreiro-escudo'  },
  { kw: ['flower', 'nature', 'plant', 'flor', 'natureza', 'planta', 'floresta', 'bloom', 'floral'],
    tags: ['Mage', 'Support'],                    result: 'floralista'        },
  { kw: ['astro', 'star', 'cosmic', 'estrela', 'astral', 'cosmos', 'celestial'],
    tags: ['Mage', 'Support'],                    result: 'astrologo'         },
  { kw: ['summon', 'invoca', 'conjura', 'spirit', 'invoke'],
    tags: ['Mage', 'Support'],                    result: 'invocador'         },
  { kw: ['flame', 'fire', 'frost', 'ice', 'storm', 'lightning', 'fogo', 'gelo', 'tempestade', 'relâmpago', 'elemental'],
    tags: ['Mage'],                               result: 'mago-elemental'    },
  { kw: ['psychic', 'mind', 'mente', 'psiônico', 'telepatia', 'mental'],
    tags: ['Mage'],                               result: 'esper'             },
  { kw: ['command', 'leader', 'general', 'strategy', 'commander'],
    tags: ['Mage', 'Support', 'Fighter'],         result: 'tatico-erudito'    },
  { kw: ['chant', 'song', 'music', 'bard', 'canto', 'música', 'melody', 'melodia'],
    tags: ['Support', 'Mage'],                    result: 'orador-bardo'      },
  { kw: ['heal', 'cure', 'holy', 'cura', 'sagrado', 'restore'],
    tags: ['Support'],                            result: 'curandeiro'        },
  { kw: ['dance', 'dança', 'acrobat'],
    tags: ['Assassin', 'Fighter'],                result: 'dançarino'         },
  { kw: ['mechanical', 'engineer', 'engenhoca', 'gadget', 'invent', 'tecnologia'],
    tags: ['Mage', 'Fighter'],                    result: 'inventor'          },
  { kw: ['pilot', 'vehicle', 'mount', 'piloto', 'veículo'],
    tags: ['Marksman', 'Fighter'],                result: 'piloto'            },
  { kw: ['card', 'fortune', 'azar', 'carta', 'gamble', 'aposta'],
    tags: ['Marksman', 'Mage'],                   result: 'carteador'         },
  { kw: ['gun', 'pistol', 'gunslinger', 'pistola', 'revólver', 'revolver', 'shoot'],
    tags: ['Marksman'],                           result: 'atirador-pistoleiro' },
  { kw: ['food', 'chef', 'cook', 'cozinha', 'comida'],
    tags: ['Fighter', 'Mage', 'Support', 'Tank', 'Assassin', 'Marksman'], result: 'gourmet' },
];

// ── Atributos default por tag ─────────────────────────────────────
const ATTR_BY_TAG = {
  Tank:     { des: 'd6', vig: 'd12', ast: 'd6', von: 'd8' },
  Marksman: { des: 'd12', vig: 'd6', ast: 'd8', von: 'd8' },
  Mage:     { des: 'd6', vig: 'd6', ast: 'd12', von: 'd10' },
  Assassin: { des: 'd12', vig: 'd6', ast: 'd8', von: 'd8' },
  Fighter:  { des: 'd10', vig: 'd10', ast: 'd6', von: 'd8' },
  Support:  { des: 'd6', vig: 'd8', ast: 'd10', von: 'd10' },
};

// ── Mapeamento de arquétipo (todas as camadas) ────────────────────
function mapArchetype(champion) {
  const id = champion.id;
  const text = [champion.name, champion.title, champion.blurb || ''].join(' ').toLowerCase();
  const primaryTag = champion.tags[0] || '';
  const layer1 = TAG_DEFAULT[primaryTag] || 'generalista';

  // Camada 2 — primeiro match vence
  let layer2 = null;
  for (const rule of KEYWORD_RULES) {
    if (!rule.tags.includes(primaryTag)) continue;
    for (const kw of rule.kw) {
      if (text.includes(kw.toLowerCase())) {
        layer2 = { arquetipo: rule.result, note: `keyword "${kw}" (tag ${primaryTag})` };
        break;
      }
    }
    if (layer2) break;
  }

  // Camada 3 — override
  const override = MANUAL_OVERRIDES[id] || null;

  // Decisão final: L3 > L2 > L1
  let final, finalLayer, finalNote;
  if (override) {
    final = override; finalLayer = 3; finalNote = 'override manual';
  } else if (layer2) {
    final = layer2.arquetipo; finalLayer = 2; finalNote = layer2.note;
  } else {
    final = layer1; finalLayer = 1;
    finalNote = layer1 === 'generalista'
      ? `tag "${primaryTag}" sem mapeamento → fallback`
      : `tag primária "${primaryTag}"`;
  }

  return { arquetipo: final, layer: finalLayer, note: finalNote, layer1, layer2, override };
}

// ── Build de entrada KB ───────────────────────────────────────────
function buildEntry(champion, arc) {
  const idLow = champion.id.toLowerCase();
  const blurb = (champion.blurb || '').replace(/\n/g, ' ').trim();
  const descricao = blurb.length > 220
    ? blurb.slice(0, 220).replace(/\s+\S*$/, '') + '…'
    : (blurb || `${champion.name}, ${champion.title}.`);

  const aliases = [...new Set([
    idLow,
    champion.name.toLowerCase(),
    champion.title.toLowerCase(),
  ])].filter(a => a.trim().length > 0);

  return {
    id: `lol-${idLow}`,
    nome: champion.name,
    aliases,
    arquetipo: arc.arquetipo,
    source: { franchise: 'League of Legends', work: 'League of Legends', category: 'video-game' },
    tema: champion.title || '',
    origem: champion.tags.join('/') || '',
    atributos: ATTR_BY_TAG[champion.tags[0]] || { des: 'd8', vig: 'd8', ast: 'd8', von: 'd8' },
    lacos: [],
    descricao,
    keyTraits:       [],
    suggestedQuirks: [],
    bondHints:       [],
  };
}

// ── Fetch com fetch() nativo (Node 18+) ──────────────────────────
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar ${url}`);
  return res.json();
}

// ── Carrega campeões (cache ou API) ──────────────────────────────
async function loadChampions() {
  if (fs.existsSync(CACHE_FILE)) {
    console.log(`  📦 Cache encontrado: ${CACHE_FILE}`);
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  }

  console.log(`  🌐 Descobrindo versão DDragon...`);
  const versions = await fetchJSON(DDRAGON_VERSIONS);
  const version = versions[0];
  console.log(`  ✅ Versão: ${version}`);

  const champUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`;
  console.log(`  🌐 Buscando campeões PT-BR: ${champUrl}`);
  const payload = await fetchJSON(champUrl);

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cache = { version, data: payload.data };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`  💾 Cache salvo: ${CACHE_FILE}\n`);

  return cache;
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  console.log('\n══════════════════════════════════════════════════════');
  console.log(` 🎮 seed-lol.js${DRY_RUN ? ' [DRY-RUN — primeiros 10]' : ' [SEED COMPLETO]'}`);
  console.log('══════════════════════════════════════════════════════\n');

  const { version, data } = await loadChampions();
  let champions = Object.values(data).sort((a, b) => a.id.localeCompare(b.id));
  console.log(`  Versão DDragon: ${version} | ${champions.length} campeões disponíveis\n`);

  if (DRY_RUN) {
    champions = champions.slice(0, 10);
    console.log('── Análise dos primeiros 10 (ordem alfabética por ID) ───────────\n');

    for (const champ of champions) {
      const arc = mapArchetype(champ);
      const entry = buildEntry(champ, arc);

      const l2disp = arc.layer2
        ? `${arc.layer2.arquetipo}  ← ${arc.layer2.note}`
        : '—';
      const l3disp = arc.override
        ? `${arc.override}  ← override manual`
        : '—';

      console.log(`┌─ ${champ.name} (ID: ${champ.id})`);
      console.log(`│  Tags: [${champ.tags.join(', ')}]   Título: "${champ.title}"`);
      console.log(`│  Camada 1: ${arc.layer1}`);
      console.log(`│  Camada 2: ${l2disp}`);
      console.log(`│  Camada 3: ${l3disp}`);
      console.log(`│  → Arquétipo final: [${arc.arquetipo}]  (via L${arc.layer})`);
      console.log(`│  Justificativa: ${arc.note}`);
      console.log(`│  ID KB: ${entry.id}`);
      console.log(`│  Desc: "${entry.descricao.slice(0, 90)}${entry.descricao.length > 90 ? '…' : ''}"`);
      console.log('└─\n');
    }

    console.log('══════════════════════════════════════════════════════');
    console.log(' DRY-RUN completo. Aguardando OK para seed completo.');
    console.log('══════════════════════════════════════════════════════\n');
    return;
  }

  // ── Seed completo ──────────────────────────────────────────────
  const entries = [];
  const byArch = {};
  const byLayer = { 1: 0, 2: 0, 3: 0 };
  const fallbacks = [];

  for (const champ of champions) {
    const arc = mapArchetype(champ);
    entries.push(buildEntry(champ, arc));
    byArch[arc.arquetipo] = (byArch[arc.arquetipo] || 0) + 1;
    byLayer[arc.layer]++;
    if (arc.arquetipo === 'generalista') fallbacks.push(`${champ.name} (${champ.id})`);
  }

  // Escreve arquivo de saída
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  const fileContent =
`// League of Legends champions — gerado por tools/seed-lol.js
// DDragon ${version} | ${new Date().toISOString().slice(0, 10)} | ${entries.length} campeões

const LOL_CHAMPIONS = ${JSON.stringify(entries, null, 2)};

if (typeof module !== 'undefined') module.exports = LOL_CHAMPIONS;
`;
  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');

  // Relatório
  console.log('══════════════════════════════════════════════════════');
  console.log(` ✅ Seed completo: ${entries.length} campeões`);
  console.log('══════════════════════════════════════════════════════');
  console.log(`\n  Por camada: L1(tag)=${byLayer[1]} | L2(keyword)=${byLayer[2]} | L3(override)=${byLayer[3]}`);
  console.log(`  Fallback generalista: ${fallbacks.length}`);
  if (fallbacks.length) fallbacks.forEach(n => console.log(`    ⚠️  ${n}`));

  console.log('\n  Distribuição por arquétipo:');
  Object.entries(byArch)
    .sort((a, b) => b[1] - a[1])
    .forEach(([arch, n]) => console.log(`    ${String(n).padStart(3)}  ${arch}`));

  console.log(`\n  Arquivo: ${OUTPUT_FILE}`);
  console.log('══════════════════════════════════════════════════════\n');
}

main().catch(e => {
  console.error('\n❌ Erro:', e.message);
  process.exit(1);
});
