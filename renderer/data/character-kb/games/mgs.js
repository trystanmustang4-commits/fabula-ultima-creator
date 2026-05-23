// Metal Gear Solid — Character KB

const MGS_CHARACTERS = [

  { id: 'mgs-raiden',
    nome: 'Raiden',
    aliases: ['Raiden', 'Jack', 'Jack the Ripper', 'White Blood (MGR)'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Metal Gear', work: 'Metal Gear Solid 2 (2001)', category: 'video-game' },
    tema: 'Monstro criado que escolhe para quem usa os dentes',
    origem: 'Soldado-criança do Liberia, cyborg',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Rose', emocoes: ['amor que sobreviveu ao impossível'] },
      { alvo: 'Snake', emocoes: ['modelo', 'sombra que tenta não repetir'] },
      { alvo: 'Desperado / Armstrong', emocoes: ['oposição filosófica'] },
    ],
    descricao: 'Criança-soldado transformada em cyborg que passou de VR-trainee a figura mais letal da série. Em MGS2 é o protagonista relutante; em Metal Gear Rising é "Jack the Ripper" desencadeado — katana de alta frequência, parry de qualquer ataque, e velocidade que faz Big Boss parecer lento. Seus traumas são reais; sua capacidade de matar, também.',
    keyTraits: ['Katana de alta frequência com parry e zandatsu', 'Velocidade ciborg que supera todos os protagonistas', 'Trauma de soldado-criança como motor de violência controlada', 'Arco de VR-rookie a cyborg mais perigoso do mundo', '"Rules of Nature" como declaração de identidade em batalha'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf', 'robo_tf'],
    bondHints: ['Amor que é âncora quando tudo mais é missão (Rose)', 'Modelo que não quer repetir mas inevitavelmente ecoa (Snake)', 'Inimigo que oferece liberdade de ser monstro (Armstrong)'] },

  { id: 'mgs-big-boss',
    nome: 'Big Boss',
    aliases: ['Big Boss', 'Naked Snake', 'John', 'Venom Snake', 'Ishmael'],
    arquetipo: 'tatico-erudito',
    source: { franchise: 'Metal Gear', work: 'Metal Gear series', category: 'video-game' },
    tema: 'A nação de soldados que nunca deveria ter construído',
    origem: 'Lendário Soldado da Guerra Fria',
    atributos: { des: 'd10', vig: 'd10', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'The Boss', emocoes: ['amor', 'dívida impagável', 'trauma'] },
      { alvo: 'Soldados sem nação', emocoes: ['responsabilidade de fundador'] },
      { alvo: 'Solid Snake', emocoes: ['projeção', 'orgulho culpado'] },
    ],
    descricao: 'O soldado mais lendário da história, Big Boss perdeu tudo quando matou sua mentora The Boss por ordens do governo — e dedicou o resto da vida a construir um refúgio para soldados descartados. Seu idealismo é genuíno e sua crueldade também; ambos vêm do mesmo lugar.',
    keyTraits: ['Tática de guerra como segunda natureza', 'Fundador de Outer Heaven e Zanzibar Land', 'Trauma de The Boss como ferida que nunca fecha', 'Capacidade de inspirar lealdade absoluta', 'Antagonista que entendemos demais'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Mentora que moldou tudo e precisou ser morta (The Boss)', 'Exército de almas que não tinham para onde ir (soldados)', 'Filho que é o melhor e o pior de si mesmo (Snake)'] },

];

if (typeof module !== 'undefined') module.exports = MGS_CHARACTERS;
