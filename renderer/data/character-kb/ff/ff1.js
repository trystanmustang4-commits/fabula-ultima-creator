// Final Fantasy I — personagens curados (Fase 3.3, Batch 1)
// Decisão de design: WoL original (Dissidia) como entry canônica do herói puro +
// Garland + 4 jobs icônicos como entradas separadas, porque cada job é um arquétipo
// de personagem distinto que jogadores de FF constroem há 35 anos.

const FF1_CHARACTERS = [

  { id: 'ff1-warrior-of-light',
    nome: 'Warrior of Light', aliases: ['warrior of light', 'ff1 hero', 'dissidia warrior', 'guerreiro de luz ff1', 'knight of light', 'wol ff'], arquetipo: 'guerreiro-escudo',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy I', category: 'video-game' },
    tema: 'Luz sem história', origem: 'Guerreiro dos Cristais',
    atributos: { des: 'd8', vig: 'd10', ast: 'd6', von: 'd10' },
    lacos: [{ alvo: 'Cristais', emocoes: ['devoção'] }, { alvo: 'Companheiros', emocoes: ['proteção'] }],
    descricao: 'Um cavaleiro sem memórias nem nome que carrega um cristal vazio — o herói definitivo de Final Fantasy, construído para ser o espelho do jogador.',
    keyTraits: ['cristal vazio', 'armadura azul', 'herói sem rosto', 'luz que não sabe sua origem'],
    suggestedQuirks: ['glorioso_destino', 'arma_antiga'],
    bondHints: ['sua identidade é quem você escolher ser', 'a armadura brilha mesmo sem saber por que'] },

  { id: 'ff1-garland',
    nome: 'Garland', aliases: ['garland ff1', 'chaos garland', 'knight garland', 'chaos ff1', 'chaos final fantasy'], arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy I', category: 'video-game' },
    tema: 'O loop da ruína', origem: 'Cavaleiro Caído/Chaos',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd6' },
    lacos: [{ alvo: 'Fiends', emocoes: ['cumplicidade'] }, { alvo: 'Warriors of Light', emocoes: ['ódio cíclico'] }],
    descricao: 'O primeiro vilão de Final Fantasy: derrubado pelos heróis, que foram derrubá-los no passado, que ele enviou para salvá-lo — preso num loop temporal que ele mesmo teceu.',
    keyTraits: ['cavaleiro caído', 'Chaos', 'loop temporal', 'primeiro grande vilão de FF'],
    suggestedQuirks: ['portador_da_ruina', 'amaldicoado_af'],
    bondHints: ['criou o paradoxo que o prende', 'a queda começou muito antes de perder a armadura'] },

  { id: 'ff1-black-mage',
    nome: 'Black Mage', aliases: ['black mage ff', 'mago negro ff', 'black mage job', 'feiticeiro negro ff', 'bm ff1'], arquetipo: 'mago-elemental',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy I', category: 'video-game' },
    tema: 'Poder que queima', origem: 'Mago Negro',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [{ alvo: 'Grimório', emocoes: ['devoção'] }, { alvo: 'Grupo', emocoes: ['proteção à distância'] }],
    descricao: 'A toga negra, o chapéu pontudo e os olhos que brilham como brasas — o arquétipo puro do mago ofensivo que atravessou 35 anos de Final Fantasy sem precisar mudar.',
    keyTraits: ['toga negra', 'chapéu pontudo', 'olhos de brasa', 'fire-blizzard-thunder'],
    suggestedQuirks: ['grimorio_misterioso', 'de_um_mundo_distante_af'],
    bondHints: ['o poder queima quem usa e quem recebe', 'ninguém vê os olhos por debaixo do chapéu'] },

  { id: 'ff1-white-mage',
    nome: 'White Mage', aliases: ['white mage ff', 'maga branca ff', 'white mage job', 'wm ff1', 'curandeira ff'], arquetipo: 'curandeiro',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy I', category: 'video-game' },
    tema: 'Cura como vocação', origem: 'Maga Branca',
    atributos: { des: 'd6', vig: 'd8', ast: 'd12', von: 'd8' },
    lacos: [{ alvo: 'Grupo', emocoes: ['dever de cura'] }, { alvo: 'Cristal Branco', emocoes: ['devoção'] }],
    descricao: 'A maga de manto branco que mantém todos vivos com Cure e Holy enquanto o mundo acaba ao redor — a vocação de cuidar nunca pede reconhecimento.',
    keyTraits: ['manto branco', 'Cure e Holy', 'vocação de curar', 'frágil e necessária'],
    suggestedQuirks: ['glorioso_destino', 'regressado'],
    bondHints: ['não cura para ser agradecida, cura porque é o que é', 'quem cura raramente está no centro do crédito'] },

  { id: 'ff1-thief',
    nome: 'Thief', aliases: ['thief ff1', 'ninja ff1', 'ladrao ff', 'thief job ff', 'ninja job final fantasy'], arquetipo: 'ladino-arqueiro',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy I', category: 'video-game' },
    tema: 'Velocidade como sobrevivência', origem: 'Ladrão/Ninja',
    atributos: { des: 'd12', vig: 'd6', ast: 'd8', von: 'd8' },
    lacos: [{ alvo: 'Grupo', emocoes: ['aliança conveniente'] }, { alvo: 'Liberdade', emocoes: ['obsessão'] }],
    descricao: 'O mais rápido do grupo — evolui para Ninja, aprende magias, nunca fica parado o suficiente para ser acertado, e não pergunta o que é do grupo ou do que não é.',
    keyTraits: ['velocidade máxima', 'fuga e contra-ataque', 'evolui para ninja', 'destreza como filosofia'],
    suggestedQuirks: ['delinquente_infernal', 'maos_vazias'],
    bondHints: ['se não pode fugir, ainda pode roubar a iniciativa', 'a velocidade é o que o separa do caos'] },

  { id: 'ff1-red-mage',
    nome: 'Red Mage', aliases: ['red mage ff', 'mago vermelho ff', 'mago vermelho job', 'feiticeiro vermelho', 'espada e magia ff'], arquetipo: 'guerreiro-arcano',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy I', category: 'video-game' },
    tema: 'Mestre de nenhum ofício', origem: 'Mago Vermelho',
    atributos: { des: 'd8', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [{ alvo: 'Especialistas', emocoes: ['rivalidade implícita'] }, { alvo: 'Grupo', emocoes: ['versatilidade necessária'] }],
    descricao: 'Usa espada e magia, luta na vanguarda e lança Fire depois — nunca supera um especialista mas nunca é inútil, e isso incomoda mais do que qualquer derrota.',
    keyTraits: ['espada e magia', 'chapéu de aba', 'mestre de nenhum ofício', 'nunca inútil'],
    suggestedQuirks: ['prodigios_rivais', 'heranca'],
    bondHints: ['o grupo precisa de alguém que faça tudo', 'nunca vence numa comparação direta, vence na soma'] },

];

if (typeof module !== 'undefined') module.exports = FF1_CHARACTERS;
