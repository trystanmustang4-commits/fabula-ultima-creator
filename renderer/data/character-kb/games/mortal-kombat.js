// Mortal Kombat — Character KB

const MORTAL_KOMBAT_CHARACTERS = [

  { id: 'mk-scorpion',
    nome: 'Scorpion',
    aliases: ['Scorpion', 'Hanzo Hasashi', 'Specter of Hell'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Mortal Kombat', work: 'Mortal Kombat series', category: 'video-game' },
    tema: 'Vingança que durou tanto que virou identidade',
    origem: 'Ninja do Clã Shirai Ryu',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd12' },
    lacos: [
      { alvo: 'Sub-Zero (original)', emocoes: ['ódio por assassinato da família'] },
      { alvo: 'Clã Shirai Ryu', emocoes: ['lealdade além da morte'] },
      { alvo: 'Quan Chi', emocoes: ['manipulação sofrida', 'ódio descoberto tarde'] },
    ],
    descricao: 'Morto por Sub-Zero, sua família massacrada, Scorpion foi invocado do Inferno por Quan Chi como instrumento de vingança — e só descobriu depois que Quan Chi era o verdadeiro culpado. A corrente com kunai e "GET OVER HERE!" é o grito de quem passou décadas lutando pelo inimigo errado.',
    keyTraits: ['Kunai de corrente de fogo como assinatura', 'Teleporte e arremesso como kit de aproximação', 'Chama infernal como poder de necromorfo', 'Lealdade pós-morte ao clã que já não existe', 'Ódio que mudou de alvo quando a verdade apareceu'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Clã que define para quem luta mesmo morto (Shirai Ryu)', 'Inimigo que era inocente mas morreu pela raiva (Sub-Zero original)', 'Manipulador real que só foi descoberto tarde (Quan Chi)'] },

  { id: 'mk-sub-zero',
    nome: 'Sub-Zero',
    aliases: ['Sub-Zero', 'Kuai Liang', 'Grandmaster'],
    arquetipo: 'mago-elemental',
    source: { franchise: 'Mortal Kombat', work: 'Mortal Kombat series', category: 'video-game' },
    tema: 'Honra dentro do clã das sombras',
    origem: 'Lin Kuei Ninja',
    atributos: { des: 'd8', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Scorpion', emocoes: ['conflito', 'eventual respeito'] },
      { alvo: 'Clã Lin Kuei', emocoes: ['liderança', 'reforma de dentro'] },
      { alvo: 'Gelo (elemento)', emocoes: ['identidade', 'maestria absoluta'] },
    ],
    descricao: 'Kuai Liang assumiu o manto de Sub-Zero após a morte do irmão e escolheu honra sobre assassinato — reformando o Lin Kuei de dentro como Grandmaster. Diferente do irmão, tem compaixão. Controle de gelo que vai de clone a armadura a lança; sua evolução como lutador espelha sua evolução moral.',
    keyTraits: ['Controle de gelo em múltiplas formas: clone, lança, armadura', 'Grandmaster que reformou o Lin Kuei', 'Honra como escolha num clã de assassinos', 'Evolução de assassino a guerreiro com código', 'Rivalidade com Scorpion que virou paz'],
    suggestedQuirks: ['cerne_elemental_af', 'heranca'],
    bondHints: ['Rival que eventualmente reconheceu (Scorpion)', 'Clã que liderou e reformou (Lin Kuei)', 'Elemento que é extensão da alma (gelo)'] },

  { id: 'mk-liu-kang',
    nome: 'Liu Kang',
    aliases: ['Liu Kang', 'Champion of Mortal Kombat', 'Fire God Liu Kang'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Mortal Kombat', work: 'Mortal Kombat series', category: 'video-game' },
    tema: 'Campeão que o destino continua chamando mesmo morto',
    origem: 'Monge do Templo de Kung Lao',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Kitana', emocoes: ['amor', 'parceria de vida e morte'] },
      { alvo: 'Raiden', emocoes: ['mentor', 'eventual posição de igual'] },
      { alvo: 'Earthrealm', emocoes: ['proteção como vocação'] },
    ],
    descricao: 'Campeão do Mortal Kombat que venceu o torneio, morreu, virou zumbi, virou deus do fogo e ainda continuou sendo o pivô da proteção do Earthrealm. Liu Kang é o herói central da franquia: seus chutes voadores e bolas de fogo são o arquétipo do jogo. Em MK11 torna-se Fire God e recomeça o tempo.',
    keyTraits: ['Flying Kick e Dragon Fire como movimentos fundadores', 'Campeão que a morte não removeu do campo', 'Parceria com Kitana como motivação de longa data', 'Evolução de mortal a deus como arco radical', 'Humildade que não combina com poder que tem'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Amor que sobreviveu a múltiplas mortes (Kitana)', 'Mentor que se tornou igual (Raiden)', 'Realm que defende mesmo quando pede muito (Earthrealm)'] },

  { id: 'mk-shao-kahn',
    nome: 'Shao Kahn',
    aliases: ['Shao Kahn', 'Emperor of Outworld', 'Konqueror'],
    arquetipo: 'guerreiro-arcano',
    source: { franchise: 'Mortal Kombat', work: 'Mortal Kombat II (1993)', category: 'video-game' },
    tema: 'Conquista como modo de existência',
    origem: 'Imperador de Outworld',
    atributos: { des: 'd8', vig: 'd12', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'Sindel', emocoes: ['obsessão de conquista', 'ferramenta transformada'] },
      { alvo: 'Kotal Kahn', emocoes: ['desafio ao trono', 'ciclo de poder'] },
      { alvo: 'Earthrealm', emocoes: ['alvo de conquista permanente'] },
    ],
    descricao: 'Imperador que conquistou incontáveis reinos e quer o Earthrealm com a mesma certeza de que o sol nasce. Seu martelo quebra montanhas; seu "IT HAS BEGUN" é declaração de guerra cultural. Shao Kahn não é subtil — é poder absoluto declarado abertamente, e isso é exatamente o que torna cada confronto épico.',
    keyTraits: ['Martelo warhammer de destruição em área', 'Magia sombria de Outworld combinada com força bruta', 'Armadura e elmo que são declaração de status', '"It has begun" como assinatura de presença', 'Conquista como filosofia, não apenas tática'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Rainha que é obsessão e ferramenta (Sindel)', 'Sucessor que desafia o trono por direito (Kotal)', 'Reino que é o troféu que nunca pode ter (Earthrealm)'] },

];

if (typeof module !== 'undefined') module.exports = MORTAL_KOMBAT_CHARACTERS;
