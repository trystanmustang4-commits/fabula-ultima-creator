// Cyberpunk 2077 — Character KB

const CYBERPUNK_CHARACTERS = [

  { id: 'cyberpunk-v',
    nome: 'V',
    aliases: ['V', 'V (Cyberpunk)', 'The Merc'],
    arquetipo: 'apostador',
    source: { franchise: 'Cyberpunk', work: 'Cyberpunk 2077 (2020)', category: 'video-game' },
    tema: 'Mortalidade como motor de coragem',
    origem: 'Mercenário de Night City',
    atributos: { des: 'd10', vig: 'd8', ast: 'd8', von: 'd10' },
    lacos: [
      { alvo: 'Johnny Silverhand', emocoes: ['parceria forçada', 'entendimento gradual'] },
      { alvo: 'Jackie Welles', emocoes: ['fraternidade', 'luto'] },
      { alvo: 'Night City', emocoes: ['ambição', 'pertencimento tóxico'] },
    ],
    descricao: 'Mercenário que se tornou o maior golpe de Night City — e ganhou um engrama de rockstar rebelde no crânio como prêmio. V está literalmente morrendo durante toda a campanha; o biochip de Relic está sobrescrevendo sua personalidade. Cada missão é apostada contra o tempo. Isso, curiosamente, não impede V de ser o mercenário mais eficiente da cidade.',
    keyTraits: ['Opera com prazo de morte como pressão constante', 'Versatilidade de builds: stealth, netrunner, street brawler', 'Parceria involuntária com ghost de Johnny Silverhand', 'Ambição de lenda que vira tragédia e catarse', 'Night City como ambiente hostil que V ama mesmo assim'],
    suggestedQuirks: ['sobrevivente_nf', 'glorioso_destino'],
    bondHints: ['Ghost que virou parceiro que virou parte de si (Johnny)', 'Amigo que morreu antes de ver a lenda (Jackie)', 'Cidade que destrói e é amada por isso (Night City)'] },

  { id: 'cyberpunk-johnny',
    nome: 'Johnny Silverhand',
    aliases: ['Johnny Silverhand', 'Johnny', 'Robert John Linder'],
    arquetipo: 'orador-bardo',
    source: { franchise: 'Cyberpunk', work: 'Cyberpunk 2077 (2020)', category: 'video-game' },
    tema: 'Revolta que precisou se tornar responsabilidade',
    origem: 'Rockstar Terrorista Anti-Corporativo',
    atributos: { des: 'd8', vig: 'd8', ast: 'd10', von: 'd12' },
    lacos: [
      { alvo: 'V', emocoes: ['parasita', 'evolução para respeito'] },
      { alvo: 'Arasaka', emocoes: ['ódio puro', 'obsessão destrutiva'] },
      { alvo: 'Alt Cunningham', emocoes: ['amor', 'culpa de abandono'] },
    ],
    descricao: 'Rockstar que voou um ataque nuclear ao Arasaka Tower em 2023 e foi capturado, transformado em engrama e esquecido por 57 anos no biochip de Relic. Johnny usa V como marionete relutante — até perceber que redenção ainda é possível mesmo para uma consciência digital. Sua guitarra é política; sua raiva, legítima.',
    keyTraits: ['Carisma explosivo de rockstar lendário', 'Raiva anti-corporativa como identidade central', 'Braço cibernético prata como símbolo icônico', 'Arco de redenção de quem não acreditava em redenção', 'Músicas que são manifestos políticos'],
    suggestedQuirks: ['glorioso_destino', 'mil_faces'],
    bondHints: ['Hospedeiro que virou parceiro de redenção (V)', 'Corporação que é o antagonista de toda a vida (Arasaka)', 'Amor morto que define toda culpa (Alt)'] },

  { id: 'cyberpunk-rogue',
    nome: 'Rogue Amendiares',
    aliases: ['Rogue', 'Rogue Amendiares', 'Queen of the Afterlife'],
    arquetipo: 'assassino',
    source: { franchise: 'Cyberpunk', work: 'Cyberpunk 2077 (2020)', category: 'video-game' },
    tema: 'Sobrevivência elegante num mundo que mata os ingênuos',
    origem: 'Lendária Solo e Fixer',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Johnny Silverhand', emocoes: ['amor antigo', 'ressentimento justificado'] },
      { alvo: 'Afterlife', emocoes: ['construção de vida', 'identidade'] },
      { alvo: 'Night City', emocoes: ['domínio', 'desprezo respeitoso'] },
    ],
    descricao: 'Sobreviveu a Johnny Silverhand — em todos os sentidos. Rogue construiu o Afterlife, o bar mais importante da subcultura merc de Night City, do zero. É a fixer com a maior rede de informação e a memória mais longa da cidade. Não perdoa, não esquece, e cobra caro por qualquer coisa.',
    keyTraits: ['Mestre de informação e redes de contato', 'Operações cirúrgicas com violência mínima necessária', 'Memória institucional de décadas de Night City', 'Autoridade do Afterlife como base de poder', 'Amor por Johnny que coexiste com raiva real'],
    suggestedQuirks: ['mil_faces', 'sobrevivente_nf'],
    bondHints: ['Amor que sobreviveu à traição e ficou (Johnny)', 'Legado construído por mérito próprio (Afterlife)', 'Cidade que é território e campo de batalha (Night City)'] },

];

if (typeof module !== 'undefined') module.exports = CYBERPUNK_CHARACTERS;
