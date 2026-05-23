// The Last of Us — Character KB

const EXTRAS_TLOU_CHARACTERS = [

  { id: 'tlou-joel',
    nome: 'Joel Miller',
    aliases: ['Joel', 'Joel Miller'],
    arquetipo: 'explorador-furtivo',
    source: { franchise: 'The Last of Us', work: 'The Last of Us series', category: 'video-game' },
    tema: 'O que um pai faz quando o mundo inteiro é o custo',
    origem: 'Sobrevivente do Cordyceps Outbreak',
    atributos: { des: 'd8', vig: 'd10', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Ellie', emocoes: ['amor paterno reconquistado', 'decisão que define tudo'] },
      { alvo: 'Sarah (memória)', emocoes: ['luto', 'ferida que nunca fecha'] },
      { alvo: 'Tommy', emocoes: ['fraternidade', 'tensão de escolhas diferentes'] },
    ],
    descricao: 'Sobrevivente endurecido que perdeu a filha no primeiro dia do surto e passou vinte anos sem se importar com mais nada — até Ellie. Joel usa furtividade, improviso e violência cirúrgica quando necessário. Sua decisão final de TLOU1 é a mais moralmente complexa dos games: salva Ellie, condena o mundo, e não se arrepende.',
    keyTraits: ['Furtividade e emboscada como kit primário', 'Violência brutal e eficiente sem hesitação', 'Endurecimento emocional que quebra com Ellie', 'Decisão final que prioriza amor sobre humanidade', 'Conhecimento de 20 anos de sobrevivência no mundo pós-surto'],
    suggestedQuirks: ['sobrevivente_nf', 'heranca'],
    bondHints: ['Filha de coração que justificou tudo (Ellie)', 'Filha perdida que é a dor original (Sarah)', 'Irmão que escolheu acreditar em algo maior (Tommy)'] },

];

if (typeof module !== 'undefined') module.exports = EXTRAS_TLOU_CHARACTERS;
