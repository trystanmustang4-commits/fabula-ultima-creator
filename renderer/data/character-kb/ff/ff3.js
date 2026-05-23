// Final Fantasy III — personagens curados (Fase 3.3, Batch 1)

const FF3_CHARACTERS = [

  { id: 'ff3-luneth',
    nome: 'Luneth', aliases: ['luneth ff3', 'luneth final fantasy 3', 'wind crystal luneth', 'ff3 hero', 'luneth ur'], arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy III', category: 'video-game' },
    tema: 'A aventura encontrou ele', origem: 'Cristal do Vento/Orfão de Ur',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd6' },
    lacos: [{ alvo: 'Cristais', emocoes: ['chamado'] }, { alvo: 'Arc', emocoes: ['melhor amigo'] }, { alvo: 'Aventura', emocoes: ['obsessão'] }],
    descricao: 'Pulou na caverna antes de saber o que havia lá dentro e descobriu o Cristal do Vento — o herói impulsivo que carrega o grupo pelo simples fato de nunca recuar.',
    keyTraits: ['cristal do vento', 'impulsividade como virtude', 'orfão de Ur', 'não sabe ficar parado'],
    suggestedQuirks: ['de_um_mundo_distante_af', 'glorioso_destino'],
    bondHints: ['pulou antes de olhar e sempre sobreviveu', 'a aventura encontrou ele, não o contrário'] },

  { id: 'ff3-arc',
    nome: 'Arc', aliases: ['arc ff3', 'arc final fantasy 3', 'arc ur', 'bookworm arc ff', 'mage arc ff3'], arquetipo: 'mago-arcano',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy III', category: 'video-game' },
    tema: 'Saber é coragem', origem: 'Estudioso/Orfão de Ur',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [{ alvo: 'Luneth', emocoes: ['amizade de infância'] }, { alvo: 'Livros', emocoes: ['refúgio e força'] }, { alvo: 'Sabedoria', emocoes: ['busca'] }],
    descricao: 'O menino tímido que leva livros para uma dungeon e estuda até entender o que o assusta — transformou o medo de não ser suficiente na razão para saber mais do que qualquer um.',
    keyTraits: ['estudioso tímido', 'livros como fortaleza', 'magia como superação', 'saber é coragem'],
    suggestedQuirks: ['grimorio_misterioso', 'herdeiro_relutante'],
    bondHints: ['o livro ficou na aldeia mas o conhecimento foi junto', 'não é o mais corajoso — é o mais preparado'] },

  { id: 'ff3-refia',
    nome: 'Refia', aliases: ['refia ff3', 'refia final fantasy 3', 'refia ur', 'blacksmith daughter ff3', 'refia healer'], arquetipo: 'curandeiro',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy III', category: 'video-game' },
    tema: 'O coração que sustenta o grupo', origem: 'Filha de Ferreiro/Orfã de Ur',
    atributos: { des: 'd8', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [{ alvo: 'Grupo', emocoes: ['cuidado incondicional'] }, { alvo: 'Pai Ferreiro', emocoes: ['herança'] }, { alvo: 'Amigos', emocoes: ['família construída'] }],
    descricao: 'Cresceu numa ferraria aprendendo que força sustenta — como grupo se sustenta quando alguém cuida, e Refia nunca esperou ser pedida para fazer isso.',
    keyTraits: ['filha do ferreiro', 'coração do grupo', 'cuidado sem limite', 'versatilidade maternal'],
    suggestedQuirks: ['heranca', 'irmaozao'],
    bondHints: ['cuida de todos sem que ninguém precise pedir', 'a ferraria ensinou que força também sustenta'] },

  { id: 'ff3-ingus',
    nome: 'Ingus', aliases: ['ingus ff3', 'ingus final fantasy 3', 'ingus knight sasune', 'cavaleiro ingus ff', 'ingus sara'], arquetipo: 'guerreiro-escudo',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy III', category: 'video-game' },
    tema: 'O juramento que não expira', origem: 'Cavaleiro de Sasune',
    atributos: { des: 'd8', vig: 'd10', ast: 'd6', von: 'd10' },
    lacos: [{ alvo: 'Sara', emocoes: ['juramento sagrado'] }, { alvo: 'Sasune', emocoes: ['dever'] }, { alvo: 'Grupo', emocoes: ['extensão do reino'] }],
    descricao: 'O cavaleiro de Sasune que protege a Princesa Sara desde que foi velho o suficiente para carregar uma espada — o reino caiu, a armadura não.',
    keyTraits: ['cavaleiro de Sasune', 'juramento à Sara', 'dever acima de tudo', 'escudo antes de espada'],
    suggestedQuirks: ['servo_in_fiel', 'a_promessa_que_te_detem'],
    bondHints: ['o juramento a Sara ancora cada batalha', 'o reino caiu mas o cavaleiro permaneceu'] },

  { id: 'ff3-cloud-of-darkness',
    nome: 'Cloud of Darkness', aliases: ['cloud of darkness ff3', 'cloud of darkness', 'nuvem das trevas ff', 'void entity ff3', 'ff3 final boss'], arquetipo: 'mago-sombrio',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy III', category: 'video-game' },
    tema: 'Retornar tudo ao vazio', origem: 'Entidade do Vazio',
    atributos: { des: 'd8', vig: 'd6', ast: 'd12', von: 'd12' },
    lacos: [{ alvo: 'Vazio', emocoes: ['essência'] }, { alvo: 'Cristais', emocoes: ['ameaça a dissolver'] }, { alvo: 'Trevas', emocoes: ['identidade'] }],
    descricao: 'Não é vilã — é inevitabilidade. A entidade do Vazio que existe para retornar tudo ao nada é mais antiga que qualquer cristal, e o nada que ela representa é mais permanente que qualquer luz.',
    keyTraits: ['entidade do vazio', 'retornar ao nada', 'tentáculos da escuridão', 'além do bem e do mal'],
    suggestedQuirks: ['portador_da_ruina', 'diabolista'],
    bondHints: ['não é vilã — é inevitabilidade', 'o nada que ela representa é mais antigo que qualquer cristal'] },

];

if (typeof module !== 'undefined') module.exports = FF3_CHARACTERS;
