// Undertale — Character KB

const UNDERTALE_CHARACTERS = [

  { id: 'ut-frisk',
    nome: 'Frisk',
    aliases: ['Frisk', 'The Human', 'The Fallen Child'],
    arquetipo: 'generalista',
    source: { franchise: 'Undertale', work: 'Undertale (2015)', category: 'video-game' },
    tema: 'Determinação como poder que transcende o inevitável',
    origem: 'Humano que caiu no Underground',
    atributos: { des: 'd6', vig: 'd6', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Toriel', emocoes: ['amor materno recebido', 'proteção'] },
      { alvo: 'Monstros do Underground', emocoes: ['escolha de não matar'] },
      { alvo: 'Flowey / Asriel', emocoes: ['empatia que muda tudo'] },
    ],
    descricao: 'Criança que caiu no Underground e descobriu que pode resolver tudo sem violência — se escolher. Frisk não tem atributos excepcionais além de Determinação pura: a capacidade de recusar o estado final e tentar de novo. O Pacifista é o arco verdadeiro; os outros são sobre o que acontece quando a empatia falha.',
    keyTraits: ['SAVE e LOAD como expressão de Determinação', 'Pacifismo ativo como habilidade, não passividade', 'Empatia que funciona como ferramenta de combate', 'Generalista absoluto: adapta ao que cada situação pede', 'Presença que transforma quem encontra'],
    suggestedQuirks: ['glorioso_destino', 'sobrevivente_nf'],
    bondHints: ['Figura materna que protege (Toriel)', 'Espécie que escolheu não destruir (monstros)', 'Alma perdida que pode ser redimida por empatia (Asriel)'] },

  { id: 'ut-sans',
    nome: 'Sans',
    aliases: ['Sans', 'Sans the Skeleton', '* (Gaster?)'],
    arquetipo: 'apostador',
    source: { franchise: 'Undertale', work: 'Undertale (2015)', category: 'video-game' },
    tema: 'Nihilismo que ainda escolhe importar-se',
    origem: 'Esqueleto do Underground',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd8' },
    lacos: [
      { alvo: 'Papyrus', emocoes: ['amor fraternal como razão de qualquer esforço'] },
      { alvo: 'Frisk', emocoes: ['observação', 'julgamento final'] },
      { alvo: 'Tempo (conceito)', emocoes: ['ciência', 'fadiga de SAVE/LOAD'] },
    ],
    descricao: 'Esqueleto preguiçoso que faz piadas ruins e dorme no trabalho — até o Pacifista falhar. Sans é o boss mais difícil do jogo se você chegou lá pelo caminho errado; ele sabe sobre SAVE/LOAD e está cansado de assistir o ciclo. Sua lealdade a Papyrus é o único motivo de qualquer esforço real.',
    keyTraits: ['Telecinese de ossos e Gaster Blasters como kit devastador', 'Conhecimento de SAVE/LOAD como meta-consciência', 'Preguiça que é cansaço existencial, não fraqueza', 'Senso de humor como filtro de percepção do mundo', 'Amor por Papyrus como único valor absoluto'],
    suggestedQuirks: ['mil_faces', 'sobrevivente_nf'],
    bondHints: ['Irmão que é o único motivo de se levantar (Papyrus)', 'Humano que determina se o esforço valeu (Frisk)', 'Ciclo que já viu vezes demais (tempo/SAVE)'] },

];

if (typeof module !== 'undefined') module.exports = UNDERTALE_CHARACTERS;
