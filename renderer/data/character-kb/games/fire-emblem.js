// Fire Emblem — Character KB

const FIRE_EMBLEM_CHARACTERS = [

  { id: 'fe-ike',
    nome: 'Ike',
    aliases: ['Ike', 'Ike (FE)', 'Radiant Hero', 'Vanguard'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Fire Emblem', work: 'Fire Emblem: Path of Radiance (2005)', category: 'video-game' },
    tema: 'Força adquirida, não herdada',
    origem: 'Líder dos Greil Mercenaries',
    atributos: { des: 'd8', vig: 'd12', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Greil (pai)', emocoes: ['amor filial', 'herança de guerreiro'] },
      { alvo: 'Soren', emocoes: ['amizade mais profunda da vida'] },
      { alvo: 'Ragnell', emocoes: ['responsabilidade', 'extensão de poder'] },
    ],
    descricao: 'Filho do lendário Greil que se recusou a herdar o título e conquistou respeito com as próprias mãos. Ike não se importa com status nobre ou política — julgando pessoas por quem são, não de onde vêm. Derruba Ashera com Ragnell e literalmente salva o mundo com força física brutal e convicção inabalável.',
    keyTraits: ['Força física que aumenta sem limite natural', 'Aura: concentração de poder em um golpe', 'Indiferença a títulos e hierarquias nobres', 'Amizade com Soren acima de qualquer outra lealdade', 'Mérito pessoal como único critério que respeita'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Pai que ensinou antes de partir (Greil)', 'Amigo que ninguém mais consegue alcançar (Soren)', 'Espada que é destino carregado (Ragnell)'] },

  { id: 'fe-marth',
    nome: 'Marth',
    aliases: ['Marth', 'Marth Lowell', 'Prince of Altea', 'Hero-King'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Fire Emblem', work: 'Fire Emblem: Shadow Dragon (1990)', category: 'video-game' },
    tema: 'Príncipe que aprendeu que nobre não é suficiente',
    origem: 'Príncipe de Altea',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Caeda', emocoes: ['amor', 'âncora emocional'] },
      { alvo: 'Falchion', emocoes: ['herança', 'responsabilidade sagrada'] },
      { alvo: 'Povo de Altea', emocoes: ['dever de rei', 'culpa de exilado'] },
    ],
    descricao: 'Príncipe que viu seu reino ser tomado e fugiu como criança, retornando para reconquistá-lo com espada e aliados. Marth é o arquétipo do herói do Fire Emblem: nobre sem ser arrogante, forte sem ser bruto, carregando Falchion como responsabilidade, não privilégio. O Hero-King não nasceu — foi forjado pela perda.',
    keyTraits: ['Falchion: espada sagrada contra dragões', 'Liderança aristocrática que conquistou na prática', 'Exilado que reconquistou tudo passo a passo', 'Tiara como símbolo de realeza que não abandona', 'Fundador do arquétipo de protagonista FE'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Amor que esperou em qualquer circunstância (Caeda)', 'Espada que é herança e missão (Falchion)', 'Povo que precisava de volta o que perdeu (Altea)'] },

  { id: 'fe-edelgard',
    nome: 'Edelgard von Hresvelg',
    aliases: ['Edelgard', 'El', 'Emperor Edelgard', 'Flame Emperor'],
    arquetipo: 'guerreiro-arcano',
    source: { franchise: 'Fire Emblem', work: 'Fire Emblem: Three Houses (2019)', category: 'video-game' },
    tema: 'Revolução ao custo da alma',
    origem: 'Imperatriz de Adrestia',
    atributos: { des: 'd8', vig: 'd10', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'Byleth', emocoes: ['confiança absoluta', 'único aliado real'] },
      { alvo: 'Those Who Slither in the Dark', emocoes: ['aliança pragmática', 'ódio profundo'] },
      { alvo: 'Sistema de Crest', emocoes: ['rejeição ideológica', 'trauma pessoal'] },
    ],
    descricao: 'Imperatriz que derrubou a Igreja de Seiros e reescreveu Fódlan porque o sistema de Crests torturou dez de seus irmãos para lhe dar poder. Edelgard está certa sobre o que precisa mudar; está errada sobre os meios e aliados. Sua tragédia é que a revolução exigiu dela exatamente o que tentava destruir: cruelty como ferramenta.',
    keyTraits: ['Magia de Crest combinada com machado de batalha', 'Visão política que redefine toda a nação', 'Aliança com demônios para destruir o sistema que os cria', 'Trauma de experimentos que é motor de tudo', 'Arco que é trágico em quase todos os caminhos'],
    suggestedQuirks: ['heranca', 'prodigios_rivais'],
    bondHints: ['Professor que é o único que não vai embora (Byleth)', 'Aliados que são a sujeira da revolução (Those Who Slither)', 'Sistema que precisa morrer mesmo que isso destrua a destruidora (Crests)'] },

  { id: 'fe-lysithea',
    nome: 'Lysithea von Ordelia',
    aliases: ['Lysithea', 'Lysithea von Ordelia'],
    arquetipo: 'mago-arcano',
    source: { franchise: 'Fire Emblem', work: 'Fire Emblem: Three Houses (2019)', category: 'video-game' },
    tema: 'Urgência de quem sabe que o tempo é curto',
    origem: 'Nobre de Ordelia',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: 'Família Ordelia', emocoes: ['amor', 'culpa de sobrevivente'] },
      { alvo: 'Experimentos de Crest', emocoes: ['trauma', 'curta expectativa de vida'] },
      { alvo: 'Estudo de magia', emocoes: ['urgência', 'identidade'] },
    ],
    descricao: 'Melhor maga de três Houses, Lysithea tem dois Crests implantados à força — o que dobrou seu poder e cortou sua expectativa de vida pela metade. Ela trabalha mais que todos porque literalmente não pode desperdiçar tempo. Irritada quando tratada como criança, mas genuinamente apavorada de morrer antes de ver o futuro que ajudou a construir.',
    keyTraits: ['Magia Hades e Luna de dano explosivo', 'Expectativa de vida reduzida como pressão constante', 'Trabalho incansável como resposta ao tempo limitado', 'Ira quando subestimada por aparência jovem', 'Amor pela família como razão de pressa'],
    suggestedQuirks: ['grimorio_misterioso', 'prodigios_rivais'],
    bondHints: ['Família que pagou o preço do poder dela (Ordelia)', 'Futuro que talvez não veja mas luta por construir (mundo)', 'Magia que é identidade e relógio ao mesmo tempo (estudo)'] },

];

if (typeof module !== 'undefined') module.exports = FIRE_EMBLEM_CHARACTERS;
