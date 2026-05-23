// Yakuza / Like a Dragon — Character KB

const YAKUZA_CHARACTERS = [

  { id: 'yakuza-kiryu',
    nome: 'Kazuma Kiryu',
    aliases: ['Kiryu', 'Kazuma Kiryu', 'The Dragon of Dojima', 'Joryu'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Yakuza / Like a Dragon', work: 'Yakuza series', category: 'video-game' },
    tema: 'Honra num mundo que não merece ela',
    origem: 'Ex-membro da Família Dojima',
    atributos: { des: 'd8', vig: 'd12', ast: 'd6', von: 'd10' },
    lacos: [
      { alvo: 'Haruka', emocoes: ['amor paterno genuíno'] },
      { alvo: 'Nishiki', emocoes: ['fraternidade', 'luto de traição'] },
      { alvo: 'Yakuza (mundo)', emocoes: ['pertencimento', 'rejeição de volta'] },
    ],
    descricao: 'Dragão de Dojima que assumiu um assassinato que não cometeu por honra e passou a vida toda pagando por isso. Kiryu vence inimigos com estilo no karaokê e em briga de rua com a mesma equanimidade. Seu código de honra é arcaico e absoluto; sua ternura com crianças, completamente genuína. O problema do Kiryu é que o mundo nunca para de precisar dele.',
    keyTraits: ['Dragon Style: kata de combate corpo a corpo', 'Código de honra que opera acima da lei', 'Ternura com crianças que contrasta com violência adulta', 'Resistência a qualquer valor monetário ou poder', 'Retorno impossível de evitar porque alguém precisa'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    bondHints: ['Filha de coração que é o motivo de seguir (Haruka)', 'Irmão que tomou o caminho oposto (Nishiki)', 'Mundo que nunca para de chamar de volta (Yakuza)'] },

  { id: 'yakuza-majima',
    nome: 'Goro Majima',
    aliases: ['Majima', 'Goro Majima', 'Mad Dog of Shimano', 'Goromi'],
    arquetipo: 'apostador',
    source: { franchise: 'Yakuza / Like a Dragon', work: 'Yakuza series', category: 'video-game' },
    tema: 'Loucura que é escolha de sobrevivência',
    origem: 'Capitão da Família Shimano',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Kiryu', emocoes: ['fascinação', 'teste constante'] },
      { alvo: 'Makimura Makoto', emocoes: ['amor', 'trauma formativo'] },
      { alvo: 'Caos (conceito)', emocoes: ['afinidade', 'identidade'] },
    ],
    descricao: 'O Mad Dog of Shimano aparece do nada com uma faca e dança de tap enquanto luta. Majima abraçou a loucura depois de Sotenbori — não como quebra, mas como armadura e liberdade. Sua imprevisibilidade é estratégica; sua lealdade a Kiryu, genuína mesmo quando se manifesta como emboscada.',
    keyTraits: ['Mad Dog Style: movimentos caóticos e imprevisíveis', 'Faca Tanto como extensão do caos pessoal', 'Imprevisibilidade como proteção e identidade', 'Lealdade a Kiryu expressa como teste constante', 'Trauma de Sotenbori que gerou o personagem que é'],
    suggestedQuirks: ['mil_faces', 'sobrevivente_nf'],
    bondHints: ['Rival que é o único digno de testar (Kiryu)', 'Amor passado que moldou o presente (Makoto)', 'Caos que é mais honesto que ordem (conceito)'] },

];

if (typeof module !== 'undefined') module.exports = YAKUZA_CHARACTERS;
