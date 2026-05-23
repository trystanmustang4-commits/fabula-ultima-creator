// Devil May Cry — Character KB

const DMC_EXTRAS_CHARACTERS = [

  { id: 'dmc-nero',
    nome: 'Nero',
    aliases: ['Nero', 'Nero (DMC)', 'Halfbreed'],
    arquetipo: 'guerreiro-arcano',
    source: { franchise: 'Devil May Cry', work: 'Devil May Cry 4 (2008)', category: 'video-game' },
    tema: 'Herança descoberta que redefine identidade',
    origem: 'Cavaleiro da Ordem da Espada',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Kyrie', emocoes: ['amor que é âncora de toda decisão'] },
      { alvo: 'Dante', emocoes: ['rivalidade de aprendiz', 'respeito conquistado'] },
      { alvo: 'Devil Bringer / Devil Breakers', emocoes: ['identidade', 'poder que não pediu'] },
    ],
    descricao: 'Cavaleiro da Ordem com Devil Bringer no braço direito que não sabia por que — até descobrir que é neto de Sparda. Usa Red Queen (moto-espada) e Blue Rose (revólver), mais o braço demoníaco que agarra e arremessa demônios. Em DMC5 perde o braço para Urizen e continua com Devil Breakers mecânicos. Determinação que não aceita limite.',
    keyTraits: ['Red Queen: espada com motor para boost de dano', 'Devil Bringer: garras de energia para combos aéreos', 'Devil Breakers: arsenal de braços prostéticos em DMC5', 'Determinação que não reconhece impossível', 'Identidade como descendente de Sparda descoberta em campo'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Amor que é o porquê de voltar sempre (Kyrie)', 'Tio que é rival e modelo (Dante)', 'Herança demoníaca que é poder e pergunta (Devil Bringer)'] },

  { id: 'dmc-vergil',
    nome: 'Vergil',
    aliases: ['Vergil', 'Vergil (DMC)', 'Nelo Angelo', 'V (forma)'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Devil May Cry', work: 'Devil May Cry series', category: 'video-game' },
    tema: 'Poder como resposta a fraqueza que nunca esqueceu',
    origem: 'Filho de Sparda, Irmão de Dante',
    atributos: { des: 'd12', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Dante', emocoes: ['rivalidade', 'amor fraternal negado'] },
      { alvo: 'Yamato', emocoes: ['identidade', 'herança paterna'] },
      { alvo: 'Poder (obsessão)', emocoes: ['busca', 'medo da fraqueza'] },
    ],
    descricao: 'Irmão gêmeo de Dante que rejeitou a humanidade após não conseguir salvar a mãe. Vergil usa Yamato com precisão cirúrgica e velocidade que faz a espada parecer extensão do pensamento. Sua obsessão por poder não é vilania pura — é resposta ao trauma de ter sido fraco quando importava. V e Urizen são os dois lados que precisaram se reintegrar.',
    keyTraits: ['Yamato: espada de precisão sobre velocidade', 'Doppelganger e sombras como extensão de combate', 'Frieza absoluta que esconde emoção intensa', 'Divisão em V e Urizen como externalização do conflito interno', 'Estilo que é o oposto deliberado de Dante'],
    suggestedQuirks: ['heranca', 'prodigios_rivais'],
    bondHints: ['Irmão que é espelho e antítese (Dante)', 'Espada do pai que é identidade (Yamato)', 'Fraqueza passada que nunca para de ser sentida (trauma)'] },

  { id: 'dmc-v',
    nome: 'V',
    aliases: ['V', 'V (DMC5)', 'The Mysterious Man'],
    arquetipo: 'mago-sombrio',
    source: { franchise: 'Devil May Cry', work: 'Devil May Cry 5 (2019)', category: 'video-game' },
    tema: 'Humanidade preservada nas margens do monstro',
    origem: 'Fragmento humano de Vergil',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: 'Nightmare/Shadow/Griffon', emocoes: ['controle', 'relação de criador-criatura'] },
      { alvo: 'Dante', emocoes: ['dívida', 'busca por reintegração'] },
      { alvo: 'Poesia (William Blake)', emocoes: ['identidade', 'âncora existencial'] },
    ],
    descricao: 'A humanidade de Vergil tomou forma física quando o Yamato dividiu o homem do demônio. V não tem força própria — invoca Nightmare, Shadow e Griffon para lutar enquanto recita Blake. Frágil, mortal, mas com a mente mais afiada e a consciência mais clara de Vergil. Sua existência é questionar se a humanidade vale ser preservada.',
    keyTraits: ['Invocação de três familiares demoníacos como força', 'Corpo humano fisicamente fraco e se desintegrando', 'Citações de William Blake como filtro de percepção', 'Consciência da própria transitoriedade', 'Humanidade que Vergil descartou e V redescobre'],
    suggestedQuirks: ['grimorio_misterioso', 'sobrevivente_nf'],
    bondHints: ['Familiares que são o poder que o corpo não tem (trios)', 'Metade que precisa ser enfrentada (Dante/Vergil)', 'Versos que são mapa para existência temporária (Blake)'] },

];

if (typeof module !== 'undefined') module.exports = DMC_EXTRAS_CHARACTERS;
