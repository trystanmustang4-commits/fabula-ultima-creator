// Super Mario — Character KB

const MARIO_CHARACTERS = [

  { id: 'mario-mario',
    nome: 'Mario',
    aliases: ['Mario', 'Super Mario', 'Jumpman', 'Mario Mario'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Super Mario', work: 'Super Mario series', category: 'video-game' },
    tema: 'Otimismo invencível que não pede justificativa',
    origem: 'Encanador de Brooklyn',
    atributos: { des: 'd10', vig: 'd8', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Peach', emocoes: ['amor leal', 'motivação'] },
      { alvo: 'Luigi', emocoes: ['fraternidade', 'proteção'] },
      { alvo: 'Bowser', emocoes: ['rivalidade sem ódio'] },
    ],
    descricao: 'Encanador italiano que empurra o chapéu para frente e corre em direção ao castelo sem hesitar. Mario não é particularmente forte ou inteligente — é o herói arquetípico que funciona porque nunca para. Sua força é a consistência: em qualquer universo, gênero ou forma, Mario chega ao fim.',
    keyTraits: ['Otimismo como superpoder prático', 'Versatilidade absurda de formas e habilidades', 'Amor simples e sincero por Peach', 'Irmão mais velho protetor', 'Herói sem arrogância nem complexidade excessiva'],
    suggestedQuirks: ['glorioso_destino', 'mil_faces'],
    bondHints: ['Amor que sobrevive a qualquer sequestro (Peach)', 'Irmandade que aceita diferenças (Luigi)', 'Rivalidade que não precisa de ódio (Bowser)'] },

  { id: 'mario-bowser',
    nome: 'Bowser',
    aliases: ['Bowser', 'King Koopa', 'Rei Koopa', 'Bowser Koopa'],
    arquetipo: 'barbaro-furioso',
    source: { franchise: 'Super Mario', work: 'Super Mario series', category: 'video-game' },
    tema: 'Tirania como amor mal-direcionado',
    origem: 'Rei dos Koopas',
    atributos: { des: 'd6', vig: 'd12', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Peach', emocoes: ['amor obsessivo', 'adoração'] },
      { alvo: 'Mario', emocoes: ['ódio-rival', 'respeito forçado'] },
      { alvo: 'Bowser Jr.', emocoes: ['amor paterno genuíno'] },
    ],
    descricao: 'Rei dos Koopas cujo exército, castelos e planos infinitos servem um único propósito: conquistar o coração de Peach. Força bruta absoluta — fire breath, garras, carapaça de espinhos — mas sua motivação é ao mesmo tempo patética e genuína. Pai devotado para Bowser Jr., tirano temível para todos os outros.',
    keyTraits: ['Força bruta capaz de mover castelos', 'Amor obsessivo por Peach como motor', 'Pai genuinamente amoroso com Bowser Jr.', 'Tirano que se alia a Mario quando necessário', 'Ego monumental que funciona como piada e ameaça'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Amor que justifica qualquer exagero (Peach)', 'Rival que é o único digno (Mario)', 'Filho que vê o rei real (Jr.)'] },

  { id: 'mario-rosalina',
    nome: 'Rosalina',
    aliases: ['Rosalina', 'Rosalinda'],
    arquetipo: 'mago-arcano',
    source: { franchise: 'Super Mario', work: 'Super Mario Galaxy (2007)', category: 'video-game' },
    tema: 'Solidão cósmica que se torna força materna',
    origem: 'Guardiã das Lumas',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd12' },
    lacos: [
      { alvo: 'Lumas', emocoes: ['amor materno', 'responsabilidade'] },
      { alvo: 'Mãe (memória)', emocoes: ['saudade', 'paz'] },
      { alvo: 'Universo', emocoes: ['contemplação', 'guarda'] },
    ],
    descricao: 'Guardiã do Observatório das Estrelas que viaja o cosmos com suas Lumas — estrelas-filhotes que um dia se tornarão galáxias. Rosalina perdeu sua família mas encontrou uma nova entre as estrelas. Sua serenidade não é fria: é a de quem já chorou tudo que havia para chorar e encontrou paz no lado de lá.',
    keyTraits: ['Magia cósmica e estelar', 'Mãe de estrelas em jornada eterna', 'Serenidade conquistada por perda', 'Perspectiva universal sobre problemas mundanos', 'Guarda do equilíbrio cósmico'],
    suggestedQuirks: ['de_um_mundo_distante_af', 'glorioso_destino'],
    bondHints: ['Amor que transcende espécie (Lumas)', 'Paz com perda que virou sabedoria (mãe)', 'Universo como lar depois de não ter um'] },

];

if (typeof module !== 'undefined') module.exports = MARIO_CHARACTERS;
