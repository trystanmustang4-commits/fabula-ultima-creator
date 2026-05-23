// The Legend of Zelda — Character KB

const ZELDA_CHARACTERS = [

  { id: 'zelda-midna',
    nome: 'Midna',
    aliases: ['Midna', 'Midna (Twilight Princess)', 'Twilight Princess'],
    arquetipo: 'mago-sombrio',
    source: { franchise: 'The Legend of Zelda', work: 'The Legend of Zelda: Twilight Princess (2006)', category: 'video-game' },
    tema: 'Arrogância que se quebra em amor e sacrifício',
    origem: 'Princesa do Reino do Crepúsculo',
    atributos: { des: 'd10', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: 'Link', emocoes: ['uso que vira parceria que vira amor'] },
      { alvo: 'Zant', emocoes: ['traição', 'ódio de usurpador'] },
      { alvo: 'Reino do Crepúsculo', emocoes: ['responsabilidade de rainha', 'saudade'] },
    ],
    descricao: 'Princesa do Crepúsculo maldita em forma imp que usou Link como ferramenta para seus próprios fins — e foi transformada no processo. Midna comanda magia do Crepúsculo com o cabelo-mão e pode criar portais entre mundos. Seu sacrifício final para destruir o Espelho do Crepúsculo é do personagem que mais mudou na série.',
    keyTraits: ['Magia do Crepúsculo via cabelo-mão', 'Portais entre o mundo do Crepúsculo e Hyrule', 'Arrogância de rainha que cede a vulnerabilidade real', 'Arco de crescimento mais completo de Twilight Princess', 'Sacrifício que fecha o portal permanentemente'],
    suggestedQuirks: ['de_um_mundo_distante_af', 'glorioso_destino'],
    bondHints: ['Ferramenta que virou parceiro que virou amor (Link)', 'Traidor que usurpou o trono (Zant)', 'Lar que só pode ser protegido de longe (Crepúsculo)'] },

  { id: 'zelda-princess-zelda',
    nome: 'Princesa Zelda',
    aliases: ['Zelda', 'Princess Zelda', 'Sheik'],
    arquetipo: 'mago-arcano',
    source: { franchise: 'The Legend of Zelda', work: 'The Legend of Zelda series', category: 'video-game' },
    tema: 'Sabedoria como arma e fardo',
    origem: 'Princesa de Hyrule',
    atributos: { des: 'd8', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: 'Link', emocoes: ['fé', 'dívida impagável'] },
      { alvo: 'Ganondorf', emocoes: ['oposição', 'compaixão relutante'] },
      { alvo: 'Trifórça da Sabedoria', emocoes: ['responsabilidade', 'fardo'] },
    ],
    descricao: 'Portadora da Trifórça da Sabedoria, Zelda frequentemente conhece o futuro mas não pode revelá-lo sem quebrar o que está por vir. Sua magia é ancestral e poderosa; sua prisão é saber demais. Em algumas encarnações age nos bastidores como Sheik; em outras, sacrifica tudo pela paz do reino.',
    keyTraits: ['Profecia como conhecimento e prisão', 'Magia ancestral de Hyrule', 'Sacrifício recorrente como tema', 'Alter ego que esconde força real (Sheik)', 'Sabedoria que não pode sempre ser dita'],
    suggestedQuirks: ['grimorio_misterioso', 'glorioso_destino'],
    bondHints: ['Fé que espera mesmo sem contato (Link)', 'Compaixão por inimigo que compreende (Ganondorf)', 'Herdeira de ciclo que não escolheu'] },

  { id: 'zelda-ganondorf',
    nome: 'Ganondorf',
    aliases: ['Ganondorf', 'Ganon', 'Calamity Ganon', 'Demon King'],
    arquetipo: 'guerreiro-arcano',
    source: { franchise: 'The Legend of Zelda', work: 'The Legend of Zelda series', category: 'video-game' },
    tema: 'Poder que corrompe ao tentar libertar',
    origem: 'Rei dos Gerudo',
    atributos: { des: 'd8', vig: 'd10', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'Link', emocoes: ['desprezo', 'reconhecimento de rival'] },
      { alvo: 'Zelda', emocoes: ['cobiça', 'respeito involuntário'] },
      { alvo: 'Trifórça do Poder', emocoes: ['obsessão', 'identidade'] },
    ],
    descricao: 'Rei Gerudo amaldiçoado a renascer com ódio ao mundo que o aprisionou. Ganondorf é guerreiro e mago em igual medida — domina espada e magia sombria com a mesma maestria. Sua tragédia é que o desejo de liberdade para seu povo se corrompeu em conquista absoluta.',
    keyTraits: ['Guerreiro e mago de igual peso', 'Antagonista cíclico com profundidade trágica', 'Desejo de poder como libertação corrompida', 'Força física e mágica extraordinária', 'Nobre que se tornou monstro'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Rival que é espelho (Link)', 'Objeto de desejo que define identidade (Zelda)', 'Maldição que define mais do que a escolha'] },

];

if (typeof module !== 'undefined') module.exports = ZELDA_CHARACTERS;
