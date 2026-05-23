// Disco Elysium — Character KB

const DISCO_ELYSIUM_CHARACTERS = [

  { id: 'de-harry-dubois',
    nome: 'Harry Du Bois',
    aliases: ['Harry Du Bois', 'Harry', 'The Detective', 'Raphael Ambrosius Costeau'],
    arquetipo: 'apostador',
    source: { franchise: 'Disco Elysium', work: 'Disco Elysium (2019)', category: 'video-game' },
    tema: 'Reconstrução de identidade depois do colapso total',
    origem: 'Detetive da RCM, Revachol',
    atributos: { des: 'd6', vig: 'd6', ast: 'd12', von: 'd8' },
    lacos: [
      { alvo: 'Kim Kitsuragi', emocoes: ['parceria', 'âncora no presente'] },
      { alvo: 'Dora (ex)', emocoes: ['amor que destruiu', 'ghost que assombra'] },
      { alvo: 'Revachol', emocoes: ['identificação', 'cidade como espelho'] },
    ],
    descricao: 'Detetive que acordou sem memória depois de um colapso de vários dias — sem saber nem o próprio nome. Toda a investigação de Disco Elysium é Harry reconstruindo quem é enquanto investiga um homem morto. Seus Skills são vozes internas; sua build determina qual Harry emerge. Pode ser fascista, comunista, ultraliberal ou um cop de rock and roll.',
    keyTraits: ['Skills como vozes internas que contradizem e ajudam', 'Amnésia como punto de partida de descoberta de si', 'Capacidade de construir qualquer ideologia com convicção genuína', 'Kim Kitsuragi como única constante real', 'Revachol como personagem tanto quanto ele mesmo'],
    suggestedQuirks: ['mil_faces', 'sobrevivente_nf'],
    bondHints: ['Parceiro que ancora no presente quando tudo flutua (Kim)', 'Amor que destruiu e ainda assombra (Dora)', 'Cidade que é espelho do colapso e da esperança (Revachol)'] },

];

if (typeof module !== 'undefined') module.exports = DISCO_ELYSIUM_CHARACTERS;
