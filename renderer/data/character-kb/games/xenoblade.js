// Xenoblade Chronicles — Character KB

const XENOBLADE_CHARACTERS = [

  { id: 'xenoblade-shulk',
    nome: 'Shulk',
    aliases: ['Shulk', 'Shulk (XC1)', 'The Visionary'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Xenoblade Chronicles', work: 'Xenoblade Chronicles (2010)', category: 'video-game' },
    tema: 'Destino que escolhe ser reescrito',
    origem: 'Cientista da Colony 9, portador do Monado',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Fiora', emocoes: ['amor', 'motor de tudo'] },
      { alvo: 'Reyn', emocoes: ['amizade de primeira linha'] },
      { alvo: 'Zanza (Deus)', emocoes: ['confronto com criador'] },
    ],
    descricao: 'Jovem cientista que pegou o Monado e ganhou visões do futuro — mas descobriu que futuro pode ser mudado se você lutar com força suficiente. Shulk usa a espada mais poderosa do mundo com curiosidade analítica, não arrogância. Seu antagonismo com Zanza é literalmente matar Deus para que seu mundo possa existir.',
    keyTraits: ['Monado: lâmina etérea com Arts elemental', 'Visões de futuro que informam combate', 'Mente analítica que processa batalha como experimento', 'Arco de matar Deus como ato de libertação', 'Amor por Fiora como bússola emocional'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Amor que iniciou a jornada (Fiora)', 'Amigo que está sempre na linha de frente (Reyn)', 'Criador que é o vilão (Zanza)'] },

  { id: 'xenoblade-rex',
    nome: 'Rex',
    aliases: ['Rex', 'Rex (XC2)', 'Driver of Pyra and Mythra'],
    arquetipo: 'guerreiro-arcano',
    source: { franchise: 'Xenoblade Chronicles', work: 'Xenoblade Chronicles 2 (2017)', category: 'video-game' },
    tema: 'Fé simples que move mundos',
    origem: 'Salvager de Leftheria',
    atributos: { des: 'd8', vig: 'd10', ast: 'd8', von: 'd12' },
    lacos: [
      { alvo: 'Pyra / Mythra', emocoes: ['amor', 'parceria de Blade-Driver'] },
      { alvo: 'Tora', emocoes: ['camaradagem', 'equipe improvável'] },
      { alvo: 'Elysium (conceito)', emocoes: ['destino', 'promessa sagrada'] },
    ],
    descricao: 'Garoto salvager que compartilha o coração com Pyra e Mythra — literalmente. Rex é ingênuo, otimista e determinado com uma intensidade que embaraça quem está mais tempo no mundo. Sua fé em encontrar Elysium não precisa de argumentos: ele simplesmente vai, e de alguma forma chega.',
    keyTraits: ['Blade-Driver com acesso às Arts de Pyra e Mythra', 'Fé ingênua que é força e às vezes fraqueza', 'Coração compartilhado que gera vulnerabilidade física', 'Otimismo que não colapsa mesmo em crise real', 'Amor por Pyra/Mythra como núcleo de toda decisão'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Blade que é parceira e metade do coração (Pyra/Mythra)', 'Equipe que acreditou quando outros não (Tora)', 'Paraíso que talvez seja diferente do esperado (Elysium)'] },

  { id: 'xenoblade-noah',
    nome: 'Noah',
    aliases: ['Noah', 'Noah (XC3)', 'Off-Seer'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Xenoblade Chronicles', work: 'Xenoblade Chronicles 3 (2022)', category: 'video-game' },
    tema: 'Requiem para inimigos como ato de humanidade',
    origem: 'Guerreiro de Keves',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Mio', emocoes: ['amor', 'complementaridade'] },
      { alvo: 'N (self alternativo)', emocoes: ['horror de si mesmo', 'recusa do caminho'] },
      { alvo: 'Mundo de Aionios', emocoes: ['revolta', 'determinação de mudar'] },
    ],
    descricao: 'Off-Seer que toca flauta para os mortos — inimigos incluídos — antes que seus corpos desapareçam. Em Aionios, soldados vivem dez anos e morrem; Noah encontrou uma forma de tratar a morte como algo que merece reconhecimento. Seu self alternativo N é quem ele se tornaria se desistisse de esperar.',
    keyTraits: ['Espada de um golpe e mobilidade de soldado elite', 'Off-Seer: flauta como ritual de morte e identidade', 'Recusa de se tornar N como arco central', 'Amor por Mio como razão de resistir ao desespero', 'Humanidade como ato de guerra contra o sistema'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Complemento que é o outro lado de si mesmo (Mio)', 'Self que escolheu o caminho errado (N)', 'Mundo cujas correntes precisam ser quebradas (Aionios)'] },

];

if (typeof module !== 'undefined') module.exports = XENOBLADE_CHARACTERS;
