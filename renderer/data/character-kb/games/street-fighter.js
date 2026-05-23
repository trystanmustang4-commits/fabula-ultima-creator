// Street Fighter — Character KB

const STREET_FIGHTER_CHARACTERS = [

  { id: 'sf-ryu',
    nome: 'Ryu',
    aliases: ['Ryu', 'Ryu (SF)', 'The World Warrior'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Street Fighter', work: 'Street Fighter series', category: 'video-game' },
    tema: 'Busca pelo autodomínio sem linha de chegada',
    origem: 'Discípulo de Gouken',
    atributos: { des: 'd8', vig: 'd10', ast: 'd8', von: 'd12' },
    lacos: [
      { alvo: 'Ken', emocoes: ['amizade mais profunda', 'rival permanente'] },
      { alvo: 'Akuma', emocoes: ['caminho que recusa'] },
      { alvo: 'Satsui no Hado', emocoes: ['tentação', 'luta interna'] },
    ],
    descricao: 'Guerreiro errante que não luta por troféu ou fama — luta para descobrir até onde pode chegar. Hadouken, Shoryuken, Tatsumaki: movimentos de kata elevados a arte. Sua batalha mais importante é interna: o Satsui no Hado é poder puro que corrompe, e Ryu escolhe todos os dias não tocá-lo.',
    keyTraits: ['Hadouken / Shoryuken / Tatsumaki como tríade fundadora', 'Errante sem casa, busca como vocação', 'Satsui no Hado como poder recusado', 'Autodomínio como objetivo sem fim', 'Amizade com Ken como único laço permanente'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Irmão de treino que é o espelho certo (Ken)', 'Caminho que seria poder mas seria perda (Akuma)', 'Força interna que precisa ser domada (Satsui no Hado)'] },

  { id: 'sf-chun-li',
    nome: 'Chun-Li',
    aliases: ['Chun-Li', 'Chun Li', 'The Strongest Woman in the World'],
    arquetipo: 'furioso-guerreiro',
    source: { franchise: 'Street Fighter', work: 'Street Fighter series', category: 'video-game' },
    tema: 'Força que começou pela dor de uma perda',
    origem: 'Agente de Interpol',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Pai (memória)', emocoes: ['amor', 'motor de toda decisão'] },
      { alvo: 'Shadaloo/Bison', emocoes: ['ódio focado', 'missão de vida'] },
      { alvo: 'Guile', emocoes: ['aliança de dor similar'] },
    ],
    descricao: 'Filha de detetive assassinado por Shadaloo que entrou na Interpol para vingar o pai e destruir a organização. Seus kicks são os mais rápidos e técnicos do jogo; Hyakuretsukyaku é uma parede de impacto. Chun-Li não usa força bruta — usa velocidade de pernas que vai além do que qualquer força física permite.',
    keyTraits: ['Velocidade de pernas impossível como especialidade', 'Hyakuretsukyaku e Spinning Bird Kick como assinatura', 'Detetive com rede de informação real', 'Missão pessoal que coincide com missão profissional', 'Emoção por pai que nunca vira fraqueza em batalha'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Pai que é o porquê de tudo (memória)', 'Organização que representa o mal específico (Shadaloo)', 'Aliado com a mesma ferida (Guile)'] },

  { id: 'sf-ken',
    nome: 'Ken Masters',
    aliases: ['Ken', 'Ken Masters'],
    arquetipo: 'barbaro-furioso',
    source: { franchise: 'Street Fighter', work: 'Street Fighter series', category: 'video-game' },
    tema: 'Poder que não precisa de propósito sério para ser real',
    origem: 'Filho de herdeiro americano, discípulo de Gouken',
    atributos: { des: 'd10', vig: 'd10', ast: 'd6', von: 'd8' },
    lacos: [
      { alvo: 'Ryu', emocoes: ['rivalidade fraterna', 'amizade definitiva'] },
      { alvo: 'Eliza', emocoes: ['amor genuíno', 'âncora na vida civil'] },
      { alvo: 'Torneios', emocoes: ['prazer puro', 'expressão de poder'] },
    ],
    descricao: 'Discípulo de Gouken que desenvolveu o mesmo estilo de Ryu com mais fogo e menos meditação. Ken luta porque adora — simples assim. Seu Shoryuken tem chamas; sua atitude, flamboyância americana que contrasta com o monasticismo de Ryu. É melhor do que quase todo mundo e não precisa de angústia existencial para provar.',
    keyTraits: ['Shoryuken flamejante como assinatura distinta', 'Estilo agressivo e contínuo vs kata de Ryu', 'Prazer em lutar como força, não fraqueza', 'Equilíbrio entre vida de torneio e família', 'Amizade com Ryu como relação mais duradoura'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Irmão de arte que é o único rival real (Ryu)', 'Amor que ancota ao mundo além da luta (Eliza)', 'Palco que é expressão natural (torneios)'] },

  { id: 'sf-akuma',
    nome: 'Akuma',
    aliases: ['Akuma', 'Gouki', 'Master of the Fist'],
    arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Street Fighter', work: 'Street Fighter II Turbo (1993)', category: 'video-game' },
    tema: 'Satsui no Hado como caminho, não como queda',
    origem: 'Discípulo de Goutetsu, Irmão de Gouken',
    atributos: { des: 'd10', vig: 'd10', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'Gouken', emocoes: ['fraternidade rompida', 'confronto inevitável'] },
      { alvo: 'Ryu', emocoes: ['reconhecimento de potencial', 'desafio de levar até o fim'] },
      { alvo: 'Satsui no Hado', emocoes: ['identidade total', 'integração deliberada'] },
    ],
    descricao: 'Abraçou o Satsui no Hado que Gouken recusou e se tornou algo além do humano — ou aquém, dependendo da perspectiva. Akuma mata Goutetsu porque o mestre atingiu o limite; não por traição, mas porque é a lógica do caminho escolhido. Ryu é o único que pode eventualmente ser um oponente digno.',
    keyTraits: ['Satsui no Hado integrado como poder puro', 'Shun Goku Satsu: Raging Demon definitivo', 'Código de honra de guerreiro dentro da escuridão', 'Busca pelo oponente que justifique o poder', 'Presença que muda qualquer sala que entra'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Irmão que escolheu o caminho oposto (Gouken)', 'Potencial que merece ser o oponente final (Ryu)', 'Poder que é identidade, não ferramenta (Satsui)'] },

];

if (typeof module !== 'undefined') module.exports = STREET_FIGHTER_CHARACTERS;
