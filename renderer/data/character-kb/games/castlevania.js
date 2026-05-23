// Castlevania — Character KB

const CASTLEVANIA_CHARACTERS = [

  { id: 'castlevania-alucard',
    nome: 'Alucard',
    aliases: ['Alucard', 'Adrian Fahrenheit Tepes', 'The Son of Dracula'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Castlevania', work: 'Castlevania: Symphony of the Night (1997)', category: 'video-game' },
    tema: 'Humanidade preservada contra a herança de monstro',
    origem: 'Filho de Drácula e Lisa',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'Dracula (pai)', emocoes: ['amor filial', 'oposição necessária'] },
      { alvo: 'Lisa (mãe)', emocoes: ['amor que define tudo'] },
      { alvo: 'Humanidade', emocoes: ['proteção', 'pertencimento ambíguo'] },
    ],
    descricao: 'Meio-vampiro que combate seu próprio pai porque a mãe humana ensinou que a humanidade vale ser protegida. Alucard usa espada, magia e transformações vampíricas com elegância aristocrática — Crissaegrim, Shield Rod, acesso ao inventário infinito de Dracula\'s Castle. Seu isolamento posterior ao fim do jogo é a consequência de ser o único sobrando.',
    keyTraits: ['Espada e transformações vampíricas combinadas', 'Herança de Dracula que usa contra o pai', 'Elegância que não precisa de esforço', 'Luto de matar o pai como peso permanente', 'Solidão de ser o que está entre dois mundos'],
    suggestedQuirks: ['heranca', 'de_um_mundo_distante_af'],
    bondHints: ['Pai que precisou ser derrotado pelo filho (Dracula)', 'Mãe que escolheu a humanidade e pagou com a vida (Lisa)', 'Raça que protege sem pedir pertencimento (humanidade)'] },

  { id: 'castlevania-simon',
    nome: 'Simon Belmont',
    aliases: ['Simon', 'Simon Belmont'],
    arquetipo: 'guerreiro-escudo',
    source: { franchise: 'Castlevania', work: 'Castlevania (1986)', category: 'video-game' },
    tema: 'Dever que passa de geração em geração sem questionar',
    origem: 'Caçador de Vampiros da Família Belmont',
    atributos: { des: 'd8', vig: 'd12', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Dracula', emocoes: ['inimigo geracional', 'propósito'] },
      { alvo: 'Família Belmont', emocoes: ['herança', 'responsabilidade'] },
      { alvo: 'Vampire Killer', emocoes: ['identidade', 'poder sagrado'] },
    ],
    descricao: 'Caçador de vampiros que entrou no Castelo de Drácula com um chicote e saiu vitorioso. Simon é o Belmont arquetípico: sem palavras elaboradas ou angústia existencial — apenas a missão herdada, o chicote sagrado e determinação que não colapsa. A maldição de Drácula que o perseguiu depois foi outra batalha, igualmente vencida.',
    keyTraits: ['Vampire Killer: chicote sagrado dos Belmont', 'Sub-armas cruzadas, facas e holy water', 'Força física que escala com fé e determinação', 'Sem ambiguidade moral: dever é dever', 'Arquétipo fundador de toda a linhagem Belmont'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Inimigo que define o propósito da família (Dracula)', 'Antepassados que confiaram o chicote (Belmont)', 'Arma que é herança sagrada (Vampire Killer)'] },

  { id: 'castlevania-richter',
    nome: 'Richter Belmont',
    aliases: ['Richter', 'Richter Belmont'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Castlevania', work: 'Castlevania: Rondo of Blood (1993)', category: 'video-game' },
    tema: 'Herói que virou antagonista sem saber',
    origem: 'Belmont do Século XVIII',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Annette', emocoes: ['amor', 'motivação de resgate'] },
      { alvo: 'Alucard', emocoes: ['confronto que é salvação'] },
      { alvo: 'Shaft (manipulação)', emocoes: ['vítima', 'vergonha de ter sido usado'] },
    ],
    descricao: 'Belmont mais ágil de sua geração, Richter usa o chicote com acrobacia que Simon não tinha. Derrotou Drácula em 1792 e reapareceu cinco anos depois como governante do Castelo — controlado por Shaft sem saber. Alucard o salva derrotando-o; Richter carrega o peso de ter sido a ameaça que o herói precisava parar.',
    keyTraits: ['Acrobacia e mobilidade superiores à média Belmont', 'Item Crash: super-ataques com sub-armas', 'Arco de herói que se torna antagonista por manipulação', 'Vergonha de ter sido usado como ferramenta de Shaft', 'Resgate de Annette como missão original que explode em algo maior'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Amor que iniciou a última aventura (Annette)', 'Aliado improvável que salvou sem destruir (Alucard)', 'Mago que provou que qualquer herói tem ponto fraco (Shaft)'] },

];

if (typeof module !== 'undefined') module.exports = CASTLEVANIA_CHARACTERS;
