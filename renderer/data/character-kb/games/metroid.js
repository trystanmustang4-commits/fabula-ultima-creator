// Metroid — Character KB

const METROID_CHARACTERS = [

  { id: 'metroid-samus',
    nome: 'Samus Aran',
    aliases: ['Samus', 'Samus Aran', 'The Bounty Hunter', 'Lady'],
    arquetipo: 'atirador-pistoleiro',
    source: { franchise: 'Metroid', work: 'Metroid series', category: 'video-game' },
    tema: 'Solidão como força e como ferida',
    origem: 'Caçadora de Recompensas ex-Galactic Federation',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd10' },
    lacos: [
      { alvo: 'Old Bird (Chozo)', emocoes: ['gratidão', 'saudade de lar'] },
      { alvo: 'Ridley', emocoes: ['trauma', 'ódio forjado em perda'] },
      { alvo: 'Baby Metroid', emocoes: ['afeto inesperado', 'proteção'] },
    ],
    descricao: 'Criada pelos Chozo após a destruição de sua colônia por Space Pirates, Samus é a guerreira mais letal da galáxia que a maioria dos inimigos confunde com homem até o capacete sair. Seu Arm Cannon é extensão do corpo; sua missão é pessoal tanto quanto profissional. Por trás do isolamento há uma mulher que perdeu tudo e sobreviveu.',
    keyTraits: ['Arm Cannon e Power Suit como identidade completa', 'Criação Chozo que a eleva além do humano', 'Trauma de Ridley como motor emocional', 'Isolamento que é escolha e cicatriz ao mesmo tempo', 'Caçadora que opera sempre sozinha e sempre triunfa'],
    suggestedQuirks: ['sobrevivente_nf', 'heranca'],
    bondHints: ['Pai adotivo que plantou a guerreira (Old Bird)', 'Monstro que levou tudo e não para de voltar (Ridley)', 'Criatura que deveria ser inimiga mas virou filho (Baby Metroid)'] },

];

if (typeof module !== 'undefined') module.exports = METROID_CHARACTERS;
