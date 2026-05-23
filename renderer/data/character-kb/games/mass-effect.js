// Mass Effect — Character KB

const MASS_EFFECT_CHARACTERS = [

  { id: 'me-shepard',
    nome: 'Commander Shepard',
    aliases: ['Shepard', 'Commander Shepard', 'The Shepard'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Mass Effect', work: 'Mass Effect series', category: 'video-game' },
    tema: 'O galáctico que faz impossíveis virarem obrigações',
    origem: 'Comandante da Aliança Sistêmica',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd12' },
    lacos: [
      { alvo: 'Equipe (Normandy)', emocoes: ['liderança', 'família escolhida'] },
      { alvo: 'Reapers', emocoes: ['oposição existencial'] },
      { alvo: 'Ação (conceito)', emocoes: ['compulsão', 'identidade'] },
    ],
    descricao: 'Primeiro Humano Espectro da Cidadela, Shepard convencea galáxia a unir-se contra ameaça cósmica que a maioria preferia ignorar. Seja Paragon ou Renegade, o núcleo é o mesmo: alguém que age quando outros hesitam e leva as consequências com seriedade. A equipe da Normandy é tão central quanto qualquer missão.',
    keyTraits: ['Liderança carismática que une espécies incompatíveis', 'Adaptabilidade de combate: biótco, soldado, tecnologista', 'Convicção que não dobra mesmo contra evidência institucional', 'Família escolhida como maior força', 'Sobrevivente que muda a equação sempre que aparece'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Equipe que é o coração de toda decisão (Normandy)', 'Ameaça que ninguém mais leva a sério (Reapers)', 'Ação como resposta padrão a qualquer problema (conceito)'] },

  { id: 'me-garrus',
    nome: 'Garrus Vakarian',
    aliases: ['Garrus', 'Garrus Vakarian', 'Archangel'],
    arquetipo: 'atirador-pistoleiro',
    source: { franchise: 'Mass Effect', work: 'Mass Effect series', category: 'video-game' },
    tema: 'Calibrações como meditação e identidade',
    origem: 'Ex-agente C-Sec de Palaven',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Shepard', emocoes: ['lealdade mais forte que qualquer lei'] },
      { alvo: 'C-Sec/Cidadela', emocoes: ['desapontamento', 'separação necessária'] },
      { alvo: 'Turianos de Omega', emocoes: ['responsabilidade de liderança relutante'] },
    ],
    descricao: 'Atirador turiando que seguiu Shepard de uma investigação C-Sec para uma cruzada galática. Garrus é o amigo de Shepard — não apenas o aliado — e sua fidelidade ultrapassa qualquer instituição. Em Omega, virou "Anjo Vingador" quase por acidente, liderando mercenários por meses sozinho antes do resgate.',
    keyTraits: ['Franco-atirador de elite com Mantis Sniper', 'Ética pessoal mais rigorosa que a lei institucional', 'Lealdade a Shepard acima de qualquer outra coisa', 'Humor seco e autoconsciente sobre calibrações', 'Arco de desencanto que vira convicção pessoal'],
    suggestedQuirks: ['sobrevivente_nf', 'heranca'],
    bondHints: ['Parceiro que é mais família que colega (Shepard)', 'Sistema que decepcionou sem quebrar a ética (C-Sec)', 'Missão suicida que gerou liderança inesperada (Omega)'] },

  { id: 'me-tali',
    nome: "Tali'Zorah vas Normandy",
    aliases: ["Tali", "Tali'Zorah", "Tali'Zorah vas Normandy", "Tali'Zorah nar Rayya"],
    arquetipo: 'inventor',
    source: { franchise: 'Mass Effect', work: 'Mass Effect series', category: 'video-game' },
    tema: 'Lar como objetivo e como saudade',
    origem: 'Quarian em Peregrinação',
    atributos: { des: 'd8', vig: 'd6', ast: 'd12', von: 'd8' },
    lacos: [
      { alvo: 'Shepard', emocoes: ['amizade', 'amor possível'] },
      { alvo: 'Flotilha Quarian', emocoes: ['saudade', 'responsabilidade'] },
      { alvo: 'Geth', emocoes: ['ódio histórico', 'entendimento forçado'] },
    ],
    descricao: 'Engenheira quarian em Peregrinação — a jornada de todo jovem quarian para provar seu valor à Flotilha. Tali traz para a Normandy expertise em sistemas Geth e omni-ferramenta que ninguém mais tem. Seu traje é necessidade médica; sua curiosidade, genuína. Quer reconquistar Rannoch como lar perdido.',
    keyTraits: ['Omni-ferramenta para hackear e construir in-battle', 'Conhecimento de sistemas Geth sem paralelo', 'Sistema imunológico comprometido que gera vulnerabilidade', 'Lealdade à Flotilha mesmo quando discorda', 'Arco de lar perdido reconquistado'],
    suggestedQuirks: ['inventor_prodigio', 'de_um_mundo_distante_af'],
    bondHints: ['Comandante que é lar provisório (Shepard)', 'Povo que é identidade e fardo (Flotilha)', 'Inimigo que pode virar paz se houver coragem (Geth)'] },

  { id: 'me-liara',
    nome: "Liara T'Soni",
    aliases: ["Liara", "Liara T'Soni", 'Shadow Broker'],
    arquetipo: 'mago-arcano',
    source: { franchise: 'Mass Effect', work: 'Mass Effect series', category: 'video-game' },
    tema: 'Curiosidade que cresce em poder e responsabilidade',
    origem: 'Arqueóloga Asari de Thessia',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: 'Shepard', emocoes: ['amor', 'parceria de vida'] },
      { alvo: 'Protheans (pesquisa)', emocoes: ['fascinação acadêmica', 'missão'] },
      { alvo: 'Shadow Broker network', emocoes: ['ferramenta', 'responsabilidade pesada'] },
    ],
    descricao: 'Arqueóloga asari que pesquisava Protheans sozinha quando Shepard a encontrou, Liara percorreu um arco enorme: de acadêmica isolada a Shadow Broker, controlando a maior rede de inteligência galática. Biótica poderosa, mente analítica, coração exposto demais para o trabalho que escolheu.',
    keyTraits: ['Biótica de Singularidade e controle de campo', 'Melhor especialista em Protheans da galáxia', 'Shadow Broker: inteligência que define guerras', 'Ingenuidade inicial que virou dureza conquistada', 'Amor por Shepard como âncora em mundo sombrio'],
    suggestedQuirks: ['grimorio_misterioso', 'prodigios_rivais'],
    bondHints: ['Amor que é compasso moral (Shepard)', 'Civilização morta que explica o presente (Protheans)', 'Rede de informação que consome quem a controla (Shadow Broker)'] },

];

if (typeof module !== 'undefined') module.exports = MASS_EFFECT_CHARACTERS;
