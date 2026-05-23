// Platformers Indie — Character KB

const PLATFORMERS_CHARACTERS = [

  { id: 'platform-shovel-knight',
    nome: 'Shovel Knight',
    aliases: ['Shovel Knight', 'The Blue Burrower'],
    arquetipo: 'guerreiro-escudo',
    source: { franchise: 'Shovel Knight', work: 'Shovel Knight (2014)', category: 'video-game' },
    tema: 'Código de cavalaria como identidade absoluta',
    origem: 'Cavaleiro Errante',
    atributos: { des: 'd8', vig: 'd10', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Shield Knight', emocoes: ['amor', 'missão de resgate'] },
      { alvo: 'Código de Cavalaria', emocoes: ['identidade', 'guia de todo julgamento'] },
      { alvo: 'Order of No Quarter', emocoes: ['oposição honorável'] },
    ],
    descricao: 'Cavaleiro azul que usa uma pá como espada e escudo com a mesma dignidade que qualquer lâmina nobre. Shovel Knight segue um código de cavalaria que nunca quebra: não rouba, não maltrata os fracos, honra adversários dignos. Sua missão é resgatar Shield Knight da Tower of Fate — e cada knight do Order é um obstáculo que trata com respeito.',
    keyTraits: ['Pá como arma de cavalheiro sem ironia', 'Código de cavalaria como constituição pessoal', 'Shovel Drop como ataque icônico', 'Honra que aplica mesmo a vilões', 'Amor por Shield Knight como motor e coração'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Amor que é a razão da jornada (Shield Knight)', 'Código que nunca dobra (cavalaria)', 'Inimigos que merecem ser derrotados com honra (Order)'] },

  { id: 'platform-cuphead',
    nome: 'Cuphead',
    aliases: ['Cuphead', 'Cuphead (the character)'],
    arquetipo: 'apostador',
    source: { franchise: 'Cuphead', work: 'Cuphead (2017)', category: 'video-game' },
    tema: 'Impulsividade que arrasta outros para o caos',
    origem: 'Habitante da Inkwell Isle',
    atributos: { des: 'd10', vig: 'd6', ast: 'd8', von: 'd6' },
    lacos: [
      { alvo: 'Mugman', emocoes: ['irmandade', 'arrasto em aventura indesejada'] },
      { alvo: 'The Devil', emocoes: ['dívida', 'aposta que não devia ter feito'] },
      { alvo: 'Bosses', emocoes: ['dívida como motivação'] },
    ],
    descricao: 'Xícara de café animada dos anos 30 que apostou a própria alma com o Diabo no cassino e perdeu. Agora precisa cobrar as almas dos outros para pagar a dívida — e arrastou o irmão junto por impulso. Cada boss fight é um devedor com design de caricatura de jazz age. Cuphead é o personagem que aprende que decisões têm consequências depois de viver elas.',
    keyTraits: ['Disparos de energia como kit de run & gun', 'Parry como mecânica de habby rosa', 'Impulsividade que inicia todas as tramas', 'Irmandade com Mugman como apoio relutante', 'Animação dos anos 30 como estética de identidade'],
    suggestedQuirks: ['glorioso_destino', 'sobrevivente_nf'],
    bondHints: ['Irmão arrastado mas leal (Mugman)', 'Dívida que não deveria existir (Devil)', 'Devedores que precisam ser convencidos (bosses)'] },

  { id: 'platform-rayman',
    nome: 'Rayman',
    aliases: ['Rayman'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Rayman', work: 'Rayman series', category: 'video-game' },
    tema: 'Leveza que esconde capacidade',
    origem: 'Herói sem membros conectados',
    atributos: { des: 'd12', vig: 'd6', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Globox', emocoes: ['amizade improvável', 'lealdade cômica'] },
      { alvo: 'Teensies', emocoes: ['proteção do povo'] },
      { alvo: 'Mr. Dark / Rabbids', emocoes: ['oposição de diferentes tons'] },
    ],
    descricao: 'Herói sem pescoço, quadris ou conectores entre torso e membros que mesmo assim é um dos melhores plataformistas dos anos 90-2000. Rayman usa os próprios punhos, cabelo de hélice e pelos como extensões voladoras. Sua leveza física é literal — flutua, desliza, usa cada ausência de articulação como vantagem.',
    keyTraits: ['Punhos voadores como ataque de longo alcance', 'Cabelo de hélice para planar', 'Anatomia única que vira vantagem de mobilidade', 'Amizade com Globox como dinâmica cômica e genuína', 'Herói de fantasia colorida que esconde dificuldade real'],
    suggestedQuirks: ['glorioso_destino', 'mil_faces'],
    bondHints: ['Amigo azul que está lá de alguma forma (Globox)', 'Povo pequeno que precisa de herói grande (Teensies)', 'Antagonistas que variam do sinistro ao absurdo (vilões)'] },

];

if (typeof module !== 'undefined') module.exports = PLATFORMERS_CHARACTERS;
