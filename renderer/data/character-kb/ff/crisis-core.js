// Crisis Core: Final Fantasy VII — personagens curados (Fase 3.3, Batch 7)

const CRISIS_CORE_CHARACTERS = [

  { id: 'cc-zack',
    nome: 'Zack Fair', aliases: ['zack', 'zack fair', 'zack ff7', 'crisis core zack', '1st class zack', 'soldier zack fair'], arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Final Fantasy', work: 'Crisis Core: Final Fantasy VII', category: 'video-game' },
    tema: 'Viver para ser a história de alguém', origem: 'SOLDIER 1ª Classe',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd6' },
    lacos: [{ alvo: 'Cloud', emocoes: ['amizade que virou herança'] }, { alvo: 'Aerith', emocoes: ['amor'] }, { alvo: 'Angeal', emocoes: ['mentor e luto'] }],
    descricao: 'O SOLDIER que morreu para que Cloud vivesse e carregasse tudo que Zack foi — sua última batalha foi sozinho contra um exército porque havia algo mais importante que sobreviver.',
    keyTraits: ['Buster Sword herdada', 'sonho de herói', 'morreu pela fuga de Cloud', 'alegria como arma'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['morreu para que Cloud pudesse existir como é — e nunca soube que funcionou', 'a herança que deixou não era a espada: era o sonho de ser herói'] },

  { id: 'cc-angeal',
    nome: 'Angeal Hewley', aliases: ['angeal', 'angeal ff7', 'angeal crisis core', 'angeal wings', 'angeal copies'], arquetipo: 'guerreiro-escudo',
    source: { franchise: 'Final Fantasy', work: 'Crisis Core: Final Fantasy VII', category: 'video-game' },
    tema: 'Honra como peso que não se larga', origem: 'SOLDIER 1ª Classe/Experimento',
    atributos: { des: 'd8', vig: 'd12', ast: 'd6', von: 'd10' },
    lacos: [{ alvo: 'Zack', emocoes: ['discípulo amado'] }, { alvo: 'Genesis', emocoes: ['amizade de infância'] }, { alvo: 'Honra', emocoes: ['código de vida'] }],
    descricao: 'O SOLDIER que nunca usou a própria espada porque honra e orgulho do pai eram mais pesados que qualquer inimigo — e quando teve que escolher, escolhou Zack.',
    keyTraits: ['Buster Sword nunca usada', '"Embrace your dreams"', 'asa de degradação', 'mentor de Zack'],
    suggestedQuirks: ['heranca', 'portador_da_ruina'],
    bondHints: ['a espada que nunca usou foi o peso maior que carregou', 'ensinando Zack a ser herói, ele cumpriu o único propósito que queria'] },

  { id: 'cc-genesis',
    nome: 'Genesis Rhapsodos', aliases: ['genesis', 'genesis ff7', 'genesis rhapsodos', 'crisis core genesis', 'genesis loveless ff7'], arquetipo: 'espadachim-sombrio',
    source: { franchise: 'Final Fantasy', work: 'Crisis Core: Final Fantasy VII', category: 'video-game' },
    tema: 'A busca pela cura que é poema', origem: 'SOLDIER 1ª Classe/Degradando',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd6' },
    lacos: [{ alvo: 'Angeal', emocoes: ['amizade de infância e perda'] }, { alvo: 'LOVELESS', emocoes: ['obsessão e missão'] }, { alvo: 'Degradação', emocoes: ['medo como motor'] }],
    descricao: 'O SOLDIER que estava morrendo e transformou a busca pela cura numa épica pessoal baseada em LOVELESS — porque se ia morrer, seria com significado poético.',
    keyTraits: ['LOVELESS como escritura', 'maçã vermelha', 'asa escura', 'degradação e obsessão'],
    suggestedQuirks: ['amaldicoado_af', 'um_sonho_longo'],
    bondHints: ['usou poesia como forma de dar sentido ao que não tinha cura', 'a arrogância é o escudo contra o desespero de se degradar'] },

  { id: 'cc-cissnei',
    nome: 'Cissnei', aliases: ['cissnei', 'cissnei ff7', 'cissnei crisis core', 'turk cissnei', 'shuriken cissnei'], arquetipo: 'assassino',
    source: { franchise: 'Final Fantasy', work: 'Crisis Core: Final Fantasy VII', category: 'video-game' },
    tema: 'Cumpriu o dever até o momento que não conseguiu mais', origem: 'Turk/Agente',
    atributos: { des: 'd12', vig: 'd8', ast: 'd8', von: 'd6' },
    lacos: [{ alvo: 'Zack', emocoes: ['dever que virou amizade'] }, { alvo: 'Turks', emocoes: ['lealdade da organização'] }, { alvo: 'Ordem', emocoes: ['limite do que cumpriria'] }],
    descricao: 'A Turk que cumpriu cada missão até ser ordenada a capturar Zack — e naquele ponto descobriu que havia uma linha que a ordem não podia cruzar.',
    keyTraits: ['Rekka o shuriken', 'Turk de origem desconhecida', 'decidiu não capturar Zack', 'limite da ordem'],
    suggestedQuirks: ['servo_in_fiel', 'oficial_arrependido'],
    bondHints: ['passou a vida seguindo ordens até a ordem que importava', 'o shuriken que não lançou foi a decisão mais corajosa que tomou'] },

];

if (typeof module !== 'undefined') module.exports = CRISIS_CORE_CHARACTERS;
