// God of War — Character KB

const EXTRAS_GOW_CHARACTERS = [

  { id: 'gow-atreus',
    nome: 'Atreus',
    aliases: ['Atreus', 'Loki', 'Boy', 'Atreus (GoW)'],
    arquetipo: 'ladino-arqueiro',
    source: { franchise: 'God of War', work: 'God of War (2018)', category: 'video-game' },
    tema: 'Identidade dividida entre dois mundos e dois nomes',
    origem: 'Filho de Kratos e Faye',
    atributos: { des: 'd10', vig: 'd6', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Kratos', emocoes: ['amor filial', 'busca por aprovação'] },
      { alvo: 'Jormungandr / Gigantes', emocoes: ['conexão de sangue', 'herança Jotnar'] },
      { alvo: 'Loki (identidade)', emocoes: ['destino revelado', 'peso do nome'] },
    ],
    descricao: 'Filho de deus grego e gigante nórdica que aprendeu luta com o pai e linguagem dos deuses com a mãe. Atreus usa arco com flechas rúnicas e invocações de animais — mais rápido e mágico que Kratos. Em Ragnarok cresce para carregar sozinho o peso de Loki como identidade e responsabilidade.',
    keyTraits: ['Arco rúnico com invocações de animais', 'Linguagem dos deuses como habilidade única', 'Curiosidade que excede cautela com frequência', 'Identidade como Loki revelada e carregada', 'Crescimento de Boy para agente independente'],
    suggestedQuirks: ['heranca', 'de_um_mundo_distante_af'],
    bondHints: ['Pai que é modelo impossível e humano ao mesmo tempo (Kratos)', 'Serpente do mundo que é família distante (Jormungandr)', 'Nome que é destino e fardo (Loki)'] },

];

if (typeof module !== 'undefined') module.exports = EXTRAS_GOW_CHARACTERS;
