// Hades — Character KB

const HADES_CHARACTERS = [

  { id: 'hades-zagreus',
    nome: 'Zagreus',
    aliases: ['Zagreus', 'Zag', 'Prince of the Underworld'],
    arquetipo: 'apostador',
    source: { franchise: 'Hades', work: 'Hades (2020)', category: 'video-game' },
    tema: 'Tentativa repetida como forma de amor e aprendizado',
    origem: 'Príncipe do Submundo',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Persephone', emocoes: ['amor filial', 'busca de décadas'] },
      { alvo: 'Hades (pai)', emocoes: ['conflito', 'incompreensão mútua que vira respeito'] },
      { alvo: 'Olympianos', emocoes: ['aliança de conveniência', 'família distante'] },
    ],
    descricao: 'Filho do Deus dos Mortos que tenta escapar do Submundo repetidamente para encontrar a mãe — e cada morte é apenas outro começo. Zagreus escolhe armas e bênçãos diferentes a cada corrida, constrói relacionamentos com cada personagem ao longo de tentativas, e eventualmente encontra o que procurava. A persistência como filosofia de amor.',
    keyTraits: ['Arsenal intercambiável: espada, lança, escudo, arco, punhos, pistola', 'Bênçãos dos Olímpicos que mudam cada corrida', 'Morte como mecânica de aprendizado, não fracasso', 'Construção de relacionamentos através de repetições', 'Falar de morte com charme genuíno e néctar na mão'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Mãe que é o destino de cada tentativa (Persephone)', 'Pai que é obstáculo e família ao mesmo tempo (Hades)', 'Família que nunca se conheceu e tenta (Olímpicos)'] },

  { id: 'hades-achilles',
    nome: 'Aquiles',
    aliases: ['Achilles', 'Aquiles', 'The Greatest Warrior'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Hades', work: 'Hades (2020)', category: 'video-game' },
    tema: 'Glória conquistada e seu custo oculto',
    origem: 'Herói Grego, Guardião do Submundo',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Patroclus', emocoes: ['amor', 'separação da morte'] },
      { alvo: 'Zagreus', emocoes: ['mentoria', 'afeto paternal substituto'] },
      { alvo: 'Glória (passado)', emocoes: ['saudade', 'custo que não calculou'] },
    ],
    descricao: 'O maior guerreiro da Grécia que virou guarda no submundo de Hades — perto de Patroclus mas separado por campos diferentes. Ensina Zagreus com paciência e afeto genuíno enquanto carrega o peso de ter escolhido glória sobre vida longa. Em Hades, sua reunião com Patroclus é um dos finais mais emotivos.',
    keyTraits: ['Expertise em lança e combate que definiu épocas', 'Mentoria de Zagreus com afeto genuíno', 'Glória passada como peso e não só orgulho', 'Amor por Patroclus como razão de tudo', 'Sabedoria de quem pagou preço máximo por suas escolhas'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Amor separado por morte que pode ser reunido (Patroclus)', 'Príncipe que ensinar é jeito de continuar importando (Zagreus)', 'Glória que custou o que mais amava (escolha passada)'] },

];

if (typeof module !== 'undefined') module.exports = HADES_CHARACTERS;
