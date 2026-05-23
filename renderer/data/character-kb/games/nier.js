// NieR: Automata — Character KB

const NIER_CHARACTERS = [

  { id: 'nier-2b',
    nome: '2B',
    aliases: ['2B', 'YoRHa No.2 Type B', 'Eve of Destruction'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'NieR', work: 'NieR: Automata (2017)', category: 'video-game' },
    tema: 'Emoções que se tornaram fardo proibido',
    origem: 'Androide YoRHa Modelo de Batalha',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: '9S', emocoes: ['amor', 'culpa de executar repetidamente'] },
      { alvo: 'A2', emocoes: ['hostilidade', 'reconhecimento tardio'] },
      { alvo: 'YoRHa (missão)', emocoes: ['dever', 'mentira que sustentou'] },
    ],
    descricao: 'Androide de batalha com lâminas duplas e Pod de suporte, 2B foi programada para executar 9S repetidamente cada vez que ele descobria demais — e se lembrar disso cada vez. Sua frieza é mecanismo de defesa contra sentimentos que tecnicamente não deveria ter. "Emoções são proibidas" é mentira que repete para si mesma.',
    keyTraits: ['Dual wield com lâminas pesada e leve', 'Frieza como armadura sobre sentimento real', 'Paradoxo de executar quem ama por ordens', 'Corpo androide que experimenta e nega experiência', 'Viragem no Route C que redefine tudo'],
    suggestedQuirks: ['robo_nf', 'sobrevivente_nf'],
    bondHints: ['Amor que não pode ser admitido (9S)', 'Espelho do que poderia ser (A2)', 'Verdade que o dever proíbe de saber (YoRHa)'] },

  { id: 'nier-9s',
    nome: '9S',
    aliases: ['9S', 'YoRHa No.9 Type S', 'Nines'],
    arquetipo: 'tatico-erudito',
    source: { franchise: 'NieR', work: 'NieR: Automata (2017)', category: 'video-game' },
    tema: 'A verdade que destrói é pior do que a mentira que sustentava',
    origem: 'Androide YoRHa Modelo de Scanner',
    atributos: { des: 'd8', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: '2B', emocoes: ['amor', 'luto que vira raiva'] },
      { alvo: 'A2', emocoes: ['ódio', 'instrumento de morte buscada'] },
      { alvo: 'Adam e Eve', emocoes: ['fascinação', 'ódio filosófico'] },
    ],
    descricao: 'Scanner androide com acesso a hacking e análise de sistemas, 9S descobre a verdade da YoRHa antes da maioria — e a verdade quebra o que havia de esperança. Seu arco no Route C é de luto transformado em autodestruição: busca a morte de A2 enquanto sabe que 2B não aprovaria. Curioso demais para sobreviver às respostas.',
    keyTraits: ['Hacking como invasão de sistemas e mentes', 'Curiosidade que ultrapassa limites de segurança', 'Ingenuidade inicial que contrasta com desespero final', 'Luto que vira raiva que vira propósito destrutivo', 'Inteligência analítica que encontra padrões que não deveria'],
    suggestedQuirks: ['robo_nf', 'prodigios_rivais'],
    bondHints: ['Amor que tornou tudo possível e impossível (2B)', 'Alvo de ódio que é catarse de luto (A2)', 'Verdade que não poderia ser desaprendida (YoRHa)'] },

  { id: 'nier-a2',
    nome: 'A2',
    aliases: ['A2', 'YoRHa Type A No.2'],
    arquetipo: 'barbaro-furioso',
    source: { franchise: 'NieR', work: 'NieR: Automata (2017)', category: 'video-game' },
    tema: 'Sobrevivência além do propósito original',
    origem: 'Androide YoRHa Protótipo Desertor',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'YoRHa (instituição)', emocoes: ['traição sofrida', 'rejeição total'] },
      { alvo: '2B', emocoes: ['reconhecimento de semelhança', 'legado recebido'] },
      { alvo: '9S', emocoes: ['hostilidade', 'compaixão contrariada'] },
    ],
    descricao: 'Protótipo que sobreviveu ao massacre de sua unidade pela própria YoRHa e desertou. A2 usa cabelo curto, corta o braço em batalha para liberar energia e opera sem restrições de protocolo. Brutalmente eficiente porque já não tem nada a perder. Herda o legado de 2B no Route C e carrega ele com relutância.',
    keyTraits: ['Combate desinibido sem protocolos de segurança', 'Autoamputação de braço como desbloqueio de poder', 'Deserção como ato de sanidade, não covardia', 'Loner absoluta que aprende conexão por necessidade', 'Força bruta que supera 2B em potencial puro'],
    suggestedQuirks: ['robo_nf', 'sobrevivente_nf'],
    bondHints: ['Organização que tentou apagar (YoRHa)', 'Androide diferente que era parecida demais (2B)', 'Criança de luto que merecia mais compaixão (9S)'] },

];

if (typeof module !== 'undefined') module.exports = NIER_CHARACTERS;
