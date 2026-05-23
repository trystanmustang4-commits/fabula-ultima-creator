// Uncharted — Character KB

const UNCHARTED_CHARACTERS = [

  { id: 'uncharted-nathan-drake',
    nome: 'Nathan Drake',
    aliases: ['Nathan Drake', 'Nate', 'Nathan Drake'],
    arquetipo: 'apostador',
    source: { franchise: 'Uncharted', work: 'Uncharted series', category: 'video-game' },
    tema: 'Sorte que parece planejamento de perto',
    origem: 'Caçador de Tesouros',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Elena', emocoes: ['amor real', 'tensão de estilo de vida'] },
      { alvo: 'Sully', emocoes: ['mentor-pai', 'parceria de décadas'] },
      { alvo: 'Sam', emocoes: ['irmandade', 'lealdade que complica'] },
    ],
    descricao: 'Caçador de tesouros que sobrevive por combinação impossível de improvisação, charme e coincidências favoráveis. Nate não tem treinamento militar sério — tem anos de experiência em situações onde "não deu tempo de planejar" é o estado padrão. Sua bússola moral oscila com o tamanho da recompensa, mas chegando ao osso, faz a coisa certa.',
    keyTraits: ['Improvisação de campo como habilidade primária', 'Pesquisa histórica que ninguém esperaria dele', 'Charme que abre portas que bala não abre', 'Sorte que estatisticamente não pode ser só sorte', 'Amor por Elena como único laço que não negocia'],
    suggestedQuirks: ['mil_faces', 'sobrevivente_nf'],
    bondHints: ['Amor que vale parar tudo por (Elena)', 'Mentor que é o único pai que teve (Sully)', 'Irmão que sempre complica a vida da melhor forma (Sam)'] },

  { id: 'uncharted-elena',
    nome: 'Elena Fisher',
    aliases: ['Elena', 'Elena Fisher'],
    arquetipo: 'explorador-furtivo',
    source: { franchise: 'Uncharted', work: 'Uncharted series', category: 'video-game' },
    tema: 'Competência sem precisar de validação de ninguém',
    origem: 'Jornalista e Exploradora',
    atributos: { des: 'd10', vig: 'd8', ast: 'd10', von: 'd8' },
    lacos: [
      { alvo: 'Nathan', emocoes: ['amor', 'frustração com estilo de vida'] },
      { alvo: 'Verdade (jornalismo)', emocoes: ['missão profissional', 'identidade'] },
      { alvo: 'Campo', emocoes: ['adaptabilidade', 'prazer genuíno'] },
    ],
    descricao: 'Jornalista que começou cobrindo Nate e terminou sendo igualmente competente em campo. Elena é inteligente, tecnicamente habilidosa e capaz de se virar em qualquer situação — sem precisar esperar resgate. Sua tensão com Nate não é sobre capacidade, é sobre estilo de vida: ela quer algo mais estável do que "mais uma missão suicida".',
    keyTraits: ['Habilidades de campo iguais ou superiores a Nate', 'Câmera e jornalismo como ferramenta de inteligência', 'Ética que não dobra por conveniência', 'Adaptabilidade a qualquer terreno ou situação', 'Relacionamento com Nate como âncora e tensão real'],
    suggestedQuirks: ['sobrevivente_nf', 'mil_faces'],
    bondHints: ['Amor que exige mudança real (Nathan)', 'Verdade que vale riscar o pescoço (jornalismo)', 'Campo que é lar tão quanto qualquer outro lugar (exploração)'] },

];

if (typeof module !== 'undefined') module.exports = UNCHARTED_CHARACTERS;
