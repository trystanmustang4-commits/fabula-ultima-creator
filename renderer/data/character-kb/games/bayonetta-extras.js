// Bayonetta — Character KB

const BAYONETTA_EXTRAS_CHARACTERS = [

  { id: 'bayonetta-jeanne',
    nome: 'Jeanne',
    aliases: ['Jeanne', 'Jeanne (Bayonetta)', 'Rosa (alias)'],
    arquetipo: 'dançarino',
    source: { franchise: 'Bayonetta', work: 'Bayonetta series', category: 'video-game' },
    tema: 'Rivalidade que é amor com armas no lugar de palavras',
    origem: 'Bruxa Umbra de elite',
    atributos: { des: 'd12', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Bayonetta', emocoes: ['rivalidade de vida inteira', 'lealdade total'] },
      { alvo: 'Cobertura de professora', emocoes: ['identidade alternativa', 'missão disfarçada'] },
      { alvo: 'Madama Styx', emocoes: ['contrato', 'poder complementar'] },
    ],
    descricao: 'Igual a Bayonetta em poder, oposta em estilo — onde Bayonetta é exuberante, Jeanne é precisa e contida. Suas pistolas têm trajetórias brancas contra as vermelhas da rival. Em Bayo1 parece antagonista; em Bayo2 é a razão de toda a missão. Sua lealdade se expressa como combate: testa quem ama pela força.',
    keyTraits: ['Witch Time e Wicked Weaves espelhando Bayonetta', 'Precisão que contrasta com exuberância da rival', 'Lealdade que se manifesta como desafio constante', 'Professor disfarçado que esconde missão verdadeira', 'Pistolas brancas como assinatura visual distinta'],
    suggestedQuirks: ['mil_faces', 'heranca'],
    bondHints: ['Rival que é a única que entende (Bayonetta)', 'Missão que exige disfarce de identidade (professora)', 'Poder que complementa em vez de duplicar (Madama Styx)'] },

];

if (typeof module !== 'undefined') module.exports = BAYONETTA_EXTRAS_CHARACTERS;
