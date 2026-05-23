// Dragon Quest — Character KB

const DRAGON_QUEST_CHARACTERS = [

  { id: 'dq-luminary',
    nome: 'The Luminary',
    aliases: ['Luminary', 'The Luminary', 'Eleven', 'Hero of DQ11'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Dragon Quest', work: 'Dragon Quest XI (2017)', category: 'video-game' },
    tema: 'Heroísmo silencioso que os outros definem em volta',
    origem: 'Chosen Hero de Dundrasil',
    atributos: { des: 'd10', vig: 'd10', ast: 'd6', von: 'd8' },
    lacos: [
      { alvo: 'Companions (Erik e grupo)', emocoes: ['família escolhida'] },
      { alvo: 'Yggdrasil (mundo)', emocoes: ['responsabilidade de herói'] },
      { alvo: 'Mordegon', emocoes: ['oposição inevitável'] },
    ],
    descricao: 'Herói reencarnado que descobre sua herança em Cobblestone e parte para salvar o mundo que, a certa altura, estava melhor sem ele. O Luminary é definido pelos companions ao seu redor — silencioso, confiável, o centro de gravidade do grupo. Seu arco inclui perder tudo, e mesmo assim continuar.',
    keyTraits: ['Espada e escudo de guerreiro versátil', 'Magia de batalha complementar ao corpo a corpo', 'Herói que as profecias apontam mas que escolhe caminhar', 'Âncora emocional do grupo sem precisar de palavras', 'Arco de perda total e reconstrução gradual'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Companions que são a razão de seguir (grupo)', 'Mundo que vale ser salvo mesmo quando rejeita o herói (Yggdrasil)', 'Adversário que é o contraponto do destino (Mordegon)'] },

  { id: 'dq-sylvando',
    nome: 'Sylvando',
    aliases: ['Sylvando', 'Sylvando Doright', 'The Dazzling Jester'],
    arquetipo: 'orador-bardo',
    source: { franchise: 'Dragon Quest', work: 'Dragon Quest XI (2017)', category: 'video-game' },
    tema: 'Alegria como resistência e presente ao mundo',
    origem: 'Artista e Viajante',
    atributos: { des: 'd10', vig: 'd6', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Luminary', emocoes: ['admiração', 'lealdade exuberante'] },
      { alvo: 'Don Rodrigo (pai)', emocoes: ['amor', 'aceitação buscada'] },
      { alvo: 'Espetáculo (missão)', emocoes: ['identidade', 'legado'] },
    ],
    descricao: 'Artista circense que decidiu trazer alegria ao mundo e nunca questionou essa missão. Sylvando é o coração emocional do grupo de DQ11 — não no sentido quieto, mas no sentido de que entra numa sala e todos ficam um pouco mais vivos. Suas facas voam com estilo; sua lealdade, com absoluta convicção.',
    keyTraits: ['Facas e venenos aplicados com flair teatral', 'Buffs de moral que afetam o grupo inteiro', 'Alegria como ato político e pessoal', 'Arco de reconciliação com pai que não aceitava', 'Carisma que converte inimigos em audiência'],
    suggestedQuirks: ['mil_faces', 'glorioso_destino'],
    bondHints: ['Herói que merece o melhor espetáculo (Luminary)', 'Pai que um dia vai entender (Don Rodrigo)', 'Palco que é o mundo inteiro (missão)'] },

  { id: 'dq-jade',
    nome: 'Jade',
    aliases: ['Jade', 'Jade (DQ11)', 'Princess of Heliodor'],
    arquetipo: 'furioso-guerreiro',
    source: { franchise: 'Dragon Quest', work: 'Dragon Quest XI (2017)', category: 'video-game' },
    tema: 'Força que cresceu durante o exílio',
    origem: 'Princesa de Heliodor',
    atributos: { des: 'd10', vig: 'd10', ast: 'd6', von: 'd8' },
    lacos: [
      { alvo: 'Luminary', emocoes: ['irmandade de infância', 'lealdade renovada'] },
      { alvo: 'Heliodor', emocoes: ['identidade', 'dívida de retorno'] },
      { alvo: 'Combate (arte)', emocoes: ['vocação', 'prazer'] },
    ],
    descricao: 'Princesa de Heliodor que cresceu exilada e usou o tempo para se tornar a melhor lutadora corporal do mundo. Jade não usa armas — usa pernadas, garras e lança. Sua serenidade em combate é de quem já processou que a força é real e suficiente. Mais letal do que a maioria dos guerreiros armados.',
    keyTraits: ['Combate corpo a corpo com pernas e lança', 'Serenidade de elite que não precisa de agressividade', 'Força conquistada durante exílio forçado', 'Beleza que inimigos subestimam exatamente uma vez', 'Lealdade à família escolhida acima de obrigações reais'],
    suggestedQuirks: ['maos_vazias', 'sobrevivente_nf'],
    bondHints: ['Irmão de coração que é o motivo de voltar (Luminary)', 'Lar que precisa ser redimido (Heliodor)', 'Arte marcial como expressão de identidade (combate)'] },

];

if (typeof module !== 'undefined') module.exports = DRAGON_QUEST_CHARACTERS;
