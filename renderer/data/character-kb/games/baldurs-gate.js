// Baldur's Gate 3 — Character KB

const BALDURS_GATE_CHARACTERS = [

  { id: 'bg3-tav',
    nome: 'Tav / Dark Urge',
    aliases: ['Tav', 'Dark Urge', 'The Bhaalspawn', 'Custom Hero'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: "Baldur's Gate", work: "Baldur's Gate 3 (2023)", category: 'video-game' },
    tema: 'Escolha diante de natureza que empurra para o mal',
    origem: 'Sobrevivente do Nautiloid',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Companions', emocoes: ['família escolhida', 'confiança em perigo'] },
      { alvo: 'Mindflayer Tadpole', emocoes: ['ameaça', 'ferramenta ambígua'] },
      { alvo: 'Destino (Dark Urge)', emocoes: ['resistência', 'identidade como escolha'] },
    ],
    descricao: 'Personagem do jogador que pode ser qualquer coisa — ou pode ser Dark Urge, filho de Bhaal resistindo ao impulso de matar. Em qualquer forma, lidera um grupo de sobreviventes com um verme de mindflayer no crânio. BG3 é sobre quem você escolhe ser quando nada mais te obriga a ser bom.',
    keyTraits: ['Versatilidade de classe limitada apenas pela escolha do jogador', 'Liderança que emerge das circunstâncias, não do título', 'Dark Urge: arco de resistir à natureza como identidade', 'Mindflayer tadpole como ferramenta e ameaça', 'Construção de relacionamentos como núcleo da experiência'],
    suggestedQuirks: ['glorioso_destino', 'mil_faces'],
    bondHints: ['Companheiros que são a razão de cada escolha (grupo)', 'Verme que pode destruir ou salvar (tadpole)', 'Natureza que é herança mas não destino (Dark Urge)'] },

  { id: 'bg3-astarion',
    nome: 'Astarion',
    aliases: ['Astarion', 'Astarion Ancunin', 'Spawn of Cazador'],
    arquetipo: 'assassino',
    source: { franchise: "Baldur's Gate", work: "Baldur's Gate 3 (2023)", category: 'video-game' },
    tema: 'Liberdade descoberta por alguém que só conheceu prisão',
    origem: 'Elfo Vampiro Spawn de Cazador',
    atributos: { des: 'd12', vig: 'd6', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Cazador', emocoes: ['trauma de 200 anos', 'ódio e libertação'] },
      { alvo: 'Tav', emocoes: ['confiança gradual', 'amor possível'] },
      { alvo: 'Liberdade (conceito)', emocoes: ['novidade', 'aprendizado de como existir'] },
    ],
    descricao: 'Elfo que foi vampiro spawn por 200 anos sob Cazador — escravizado, humilhado, reduzido a instrumento. A missão do verme de mindflayer é, ironicamente, a primeira liberdade que teve. Astarion usa charme, espada curta e arco como assassino furtivo; usa sarcasmo como armadura sobre trauma real.',
    keyTraits: ['Furtividade e emboscada como kit primário', 'Charme que é defesa e habilidade real', 'Sarcasmo sobre trauma que levou séculos acumular', 'Liberdade como experiência completamente nova', 'Arco de escolha: Ascendancy ou libertação por empatia'],
    suggestedQuirks: ['sobrevivente_nf', 'mil_faces'],
    bondHints: ['Mestre de 200 anos de escravidão que precisa ser destruído (Cazador)', 'Primeiro relacionamento baseado em escolha real (Tav)', 'Conceito que ainda está aprendendo como viver (liberdade)'] },

  { id: 'bg3-shadowheart',
    nome: 'Shadowheart',
    aliases: ['Shadowheart', 'Shadowheart (Sharran)', 'Jenevelle Hallowleaf'],
    arquetipo: 'curandeiro',
    source: { franchise: "Baldur's Gate", work: "Baldur's Gate 3 (2023)", category: 'video-game' },
    tema: 'Devoção forjada sobre memória roubada',
    origem: 'Clérigo de Shar',
    atributos: { des: 'd6', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Shar', emocoes: ['devoção', 'questionamento gradual'] },
      { alvo: 'Pais (memória roubada)', emocoes: ['saudade sem objeto', 'identidade perdida'] },
      { alvo: 'Tav', emocoes: ['confiança conquistada com dificuldade'] },
    ],
    descricao: 'Clérigo de Shar cujas memórias de infância foram removidas como prova de devoção — o ritual de Shar para apagar a luz da memória. Cura e controle de sombras em batalha; amargura calculada como modo social. Seu arco é descobrir o que foi removido e decidir o que fazer com isso.',
    keyTraits: ['Cura e sombras como kit de clérigo', 'Amargura como padrão social que esconde vulnerabilidade', 'Memória roubada como tensão narrativa central', 'Questionamento de fé que pode ir para qualquer direção', 'Confiança que quando dada é inabalável'],
    suggestedQuirks: ['grimorio_misterioso', 'heranca'],
    bondHints: ['Deusa que deu identidade e roubou memória (Shar)', 'Pais que existem além do que pode lembrar (família)', 'Companheiro que merece a confiança que custa tanto (Tav)'] },

];

if (typeof module !== 'undefined') module.exports = BALDURS_GATE_CHARACTERS;
