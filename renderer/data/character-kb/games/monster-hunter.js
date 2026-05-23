// Monster Hunter — Character KB

const MONSTER_HUNTER_CHARACTERS = [

  { id: 'mh-hunter',
    nome: 'The Hunter',
    aliases: ['Hunter', 'The Hunter', 'Caçador'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Monster Hunter', work: 'Monster Hunter series', category: 'video-game' },
    tema: 'Maestria construída de caçada em caçada',
    origem: 'Caçador da Guilda',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Palico / Palimute', emocoes: ['parceria de campo', 'confiança mútua'] },
      { alvo: 'Ecosistema', emocoes: ['respeito', 'compreensão'] },
      { alvo: 'Presas (equipamento)', emocoes: ['honra ao que foi derrotado'] },
    ],
    descricao: 'Caçador sem nome ou backstory definida cujo perfil é construído inteiramente pela expertise. Usa 14 tipos de armas diferentes, adapta estratégia ao monstro, e converte cada derrota em equipamento melhor. O loop é o arquétipo: estuda, prepara, caça, cresce, repete. Sem drama — só maestria.',
    keyTraits: ['Arsenal de 14 tipos de armas com playstyles radicalmente diferentes', 'Estudo de comportamento de monstros como habilidade', 'Crafting de equipamento de partes dos derrotados', 'Palico/Palimute como parceiro de campo constante', 'Maestria incremental como narrativa pessoal'],
    suggestedQuirks: ['sobrevivente_nf', 'heranca'],
    bondHints: ['Parceiro que nunca abandona (Palico)', 'Ecossistema que merece respeito além da caça (natureza)', 'Equipamento que honra o que foi derrotado (presas)'] },

];

if (typeof module !== 'undefined') module.exports = MONSTER_HUNTER_CHARACTERS;
