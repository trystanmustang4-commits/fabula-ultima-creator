// Tekken — Character KB

const TEKKEN_CHARACTERS = [

  { id: 'tekken-heihachi',
    nome: 'Heihachi Mishima',
    aliases: ['Heihachi', 'Heihachi Mishima', 'Mishima Patriarch'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Tekken', work: 'Tekken series', category: 'video-game' },
    tema: 'Força como único valor que nunca questiona',
    origem: 'Patriarca da Mishima Zaibatsu',
    atributos: { des: 'd8', vig: 'd12', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Kazuya', emocoes: ['relacionamento de destruição mútua'] },
      { alvo: 'Jin', emocoes: ['instrumento', 'sangue Mishima como ativo'] },
      { alvo: 'Mishima Zaibatsu', emocoes: ['domínio', 'identidade'] },
    ],
    descricao: 'Fundador do torneio King of Iron Fist que jogou o filho num vulcão para testar força e foi jogado de volta décadas depois. Heihachi não tem Mishima Bloodline (sem Devil Gene) — sua força é 100% treinamento humano levado ao absoluto. Jogou o neto numa floresta pela mesma lógica. Villão que é também a medida de tudo.',
    keyTraits: ['Karate Mishima sem Devil Gene — força pura', 'Lightning Screw Uppercut como assinatura', 'Crueldade como expressão de valores, não psicopatia', 'Sobrevivência de situações que matariam qualquer outro', 'Medida de força contra qual toda família se define'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Filho que é a maior batalha da vida (Kazuya)', 'Neto que é instrumento e ameaça (Jin)', 'Império que é extensão da identidade (Zaibatsu)'] },

  { id: 'tekken-jin',
    nome: 'Jin Kazama',
    aliases: ['Jin', 'Jin Kazama', 'Devil Jin'],
    arquetipo: 'guerreiro-arcano',
    source: { franchise: 'Tekken', work: 'Tekken 3 (1997)', category: 'video-game' },
    tema: 'Maldição de sangue que se recusa a aceitar',
    origem: 'Filho de Kazuya e Jun',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Jun (mãe)', emocoes: ['amor que define o que quer ser'] },
      { alvo: 'Kazuya', emocoes: ['ódio de pai que é ameaça'] },
      { alvo: 'Devil Gene', emocoes: ['maldição', 'poder que recusa e usa'] },
    ],
    descricao: 'Portador de Devil Gene dos dois lados da família que passou a vida tentando se livrar da maldição. Jin usa Karate Tradicional (não Mishima) como declaração de identidade — recusa a herança do avô. Em T6, provoca uma guerra mundial para invocar Azazel e se destruir junto com o Gene. Autossacrifício como solução para maldição hereditária.',
    keyTraits: ['Devil Gene: transformação e poder demoníaco', 'Karate Tradicional escolhido em rejeição da herança', 'Plano de autossacrifício como responsabilidade extrema', 'Conflito entre o que é e o que quer ser', 'Amor por Jun como único norte positivo'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Mãe que mostrou o que pode ser (Jun)', 'Pai que representa o que recusa ser (Kazuya)', 'Maldição que é parte de si mesmo (Devil Gene)'] },

  { id: 'tekken-kazuya',
    nome: 'Kazuya Mishima',
    aliases: ['Kazuya', 'Kazuya Mishima', 'Devil Kazuya'],
    arquetipo: 'barbaro-furioso',
    source: { franchise: 'Tekken', work: 'Tekken series', category: 'video-game' },
    tema: 'Ódio puro que sobreviveu a tudo',
    origem: 'Herdeiro Mishima',
    atributos: { des: 'd10', vig: 'd12', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Heihachi', emocoes: ['ódio de décadas', 'ciclo de destruição mútua'] },
      { alvo: 'Jun Kazama', emocoes: ['único momento de humanidade'] },
      { alvo: 'Devil Gene', emocoes: ['integração total', 'identidade aceita'] },
    ],
    descricao: 'Jogado num vulcão pelo pai aos cinco anos e sobreviveu ao fazer pacto com o Devil. Kazuya voltou no T1 para jogar Heihachi do mesmo penhasco — e o ciclo nunca parou. Ao contrário de Jin, Kazuya abraçou o Devil Gene: não é maldição, é poder. Seu único momento de leveza foi com Jun, e olha como terminou.',
    keyTraits: ['Devil Gene integrado e abraçado como força', 'Ódio de Heihachi como combustível de décadas', 'Wind God Fist e EWGF como técnicas apex', 'Brutalidade sem remorso como filosofia', 'Ciclo de destruição com Heihachi que define a saga'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Pai que é o ódio que o mantém vivo (Heihachi)', 'Único amor real que existiu (Jun)', 'Poder que abraçou quando outros recusariam (Devil)'] },

];

if (typeof module !== 'undefined') module.exports = TEKKEN_CHARACTERS;
