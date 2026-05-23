// Mega Man / Mega Man X — Character KB

const MEGA_MAN_CHARACTERS = [

  { id: 'megaman-x',
    nome: 'Mega Man X',
    aliases: ['X', 'Mega Man X', 'Rock (X)'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Mega Man', work: 'Mega Man X series', category: 'video-game' },
    tema: 'Questionar ordens é o que nos torna humanos',
    origem: 'Reploid criado pelo Dr. Light',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Zero', emocoes: ['parceria mais próxima', 'inspiração mútua'] },
      { alvo: 'Dr. Light', emocoes: ['herança', 'padrão a alcançar'] },
      { alvo: 'Mavericks (dilema)', emocoes: ['culpa', 'dúvida existencial'] },
    ],
    descricao: 'Primeiro Reploid capaz de tomar decisões além da programação — e esse poder o tornou também capaz de questionar se o que faz é certo. X usa X-Buster e absorve armas de inimigos derrotados; seu arco é existencial: pode um robô que luta para proteger a vida chamar isso de virtude ou é apenas programação mais sofisticada?',
    keyTraits: ['X-Buster carregável + absorção de armas de boss', 'Dúvida moral como característica central', 'Dash e wall-climb como mobilidade definidora', 'Parceria com Zero como âncora e espelho', 'Pergunta sobre livre-arbítrio como tema de vida'],
    suggestedQuirks: ['robo_tf', 'glorioso_destino'],
    bondHints: ['Parceiro que compensa o que falta (Zero)', 'Criador que esperava mais do que X acredita merecer (Dr. Light)', 'Inimigos que levantam perguntas sem resposta (Mavericks)'] },

  { id: 'megaman-zero',
    nome: 'Zero',
    aliases: ['Zero', 'Zero (MMX)', 'The Red Maverick Hunter'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Mega Man', work: 'Mega Man X series', category: 'video-game' },
    tema: 'Redenção de uma origem de destruição',
    origem: 'Reploid criado por Dr. Wily',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'X', emocoes: ['proteção', 'crença'] },
      { alvo: 'Iris / Ciel', emocoes: ['amor que não sobrevive à guerra'] },
      { alvo: 'Wily Virus', emocoes: ['origem que tenta superar'] },
    ],
    descricao: 'Criado por Dr. Wily para destruir, Zero foi congelado porque era perigoso demais. Acordou com a maioria do vírus suprimida e se tornou o melhor Maverick Hunter — usando Z-Saber com técnica que X nunca alcança. Sua tragédia é saber de onde vem e escolher todos os dias ser outra coisa.',
    keyTraits: ['Z-Saber: espadachim de precisão absoluta', 'Zero Knuckle e técnicas expandidas na série Zero', 'Origem de vilão que é o peso que carrega', 'Proteção de X como missão que dá sentido', 'Sacrifícios que não hesita quando é o momento'],
    suggestedQuirks: ['robo_tf', 'heranca'],
    bondHints: ['Parceiro que acredita mesmo sabendo a origem (X)', 'Amor que a guerra não permite existir (Iris/Ciel)', 'Vírus que é parte de si mesmo e precisa ser negado (Wily)'] },

  { id: 'megaman-bass',
    nome: 'Bass',
    aliases: ['Bass', 'Forte', 'Bass (Classic)'],
    arquetipo: 'atirador-pistoleiro',
    source: { franchise: 'Mega Man', work: 'Mega Man 7 (1995)', category: 'video-game' },
    tema: 'Orgulho que não cede nem para o certo nem para o errado',
    origem: 'Robô criado por Dr. Wily',
    atributos: { des: 'd12', vig: 'd6', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Mega Man', emocoes: ['rivalidade pura', 'reconhecimento involuntário'] },
      { alvo: 'Wily', emocoes: ['lealdade com ressentimento'] },
      { alvo: 'Treble', emocoes: ['parceria', 'fusão de poder'] },
    ],
    descricao: 'Rival criado para superar Mega Man — e que frequentemente combate ambos os lados por conta própria. Bass atira em rajadas rápidas, usa Treble Boost para voar e tem orgulho ferido como principal motivação. Não é aliado nem inimigo fixo: é o terceiro elemento que aparece quando quer.',
    keyTraits: ['Bass Buster: rajadas rápidas em 8 direções', 'Treble Boost: fusão para mobilidade aérea', 'Rivalidade com Mega Man como identidade central', 'Opera pela própria agenda, não por ordens', 'Orgulho que impede alianças convenientes'],
    suggestedQuirks: ['robo_tf', 'prodigios_rivais'],
    bondHints: ['Rival que é o único que importa (Mega Man)', 'Criador que é obstáculo mesmo sendo origem (Wily)', 'Companheiro que é extensão de poder (Treble)'] },

];

if (typeof module !== 'undefined') module.exports = MEGA_MAN_CHARACTERS;
