// Hollow Knight — Character KB

const HOLLOW_KNIGHT_CHARACTERS = [

  { id: 'hk-knight',
    nome: 'The Knight',
    aliases: ['The Knight', 'Hollow Knight (player)', 'Little Ghost'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Hollow Knight', work: 'Hollow Knight (2017)', category: 'video-game' },
    tema: 'Vazio que descobre propósito pela jornada',
    origem: 'Vessel dos Pale King',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Hollow Knight (irmão)', emocoes: ['identidade espelhada', 'confronto inevitável'] },
      { alvo: 'Quirrel', emocoes: ['amizade de viagem sem obrigação'] },
      { alvo: 'Hallownest', emocoes: ['destino', 'escolha de como terminar'] },
    ],
    descricao: 'Vessel criado para ser vazio de emoções e conter o Radiance — mas algo sobreviveu. The Knight explora Hallownest com nail e Soul, absorvendo charms, derrotando Dream Bosses e eventualmente chegando ao confronto que define se a linhagem para aqui ou continua. Pequeno em tamanho, imenso em implicações.',
    keyTraits: ['Nail como arma e Soul como magia', 'Sistema de charms para customização de build', 'Vazio como identidade que não é ausência', 'Escolha de endings como expressão de valores', 'Exploração de mundo labiríntico como jornada interna'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Irmão que carregou o peso que deveria ser seu (Hollow)', 'Companheiro de viagem que não pede nada (Quirrel)', 'Reino que pede sacrifício final ou libertação (Hallownest)'] },

  { id: 'hk-hornet',
    nome: 'Hornet',
    aliases: ['Hornet', 'Protector of Hallownest'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Hollow Knight', work: 'Hollow Knight (2017)', category: 'video-game' },
    tema: 'Proteção que testa antes de confiar',
    origem: 'Filha da Pale King e Herrah the Beast',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'The Knight', emocoes: ['teste', 'aliança eventual'] },
      { alvo: 'Herrah (mãe)', emocoes: ['amor', 'sacrifício aceito'] },
      { alvo: 'Hallownest', emocoes: ['responsabilidade de proteger o que resta'] },
    ],
    descricao: 'Protetora de Hallownest que usa agulha e seda com velocidade e precisão que fazem The Knight parecer lento no primeiro encontro. Hornet não é vilã — é guardiã que testa se o visitante merece avançar. Sua fidelidade ao reino e à memória da mãe que se sacrificou por ela é o núcleo de tudo.',
    keyTraits: ['Agulha e seda: velocidade e controle de espaço', 'Combate acrobático com alcance expandido por seda', 'Teste de mérito antes de qualquer aliança', 'Filha de dois mundos que não pertence completamente a nenhum', 'Lealdade a Hallownest mesmo em colapso'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Irmão de caminho diferente que prova validade (Knight)', 'Mãe que se sacrificou para ela existir (Herrah)', 'Reino que merece proteção mesmo em ruínas (Hallownest)'] },

];

if (typeof module !== 'undefined') module.exports = HOLLOW_KNIGHT_CHARACTERS;
