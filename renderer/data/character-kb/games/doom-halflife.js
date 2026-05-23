// DOOM / Half-Life — Character KB

const DOOM_HALFLIFE_CHARACTERS = [

  { id: 'doom-slayer',
    nome: 'Doom Slayer',
    aliases: ['Doom Slayer', 'Doomguy', 'The Slayer', 'B.J. Blazkowicz (descendente)'],
    arquetipo: 'barbaro-furioso',
    source: { franchise: 'DOOM', work: 'DOOM series', category: 'video-game' },
    tema: 'Fúria sagrada que o Inferno aprendeu a temer',
    origem: 'Marine Condenado ao Inferno',
    atributos: { des: 'd8', vig: 'd12', ast: 'd6', von: 'd12' },
    lacos: [
      { alvo: 'Demônios', emocoes: ['ódio puro como vocação'] },
      { alvo: 'Daisy (coelho)', emocoes: ['amor que iniciou a cruzada'] },
      { alvo: 'VEGA / Samuel Hayden', emocoes: ['aliança pragmática'] },
    ],
    descricao: 'Marine condenado ao Inferno que se tornou tão ameaçador que os demônios o aprisionaram numa tumba para pararem de temer. O Doom Slayer não tem história complexa — tem fúria que o Inferno literalmente criou profecias sobre. BFG 9000, Chainsaw, Glory Kills: cada arma é extensão de um estado de espírito que nunca para.',
    keyTraits: ['Arsenal de 10+ armas de destruição simultânea', 'Glory Kills como heal mecânico e fúria visual', 'Velocidade de combate impossível para tamanho e armadura', 'Inferno que criou profecias especificamente sobre ele', 'Silêncio que comunica mais fúria que qualquer discurso'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Espécie que é o propósito de toda fúria (demônios)', 'Coelho que foi o catalisador de tudo (Daisy)', 'Aliança que não precisa de confiança para funcionar (Hayden)'] },

  { id: 'hl-gordon-freeman',
    nome: 'Gordon Freeman',
    aliases: ['Gordon Freeman', 'Freeman', 'The One Free Man'],
    arquetipo: 'inventor',
    source: { franchise: 'Half-Life', work: 'Half-Life series', category: 'video-game' },
    tema: 'Cientista que nunca pediu para ser o herói',
    origem: 'Físico do Black Mesa Research Facility',
    atributos: { des: 'd8', vig: 'd8', ast: 'd12', von: 'd8' },
    lacos: [
      { alvo: 'Alyx Vance', emocoes: ['parceria', 'confiança conquistada em campo'] },
      { alvo: 'G-Man', emocoes: ['manipulação', 'instrumento com free will'] },
      { alvo: 'Combine', emocoes: ['oposição existencial'] },
    ],
    descricao: 'Físico teórico que empurrou uma amostra para o feixe do Resonance Cascade porque era o trabalho dele — e saiu do Black Mesa com HEV Suit, crowbar e reputação de destruir invasões alienígenas. Gordon não fala, não planeja heroísmo e claramente não é militar. Ainda assim, a Resistência o chama de Messias.',
    keyTraits: ['HEV Suit como interface entre físico e combate', 'Crowbar como arma primária icônica', 'PHD em Física Teórica aplicado em campo de batalha', 'Silêncio como projeção: cada jogador é Gordon', 'Providência ou manipulação do G-Man como driver narrativo'],
    suggestedQuirks: ['inventor_prodigio', 'sobrevivente_nf'],
    bondHints: ['Parceira que conhece o campo melhor (Alyx)', 'Entidade que usa sem avisar (G-Man)', 'Ocupação que precisa ser expulsa (Combine)'] },

];

if (typeof module !== 'undefined') module.exports = DOOM_HALFLIFE_CHARACTERS;
