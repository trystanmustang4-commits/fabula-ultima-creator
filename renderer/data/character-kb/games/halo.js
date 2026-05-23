// Halo — Character KB

const HALO_CHARACTERS = [

  { id: 'halo-master-chief',
    nome: 'Master Chief',
    aliases: ['Master Chief', 'John-117', 'Spartan-117', 'The Chief'],
    arquetipo: 'guerreiro-escudo',
    source: { franchise: 'Halo', work: 'Halo series', category: 'video-game' },
    tema: 'Humanidade preservada dentro da armadura',
    origem: 'Supersoldado Spartan-II',
    atributos: { des: 'd8', vig: 'd12', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Cortana', emocoes: ['parceria', 'luto'] },
      { alvo: 'Humanidade', emocoes: ['dever', 'proteção'] },
      { alvo: 'UNSC', emocoes: ['lealdade', 'tensão institucional'] },
    ],
    descricao: 'Supersoldado criado desde a infância para proteger a humanidade, Master Chief é o escudo que nunca baixa. A armadura Mjolnir é quase uma segunda pele; o homem dentro dela é quieto, direto e implacável. Sua humanidade existe — ela aparece em momentos raros, especialmente com Cortana, e é mais poderosa justamente por ser contida.',
    keyTraits: ['Treinamento Spartan desde a infância', 'Parceria profunda com IA Cortana', 'Comunicação mínima, impacto máximo', 'Escudo vivo da civilização humana', 'Humanidade latente que emerge nos momentos certos'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Parceria que virou amor e luto (Cortana)', 'Dever que é identidade completa (humanidade)', 'Instituição que molda e aprisiona (UNSC)'] },

  { id: 'halo-arbiter',
    nome: 'The Arbiter',
    aliases: ['Arbiter', 'Thel Vadam', "The Arbiter", 'Thel'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Halo', work: 'Halo 2 (2004)', category: 'video-game' },
    tema: 'Honra reconquistada através da traição ao que era sagrado',
    origem: 'Supreme Commander dos Covenant',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Master Chief', emocoes: ['aliança improvável', 'respeito de guerreiro'] },
      { alvo: 'Covenant', emocoes: ['rancor', 'luto de crença perdida'] },
      { alvo: 'Elite (Sangheili)', emocoes: ['responsabilidade', 'redenção'] },
    ],
    descricao: 'Comandante Supremo que falhou em deter a detonação de um Halo e foi transformado em Árbitro — mártir da fé Covenant — como punição. Sua jornada é de desmascaramento: a Grande Jornada é uma mentira, e os Prophets o usaram. Aliado improvável de Master Chief, sua honra não é perdida; foi realocada para a verdade.',
    keyTraits: ['Guerreiro Elite de geração superior', 'Arco de desconstrução de fé cega', 'Aliança com antigo inimigo como honra real', 'Espada de energia como extensão da alma', 'Líder que carrega o peso do povo Sangheili'],
    suggestedQuirks: ['heranca', 'glorioso_destino'],
    bondHints: ['Inimigo que virou o único aliado honesto (Chief)', 'Fé que era mentira e precisou ser destruída (Covenant)', 'Povo que carrega as consequências das suas escolhas (Elite)'] },

];

if (typeof module !== 'undefined') module.exports = HALO_CHARACTERS;
