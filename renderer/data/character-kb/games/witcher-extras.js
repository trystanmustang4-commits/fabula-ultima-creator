// The Witcher — extras (Geralt já está em character-kb.js)

const WITCHER_EXTRAS_CHARACTERS = [

  { id: 'witcher-ciri',
    nome: 'Ciri',
    aliases: ['Ciri', 'Cirilla', 'Lion Cub of Cintra', 'The Lady of Space and Time'],
    arquetipo: 'sombra-selvagem',
    source: { franchise: 'The Witcher', work: 'The Witcher series', category: 'video-game' },
    tema: 'Fugitiva de um destino que não escolheu',
    origem: 'Princesa de Cintra',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Geralt', emocoes: ['amor filial', 'confiança incondicional'] },
      { alvo: 'Yennefer', emocoes: ['amor materno tenso', 'aprendizado'] },
      { alvo: 'Wild Hunt', emocoes: ['fuga constante', 'terror'] },
    ],
    descricao: 'Princesa com poder de manipular espaço e tempo que passou anos fugindo de quem quer explorar esse dom. Treinada como Witcher parcialmente, com sua própria espada e velocidade sobrenatural, Ciri é mais que sua herança — mas a herança não para de persegui-la. Seu arco é de criança fugitiva que se torna a pessoa mais poderosa do mundo.',
    keyTraits: ['Poder de salto espaço-temporal único', 'Treinamento Witcher com espada própria', 'Criança fugitiva que cresceu em crise', 'Destino de Elder Blood como fardo e arma', 'Amor filial com Geralt como âncora emocional'],
    suggestedQuirks: ['de_um_mundo_distante_af', 'sobrevivente_nf'],
    bondHints: ['Pai de escolha que é o único lar (Geralt)', 'Mãe de escolha que é dura e real (Yennefer)', 'Caçadores que definem a urgência de tudo (Wild Hunt)'] },

  { id: 'witcher-yennefer',
    nome: 'Yennefer de Vengerberg',
    aliases: ['Yennefer', 'Yen', 'Yennefer of Vengerberg', 'iennefer', 'iennefer de vengerberg'],
    arquetipo: 'mago-sombrio',
    source: { franchise: 'The Witcher', work: 'The Witcher series', category: 'video-game' },
    tema: 'Poder conquistado ao preço da humanidade',
    origem: 'Feiticeira de Vengerberg',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd12' },
    lacos: [
      { alvo: 'Geralt', emocoes: ['amor-ódio', 'destino compartilhado'] },
      { alvo: 'Ciri', emocoes: ['amor materno conquistado', 'proteção'] },
      { alvo: 'Brotherhood of Sorcerers', emocoes: ['pertencimento ambíguo', 'cinismo'] },
    ],
    descricao: 'Transformou um corpo corcunda e rejeitado em uma das feiticeiras mais poderosas do norte — ao custo da capacidade de ter filhos. Yennefer é fria, calculista e intransigente sobre o que quer, mas debaixo disso há alguém que sente demais e aprendeu a esconder como sobrevivência. Sua magia é brutal e eficiente.',
    keyTraits: ['Magia de portal e controle de matéria altamente ofensiva', 'Inteligência política acima de quase todos', 'Ferida da infertilidade como motor emocional', 'Frieza como armadura sobre sentimento real', 'Relacionamento com Geralt como força e fraqueza'],
    suggestedQuirks: ['grimorio_misterioso', 'prodigios_rivais'],
    bondHints: ['Amor que é destino e batalha constante (Geralt)', 'Filha que não deveria ser possível (Ciri)', 'Instituição que nunca foi lar mas é identidade (Brotherhood)'] },

  { id: 'witcher-triss',
    nome: 'Triss Merigold',
    aliases: ['Triss', 'Triss Merigold', 'Fourteenth of the Hill'],
    arquetipo: 'mago-elemental',
    source: { franchise: 'The Witcher', work: 'The Witcher series', category: 'video-game' },
    tema: 'Calor humano em mundo que recompensa a frieza',
    origem: 'Feiticeira de Maribor',
    atributos: { des: 'd8', vig: 'd6', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Geralt', emocoes: ['amor não-correspondido', 'amizade real'] },
      { alvo: 'Ciri', emocoes: ['proteção', 'mentoria'] },
      { alvo: 'Oprimidos de Novigrad', emocoes: ['empatia', 'ativismo'] },
    ],
    descricao: 'A única feiticeira que sobreviveu à Batalha de Sodden Hill com queimaduras permanentes que cobre com magia — apelidada de Décima Quarta do Morro. Triss é mais calorosa que Yennefer mas não menos capaz: fogo é sua especialidade e sua metáfora. Em Novigrad arrisca a vida para salvar não-humanos perseguidos.',
    keyTraits: ['Magia de fogo e telecinese como especialidade', 'Sobrevivente de Sodden Hill com trauma visível', 'Calor humano que Yennefer não tem nem quer', 'Ativismo genuíno pelos marginalizados', 'Amor por Geralt que escolhe transformar em amizade'],
    suggestedQuirks: ['cerne_elemental_af', 'sobrevivente_nf'],
    bondHints: ['Amor que se transformou em amizade por escolha (Geralt)', 'Jovem que merece ser protegida (Ciri)', 'Oprimidos que ninguém mais defende (Novigrad)'] },

];

if (typeof module !== 'undefined') module.exports = WITCHER_EXTRAS_CHARACTERS;
