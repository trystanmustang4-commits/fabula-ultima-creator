// Chrono Trigger — Character KB

const CHRONO_TRIGGER_CHARACTERS = [

  { id: 'ct-crono',
    nome: 'Crono',
    aliases: ['Crono', 'Chrono'],
    arquetipo: 'guerreiro-versatil',
    source: { franchise: 'Chrono Trigger', work: 'Chrono Trigger (1995)', category: 'video-game' },
    tema: 'Silêncio heroico que fala por ações',
    origem: 'Jovem de Truce',
    atributos: { des: 'd10', vig: 'd10', ast: 'd8', von: 'd8' },
    lacos: [
      { alvo: 'Marle', emocoes: ['amor ingênuo', 'aventura compartilhada'] },
      { alvo: 'Lucca', emocoes: ['amizade de infância', 'complementaridade'] },
      { alvo: 'Equipe', emocoes: ['liderança silenciosa'] },
    ],
    descricao: 'Herói mudo que lidera uma equipe de viajantes do tempo sem dizer uma palavra. Crono usa katana com magia de raios — Luminaire é um dos ataques mais poderosos do jogo — e morre no auge da história de um jeito que poucos jogos ousam. Sua ressurreição é escolha do jogador, não inevitabilidade narrativa.',
    keyTraits: ['Katana + magia de Lightning como identidade', 'Silêncio que comunica liderança genuína', 'Morte narrativa que o jogo não reverte sozinho', 'Centro de gravidade de um grupo improvável', 'Luminaire como expressão máxima de poder'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    bondHints: ['Amor que começa num festival e atravessa o tempo (Marle)', 'Amiga de infância que é a mente do grupo (Lucca)', 'Equipe que formou por acidente e não abandona (grupo)'] },

  { id: 'ct-magus',
    nome: 'Magus',
    aliases: ['Magus', 'Janus', 'Prince of Zeal'],
    arquetipo: 'mago-sombrio',
    source: { franchise: 'Chrono Trigger', work: 'Chrono Trigger (1995)', category: 'video-game' },
    tema: 'Poder conquistado para nunca mais ser fraco diante do que importa',
    origem: 'Príncipe de Zeal, Rei dos Mystics',
    atributos: { des: 'd6', vig: 'd8', ast: 'd12', von: 'd12' },
    lacos: [
      { alvo: 'Schala', emocoes: ['amor fraternal', 'missão de vida'] },
      { alvo: 'Lavos', emocoes: ['ódio focado', 'força motriz de décadas'] },
      { alvo: 'Mystics', emocoes: ['instrumento', 'liderança sem afeto'] },
    ],
    descricao: 'Príncipe que foi arrancado de sua época quando criança e cresceu nos séculos sombrios para ter poder suficiente de destruir o que destruiu tudo que amava. Magus é o antagonista que o grupo descobre que combatia o mesmo inimigo pelo mesmo motivo. Sua "vilania" é dor mal-dirigida com resultado catastrófico.',
    keyTraits: ['Magia sombria de elite em todos os elementos', 'Foice como arma de combate próximo', 'Missão de vida de salvar Schala acima de qualquer coisa', 'Antagonista que é aliado quando o contexto completo aparece', 'Frieza que é cicatriz sobre trauma de infância'],
    suggestedQuirks: ['grimorio_misterioso', 'heranca'],
    bondHints: ['Irmã que é o único amor real (Schala)', 'Monstro que destruiu tudo e merece ser destruído (Lavos)', 'Exército que foi ferramenta, não família (Mystics)'] },

  { id: 'ct-lucca',
    nome: 'Lucca',
    aliases: ['Lucca', 'Lucca Ashtear', 'The Inventor'],
    arquetipo: 'inventor',
    source: { franchise: 'Chrono Trigger', work: 'Chrono Trigger (1995)', category: 'video-game' },
    tema: 'Ciência como amor em forma diferente',
    origem: 'Inventora de Truce',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd8' },
    lacos: [
      { alvo: 'Crono', emocoes: ['amizade de infância', 'lealdade inabalável'] },
      { alvo: 'Mãe', emocoes: ['culpa', 'motivação de voltar no tempo'] },
      { alvo: 'Tecnologia', emocoes: ['identidade', 'linguagem de afeto'] },
    ],
    descricao: 'Inventora prodígio que construiu a máquina do tempo por acidente e resolveu usar o resultado. Lucca combina pistola flamejante com ciência aplicada em campo de batalha. Seu arco mais profundo está na viagem pessoal para salvar a mãe — o evento que a define muito antes de Lavos.',
    keyTraits: ['Pistola de fogo e granadas como arsenal', 'Maior inteligência técnica do grupo', 'Óculos como símbolo de identidade', 'Motivação pessoal escondida dentro da missão maior', 'Tecnologia como forma de expressão de cuidado'],
    suggestedQuirks: ['inventor_prodigio', 'prodigios_rivais'],
    bondHints: ['Amigo que existe desde sempre (Crono)', 'Mãe que pode ser salva se houver coragem de tentar (mãe)', 'Invenção que é a melhor parte de si (tecnologia)'] },

];

if (typeof module !== 'undefined') module.exports = CHRONO_TRIGGER_CHARACTERS;
