// Pokémon — Character KB

const POKEMON_CHARACTERS = [

  { id: 'pokemon-red',
    nome: 'Red',
    aliases: ['Red', 'Red (Pokemon)', 'Ash (anime)'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Pokémon', work: 'Pokémon Red/Blue (1996)', category: 'video-game' },
    tema: 'Silêncio do campeão que já não precisa provar nada',
    origem: 'Treinador de Pallet Town',
    atributos: { des: 'd8', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Pikachu', emocoes: ['parceria absoluta', 'linguagem sem palavras'] },
      { alvo: 'Blue/Gary', emocoes: ['rivalidade de infância', 'reconhecimento tardio'] },
      { alvo: 'Mt. Silver', emocoes: ['isolamento escolhido', 'autoexigência'] },
    ],
    descricao: 'Campeão que derrotou a Elite dos Quatro, desbancou o Líder da Equipe Rocket e depois subiu ao topo do Mt. Silver para treinar sozinho por anos. Red não fala — sua equipe lendária fala por ele. Quando Gold o enfrenta em Gold/Silver, é a batalha mais difícil do jogo: o herói do passado como boss final silencioso.',
    keyTraits: ['Equipe equilibrada com coberturas perfeitas', 'Silêncio como linguagem de campeão', 'Pikachu como extensão da alma', 'Isolamento como autoexigência e paz', 'Presença que comunica excelência sem palavras'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Parceiro que é extensão do ser (Pikachu)', 'Rival que foi a pedra de amolar (Blue)', 'Montanha que é templo de prática (Mt. Silver)'] },

  { id: 'pokemon-cynthia',
    nome: 'Cynthia',
    aliases: ['Cynthia', 'Campeã Cynthia'],
    arquetipo: 'tatico-erudito',
    source: { franchise: 'Pokémon', work: 'Pokémon Diamond/Pearl (2006)', category: 'video-game' },
    tema: 'Poder intelectual que espera ser desafiado',
    origem: 'Campeã da Região de Sinnoh',
    atributos: { des: 'd6', vig: 'd8', ast: 'd12', von: 'd10' },
    lacos: [
      { alvo: 'Garchomp', emocoes: ['parceria de elite', 'extensão de estratégia'] },
      { alvo: 'Mitologia de Sinnoh', emocoes: ['paixão acadêmica', 'missão de pesquisa'] },
      { alvo: 'Treinadores promissores', emocoes: ['interesse genuíno', 'desafio selecionado'] },
    ],
    descricao: 'Campeã de Sinnoh e pesquisadora de mitologia Pokémon que combina conhecimento acadêmico com batalha de altíssimo nível. O time de Cynthia é famoso por não ter fraqueza óbvia — Garchomp de nível 62 como finisher é a parede que definiu uma geração de jogadores. Sua elegância intelectual é a cobertura perfeita para poder absoluto.',
    keyTraits: ['Time sem fraqueza elemental evidente', 'Garchomp como ás mais famoso da franquia', 'Combinação de pesquisa acadêmica e batalha de elite', 'Interesse genuíno por treinadores com potencial', 'Paciência de estrategista que espera o momento certo'],
    suggestedQuirks: ['grimorio_misterioso', 'prodigios_rivais'],
    bondHints: ['Parceiro que executa a estratégia perfeita (Garchomp)', 'Mitologia que revela o mundo em camadas (Sinnoh)', 'Treinador que talvez seja o próximo desafio real (protagonista)'] },

  { id: 'pokemon-n',
    nome: 'N',
    aliases: ['N', 'Natural Harmonia Gropius', 'King of Team Plasma'],
    arquetipo: 'orador-bardo',
    source: { franchise: 'Pokémon', work: 'Pokémon Black/White (2010)', category: 'video-game' },
    tema: 'Ideologia pura que colide com realidade complexa',
    origem: 'Rei da Team Plasma',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd12' },
    lacos: [
      { alvo: 'Pokémon (espécie)', emocoes: ['amor', 'busca por comunicação real'] },
      { alvo: 'Protagonist B/W', emocoes: ['rivalidade ideológica', 'respeito crescente'] },
      { alvo: 'Ghetsis', emocoes: ['manipulação sofrida', 'pai que não era pai'] },
    ],
    descricao: 'Criado isolado de humanos para "ouvir os Pokémon" e se tornar instrumento de Ghetsis. N acredita genuinamente que Pokémon e humanos devem viver separados — mas sua convicção foi plantada por quem queria o contrário. Sua batalha com o protagonista é filosófica tanto quanto de batalha, e ele aprende que a realidade é mais nuançada.',
    keyTraits: ['Oratória que move multidões por convicção genuína', 'Comunicação com Pokémon como habilidade real', 'Ideologia pura que foi weaponizada sem seu consentimento', 'Arco de desencanto com figura paterna', 'Time que reflete cada treinador que derrotou'],
    suggestedQuirks: ['de_um_mundo_distante_af', 'glorioso_destino'],
    bondHints: ['Espécie que quis proteger e aprendeu a entender melhor (Pokémon)', 'Rival que mostrou que a visão era incompleta (protagonista)', 'Pai que era o vilão real (Ghetsis)'] },

];

if (typeof module !== 'undefined') module.exports = POKEMON_CHARACTERS;
