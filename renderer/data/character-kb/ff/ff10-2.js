// Final Fantasy X-2 — personagens curados (Fase 3.3, Batch 4)

const FF10_2_CHARACTERS = [

  { id: 'ff10-2-yuna',
    nome: 'Yuna (X-2)', aliases: ['yuna x-2', 'yuna ffx-2', 'yuna gunner', 'dressphere yuna', 'yuna 1000 words'], arquetipo: 'dançarino',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy X-2', category: 'video-game' },
    tema: 'Encontrar a si mesma depois do sacrifício', origem: 'Caçadora de Esferas/Ex-Invocadora',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [{ alvo: 'Tidus', emocoes: ['busca e esperança'] }, { alvo: 'Rikku e Paine', emocoes: ['amizade YRP'] }, { alvo: 'Spira', emocoes: ['liberdade de não ser guardiã'] }],
    descricao: 'Sobreviveu ao sacrifício e decidiu que desta vez ia viver para si — trocou a staff pelas pistolas e a peregrinação pela caça às esferas porque merecia uma vida que escolhesse.',
    keyTraits: ['dresspheres', 'pistoleira', 'YRP caçadoras', 'liberdade conquistada'],
    suggestedQuirks: ['regressado', 'glorioso_destino'],
    bondHints: ['aprendeu a sorrir sem precisar de razão para parar', 'o sorriso de X-2 é diferente do de X — este ela escolheu'] },

  { id: 'ff10-2-paine',
    nome: 'Paine', aliases: ['paine', 'paine ff10-2', 'paine ffx-2', 'paine warrior', 'paine yrp'], arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy X-2', category: 'video-game' },
    tema: 'O passado que não some só porque você para de falar', origem: 'Ex-Observadora/Guerreira',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd6' },
    lacos: [{ alvo: 'Yuna e Rikku', emocoes: ['parceria de YRP'] }, { alvo: 'Pasado da Gullwings', emocoes: ['dívida não resolvida'] }, { alvo: 'Silêncio', emocoes: ['armadura'] }],
    descricao: 'Juntou-se às Gullwings carregando um passado que não contou por dois discos inteiros — e quando contou, não foi pedindo desculpa, foi explicando.',
    keyTraits: ['espadachim silenciosa', 'dressphere também', 'passado com a Crimson Squad', 'poucas palavras todas certas'],
    suggestedQuirks: ['sobrevivente_tf', 'grilhoes_do_coracao'],
    bondHints: ['o silêncio não é mistério — é o custo de carregar o que ela carrega', 'quando fala, é porque o momento pede e não há mais como adiar'] },

];

if (typeof module !== 'undefined') module.exports = FF10_2_CHARACTERS;
