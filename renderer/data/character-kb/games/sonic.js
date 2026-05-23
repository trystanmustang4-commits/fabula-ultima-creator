// Sonic the Hedgehog — Character KB

const SONIC_CHARACTERS = [

  { id: 'sonic-sonic',
    nome: 'Sonic',
    aliases: ['Sonic', 'Sonic the Hedgehog', 'Blue Blur'],
    arquetipo: 'explorador-furtivo',
    source: { franchise: 'Sonic the Hedgehog', work: 'Sonic the Hedgehog series', category: 'video-game' },
    tema: 'Liberdade como filosofia de vida',
    origem: 'Ouriço das pradarias de Green Hill',
    atributos: { des: 'd12', vig: 'd8', ast: 'd6', von: 'd8' },
    lacos: [
      { alvo: 'Tails', emocoes: ['fraternidade', 'proteção leve'] },
      { alvo: 'Eggman', emocoes: ['rivalidade divertida', 'desprezo'] },
      { alvo: 'Shadow', emocoes: ['respeito tenso', 'curiosidade'] },
    ],
    descricao: 'Ouriço azul que pode superar a velocidade do som e ainda assim prefere correr a voar. Sonic é a liberdade encarnada — não suporta ordens, não tolera injustiça, e resolve qualquer problema na velocidade que precisar. Sua confiança não é arrogância: ele realmente é esse bom, e sabe disso.',
    keyTraits: ['Velocidade supersônica como identidade', 'Liberdade como valor intransigente', 'Confiança sem arrogância real', 'Atitude descontraída mesmo em crise', 'Lealdade rápida mas genuína'],
    suggestedQuirks: ['glorioso_destino', 'sobrevivente_nf'],
    bondHints: ['Irmandade de velocidade diferente (Tails)', 'Rival que nunca aprende (Eggman)', 'Espelho sombrio que respeita (Shadow)'] },

  { id: 'sonic-shadow',
    nome: 'Shadow',
    aliases: ['Shadow', 'Shadow the Hedgehog', 'Ultimate Life Form'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Sonic the Hedgehog', work: 'Sonic Adventure 2 (2001)', category: 'video-game' },
    tema: 'Identidade construída sobre promessa a alguém morto',
    origem: 'Forma de vida definitiva criada por Gerald Robotnik',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Maria Robotnik', emocoes: ['amor eterno', 'promessa sagrada'] },
      { alvo: 'Sonic', emocoes: ['rivalidade respeitosa', 'reconhecimento'] },
      { alvo: 'GUN/humanidade', emocoes: ['rancor', 'dívida ambígua'] },
    ],
    descricao: 'Criado para ser a forma de vida definitiva, Shadow carrega o luto de Maria como armadura e arma. Chaos Control e Chaos Spear são poder puro sem restrição ética — mas sua bússola moral é a promessa que fez a uma criança moribunda. Mais sombrio que Sonic em forma, mas não necessariamente em coração.',
    keyTraits: ['Chaos Control como teleporte e congelamento do tempo', 'Promessa a Maria como código moral', 'Força que iguala ou supera Sonic', 'Arco de identidade: quem sou sem minhas memórias?', 'Lealdade lenta mas inabalável quando dada'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Amor que sobrevive à morte (Maria)', 'Rival que é o positivo do seu negativo (Sonic)', 'Humanidade que te criou e destruiu (GUN)'] },

  { id: 'sonic-knuckles',
    nome: 'Knuckles',
    aliases: ['Knuckles', 'Knuckles the Echidna'],
    arquetipo: 'barbaro-furioso',
    source: { franchise: 'Sonic the Hedgehog', work: 'Sonic the Hedgehog 3 (1994)', category: 'video-game' },
    tema: 'Dever solitário como honra e prisão',
    origem: 'Guardião da Master Emerald',
    atributos: { des: 'd8', vig: 'd12', ast: 'd6', von: 'd8' },
    lacos: [
      { alvo: 'Master Emerald', emocoes: ['dever', 'identidade'] },
      { alvo: 'Sonic', emocoes: ['rivalidade', 'amizade relutante'] },
      { alvo: 'Eggman', emocoes: ['rancor de ter sido enganado'] },
    ],
    descricao: 'Guardião solitário da Master Emerald na Ilha do Anjo, Knuckles é força bruta temperada por responsabilidade ancestral. Fácil de enganar por ser honesto demais para suspeitar da desonestidade alheia. Seus socos partem rochas; seu coração parte de dever — e às vezes de solidão.',
    keyTraits: ['Força física superior a Sonic', 'Guardião solitário por herança', 'Honestidade que vira vulnerabilidade', 'Orgulho que torna alianças difíceis', 'Conexão com poder das Chaos Emeralds'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Dever que precede qualquer escolha (Emerald)', 'Rival que é mais irmão do que admite (Sonic)', 'Cicatriz de ter sido usado (Eggman)'] },

];

if (typeof module !== 'undefined') module.exports = SONIC_CHARACTERS;
