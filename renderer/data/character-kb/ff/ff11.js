// Final Fantasy XI — personagens curados (Fase 3.3, Batch 4)

const FF11_CHARACTERS = [

  { id: 'ff11-shantotto',
    nome: 'Shantotto', aliases: ['shantotto', 'shantotto ff11', 'professor shantotto', 'shantotto tarutaru', 'doctor shantotto'], arquetipo: 'mago-sombrio',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy XI', category: 'video-game' },
    tema: 'O poder fala rimas e o mundo obedece', origem: 'Doutora/Ex-Ministra de Windhurst',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd12' },
    lacos: [{ alvo: 'Windhurst', emocoes: ['lealdade complexa'] }, { alvo: 'Magia', emocoes: ['vocação absoluta'] }, { alvo: 'Inferiors', emocoes: ['desprezo carinhoso'] }],
    descricao: 'A Tarutaru mais poderosa de Vana\'diel que fala em rimas, chama todos de inferiores e está completamente certa em ambos — o ego dela é proporcional à capacidade.',
    keyTraits: ['fala em rimas', 'magia negra suprema', 'Tarutaru minúscula temível', 'ego justificado'],
    suggestedQuirks: ['prodigios_rivais', 'glorioso_destino'],
    bondHints: ['chama você de inferior como forma de reconhecimento — os que ela ignora completamente são os que não contam', 'as rimas são arrogância ou poesia dependendo de quem está perdendo'] },

  { id: 'ff11-prishe',
    nome: 'Prishe', aliases: ['prishe', 'prishe ff11', 'prishe chains of promathia', 'immortal prishe', 'prishe elvaan'], arquetipo: 'barbaro-furioso',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy XI', category: 'video-game' },
    tema: 'Imortal que quer morrer de forma própria', origem: 'Elvaan/Amaldiçoada de Promathia',
    atributos: { des: 'd10', vig: 'd12', ast: 'd6', von: 'd6' },
    lacos: [{ alvo: 'Tenzen', emocoes: ['missão compartilhada'] }, { alvo: 'Maldição', emocoes: ['resistência ativa'] }, { alvo: 'Morte', emocoes: ['direito negado'] }],
    descricao: 'Passou séculos imortal por maldição e o que mais quer é o direito de morrer no momento certo — luta com os punhos porque é a coisa mais viva que ela pode fazer.',
    keyTraits: ['imortalidade forçada', 'punhos de Elvaan', 'séculos de raiva acumulada', 'xingamentos como afeto'],
    suggestedQuirks: ['amaldicoado_af', 'regressado'],
    bondHints: ['sobreviveu a tudo menos à escolha de quando parar', 'a brutalidade no combate é a prova de que ainda está viva'] },

  { id: 'ff11-zeid',
    nome: 'Zeid', aliases: ['zeid', 'zeid ff11', 'zeid dark knight ff11', 'zeid da bastok', 'shadow knight zeid'], arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy XI', category: 'video-game' },
    tema: 'Carregar a escuridão para que outros não carreguem', origem: 'Cavaleiro das Trevas/Mercenário',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd8' },
    lacos: [{ alvo: 'Rastafan', emocoes: ['irmandade perdida'] }, { alvo: 'Trevas', emocoes: ['ferrramenta e fardo'] }, { alvo: 'Adventurer', emocoes: ['transmissão de legado'] }],
    descricao: 'O Dark Knight que ensina que a escuridão é uma ferramenta — não algo a temer, mas algo a dominar antes que domine você.',
    keyTraits: ['Dark Knight original', 'drapeto e espada sombria', 'carrega culpa de batalha', 'ensina o poder das trevas'],
    suggestedQuirks: ['portador_da_ruina', 'oficial_arrependido'],
    bondHints: ['usa a escuridão para proteger — a diferença de quem usa para destruir é a escolha', 'ensina não porque quer discípulo mas porque alguém deve saber'] },

  { id: 'ff11-lilisette',
    nome: 'Lilisette', aliases: ['lilisette', 'lilisette ff11', 'lilisette dancer ff11', 'lilisette wings of the goddess', 'dancer lilisette'], arquetipo: 'dançarino',
    source: { franchise: 'Final Fantasy', work: 'Final Fantasy XI', category: 'video-game' },
    tema: 'Dançar entre tempos para consertar o passado', origem: 'Dançarina/Guerreira do Tempo',
    atributos: { des: 'd12', vig: 'd8', ast: 'd6', von: 'd8' },
    lacos: [{ alvo: 'Portavida', emocoes: ['missão ao longo do tempo'] }, { alvo: 'Crystal War', emocoes: ['passado que precisa mudar'] }, { alvo: 'Dança', emocoes: ['arma e identidade'] }],
    descricao: 'Uma dançarina que viajou no tempo para impedir a Crystal War — usa o corpo como arma e a dança como linguagem que transcende eras.',
    keyTraits: ['dance steps como combate', 'viagem temporal', 'Wings of the Goddess', 'otimismo guerreiro'],
    suggestedQuirks: ['de_um_mundo_distante_tf', 'glorioso_destino'],
    bondHints: ['dança no campo de batalha como declaração de que a vida continua', 'foi ao passado não para escapar mas para salvar o futuro'] },

];

if (typeof module !== 'undefined') module.exports = FF11_CHARACTERS;
