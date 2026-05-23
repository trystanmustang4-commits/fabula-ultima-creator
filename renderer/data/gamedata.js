// =============================================
// FABULA ULTIMA - DADOS DO SISTEMA
// Baseado no Livro Básico (pt-BR)
// =============================================

const GAMEDATA = {

  // =============================================
  // TEMAS
  // =============================================
  temas: [
    { id: "ambicao",     nome: "Ambição",      descricao: "Você busca provar seu valor para si e/ou para os outros." },
    { id: "raiva",       nome: "Raiva",         descricao: "Você é uma bomba-relógio prestes a explodir de raiva." },
    { id: "pertencimento", nome: "Pertencimento", descricao: "Você teme ficar só, ser esquecido ou abandonado." },
    { id: "duvida",      nome: "Dúvida",        descricao: "Você precisa encontrar a resposta para uma pergunta instigante." },
    { id: "dever",       nome: "Dever",         descricao: "Você vive para cumprir uma promessa ou obedecer a uma ordem." },
    { id: "culpa",       nome: "Culpa",         descricao: "Você deseja a absolvição de seus erros passados." },
    { id: "esperanca",   nome: "Esperança",     descricao: "Você quer melhorar o mundo para si e/ou para os outros." },
    { id: "justica",     nome: "Justiça",       descricao: "Você sempre fica do lado dos fracos e indefesos." },
    { id: "piedade",     nome: "Piedade",       descricao: "Você quer ajudar as pessoas, não importando os erros delas." },
    { id: "vinganca",    nome: "Vingança",      descricao: "Você quer se vingar de alguém ou de algo." }
  ],

  // =============================================
  // PERFIS DE ATRIBUTOS
  // =============================================
  perfisAtributos: [
    {
      id: "especializado",
      nome: "Especializado",
      descricao: "Dois atributos altos (d10) e dois baixos (d6). Ideal para personagens com foco definido.",
      dados: ["d10", "d10", "d6", "d6"],
      exemplo: "Ex: Mago ou Guerreiro puro"
    },
    {
      id: "mediano",
      nome: "Mediano",
      descricao: "Um atributo alto (d10), dois médios (d8) e um baixo (d6). Bom equilíbrio com especialização.",
      dados: ["d10", "d8", "d8", "d6"],
      exemplo: "Ex: Paladino ou Aventureiro"
    },
    {
      id: "equilibrado",
      nome: "Pau pra Toda Obra",
      descricao: "Todos os atributos médios (d8). Ideal para personagens versáteis.",
      dados: ["d8", "d8", "d8", "d8"],
      exemplo: "Ex: Samurai ou Diplomata"
    }
  ],

  // =============================================
  // ATRIBUTOS
  // =============================================
  atributos: [
    { id: "des", nome: "Destreza", abrev: "DES", descricao: "Precisão, coordenação, finesse e reflexos." },
    { id: "vig", nome: "Vigor",    abrev: "VIG", descricao: "Capacidade física, resiliência e robustez." },
    { id: "ast", nome: "Astúcia",  abrev: "AST", descricao: "Observação, compreensão e raciocínio." },
    { id: "von", nome: "Vontade",  abrev: "VON", descricao: "Determinação, carisma e a habilidade de influenciar pessoas." }
  ],

  // =============================================
  // CLASSES
  // =============================================
  classes: [
    {
      id: "andarilho",
      nome: "Andarilho",
      outrosNomes: "Aventureiro, Caçador de Tesouros, Explorador",
      descricao: "Nômades à procura de um continente mitológico, exploradores desbravando os ermos, caçadores e viajantes — todos são Andarilhos. Vivem pela jornada e veem a natureza como uma professora severa.",
      beneficiosIniciais: [
        "+2 PI máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "O que motiva você a viver viajando? Foi escolha sua? Você se cansou?",
        "Há um lugar que você considera um 'lar'?",
        "Você visitou muitas pessoas e lugares. Tem algo que não consegue esquecer?",
        "Você perdeu algo ou alguém por conta de suas viagens. O que aconteceu?"
      ],
      poderes: [
        {
          id: "cacador_tesouros",
          nome: "Caçador de Tesouros",
          repeticoes: 2,
          descricao: "Quando seu grupo se aventura pelo mapa do mundo, você faz uma descoberta se tirar (NP+1) ou menos no teste de Viagem (em vez de apenas 1)."
        },
        {
          id: "companheiro_fiel",
          nome: "Companheiro Fiel",
          repeticoes: 5,
          descricao: "Crie um NPC construto, elemental, fera ou planta de nível 5 para ser seu companheiro. Você pode gastar sua ação para fazê-lo realizar uma ação no seu turno."
        },
        {
          id: "papo_taverna",
          nome: "Papo de Taverna",
          repeticoes: 3,
          descricao: "Ao descansar em uma estalagem ou taverna, você pode fazer (NP) perguntas ao mestre sobre os arredores e habitantes."
        },
        {
          id: "pratico",
          nome: "Prático",
          repeticoes: 4,
          descricao: "Você recupera (NP) PI após cada teste de Viagem."
        },
        {
          id: "viajante_experiente",
          nome: "Viajante Experiente",
          repeticoes: 1,
          descricao: "Você reduz o dado rolado em seus testes de Viagem em um (mínimo d6)."
        }
      ]
    },
    {
      id: "arcanista",
      nome: "Arcanista",
      outrosNomes: "Avatar, Escolhido, Invocador",
      descricao: "Arcanistas projetam uma porção de sua alma para fora do corpo, concedendo-lhe forma física. Cercados por névoa mágica, ganham habilidades sobrenaturais através dos Arcanos — entidades mitológicas ancestrais.",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "De onde vêm seus poderes? São um presente de sua linhagem sanguínea?",
        "Você já se comunicou com um Arcano ou eles são quietos e distantes?",
        "As pessoas consideram você alguém misterioso, poderoso ou sobrenatural?",
        "Há muitos praticando a sua magia ou você é uma exceção?"
      ],
      poderes: [
        {
          id: "arcanismo_ritualista",
          nome: "Arcanismo Ritualista",
          repeticoes: 1,
          descricao: "Você pode fazer rituais da disciplina arcanismo, desde que seus efeitos estejam entre os domínios de um ou mais Arcanos que você vinculou."
        },
        {
          id: "arcano_emergencial",
          nome: "Arcano Emergencial",
          repeticoes: 6,
          descricao: "Enquanto estiver em crise, o custo de invocar seu Arcano é reduzido em (NP × 5)."
        },
        {
          id: "circulo_arcano",
          nome: "Círculo Arcano",
          repeticoes: 4,
          descricao: "Em seu turno, após dispensar voluntariamente um Arcano durante um conflito, se você tem uma arma arcana equipada, você pode fazer a ação Feitiço sem usar uma ação."
        },
        {
          id: "regeneracao_arcana",
          nome: "Regeneração Arcana",
          repeticoes: 2,
          descricao: "Ao invocar um Arcano, você recupera (NP × 5) PV."
        },
        {
          id: "vincular_e_invocar",
          nome: "Vincular e Invocar",
          repeticoes: 1,
          descricao: "Você pode vincular Arcanos à sua alma. Use uma ação e gaste 40 PM para invocar um Arcano já vinculado. Começa vinculado a um Arcano à sua escolha."
        }
      ]
    },
    {
      id: "atirador",
      nome: "Atirador",
      outrosNomes: "Arqueiro, Sniper, Pistoleiro",
      descricao: "Primoroso em efetuar e repelir ataques à distância. Mestres do arco, besta e armas de fogo, Atiradores combinam precisão letal com mobilidade tática.",
      beneficiosIniciais: [
        "Pode equipar armas à distância marciais",
        "Pode equipar escudos marciais"
      ],
      marcialEquip: ["armas_distancia", "escudos"],
      perguntas: [
        "Qual é a sua arma favorita e por quê?",
        "Você treinou sua pontaria sozinho ou com um mestre?",
        "Há alguém que você jamais errou? Quem?",
        "O que sente quando atira em um ser vivo?"
      ],
      poderes: [
        {
          id: "barragem",
          nome: "Barragem",
          repeticoes: 4,
          descricao: "Você pode usar uma ação e gastar 5 PM para fazer um ataque livre com uma arma à distância equipada. O ataque recebe a propriedade multi (2). Bônus de (NP) nos testes de Precisão para este poder."
        },
        {
          id: "fogo_cruzado",
          nome: "Fogo Cruzado",
          repeticoes: 1,
          descricao: "Quando um aliado atinge um inimigo com um ataque à distância, você pode fazer um ataque livre com sua arma à distância contra esse mesmo inimigo (uma vez por turno)."
        },
        {
          id: "maestria_distancia",
          nome: "Maestria em Armas à Distância",
          repeticoes: 4,
          descricao: "Você recebe um bônus igual a (NP) em testes de Precisão à distância."
        },
        {
          id: "tiro_de_aviso",
          nome: "Tiro de Aviso",
          repeticoes: 3,
          descricao: "Você pode usar uma ação e gastar 5 PM para fazer um teste de (DES+AST) contra um inimigo que possa ver. Em um sucesso, ele fica lento ou atordoado (sua escolha)."
        },
        {
          id: "zona_de_perigo",
          nome: "Zona de Perigo",
          repeticoes: 2,
          descricao: "Enquanto tiver uma arma à distância equipada, inimigos que entrarem em cena sofrem (NP × 5) pontos de dano físico."
        }
      ]
    },
    {
      id: "elementalista",
      nome: "Elementalista",
      outrosNomes: "Mago Elemental, Feiticeiro, Dragoneiro",
      descricao: "Usa o poder destrutivo dos elementos — fogo, gelo, raio, terra e ar. Elementalistas são combatentes mágicos que amplificam seus ataques com energia elemental.",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "Qual elemento você domina primeiro e por quê?",
        "Sua magia é instintiva ou aprendida?",
        "Qual a aparência de sua magia elemental?",
        "Há muitos praticando a sua magia ou você é uma exceção?"
      ],
      poderes: [
        {
          id: "lamina_magica",
          nome: "Lâmina Mágica",
          repeticoes: 3,
          descricao: "Quando acerta um ataque corpo a corpo, você pode gastar 5 PM para causar (NP × 5) pontos de dano elemental adicional (escolha o tipo: ar, fogo, gelo, raio ou terra)."
        },
        {
          id: "magia_elemental",
          nome: "Magia Elemental",
          repeticoes: 10,
          descricao: "Você aprende feitiços elementais. Cada aquisição deste poder permite aprender um feitiço da lista de Elementalista (como Iceberg, Terremoto, Clar​ão, etc.)."
        },
        {
          id: "mortalha_elemental",
          nome: "Mortalha Elemental",
          repeticoes: 3,
          descricao: "Enquanto estiver fundido com energia elemental, você tem Resistência ao tipo de dano elemental escolhido. Causa (NP × 5) pontos de dano adicional com feitiços desse tipo."
        },
        {
          id: "sobrecarga",
          nome: "Sobrecarga",
          repeticoes: 4,
          descricao: "Quando lança um feitiço elemental ofensivo, você pode gastar PM extra (até NP × 10) para aumentar seu dano em quantidade igual ao PM extra gasto."
        },
        {
          id: "arma_elemental",
          nome: "Arma Elemental",
          repeticoes: 2,
          descricao: "Você pode usar uma ação e 10 PM para imbUir uma arma com energia elemental até o fim da cena. Todo dano causado pela arma torna-se do tipo elemental escolhido e causa (NP × 5) pontos de dano adicional."
        }
      ]
    },
    {
      id: "entropista",
      nome: "Entropista",
      outrosNomes: "Curandeiro das Trevas, Agoirento, Apóstolo do Caos",
      descricao: "Canaliza a energia das trevas do Cosmos. Entropistas manipulam o azar alheio, drenam a força dos inimigos e apostam com o destino.",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "Como você descobriu seu poder sobre a entropia?",
        "As pessoas temem ou respeitam sua magia?",
        "Você já usou seu poder de forma que arrepende?",
        "Qual a aparência de sua magia?"
      ],
      poderes: [
        {
          id: "magia_entropica",
          nome: "Magia Entrópica",
          repeticoes: 10,
          descricao: "Você aprende feitiços entrópicos. Cada aquisição permite aprender um feitiço da lista de Entropista (como Apostar, Drenar Vigor, Desgraça, etc.)."
        },
        {
          id: "sete_da_sorte",
          nome: "Sete da Sorte",
          repeticoes: 3,
          descricao: "Seus testes contam como sucesso crítico se a soma dos dados for 7 (e o teste não for falha crítica). Bônus de (NP) em testes de Magia entrópicos."
        },
        {
          id: "nuvem_de_azar",
          nome: "Nuvem de Azar",
          repeticoes: 4,
          descricao: "Você pode usar uma ação e 10 PM para criar uma nuvem de azar. Inimigos dentro da nuvem rolam o dado menor em testes opostos (NP × rodadas de duração)."
        },
        {
          id: "ritual_entropico",
          nome: "Ritualismo Entrópico",
          repeticoes: 1,
          descricao: "Você pode fazer rituais da disciplina entropismo."
        },
        {
          id: "canalizar_trevas",
          nome: "Canalizar Trevas",
          repeticoes: 2,
          descricao: "Uma vez por cena, quando um aliado fracassa em um teste, você pode gastar 1 Ponto de Fábula para fazer com que ele role novamente. Você recebe (NP × 5) PM."
        }
      ]
    },
    {
      id: "erudito",
      nome: "Erudito",
      outrosNomes: "Estudioso, Alquimista do Conhecimento, Tático",
      descricao: "Um mestre do conhecimento que apoia os aliados. Eruditos analisam inimigos, revelam fraquezas e usam seu intelecto para virar batalhas.",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "Onde você aprendeu tanto? Uma grande academia? Um mentor excêntrico?",
        "Há algum assunto que você ainda não domina? Isso o frustra?",
        "Seu conhecimento já salvou — ou prejudicou — alguém. O que aconteceu?",
        "Como as pessoas reagem quando você demonstra saber mais do que deveriam?"
      ],
      poderes: [
        {
          id: "analise_rapida",
          nome: "Análise Rápida",
          repeticoes: 2,
          descricao: "Você pode fazer a ação Estudo gratuitamente no início do seu turno (NP vezes por cena). Ao estudar, revela também as resistências e vulnerabilidades do alvo."
        },
        {
          id: "concentrado",
          nome: "Concentrado",
          repeticoes: 1,
          descricao: "Você pode lançar dois feitiços por ação (em vez de um), desde que o custo total de PM não exceda (NP × 20)."
        },
        {
          id: "lampejo_saber",
          nome: "Lampejo de Saber",
          repeticoes: 3,
          descricao: "Quando passa em um teste de Astúcia, você pode escolher um aliado que possa ouvir você. Esse aliado recupera (NP × 5) PM."
        },
        {
          id: "professor",
          nome: "Professor",
          repeticoes: 2,
          descricao: "Quando você ou um aliado estuda um inimigo com sucesso, todos os aliados recebem bônus de (NP) em testes contra aquele inimigo até o fim da cena."
        },
        {
          id: "ritualismo_erudito",
          nome: "Ritualismo Erudito",
          repeticoes: 1,
          descricao: "Você pode fazer rituais de qualquer disciplina, desde que tenha fontes bibliográficas ou referências adequadas."
        }
      ]
    },
    {
      id: "espiritualista",
      nome: "Espiritualista",
      outrosNomes: "Clérigo, Paladino da Luz, Exorcista",
      descricao: "Apoia os aliados com magia de cura e luz, lança feitiços de luz pura. Espiritualistas projetam sua alma para proteger e fortalecer o grupo.",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "Sua fé ou treinamento espiritual vem de onde?",
        "Você já curou alguém que talvez não merecesse? Como se sentiu?",
        "Há algo que sua magia não pode curar. O que é?",
        "Qual a aparência de sua magia espiritual?"
      ],
      poderes: [
        {
          id: "magia_espiritual",
          nome: "Magia Espiritual",
          repeticoes: 10,
          descricao: "Você aprende feitiços espirituais. Cada aquisição permite aprender um feitiço da lista de Espiritualista (como Curar, Lux, Purificar, Barreira, Aura, Despertar, etc.)."
        },
        {
          id: "aura_protetora",
          nome: "Aura Protetora",
          repeticoes: 2,
          descricao: "Enquanto estiver consciente, aliados adjacentes recuperam (NP × 5) PV no início de cada rodada."
        },
        {
          id: "expulsar_trevas",
          nome: "Expulsar Trevas",
          repeticoes: 3,
          descricao: "Você pode usar uma ação e 10 PM para forçar criaturas mortas-vivas ou demoníacas em cena a fazer um teste de (VIG+VON) contra sua Defesa Mágica. As que falharem ficam assustadas ou fogem."
        },
        {
          id: "bencao_eterna",
          nome: "Bênção Eterna",
          repeticoes: 1,
          descricao: "Uma vez por cena, quando um aliado ficaria com 0 PV, você pode gastar 1 Ponto de Fábula para que ele fique com 1 PV em vez disso."
        },
        {
          id: "ritualismo_espiritual",
          nome: "Ritualismo Espiritual",
          repeticoes: 1,
          descricao: "Você pode fazer rituais da disciplina espiritualismo."
        }
      ]
    },
    {
      id: "furioso",
      nome: "Furioso",
      outrosNomes: "Bárbaro, Berserker, Lutador Raivoso",
      descricao: "Provoca inimigos e fica mais forte quando ferido. Furiosos canalizam sua paixão ardente em poder bruto, entrando em crise para liberar sua verdadeira força.",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Pode equipar armas corpo a corpo marciais",
        "Pode equipar armaduras marciais"
      ],
      marcialEquip: ["armas_corpo_a_corpo", "armaduras"],
      perguntas: [
        "Você conta com sua paixão ardente ou tenta mantê-la sob controle?",
        "Tem sempre uma coisa específica que faz você perder a cabeça. O que é?",
        "No passado, seu descontrole teve consequências trágicas. O que você perdeu?",
        "Qual a aparência de suas armas e como é seu estilo de luta?"
      ],
      poderes: [
        {
          id: "adrenalina",
          nome: "Adrenalina",
          repeticoes: 5,
          descricao: "Enquanto estiver em crise, você causa (NP × 2) pontos de dano adicional (através de ataques, feitiços, Arcanos, itens ou qualquer outro meio)."
        },
        {
          id: "espirito_indomavel",
          nome: "Espírito Indomável",
          repeticoes: 4,
          descricao: "Quando gasta um ou mais Pontos de Fábula, você recebe um benefício adicional: recupera (NP × 5) PV; ou recupera (NP × 5) PM; ou se recupera de uma condição."
        },
        {
          id: "frenesi",
          nome: "Frenesi",
          repeticoes: 1,
          descricao: "Seus testes de Precisão com adaga, luta, malho e armas de arremesso contam como sucesso crítico se ambos os dados mostrarem um mesmo número (desde que não seja falha crítica)."
        },
        {
          id: "provocar",
          nome: "Provocar",
          repeticoes: 5,
          descricao: "Use uma ação e 5 PM: teste oposto de (VIG+VON) contra um inimigo. Se passar, ele fica enfurecido e é compelido a se concentrar em você. Bônus de (NP) no teste."
        },
        {
          id: "resistir",
          nome: "Resistir",
          repeticoes: 5,
          descricao: "Quando faz a ação Guarda sem dar cobertura, recupere (NP × força do Laço maior) PV e aumente um Atributo escolhido em um passo até seu próximo turno."
        }
      ]
    },
    {
      id: "guerreiro_sombrio",
      nome: "Guerreiro Sombrio",
      outrosNomes: "Cavaleiro Negro, Antipaladino, Guerreiro das Trevas",
      descricao: "Faz ataques de trevas e extrai poder dos Laços. Guerreiros Sombrios usam sua força vital como arma, canalizando as sombras através de conexões emocionais.",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Pode equipar armas corpo a corpo marciais",
        "Pode equipar armaduras marciais"
      ],
      marcialEquip: ["armas_corpo_a_corpo", "armaduras"],
      perguntas: [
        "Que experiência trágica despertou suas habilidades?",
        "Muitos acreditam que seus poderes são malignos. Como se sente sobre eles?",
        "Qual a aparência de suas armas e como é seu estilo de luta?",
        "Há muitos praticando a sua magia ou você é uma exceção?"
      ],
      poderes: [
        {
          id: "agonia",
          nome: "Agonia",
          repeticoes: 5,
          descricao: "Uma vez por turno, após causar dano a inimigos com os quais tem um Laço, você recupera (NP × 2) PV e (NP × 2) PM."
        },
        {
          id: "coracao_escuridao",
          nome: "Coração da Escuridão",
          repeticoes: 1,
          descricao: "Uma vez por cena, quando entra em crise, escolha uma criatura sem Laço; você cria um Laço de Ódio com ela."
        },
        {
          id: "golpe_sombras",
          nome: "Golpe das Sombras",
          repeticoes: 5,
          descricao: "Use uma ação: role seu dado de Vigor e perca essa quantidade de PV. Se não reduzir a 0, faça um ataque livre com bônus de (NP + número rolado) de dano de trevas."
        },
        {
          id: "licao_dolorosa",
          nome: "Lição Dolorosa",
          repeticoes: 3,
          descricao: "Quando outra criatura faz você perder PV, pode fazer a ação Estudo imediatamente como reação, com bônus de (NP) no teste."
        },
        {
          id: "sangue_trevas",
          nome: "Sangue das Trevas",
          repeticoes: 1,
          descricao: "Enquanto estiver em crise, você tem Resistência a dano de trevas e de veneno."
        }
      ]
    },
    {
      id: "guardiao",
      nome: "Guardião",
      outrosNomes: "Paladino, Cavaleiro Escudo, Protetor",
      descricao: "Protege os aliados e luta usando armadura pesada. Guardiões são a muralha entre os companheiros e o perigo, sacrificando-se para manter todos seguros.",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Pode equipar armaduras marciais",
        "Pode equipar escudos marciais"
      ],
      marcialEquip: ["armaduras", "escudos"],
      perguntas: [
        "Por quem ou pelo que você daria sua vida de bom grado para proteger?",
        "Você está ou já esteve a serviço de uma dama ou lorde? Como era essa pessoa?",
        "O que você falhou em proteger? O que você perdeu?",
        "O que você usa de armadura e/ou escudo?"
      ],
      poderes: [
        {
          id: "duplo_escudeiro",
          nome: "Duplo Escudeiro",
          repeticoes: 1,
          descricao: "Você pode equipar um escudo na mão dominante. Com dois escudos, recebe os benefícios de ambos e pode usá-los como arma de luta de duas mãos: (VIG+VIG) RA+5 físico."
        },
        {
          id: "fortaleza",
          nome: "Fortaleza",
          repeticoes: 5,
          descricao: "Aumente permanentemente seus PV máximos em (NP × 3)."
        },
        {
          id: "guarda_costas",
          nome: "Guarda-costas",
          repeticoes: 1,
          descricao: "Se você fizer a ação Guarda cobrindo um aliado, essa criatura torna-se Resistente a todos os tipos de dano até o início do seu próximo turno."
        },
        {
          id: "maestria_defensiva",
          nome: "Maestria Defensiva",
          repeticoes: 5,
          descricao: "Enquanto tiver escudo ou armadura marcial equipada, todo dano que você sofrer é reduzido em (NP) (aplicado antes de Afinidades)."
        },
        {
          id: "proteger",
          nome: "Proteger",
          repeticoes: 1,
          descricao: "Quando outra criatura é ameaçada por um ataque ou feitiço, você pode tomar o lugar dela. Quaisquer testes são realizados contra você."
        }
      ]
    },
    {
      id: "inventor",
      nome: "Inventor",
      outrosNomes: "Engenheiro, Alquimista, Tecnomagista",
      descricao: "Fabrica invenções e usa PI de maneira única. Inventores criam poções, infusões e maravilhas tecnomágicas, sendo capazes de desenvolver projetos que vão desde bombas alquímicas até aeronaves.",
      beneficiosIniciais: [
        "+2 PI máximos",
        "Pode iniciar Projetos"
      ],
      marcialEquip: [],
      perguntas: [
        "Você aprendeu sua arte com alguém? Qual era sua relação com essa pessoa?",
        "O que você perdeu indo atrás de progresso e inovação?",
        "Sua arte é revolucionária? Ou pertence a uma área bem estabelecida?",
        "Quando um item ou efeito é criado por você, como ele se parece?"
      ],
      poderes: [
        {
          id: "chuva_de_pocoes",
          nome: "Chuva de Poções",
          repeticoes: 2,
          descricao: "Quando cria uma poção que restaura PV e/ou PM, você pode fazer com que ela afete até (NP) criaturas adicionais. Cada criatura recupera apenas metade."
        },
        {
          id: "engenhocas",
          nome: "Engenhocas",
          repeticoes: 5,
          descricao: "Escolha um tipo de engenhoca: Alquimia, Infusões ou Tecnomagia. Você recebe os benefícios básicos desse tipo. Aquisições seguintes desbloqueiam níveis avançado e superior."
        },
        {
          id: "formula_secreta",
          nome: "Fórmula Secreta",
          repeticoes: 5,
          descricao: "Poções e magisferas que restauram PV/PM restauram (NP × 5) a mais. Itens que causam dano causam (NP) pontos de dano adicional."
        },
        {
          id: "item_emergencial",
          nome: "Item Emergencial",
          repeticoes: 1,
          descricao: "Uma vez por cena de conflito, quando estiver em crise, você pode fazer uma ação adicional no turno, mas deve ser a ação Inventário."
        },
        {
          id: "visionario",
          nome: "Visionário",
          repeticoes: 5,
          descricao: "Quando trabalha em um projeto, até (NP × 100) zênites do custo material são pagos automaticamente. Além disso, você gera mais (NP) de progresso diariamente."
        }
      ]
    },
    {
      id: "ladino",
      nome: "Ladino",
      outrosNomes: "Ladrão, Assassino, Espião",
      descricao: "Aproveita oportunidades e rouba itens especiais dos inimigos. Ladinos são mestres da mobilidade e do golpe certeiro, sempre encontrando vantagem onde outros veem impossibilidade.",
      beneficiosIniciais: [
        "+2 PI máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "O que motiva você? Desejo? Vingança? Ou uma ânsia ardente por liberdade?",
        "Você é parte de uma organização criminosa? Ou trabalha por conta própria?",
        "Há algum lugar que você chama de casa? Ou, no final, todos morrem sozinhos?",
        "Qual é a regra mais importante do seu código pessoal?"
      ],
      poderes: [
        {
          id: "alta_velocidade",
          nome: "Alta Velocidade",
          repeticoes: 3,
          descricao: "No início de um conflito, gaste 10 PM para fazer um ataque livre ou a ação Impedimento/Objetivo antes da primeira rodada. Bônus de (NP) no teste."
        },
        {
          id: "esquiva",
          nome: "Esquiva",
          repeticoes: 3,
          descricao: "Enquanto não tiver escudos ou armaduras marciais equipadas, sua Defesa aumenta em (NP)."
        },
        {
          id: "golpe_baixo",
          nome: "Golpe Baixo",
          repeticoes: 5,
          descricao: "Quando atinge uma criatura com condições com um ataque de alvo único, você causa dano adicional igual a (NP + número de condições afetando a criatura)."
        },
        {
          id: "roubo_de_alma",
          nome: "Roubo de Alma",
          repeticoes: 5,
          descricao: "Use uma ação: teste de (DES+VON) contra Defesa Mágica de um inimigo. Sucesso contra soldado: recupera (NP) PI. Contra elite/campeão: obtém tesouro da alma."
        },
        {
          id: "vejo_voce_mais_tarde",
          nome: "Vejo Você Mais Tarde",
          repeticoes: 1,
          descricao: "Use uma ação e 1 Ponto de Fábula para sumir da cena atual e reaparecer durante uma cena diferente em que outro PJ esteja."
        }
      ]
    },
    {
      id: "mestre_de_armas",
      nome: "Mestre de Armas",
      outrosNomes: "Espadachim, Samurai, Guerreiro",
      descricao: "Primoroso em efetuar e repelir ataques corpo a corpo. Mestres de Armas dominam o combate de perto com técnicas avançadas e maestria incomparável.",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Pode equipar armas corpo a corpo marciais",
        "Pode equipar escudos marciais"
      ],
      marcialEquip: ["armas_corpo_a_corpo", "escudos"],
      perguntas: [
        "Qual é sua relação com as armas? São meros objetos ou algo maior?",
        "Você procura batalhas ou tenta evitá-las?",
        "Você está ou já esteve a serviço de uma dama ou lorde? Como era essa pessoa?",
        "Qual a aparência de suas armas e como é seu estilo de luta?"
      ],
      poderes: [
        {
          id: "chuva_de_laminas",
          nome: "Chuva de Lâminas",
          repeticoes: 1,
          descricao: "Quando faz um ataque corpo a corpo, pode gastar 10 PM: o ataque recebe multi(2); ou aumenta em um o multi existente (máximo 3)."
        },
        {
          id: "contra_ataque",
          nome: "Contra-ataque",
          repeticoes: 1,
          descricao: "Quando um inimigo acerta ou erra um ataque corpo a corpo contra você com resultado par, você pode fazer um ataque livre contra esse inimigo."
        },
        {
          id: "quebra_ossos",
          nome: "Quebra-ossos",
          repeticoes: 4,
          descricao: "Quando atinge alvos com um ataque corpo a corpo, você pode não causar dano e em vez disso: deixar o alvo atordoado, fraco, ou fazê-lo perder (NP × 10) PM."
        },
        {
          id: "maestria_corpo_a_corpo",
          nome: "Maestria em Armas Corpo a Corpo",
          repeticoes: 4,
          descricao: "Você recebe um bônus igual a (NP) em testes de Precisão corpo a corpo."
        },
        {
          id: "trespassar",
          nome: "Trespassar",
          repeticoes: 3,
          descricao: "Use uma ação e 5 PM: ataque livre corpo a corpo em um alvo único. Se acertar, não causa dano mas: destrói escudo, destrói armadura, ou todas as fontes causam (NP × 2) dano adicional ao alvo até seu próximo turno."
        }
      ]
    },
    {
      id: "orador",
      nome: "Orador",
      outrosNomes: "Bardo, Diplomata, Demagogo",
      descricao: "Usa palavras para ganhar aliados e influenciar conflitos. Oradores são mestres da persuasão, capaz de transformar um inimigo em aliado ou destruir a moral de um adversário com algumas palavras.",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [
        "Você acha que qualquer um pode ser persuadido? Todos têm um preço?",
        "Você foi traído por alguém que parecia estar do seu lado. Quem era?",
        "Como você se sente sobre manipular pessoas, ainda que por uma boa causa?",
        "No passado, suas palavras colocaram você em apuros. O que aconteceu?"
      ],
      poderes: [
        {
          id: "aliado_inesperado",
          nome: "Aliado Inesperado",
          repeticoes: 1,
          descricao: "Use uma ação e 1 Ponto de Fábula: escolha uma criatura não hostil capaz de ouvir você. Ela torna-se solícita desde que tratada com respeito e pedidos razoáveis."
        },
        {
          id: "condenar",
          nome: "Condenar",
          repeticoes: 4,
          descricao: "Use uma ação e 5 PM: teste oposto de (AST+VON) contra um inimigo. No sucesso: perde (NP × 10) PM, fica abalado ou atordoado, e sofre (NP) dano adicional de todas as fontes até o próximo turno."
        },
        {
          id: "confio_em_voce",
          nome: "Confio em Você",
          repeticoes: 2,
          descricao: "Quando outro PJ faz um teste, gaste 1 Ponto de Fábula para evocar um Traço ou Laço dele (rolar novamente ou melhorar resultado). Se tiver Laço com o alvo, ele recupera (NP × 10) PM."
        },
        {
          id: "encorajar",
          nome: "Encorajar",
          repeticoes: 6,
          descricao: "Use uma ação e 5 PM: um aliado recupera (NP × 5) PV e aumenta um Atributo escolhido em um passo até o início do próximo turno."
        },
        {
          id: "persuasivo",
          nome: "Persuasivo",
          repeticoes: 2,
          descricao: "Quando passa em um teste usando charme, diplomacia, enganação ou intimidação para preencher/apagar seções de um relógio, pode gastar até (NP × 20) PM para preencher/apagar seções adicionais."
        }
      ]
    },
    {
      id: "quimerista",
      nome: "Quimerista",
      outrosNomes: "Druida, Mago Selvagem, Metamorfo",
      descricao: "Aprende feitiços de criaturas e fala com as feras. Quimeristas obtêm poder das almas dos monstros, imitando habilidades mágicas de feras e alcançando compreensão sobrenatural sobre criaturas.",
      beneficiosIniciais: [
        "+5 PM máximos",
        "Pode fazer rituais de Ritualismo"
      ],
      marcialEquip: [],
      perguntas: [
        "Quem lhe ensinou a arte do quimerismo? Seu mentor é humano ou monstruoso?",
        "Pessoas e monstros podem viver em harmonia ou seu destino é a ameaça mútua?",
        "Qual a aparência de sua magia?",
        "Há muitos praticando a sua arte ou você é uma exceção?"
      ],
      poderes: [
        {
          id: "consumir",
          nome: "Consumir",
          repeticoes: 5,
          descricao: "Quando causa dano a criaturas com um feitiço e tem adaga, arma arcana ou malho equipado, você recupera (NP × 2) PM."
        },
        {
          id: "imitacao_magica",
          nome: "Imitação Mágica",
          repeticoes: 10,
          descricao: "Quando vê um feitiço sendo lançado por uma fera, monstro ou planta, você pode aprendê-lo. Memoriza até (NP + 2) feitiços de Quimerista."
        },
        {
          id: "lingua_das_feras",
          nome: "Língua das Feras",
          repeticoes: 1,
          descricao: "Você pode se comunicar com criaturas das espécies fera, monstro e planta."
        },
        {
          id: "patogenese",
          nome: "Patogênese",
          repeticoes: 1,
          descricao: "Quando causa dano a criaturas com um feitiço de Quimerista, alvos da mesma espécie que ensinaram o feitiço ficam envenenados."
        },
        {
          id: "quimerismo_ritualista",
          nome: "Quimerismo Ritualista",
          repeticoes: 1,
          descricao: "Você pode fazer rituais da disciplina quimerismo."
        }
      ]
    },
    {
      id: "comandante",
      nome: "Comandante",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: 136,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Você pode equipar armas corpo a corpo e armas à distância marciais."
      ],
      marcialEquip: ["armas_corpo_a_corpo","armas_distancia"],
      perguntas: [],
      poderes: [
        { id: "carga_de_cavalaria", nome: "CARGA DE CAVALARIA", repeticoes: 1, custo: "(ç5)", descricao: "Em um conflito, você pode usar uma ação e gastar 10 PM para escolher um aliado que possa ouvi-lo. O aliado pode fazer imediatamente um ataque livre com uma arma equipada (ou um ataque básico, se for um NPC). Ele recebe um bônus no teste de Precisão igual ao seu (NP), mas considera sua RA como 0 ao calcular o dano causado por este ataque." },
        { id: "carruagem_devastadora", nome: "CARRUAGEM DEVASTADORA", repeticoes: 1, descricao: "Após usar Decreto do Bispo, Carga de Cavalaria ou Roque do Rei, você pode escolher outro PJ que possa ouvi-lo e ainda não teve seu turno nesta rodada. O turno deste personagem acontece imediatamente após o seu nesta rodada." },
        { id: "decreto_do_bispo", nome: "DECRETO DO BISPO", repeticoes: 1, custo: "(ç5)", descricao: "Em um conflito, você pode usar uma ação e gastar 10 PM para escolher um: todos os custos em PM são dobrados; ou todas as fontes de dano causam (NP x 3) de dano adicional. 3 CAPÍTULO" },
        { id: "gambito_da_dama", nome: "GAMBITO DA DAMA", repeticoes: 1, custo: "(ç6)", descricao: "Em um conflito, você pode usar uma ação para fazer um ataque livre com uma arma equipada, considerando sua RA como 0 ao calcular o dano. Após o ataque ser resolvido, escolha um: você usa imediatamente um poder que possui entre Decreto do Bispo, Carga de Cavalaria ou Roque do Rei sem precisar usar uma ação (mas gasta a quantidade apropriada de PM); ou um aliado que possa ouvir você recupera (5 + (NP × 5)) PV." },
        { id: "roque_do_rei", nome: "ROQUE DO REI", repeticoes: 1, custo: "(ç4)", descricao: "Em um conflito, você pode usar uma ação e gastar 10 PM para escolher um: nenhuma criatura pode recuperar PV ou PM; ou todos os efeitos que restauram PM restauram (NP × 5) PM adicionais. O efeito escolhido dura até o início de seu próximo turno." },
      ]
    },
    {
      id: "dancarino",
      nome: "Dançarino",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: 138,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV ou PM máximos (à sua escolha)"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "danca", nome: "DANÇA", repeticoes: 1, descricao: "(ç10) Sempre que adquirir esse poder, aprenda uma dança (pp. 140-141). Em seu turno numa cena de conflito, se não tiver uma armadura marcial equipada, você pode gastar 10 PM para apresentar uma das danças que aprendeu. Isso não exige uso de ação, mas a dança só pode ser apresentada antes ou depois da sua ação e apenas uma vez por turno. Se já apresentou uma dança diferente em seu turno anterior na mesma cena, o custo da nova dança é reduzido em 5 PM. Algumas danças têm efeito instantâneo, sendo resolvidas imediatamente; outras têm efeitos que duram até o final do seu próximo turno. 3 CAPÍTULO" },
        { id: "dancarino_de_guerra", nome: "DANÇARINO DE GUERRA", repeticoes: 1, custo: "(ç5)", descricao: "Após apresentar uma dança, seus ataques feitos com armas das categorias adaga, O arremesso, luta, e malho causam (NP) pontos de dano adicional até o início de seu próximo turno. Se tiver uma arma arcana equipada, feitiços ofensivos ( ) que você lançar também causam (NP) pontos de dano adicional até o início de seu próximo turno." },
        { id: "me_acompanhe", nome: "ME ACOMPANHE", repeticoes: 1, descricao: "Ao apresentar uma dança com uma duração de “até o início de seu próximo turno”, você pode gastar 10 PM. Se fizer isso, escolha um personagem com quem você tem um Laço de afeto: o aliado também recebe os benefícios da dança como se fosse você (e tais benefícios duram até o início do seu próximo turno)." },
        { id: "sapateado_frenetico", nome: "SAPATEADO FRENÉTICO", repeticoes: 1, custo: "(ç2)", descricao: "Ao apresentar uma dança com uma duração de “até o início de seu próximo turno”, todos os testes opostos que dependam de acrobacia, coordenação ou velocidade recebem um bônus igual a (NP × 2) até o início de seu próximo turno." },
        { id: "troca_de_figurino", nome: "TROCA DE FIGURINO", repeticoes: 1, descricao: "Após apresentar uma dança, você pode fazer a ação Equipamento sem usar ações." },
      ]
    },
    {
      id: "simbolista",
      nome: "Simbolista",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: 142,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+2 PI máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "conexao_simbolica", nome: "CONEXÃO SIMBÓLICA", repeticoes: 1, descricao: "Você sempre sabe a direção exata de qualquer criatura que esteja com um de seus símbolos, desde que ela esteja a até 2 dias de viagem de sua posição." },
        { id: "miragem", nome: "MIRAGEM", repeticoes: 1, descricao: "Você pode fazer rituais da disciplina ritualismo; além disso, também pode usar ritualismo para criar ilusões visuais." },
        { id: "simbolismo", nome: "SIMBOLISMO", repeticoes: 1, custo: "(ç5)", descricao: "Sempre que adquirir este poder, aprenda dois símbolos (pp. 144-147). Você pode ter até (NP + 1) símbolos ativos ao mesmo tempo; se criar mais símbolos além desse limite, antes deve escolher um de seus símbolos ativos para destruir. Você pode fazer a ação Inventário e gastar 2 PI para criar um dos símbolos que aprendeu e escolher um: aplicar esse símbolo em si mesmo; ou aplicar esse símbolo num aliado que você consegue ver; ou fazer um ataque livre usando uma arma equipada. Esse ataque não causa dano, mas você aplica uma cópia do símbolo escolhido a cada inimigo que atingir (cada cópia conta como um símbolo individual para seu limite de (NP + 1) símbolos ativos)." },
        { id: "simbolos_magicos", nome: "SÍMBOLOS MÁGICOS", repeticoes: 1, custo: "(ç3)", descricao: "Se um aliado estiver com um de seus símbolos, ele pode fazer a ação Feitiço para destruir o símbolo e lançar um único feitiço entre aqueles que você conhece. Para isso, o custo total em PM do feitiço deve ser igual ou menor a (NP × 10) (e o aliado ainda deve pagar o custo de PM)." },
        { id: "toque_pessoal", nome: "TOQUE PESSOAL", repeticoes: 1, custo: "(ç5)", descricao: "Quando uma criatura que você possa ver e que esteja com um de seus símbolos sofrer dano ou recuperar PV e/ou PM, você pode fazer a criatura sofrer (NP) de dando adicional ou recuperar (NP) PV e/ou PM, respectivamente. 3 CAPÍTULO" },
      ]
    },
    {
      id: "virtuoso",
      nome: "Virtuoso",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: 148,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "barreira_sonora", nome: "BARREIRA SONORA", repeticoes: 1, custo: "(ç5)", descricao: "Após cantar um verso em um volume médio ou forte, qualquer quantidade de dano físico que você sofrer até o início do seu próximo turno é reduzido em (NP) (antes de aplicar quaisquer Afinidades a dano)." },
        { id: "canto_da_sereia", nome: "CANTO DA SEREIA", repeticoes: 1, descricao: "Você pode fazer rituais da disciplina ritualismo; além disso, também pode usar ritualismo para criar ilusões sonoras." },
        { id: "harmonia", nome: "HARMONIA", repeticoes: 1, custo: "(ç3)", descricao: "Após afetar um ou mais inimigos com um verso, se tiver uma arma arcana equipada, você pode escolher um: até o início do seu próximo turno, seus aliados causam (NP) de dano adicional a estes inimigos; ou até o início de seu próximo turno, você recupera (NP) Pontos de Mana cada vez que estes inimigos sofrerem dano (se a mesma fonte causar dano a dois ou mais inimigos ao mesmo tempo, você recupera (NP) PM para cada inimigo que sofreu esse dano)." },
        { id: "magicanto", nome: "MAGICANTO", repeticoes: 1, descricao: "(ç10) Em seu turno durante uma cena de conflito, você pode usar uma ação e gastar uma quantidade variável de PM para tecer sua voz e música num efeito mágico conhecido como verso. Você só pode cantar um verso por turno, mesmo se puder fazer mais de uma ação. Regras detalhadas para versos estão descritas nas pp. 150-151. Quando você adquire esse poder, você aprende todos os três volumes, além de uma escala e um tom. Sempre que adquiri-lo novamente, você pode aprender mais uma escala ou um tom (a sua escolha)." },
        { id: "vibrato", nome: "VIBRATO", repeticoes: 1, descricao: "Após cantar um verso em volume fraco ou médio, você pode fazer um ataque livre com uma arma equipada, considerando sua RA como 0 ao calcular o dano. 3 CAPÍTULO" },
      ]
    },
    {
      id: "floralista",
      nome: "Floralista",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: 138,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV ou PM máximos (à sua escolha)"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "arvore_da_vida", nome: "ÁRVORE DA VIDA", repeticoes: 1, custo: "(ç5)", descricao: "Ao remover uma magissemente de seu jardim, você pode escolher uma criatura que você possa ver: se o alvo estiver em crise, ele recupera (5 + (NP × 5)) PV." },
        { id: "cloromancia", nome: "CLOROMANCIA", repeticoes: 1, descricao: "(ç10) Sempre que adquirir este poder, você conhece um tipo diferente de magissemente da lista nas próximas páginas. Durante um conflito, se não houver magissementes em seu jardim, você pode usar uma ação e gastar 20 PM para plantar uma magissemente de um tipo que conheça. As regras de jardim e magissementes estão nas próximas páginas." },
        { id: "enxerto", nome: "ENXERTO", repeticoes: 1, descricao: "Enquanto houver uma magissemente em seu jardim e 1 ou mais seções de seu relógio de germinação estiverem preenchidas, você pode usar uma ação para remover essa magissemente de seu jardim: se fizer isso, plante uma magissemente diferente, desde que seja uma das que você conhece (isso não altera as sessões preenchidas de seu relógio de germinação). 3 CAPÍTULO" },
        { id: "influencia_verdejante", nome: "INFLUÊNCIA VERDEJANTE", repeticoes: 1, descricao: "Você pode fazer rituais da disciplina ritualismo. Além disso, pode usar ritualismo para criar, animar e/ou controlar vegetação, pólen, esporos e toxinas (mas não pode criar nem controlar NPCs da espécie planta dessa forma)." },
        { id: "jardinagem_marcial", nome: "JARDINAGEM MARCIAL", repeticoes: 1, custo: "(ç3)", descricao: "Após plantar uma magissemente usando Cloromancia (mas não Enxerto), você pode escolher um: fazer um ataque livre com uma arma equipada; ou fazer a ação Feitiço sem usar uma ação, lançando um feitiço com custo total de PM igual ou inferior a (5 + (NP × 5)) (você ainda precisa pagar seu custo em PM). Sua RA no teste de Precisão ou de Magia é considerada como 0 para calcular o dano causado por este ataque ou magia." },
      ]
    },
    {
      id: "gourmet",
      nome: "Gourmet",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: 148,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+2 PI máximos",
        "Você pode iniciar projetos para criar comidas e bebidas únicas: são sempre consumíveis com área baseada no número e tipo de criatura que precisa alimentar."
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "cozinheiro_viajante", nome: "COZINHEIRO VIAJANTE", repeticoes: 1, custo: "(ç3)", descricao: "Após cada rolagem de viagem, se tiver o poder Culinária, você recebe (NP × 2) ingredientes." },
        { id: "culinaria", nome: "CULINÁRIA", repeticoes: 1, custo: "(ç5)", descricao: "Ao descansar em um assentamento, você recebe (NP) ingredientes. Você pode usar uma ação e combinar 2 ou 3 ingredientes para preparar uma iguaria (veja a próxima página) e escolher um: aplicar os efeitos em você e num aliado que você possa ver; ou fazer um ataque livre com uma arma equipada. Esse ataque não causa dano, mas você aplica os efeitos da iguaria a cada inimigo atingido pelo ataque. Você pode carregar consigo até 10 + (NP × 5) ingredientes e eles nunca estragam até que você os use. Se adquirir este poder na criação de personagem, você pode começar o jogo com dez ingredientes com sabores aleatórios." },
        { id: "feito_com_amor", nome: "FEITO COM AMOR", repeticoes: 1, custo: "(ç3)", descricao: "Quando usa Culinária e aplica os efeitos da iguaria em você ou num aliado que você possa ver, você pode gastar até (NP × 10) PM. Para cada 10 PM gastos dessa forma, aplique os efeitos da iguaria num aliado adicional que você possa ver." },
        { id: "garfo_e_faca", nome: "GARFO E FACA", repeticoes: 1, descricao: "Quando usa Culinária para fazer um ataque livre, se você combinou apenas um 2 ingredientes, você também pode fazer o ataque causar dano normalmente. Se fizer isso, sua RA é considerada como 0 ao calcular o dano causado por este ataque. 3 CAPÍTULO" },
        { id: "sal_e_pimenta", nome: "SAL E PIMENTA", repeticoes: 1, descricao: "Ao preparar uma iguaria, você pode gastar 2 Pontos de Inventário. Se o fizer, mude o sabor de um ingrediente para outro sabor à sua escolha." },
      ]
    },
    {
      id: "invocador",
      nome: "Invocador",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: 154,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV ou PM máximos (à sua escolha)"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "cascata", nome: "CASCATA", repeticoes: 1, custo: "(ç5)", descricao: "Após um inimigo que você possa ver perder PV graças ao dano causado por um de seus aliados, se o aliado causou dano adicional graças a uma de suas invocações do tipo “Praga”, você pode fazer um ataque livre com uma arma equipada. Esse ataque pode ter apenas o mesmo inimigo como alvo e você recebe um bônus no teste de Precisão igual a (NP). Se o atingir, todo dano causado pelo seu ataque é do mesmo tipo causado pelo aliado, e todas as invocações do tipo “Praga” que estão no alvo se dissipam após o ataque ser resolvido. Se dois ou mais inimigos engatilharem esse poder ao mesmo tempo, você pode fazer um ataque livre contra cada um deles, na ordem você que preferir." },
        { id: "expandir_manancial", nome: "EXPANDIR MANANCIAL", repeticoes: 1, custo: "(ç5)", descricao: "Enquanto você estiver equipado com um arco, arma arcana, arma arremessável, arma de luta, espada ou mangual, suas invocações de tipo “explosão” causam (NP) pontos de dano adicional e o dano adicional concedido por suas invocações do tipo “praga” aumenta em (NP)." },
        { id: "harmonia_elemental", nome: "HARMONIA ELEMENTAL", repeticoes: 1, custo: "(ç2)", descricao: "Você consegue se comunicar verbalmente com criaturas elementais. Ao restaurar os PV de uma criatura com uma invocação ou feitiço, se houver um elemental presente na cena, o efeito restaura (NP × 5) PV adicionais. 3 CAPÍTULO" },
        { id: "invocacao", nome: "INVOCAÇÃO", repeticoes: 1, custo: "(ç3)", descricao: "Você pode usar uma ação e gastar 5 PM para fazer uma invocação acessando a energia de um dos mananciais presentes na cena (veja a próxima página). Seu (NP) determina a quais invocações você tem acesso." },
        { id: "invocacoes_conectadas", nome: "INVOCAÇÕES CONECTADAS", repeticoes: 1, custo: "(ç3)", descricao: "Ao fazer uma invocação, você pode gastar até (NP × 10) PM adicionais. A cada 10 PM gastos desta forma, a invocação pode ter uma criatura adicional que você possa ver como alvo." },
      ]
    },
    {
      id: "mercador",
      nome: "Mercador",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: 158,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+2 PI máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "data_de_validade", nome: "DATA DE VALIDADE", repeticoes: 1, custo: "(ç3)", descricao: "Quando uma poção ou iguaria (página 151) que você criou não causar dano, mas fizer uma ou mais criaturas recuperarem PV, você pode fazê-la, em vez de recuperar PV, causar dano de veneno igual à (metade do seu nível + (NP × 10)) a cada uma dessas criaturas (esse tipo não pode mudar). Esse dano é dividido à metade se for causado a duas ou mais criaturas." },
        { id: "estoque_pessoal", nome: "ESTOQUE PESSOAL", repeticoes: 1, custo: "(ç3)", descricao: "Quando você ou outro PJ for gastar (NP + 2) ou menos Pontos de Inventário, você pode gastar 1 Ponto de Comércio para o alvo ignorar esse custo." },
        { id: "ja_ouvi_falar", nome: "JÁ OUVI FALAR", repeticoes: 1, custo: "(ç3)", descricao: "Quando você ou um aliado que puder ouvir e entender você fizer um teste para examinar uma criatura, item ou local, você pode gastar 1 Ponto de Comércio para conferir um bônus igual a (NP + 2) ao resultado do teste." },
        { id: "ventos_do_comercio", nome: "VENTOS DO COMÉRCIO", repeticoes: 1, custo: "(ç3)", descricao: "Após descansar numa área onde pode fazer comércio, você recebe (NP + 1) Pontos de Comércio. Você nunca pode ter mais que (NP + 3) Pontos de Comércio. Se adquirir este poder na criação de personagem, você começa o jogo com 2 Pontos de Comércio. Numa cena sem conflito, você pode gastar 2 Pontos de Comércio para escolher um: você cria um item raro ou um material, aprovado pelo mestre, cujo valor em zênites seja igual ou inferior a (seu nível × 30z); ou crie um NPC que mora por perto, explique seu ofício e a forma como vocês se conheceram, para o mestre dizer o que ele deseja em troca de seus serviços." },
        { id: "verdadeiro_tesouro", nome: "VERDADEIRO TESOURO", repeticoes: 1, custo: "(ç3)", descricao: "Uma vez por sessão, quando você ajudar um NPC ou uma comunidade a superar ganância e corrupção, melhorar a qualidade de vida ou coexistir com outras criaturas, se tiver Ventos do Comércio, você recebe (NP + 1) Pontos de Comércio. 3 CAPÍTULO" },
      ]
    },
    {
      id: "esper",
      nome: "Esper",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: 150,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "dons_psiquicos", nome: "DONS PSÍQUICOS", repeticoes: 1, custo: "(ç5)", descricao: "Sempre que adquirir este poder, você recebe um dom. As regras para dons e para o Relógio Mental são apresentadas na próxima página." },
        { id: "foco_cognitivo", nome: "FOCO COGNITIVO", repeticoes: 1, custo: "(ç5)", descricao: "No início do seu turno durante um conflito, você pode escolher um aliado que possa ouvir você ou um inimigo que você possa ver e esteja abalado, atordoado e/ou enfurecido. Até o início do próximo turno, esta criatura será seu foco. Você recebe um bônus igual a (NP) em testes feitos para examinar seu foco, assim como em testes de Precisão e Magia para ataques e feitiços ofensivos (O) que têm seu foco entre os alvos. Quando você faz seu foco recuperar Pontos de Vida e/ou Mana, ele recupera (NP × 2) PV e/ou PM adicionais, respectivamente." },
        { id: "hipercognicao", nome: "HIPERCOGNIÇÃO", repeticoes: 1, custo: "(ç5)", descricao: "O custo total em PM de seus feitiços e versos (Atlas: High Fantasy, página 150) que têm seu foco entre os alvos é reduzido em (NP); ou em (NP × 2) se seu foco for o único alvo (mínimo de 0 PM)." },
        { id: "navegador", nome: "NAVEGADOR", repeticoes: 1, descricao: "Você pode se comunicar telepaticamente com qualquer aliado consciente que esteja a 1 dia de viagem; para poderes e condições, vocês podem ouvir um ao outro. Você pode fazer rituais da disciplina ritualismo. Além disso, você pode usar ritualismo para transportar criaturas para dentro e fora da rede de almas, para reunir informações e rastrear entidades enquanto estiverem na rede." },
        { id: "psicocinese", nome: "PSICOCINESE", repeticoes: 1, descricao: "Quando faz um teste de Precisão, você pode substituir um dos dados de atributo por Vontade (como (DES + VON) para um arco curto).Além disso, seus ataques corpo a corpo com espadas ou armas arcanas podem atingir criaturas voadoras. 3 CAPÍTULO" },
      ]
    },
    {
      id: "mutante",
      nome: "Mutante",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: 154,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "acromorfose", nome: "ACROMORFOSE", repeticoes: 1, custo: "(ç3)", descricao: "Seus testes de Precisão para ataques desarmados recebem um bônus igual ao seu (NP) e estes ataques causam (6 + (NP × 2)) pontos de dano adicional. No início do seu turno durante um conflito, você pode escolher uma categoria de arma que não seja luta. Se o fizer, seus ataques desarmados agora pertencem à categoria escolhida. Se escolher arco, arma de fogo ou arremesso, eles se tornam armas à distância, em vez de corpo a corpo. Se escolher adaga ou espada, eles não podem ser usados com Corte Triplo (Atlas: High Fantasy, página 154). Essas mudanças duram até o início do seu próximo turno." },
        { id: "biofagia", nome: "BIOFAGIA", repeticoes: 1, custo: "(ç4)", descricao: "Se estiver em crise, você pode recuperar (NP × 5) PV depois que um dos seus ataques ou feitiços ofensivos (O) fizer um ou mais inimigos perderem PV." },
        { id: "ecdise", nome: "ECDISE", repeticoes: 1, descricao: "Após perder PV ao sofrer dano, se este dano for de um tipo que não seja físico, você pode gastar 10 PV para receber Resistência ao tipo do dano sofrido até que use este poder novamente." },
        { id: "genoclepse", nome: "GENOCLEPSE", repeticoes: 1, custo: "(ç2)", descricao: "Quando causar dano a um ou mais NPCs, você pode descobrir sua espécie. Além disso, o mestre deve escolher (NP) terioformas que reflitam esses NPCs (veja na próxima página): se você tiver Teriomorfose, pode pagar imediatamente o custo em PV deste poder para usá-lo ao manifestar essas terioformas (mesmo que não estejam entre as que você aprendeu)." },
        { id: "teriomorfose", nome: "TERIOMORFOSE", repeticoes: 1, custo: "(ç6)", descricao: "Sempre que adquirir este poder, você aprende uma terioforma. Você pode usar uma ação e gastar um terço dos seus PV atuais (arredondados para baixo) para manifestar os efeitos de até duas terioformas dentre as que aprendeu. Detalhes da transformação e de terioformas estão na próxima página. 3 CAPÍTULO" },
      ]
    },
    {
      id: "piloto",
      nome: "Piloto",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: 158,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Você pode equipar armas corpo a corpo e à distância marciais."
      ],
      marcialEquip: ["armas_corpo_a_corpo", "armas_distancia"],
      perguntas: [],
      poderes: [
        { id: "compressao_tecnologica", nome: "COMPRESSÃO TECNOLÓGICA", repeticoes: 1, descricao: "Quando não tiver ninguém a bordo do seu veículo pessoal, você pode fazê-lo desaparecer do mundo de jogo a qualquer momento. O que permite isso? Se seu veículo pessoal não estiver presente no mundo de jogo e você estiver em um espaço grande o bastante para ele, você pode usar a ação Inventário e gastar 2 PI para fazê-lo aparecer perto de você, e pode embarcar sem custos." },
        { id: "configuracao_flexivel", nome: "CONFIGURAÇÃO FLEXÍVEL", repeticoes: 1, custo: "(ç4)", descricao: "Ao usar a ação Equipamento ou Guarda enquanto estiver pilotando seu veículo pessoal, você pode escolher até (NP) dos seus módulos ativos e desativá-los. Se o fizer, escolha uma quandidade de até (NP) de módulos inativos e os ative." },
        { id: "coracao_no_motor", nome: "CORAÇÃO NO MOTOR", repeticoes: 1, custo: "(ç3)", descricao: "No início do seu turno durante um conflito, se estiver pilotando seu veículo pessoal, você pode gastar 10 PM. Se o fizer, escolha um: na próxima vez que causar dano nesse turno, cause (NP × 2) pontos de dano adicional; ou, na próxima vez que sofrer dano antes do início do seu próximo turno, esse dano é reduzido em (NP × 2) (antes de aplicar quaisquer Afinidades a dano); ou você se recupera da condição lento ou fraco (à sua escolha)." },
        { id: "pulso_firme", nome: "PULSO FIRME", repeticoes: 1, descricao: "Ao fazer um teste de Precisão com um módulo de arma, você pode substituir um de seus atributos por Vigor (como (VIG + VON) para um módulo arcano)." },
        { id: "veiculo_pessoal", nome: "VEÍCULO PESSOAL", repeticoes: 1, custo: "(ç5)", descricao: "Ao adquirir este poder, você recebe um veículo pessoal com uma estrutura à sua escolha e três módulos diferentes à sua escolha (próxima página). Sempre que adquirir este poder novamente, você adquire dois módulos adicionais à sua escolha. 3 CAPÍTULO" },
      ]
    },
    {
      id: "astrologo",
      nome: "Astrólogo",
      sourceBook: "Codex Extra",
      sourcePage: 40,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PM máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "constelacao_do_boitata", nome: "CONSTELAÇÃO DO BOITATÁ", repeticoes: 1, custo: "(ç3)", descricao: "Você pode usar uma ação e gastar 5 PM para fazer um teste de (AST + VON) contra a Def.M de um inimigo que você possa ver, causando (NP × 10) pontos de dano de fogo a ele se o atingir. Se você consumir uma carga celeste, uma criatura que você possa ver torna-se Resistente a fogo até o fim da cena. Você também gera (NP) cargas solares que duram até o fim da cena." },
        { id: "constelacao_do_boto", nome: "CONSTELAÇÃO DO BOTO", repeticoes: 1, custo: "(ç3)", descricao: "Você pode usar uma ação e gastar 5 PM para alinhar os astros de um aliado que você possa ver. Até o fim da cena, o alvo pode trocar um atributo de um teste por AST ou VON. Se você consumir uma carga solar, o alvo recebe +1 no teste. Você também gera (NP) cargas estelares que duram até o fim da cena." },
        { id: "constelacao_do_cao_dourado", nome: "CONSTELAÇÃO DO CÃO DOURADO", repeticoes: 1, custo: "(ç3)", descricao: "Você pode usar uma ação e gastar 10 PM para amaldiçoar um inimigo que você possa ver. Até o início do seu próximo turno, todas as fontes que causarem dano de luz ao alvo causam (NP) pontos de dano adicional. Se você consumir uma carga estelar, todo dano de luz causado ao alvo ignora Imunidades e Resistências. Você também gera (NP) cargas meteóricas que duram até o fim da cena." },
        { id: "constelacao_da_rasga_mortalha", nome: "CONSTELAÇÃO DA RASGA-MORTALHA", repeticoes: 1, descricao: "Você pode fazer rituais da disciplina ritualismo; além disso, também pode usar ritualismo para consultar as estrelas sobre possíveis eventos futuros, obter conhecimento de lendas e até realizar pequenos desejos." },
        { id: "constelacao_do_saci", nome: "CONSTELAÇÃO DO SACI", repeticoes: 1, custo: "(ç3)", descricao: "Você pode usar uma ação e gastar 10 PM para acelerar um aliado que você possa ver. No próximo turno do alvo, ele pode fazer uma ação Equipamento, Guarda, Estudo ou Objetivo sem usar uma ação. Se você consumir uma carga meteórica, ele também pode fazer um ataque livre, mas a RA do teste de Precisão desse ataque é considerada como 0 para calcular o dano causado. Você também gera (NP) cargas celestes que duram até o fim da cena." },
      ]
    },
    {
      id: "bandoleiro",
      nome: "Bandoleiro",
      sourceBook: "Codex Extra",
      sourcePage: 42,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+2 PI máximos",
        "Você pode equipar armas corpo a corpo e armas à distância marciais."
      ],
      marcialEquip: ["armas_corpo_a_corpo","armas_distancia"],
      perguntas: [],
      poderes: [
        { id: "cabra_da_peste", nome: "CABRA DA PESTE", repeticoes: 1, custo: "(ç5)", descricao: "Uma vez por cena, se estiver em crise, você pode usar uma ação e gastar 1 Ponto de Fabula para se recuperar de todas as condições e recuperar PV igual a (NP × 10). Se você gastar 1 Ponto de Ultima em vez do Ponto de Fabula para usar este poder, também recupera PM igual a (NP × 10)." },
        { id: "lider_de_bando", nome: "LÍDER DE BANDO", repeticoes: 1, descricao: "Quando for o líder de um teste em grupo, e se um ou mais personagens apoiadores tiver um Laço com você, some as duas forças mais altas dentre esses Laços (em vez de apenas a força mais alta)." },
        { id: "redistribuir_riquezas", nome: "REDISTRIBUIR RIQUEZAS", repeticoes: 1, custo: "(ç3)", descricao: "No fim de uma cena de conflito na qual um vilão foi reduzido a 0 PV, você recebe (1d6 × NP) PI para distribuir entre os PJs. Além disso, se o vilão tiver mais do que 1 Ponto de Ultima no fim do conflito, você “rouba” 1 Ponto de Ultima dele. Anote-o em sua ficha (você só pode ter 1 Ponto de Ultima por vez)." },
        { id: "sertanejo", nome: "SERTANEJO", repeticoes: 1, descricao: "Você possui uma conexão com uma região de terras áridas e desafiadoras, afastada da costa e distante dos costumes da assim chamada civilização. Ao adquirir este poder, descreva esse lugar e como desenvolveu essa co- nexão e defina com o grupo o conceito de sertanejo no seu mundo de jogo. Essa região conta como uma segunda Origem para você. Se usar um Ponto de Fabula para evocá-la, você pode gastar 1 Ponto de Ultima em vez disso." },
        { id: "valhacouto", nome: "VALHACOUTO", repeticoes: 1, custo: "(ç3)", descricao: "No fim de um descanso, você pode gastar 1 Ponto de Fabula para seu bando trazer (NP + 1) Suprimentos, que duram até você usar este poder novamente. Quando faz um teste de Viagem, você pode gastar 1 Suprimento para rolar o dado novamente. Além disso, você pode gastar 1 Suprimento para criar uma barraca mágica. Se gastar 1 Ponto de Ultima ao usar este poder, o número de suprimentos trazidos aumenta em +2." },
      ]
    },
    {
      id: "carteador",
      nome: "Carteador",
      sourceBook: "Codex Extra",
      sourcePage: 44,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV ou PM máximos (à sua escolha)"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "altos_e_baixos", nome: "ALTOS E BAIXOS", repeticoes: 1, descricao: "Quando rola um sucesso crítico ou uma falha crítica, você pode comprar uma carta do seu baralho. Se fizer isso, descarte uma carta da sua mão." },
        { id: "carta_armadilha", nome: "CARTA ARMADILHA", repeticoes: 1, custo: "(ç4)", descricao: "Após um inimigo que você possa ver fazer uma ação num conflito, você pode declarar um naipe do seu baralho (após resolver a ação). Então ponha na pilha de descarte, com face para cima, a primeira carta do fundo do baralho. Se for um curinga ou se o naipe for o mesmo que declarou, você pode usar a ação Feitiço sem custo de ação, lançando um feitiço com custo total em PM igual ou menor que (NP × 5) (você ainda deve pagar esse custo de PM)." },
        { id: "cartas_magicas", nome: "CARTAS MÁGICAS", repeticoes: 1, custo: "(ç3)", descricao: "Você recebe um baralho, uma mão e uma pilha de descarte (próx. página). Durante um conflito, você pode usar uma ação e gastar até (10 + (NP × 5)) PM (mínimo de 10 PM). Se fizer isso, use o efeito de uma das cartas na sua mão para cada 5 PM gastos dessa forma (máximo de 5 cartas, que formam um conjunto). Após usar o efeito do conjunto (se houver), descarte as cartas usadas e compre a mesma quantidade de cartas do seu baralho." },
        { id: "dobro_ou_nada", nome: "DOBRO OU NADA", repeticoes: 1, descricao: "Antes de fazer um teste de Precisão, teste de Magia para um feitiço ofensivo (O) ou um teste para afetar um relógio, você pode declarar o dobro ou nada. Se fizer isso e rolar um sucesso crítico, dobre o dano causado pelo ataque ou feitiço ou o número de seções preenchidas ou apagadas no relógio. No entanto, qualquer outro resultado é considerado uma falha." },
        { id: "mulligan", nome: "MULLIGAN", repeticoes: 1, custo: "(ç5)", descricao: "No final do seu turno em um conflito, você pode descartar (NP) cartas da sua mão. Se fizer isso, compre a mesma quantidade de cartas do seu baralho. gerenciando o baralho Seu baralho é um conjunto de cartas na vida real, que você pode montar da forma que preferir, desde que tenha versos idênticos e que respeite essas restrições: Deve ter exatamente 30 cartas: 2 curingas e 28 cartas divididas em 4 tipos chamados de naipes — por exemplo, um baralho padrão de pôquer é dividido nos naipes de paus (¨), ouros (©), copas (ª) e espadas («). Ao criar seu baralho, associe cada naipe a um dano diferente entre: ar, fogo, gelo e terra. Cada naipe do baralho é composto por 7 cartas com valores de 1 a 7. O mais fácil é usar o baralho de pôquer — removendo cartas de corte e cartas de número 8 a 10 —, mas você pode usar arcanos menores do tarô, cartas colecionáveis e muito mais; só garanta que as combinações sejam fáceis de identificar. No início do conflito, embaralhe as 30 cartas do baralho e as coloque à sua frente com face para baixo. Então compre 5 cartas para formar sua mão inicial. Se precisar comprar cartas do baralho e não houver o suficiente, compre o máximo possível, embaralhe a pilha de descarte, ponha as cartas de volta à sua frente com face para baixo e, então, continue comprando. Ao comprar cartas do baralho, elas vão para a sua mão. Em geral, apenas você pode ver sua mão, mas você pode mostrá-la a outras pessoas se quiser. Ao descartar cartas da mão, coloque-as com face para cima na sua pilha de descarte na ordem que preferir. Mas a ordem das cartas na pilha de descarte não pode ser modificada. Seu baralho, mão e pilha de descarte (assim como quaisquer poderes e efeitos relacionados a eles) só podem ser usados durante cenas de conflito. No final de cada conflito, embaralhe as 30 cartas de volta ao seu baralho e deixe-o de lado." },
      ]
    },
    {
      id: "cavaleiro_magico",
      nome: "Cavaleiro Mágico",
      sourceBook: "Codex Extra",
      sourcePage: 48,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PM máximos",
        "Você pode equipar armaduras e escudos marciais."
      ],
      marcialEquip: ["armaduras","escudos"],
      perguntas: [],
      poderes: [
        { id: "alma_ferida", nome: "ALMA FERIDA", repeticoes: 1, custo: "(ç5)", descricao: "Uma vez por cena, quando entra em crise, você pode criar um Laço de desconfiança com um número de inimigos igual a (NP) que você possa ver. Laços criados dessa forma duram até o fim da cena e não precisam apagar Laços pré-existentes para serem criados. Se precisaria fazer isso para criar um ou mais Laços deste poder, em vez disso escolha um número dos seus Laços atuais equivalente ao número de Laços excedentes. Os Laços esco- lhidos deixam de existir até o fim da cena." },
        { id: "coracao_ardente", nome: "CORAÇÃO ARDENTE", repeticoes: 1, custo: "(ç3)", descricao: "Enquanto estiver sob o efeito de uma forma mágica, quando evoca um Laço de desconfiança, inferioridade e/ou ódio num teste de Precisão ou Magia para causar dano, você causa (NP × 2) de dano adicional do mesmo tipo." },
        { id: "impulso_do_coracao", nome: "IMPULSO DO CORAÇÃO", repeticoes: 1, descricao: "O custo para usar Magitransformação é reduzido em um número de PM igual à quantidade de Laços com emoções de admiração, lealdade e/ou afeto que você possui (mínimo de 20 PM)." },
        { id: "magitransformacao", nome: "MAGITRANSFORMAÇÃO", repeticoes: 1, custo: "(ç3)", descricao: "Sempre que adquirir este poder, você deve criar uma nova forma mágica. Você pode usar uma ação e gastar 25 PM para assumir uma forma mágica que possui. Detalhes para criar formas mágicas estão na próxima página." },
        { id: "transformacao_aprimorada", nome: "TRANSFORMAÇÃO APRIMORADA", repeticoes: 1, custo: "(ç3)", descricao: "Sempre que adquirir este poder, escolha a arma ou armadura de uma das suas formas mágicas. No fim de cada descanso, para cada item escolhido, você pode substituir sua característica ou aplicar uma nova (se o item não tiver características) como se fosse um item raro (Livro Básico, a partir da página 266). A característica escolhida deve ser aprovada pelo mestre e ter valor em zênites igual ou menor que (40 x seu nível). forma mágica Todo cavaleiro mágico tem uma relíquia mágica que lhe concede transformações com efeitos especiais. Cada transformação é uma forma mágica. A maneira como essa transformação acontece e a aparência da sua forma mágica ficam à sua escolha, mas há sugestões gerais de aparência na página ao lado. Para criar uma forma mágica, combine uma motivação, uma aura e dois focos. Após fazer essa escolha, ela só pode ser mudada por poderes específicos. A motivação determina o sentimento que move sua transformação e os alvos afetados pela aura da sua forma mágica. A aura causa um efeito diferente nos alvos da motivação. Efeitos de afeto duram até o fim da cena, ou enquanto os efeitos do foco durarem. Cada foco causa um efeito diferente em você. Você pode escolher no máximo uma arma e uma armadura entre as opções descritas em seus focos. Se algum dos itens escolhidos for pior do que o item equipado no respectivo espaço, você não precisa substituí-lo ao usar Magitransformação. Em vez disso, se necessário, mude somente o tipo de dano causado pela arma. Os efeitos do foco duram até o fim da cena, mas também se encerram se você morrer, ficar inconsciente ou sair de sua forma mágica. Você pode encerrar os efeitos de uma forma mágica a qualquer momento, mas em um conflito só pode fazê-lo no seu turno, antes ou depois de uma ação. Você pode combinar aspectos entre focos (por exemplo, pode escolher focos ardente e congelante para usar um arco curto que causa dano de gelo)." },
      ]
    },
    {
      id: "forjador_de_almas",
      nome: "Forjador de Almas",
      sourceBook: "Codex Extra",
      sourcePage: 52,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+2 PI máximos"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "animar_arma", nome: "ANIMAR ARMA", repeticoes: 1, custo: "(ç4)", descricao: "No seu turno, você pode usar uma ação e gastar 1 Ponto de Alma para animar uma arma equipada, que libera o espaço de mão ocupado por ela. A arma flutua, como se empunhada por uma mão invisível, perde a propriedade multi (se a tinha) e não pode recebê-la de nenhuma forma. No fim de cada rodada, essa arma faz um único ataque usando seu teste de Precisão, mas deve considerar a RA como 0 ao calcular o dano causado por ela. A arma permanece animada por um número de rodadas igual a (NP) ou até você animar outra arma." },
        { id: "coletar_almas", nome: "COLETAR ALMAS", repeticoes: 1, custo: "(ç5)", descricao: "Você pode coletar Pontos de Alma de inimigos derrotados e usá-los para fortalecer seus poderes. Você não pode ter mais de (NP + 1) Pontos de Alma. Detalhes do uso de Pontos de Alma estão na próxima página." },
        { id: "forjar_caracteristica", nome: "FORJAR CARACTERÍSTICA", repeticoes: 1, descricao: "Você pode usar a ação Inventário e gastar 10 PM ou 1 Ponto de Alma para moldar uma característica de arma (Livro Básico, página 269) com custo de até (500z + (seu nível × 40z)) em uma arma que esteja ao seu alcance. Uma característica fica moldada até o fim da cena e um mesmo item só pode ter uma característica moldada por vez." },
        { id: "forjar_feitico", nome: "FORJAR FEITIÇO", repeticoes: 1, custo: "(ç5)", descricao: "Sempre que adquirir este poder, escolha um dos feitiços ofensivos (O) de ele- mentalista (Livro Básico, páginas 188 e 189). Você pode usar a ação Inventário e gastar 10 PM ou 1 Ponto de Alma para infundir um desses feitiços numa arma ao seu alcance. Até o fim da cena, um PJ equipado com uma arma com um feitiço infundido pode fazer a ação Feitiço para lançar esse feitiço uma úni- ca vez, usando a fórmula do teste de Precisão da arma para o teste de Magia." },
        { id: "manifestar_arma", nome: "MANIFESTAR ARMA", repeticoes: 1, descricao: "No seu turno em um conflito, você pode usar a ação Equipamento e gastar 10 PM ou 1 Ponto de Alma para manifestar uma arma básica, destruindo qual- quer arma já manifestada dessa forma. Se tiver espaços de mão livres, você pode imediatamente equipar esta arma. Com ela, você pode trocar um Atributo do teste de Precisão por Vontade (como (VON + DES) para um arco curto)." },
      ]
    },
    {
      id: "lamina_carmesim",
      nome: "Lâmina Carmesim",
      sourceBook: "Codex Extra",
      sourcePage: 56,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV máximos",
        "Você pode equipar armas corpo a corpo e escudos marciais."
      ],
      marcialEquip: ["armas_corpo_a_corpo","escudos"],
      perguntas: [],
      poderes: [
        { id: "arsenal_vermelho", nome: "ARSENAL VERMELHO", repeticoes: 1, descricao: "Você pode usar uma ação e gastar 5 PV para cobrir uma arma corpo a corpo equipada com uma camada do seu próprio sangue até o fim da cena. Se fizer isso, a arma passa a disparar cortes de sangue em alta velocidade, atingindo alvos que não podem ser acertados por ataques corpo a corpo. Um alvo que esteja voando e seja atingido por um ataque desta arma é imediatamente forçado a pousar. Quando está em crise, você não gasta PV ao usar este poder e pode fazer um ataque livre como parte da mesma ação que usou para fazer isso." },
        { id: "dobrar_sangue", nome: "DOBRAR SANGUE", repeticoes: 1, descricao: "Você pode usar uma ação e gastar 20 PM para escolher um ataque básico ou feitiço conhecido de um inimigo que você possa ver. Então faça um teste oposto contra ele de (VON + VIG). Se você vencer, o alvo é obrigado a usar a ação escolhida no próximo turno dele contra um alvo à sua escolha." },
        { id: "escudo_escarlate", nome: "ESCUDO ESCARLATE", repeticoes: 1, custo: "(ç2)", descricao: "Enquanto estiver em crise, sua Defesa e Defesa mágica aumentam em (NP)." },
        { id: "frenesi_sanguinolento", nome: "FRENESI SANGUINOLENTO", repeticoes: 1, custo: "(ç4)", descricao: "Quando rola um sucesso crítico ao fazer um ataque corpo a corpo, você pode gastar a oportunidade gerada para recuperar (NP × 10) PV." },
        { id: "hemofagia", nome: "HEMOFAGIA", repeticoes: 1, custo: "(ç5)", descricao: "Uma vez por rodada, quando outra criatura faz você perder PV, você pode gastar 10 PV para fazer um ataque livre contra essa criatura (depois que a ação dela for resolvida). Se acertar, não causa o dano da arma; em vez disso causa (NP + RA do teste de Precisão) de dano físico." },
      ]
    },
    {
      id: "malandro",
      nome: "Malandro",
      sourceBook: "Codex Extra",
      sourcePage: 58,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+2 PI máximos",
        "Você pode equipar armas à distância marciais."
      ],
      marcialEquip: ["armas_distancia"],
      perguntas: [],
      poderes: [
        { id: "engabelar", nome: "ENGABELAR", repeticoes: 1, custo: "(ç3)", descricao: "Uma vez por cena, quando um aliado ou inimigo que você possa ver faz um teste, você pode gastar 10 PM para \"convencer\" o destino a brincar com a sorte e o azar dele. Se fizer isso, faça o mesmo teste, mas com bônus ou penalidade (escolha qual) igual a (NP). Então, você pode escolher trocar seu resultado com o resultado do alvo. Até o fim da cena, você pode usar o resultado trocado como a rolagem de um dos seus testes." },
        { id: "explorar_fraqueza", nome: "EXPLORAR FRAQUEZA", repeticoes: 1, descricao: "No começo do seu turno, você pode gastar 10 PM para usar a ação Estudo sem custo de ação, antes ou depois da sua ação, usando (AST + DES) como fórmula do seu teste aberto." },
        { id: "gambiarra", nome: "GAMBIARRA", repeticoes: 1, custo: "(ç4)", descricao: "Uma vez por cena, você pode usar a ação Inventário e gastar até (NP x 2) PI para fazer uma modificação improvisada em uma arma equipada, usando os materiais que estiverem à disposição na cena. Para cada 2 PI gastos, escolha uma modificação: a arma fornece +1 em testes de Precisão; ou a arma causa 2 pontos de dano adicional; ou a arma fornece um bônus de +1 em testes da ação Objetivo; ou ataques com a arma causam dano de veneno. Todas as modificações improvisadas duram até o fim da cena, quando se quebram em vários pedacinhos de material inútil." },
        { id: "golpe_aproveitador", nome: "GOLPE APROVEITADOR", repeticoes: 1, custo: "(ç3)", descricao: "Quando faz um ataque contra uma única criatura que esteja sofrendo uma ou mais condições, você pode trocar um dos atributos do teste de Precisão da arma usada por DES e recebe um bônus de (NP) nesse teste." },
        { id: "jeitinho", nome: "JEITINHO", repeticoes: 1, custo: "(ç2)", descricao: "Quando um aliado passar em um teste para preencher ou apagar as seções de um relógio, você pode gastar até (NP x 20) PM. Se fizer isso, você não pode fazer testes para influenciar o relógio até o fim do seu próximo turno, mas pre- enche ou apaga uma seção desse relógio a cada 20 PM gastos dessa forma." },
      ]
    },
    {
      id: "necromante",
      nome: "Necromante",
      sourceBook: "Codex Extra",
      sourcePage: 60,
      outrosNomes: "",
      descricao: "",
      beneficiosIniciais: [
        "+5 PV ou PM máximos (à sua escolha)"
      ],
      marcialEquip: [],
      perguntas: [],
      poderes: [
        { id: "alem_do_reino_da_morte", nome: "ALÉM DO REINO DA MORTE", repeticoes: 1, custo: "(ç5)", descricao: "Quando outra criatura que você possa ver perde PV enquanto estiver em crise, se não for um morto-vivo, você recebe 1 Ponto de Túmulo. Você não pode ter mais de (NP + 1) Pontos de Túmulo. Ao ser reduzido a 0 PV, você perde todos os Pontos de Túmulo; em seguida, se tiver perdido ao menos 1 Ponto de Túmulo dessa forma e for a primeira vez a ficar com 0 PV na cena, você não se rende nem se sacrifica: em vez disso, recupera uma quantidade de PV igual a (NP × a quantidade de Pontos de Túmulo que você perdeu dessa forma)." },
        { id: "filhos_da_sepultura", nome: "FILHOS DA SEPULTURA", repeticoes: 1, descricao: "Você pode se comunicar verbalmente com mortos-vivos. Uma vez por cena, pode fazer uma pergunta a um morto-vivo, que deve responder sinceramente." },
        { id: "medo_e_a_chave", nome: "MEDO É A CHAVE", repeticoes: 1, custo: "(ç3)", descricao: "Após fazer um ou mais inimigos perderem PV, se você tiver Além do Reino da Morte e ao menos um desses inimigos estiver abalado e/ou fraco, você recebe 1 Ponto de Túmulo e recupera (NP × 2) PV e PM." },
        { id: "por_quem_os_sinos_dobram", nome: "POR QUEM OS SINOS DOBRAM", repeticoes: 1, custo: "(ç3)", descricao: "Quando causa dano com um feitiço a uma criatura, se o feitiço causar dano apenas a ela, você pode gastar 1 Ponto de Túmulo. Se o fizer, escolha um: se a criatura estiver sofrendo uma ou mais condições, o feitiço causa dano adicional igual a ((NP × 2) + o número de condições da criatura); ou se a criatura não estiver sofrendo condições, ela fica abalada." },
        { id: "rondo_do_pesadelo", nome: "RONDÓ DO PESADELO", repeticoes: 1, descricao: "Ao lançar um feitiço ofensivo (O) com alvo \"uma criatura\", você pode gastar 2 Pontos de Túmulo para atingir todas as criaturas presentes na cena que você possa ver (faça um único teste de Magia e compare-o à Def.M de cada alvo). Se o fizer, todo dano causado pelo feitiço torna-se de trevas e seu tipo não pode ser alterado." },
      ]
    }

  ],

  // =============================================
  // ARMAS BÁSICAS
  // =============================================
  armas: [
    // Armas Arcanas
    { id: "cajado", nome: "Cajado", custo: 100, precisao: "VON+VON", dano: "RA+6", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: false, categoria: "Arcanas" },
    { id: "tomo", nome: "Tomo", custo: 100, precisao: "AST+AST", dano: "RA+6", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: false, categoria: "Arcanas" },
    // Arcos
    { id: "besta", nome: "Besta", custo: 150, precisao: "DES+AST", dano: "RA+8", tipo: "físico", maos: 2, alcance: "à distância", marcial: false, categoria: "Arcos" },
    { id: "arco_curto", nome: "Arco Curto", custo: 200, precisao: "DES+DES", dano: "RA+8", tipo: "físico", maos: 2, alcance: "à distância", marcial: false, categoria: "Arcos" },
    // Luta
    { id: "desarmado", nome: "Ataque Desarmado", custo: 0, precisao: "DES+VIG", dano: "RA+0", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: false, categoria: "Luta", gratis: true },
    { id: "soqueira", nome: "Soqueira de Ferro", custo: 150, precisao: "DES+VIG", dano: "RA+6", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: false, categoria: "Luta" },
    // Adagas
    { id: "adaga", nome: "Adaga de Aço", custo: 150, precisao: "DES+AST+1", dano: "RA+4", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: false, categoria: "Adagas" },
    // Armas de Fogo
    { id: "pistola", nome: "Pistola", custo: 250, precisao: "DES+AST", dano: "RA+8", tipo: "físico", maos: 1, alcance: "à distância", marcial: true, categoria: "Armas de Fogo" },
    // Malhos
    { id: "chicote", nome: "Chicote de Correntes", custo: 150, precisao: "DES+DES", dano: "RA+8", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: false, categoria: "Malhos" },
    // Armas Pesadas
    { id: "martelo", nome: "Martelo de Ferro", custo: 200, precisao: "VIG+VIG", dano: "RA+6", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: false, categoria: "Pesadas" },
    { id: "machado_largo", nome: "Machado Largo", custo: 250, precisao: "VIG+VIG", dano: "RA+10", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: true, categoria: "Pesadas" },
    { id: "machado_guerra", nome: "Machado de Guerra", custo: 250, precisao: "VIG+VIG", dano: "RA+14", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: true, categoria: "Pesadas" },
    // Lanças
    { id: "lanca_leve", nome: "Lança Leve", custo: 200, precisao: "DES+VIG", dano: "RA+8", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: true, categoria: "Lanças" },
    { id: "lanca_pesada", nome: "Lança Pesada", custo: 200, precisao: "DES+VIG", dano: "RA+12", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: true, categoria: "Lanças" },
    // Espadas
    { id: "espada_bronze", nome: "Espada de Bronze", custo: 200, precisao: "DES+VIG+1", dano: "RA+6", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: true, categoria: "Espadas" },
    { id: "montante", nome: "Montante", custo: 200, precisao: "DES+VIG+1", dano: "RA+10", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: true, categoria: "Espadas" },
    { id: "katana", nome: "Katana", custo: 200, precisao: "DES+AST+1", dano: "RA+10", tipo: "físico", maos: 2, alcance: "corpo a corpo", marcial: true, categoria: "Espadas" },
    { id: "rapieira", nome: "Rapieira", custo: 200, precisao: "DES+AST+1", dano: "RA+6", tipo: "físico", maos: 1, alcance: "corpo a corpo", marcial: true, categoria: "Espadas" },
    // Arremesso
    { id: "shuriken", nome: "Shuriken", custo: 150, precisao: "DES+AST", dano: "RA+4", tipo: "físico", maos: 1, alcance: "à distância", marcial: false, categoria: "Arremesso" }
  ],

  // =============================================
  // ARMADURAS BÁSICAS
  // =============================================
  armaduras: [
    { id: "sem_armadura", nome: "Sem Armadura", custo: 0, defesa: "DES", defMagica: "AST", iniciativa: 0, marcial: false },
    { id: "camisa_seda", nome: "Camisa de Seda", custo: 100, defesa: "DES", defMagica: "AST", iniciativa: 2, marcial: false, notaInic: "+2 Inic, -1 a comprar" },
    { id: "traje_viagem", nome: "Traje de Viagem", custo: 100, defesa: "DES+1", defMagica: "AST+1", iniciativa: -1, marcial: false },
    { id: "tunica_combate", nome: "Túnica de Combate", custo: 150, defesa: "DES+1", defMagica: "AST+1", iniciativa: 0, marcial: false },
    { id: "vestes_sabio", nome: "Vestes de Sábio", custo: 200, defesa: "DES+1", defMagica: "AST+2", iniciativa: -2, marcial: false },
    { id: "brigantina", nome: "Brigantina", custo: 150, defesa: "10", defMagica: "AST", iniciativa: -2, marcial: true },
    { id: "placa_bronze", nome: "Placa de Bronze", custo: 200, defesa: "11", defMagica: "AST", iniciativa: -3, marcial: true },
    { id: "placa_runica", nome: "Placa Rúnica", custo: 250, defesa: "11", defMagica: "AST+1", iniciativa: -3, marcial: true },
    { id: "placa_aco", nome: "Placa de Aço", custo: 300, defesa: "12", defMagica: "AST", iniciativa: -4, marcial: true }
  ],

  // =============================================
  // ESCUDOS BÁSICOS
  // =============================================
  escudos: [
    { id: "escudo_bronze", nome: "Escudo de Bronze", custo: 100, defesa: "+2", defMagica: "+0", marcial: false },
    { id: "escudo_runico", nome: "Escudo Rúnico", custo: 150, defesa: "+2", defMagica: "+2", marcial: true }
  ],

  // =============================================
  // PERSONAGENS CLÁSSICOS (Sugestões Prontas)
  // =============================================
  personagensClassicos: [
    {
      nome: "Alquimista",
      des: "d8", vig: "d6", ast: "d10", von: "d8",
      classes: [
        { classe: "andarilho", niveis: 2, poderes: ["papo_taverna", "pratico"] },
        { classe: "inventor", niveis: 3, poderes: ["chuva_de_pocoes", "engenhocas", "formula_secreta"] }
      ],
      equipamento: ["adaga", "besta", "traje_viagem"]
    },
    {
      nome: "Apostador",
      des: "d10", vig: "d6", ast: "d8", von: "d8",
      classes: [
        { classe: "entropista", niveis: 2, poderes: ["magia_entropica", "sete_da_sorte"] },
        { classe: "ladino", niveis: 2, poderes: ["alta_velocidade", "esquiva"] },
        { classe: "mestre_de_armas", niveis: 1, poderes: ["maestria_corpo_a_corpo"] }
      ],
      equipamento: ["camisa_seda", "rapieira", "shuriken"]
    },
    {
      nome: "Cavaleiro Negro",
      des: "d8", vig: "d10", ast: "d6", von: "d8",
      classes: [
        { classe: "entropista", niveis: 1, poderes: ["magia_entropica"] },
        { classe: "guerreiro_sombrio", niveis: 2, poderes: ["golpe_sombras", "golpe_sombras"] },
        { classe: "mestre_de_armas", niveis: 2, poderes: ["chuva_de_laminas", "maestria_corpo_a_corpo"] }
      ],
      equipamento: ["montante", "placa_runica"]
    },
    {
      nome: "Curandeiro",
      des: "d6", vig: "d8", ast: "d8", von: "d10",
      classes: [
        { classe: "espiritualista", niveis: 3, poderes: ["magia_espiritual", "magia_espiritual", "magia_espiritual"] },
        { classe: "orador", niveis: 2, poderes: ["confio_em_voce", "encorajar"] }
      ],
      equipamento: ["cajado", "vestes_sabio"]
    },
    {
      nome: "Duelista Mágico",
      des: "d10", vig: "d6", ast: "d8", von: "d8",
      classes: [
        { classe: "elementalista", niveis: 2, poderes: ["magia_elemental", "mortalha_elemental"] },
        { classe: "espiritualista", niveis: 1, poderes: ["magia_espiritual"] },
        { classe: "mestre_de_armas", niveis: 2, poderes: ["contra_ataque", "chuva_de_laminas"] }
      ],
      equipamento: ["camisa_seda", "escudo_runico", "rapieira"]
    },
    {
      nome: "Ladrão",
      des: "d10", vig: "d6", ast: "d8", von: "d8",
      classes: [
        { classe: "ladino", niveis: 3, poderes: ["alta_velocidade", "golpe_baixo", "roubo_de_alma"] },
        { classe: "mestre_de_armas", niveis: 2, poderes: ["quebra_ossos", "quebra_ossos"] }
      ],
      equipamento: ["adaga", "adaga", "traje_viagem"]
    },
    {
      nome: "Patrulheiro",
      des: "d10", vig: "d8", ast: "d8", von: "d6",
      classes: [
        { classe: "andarilho", niveis: 2, poderes: ["pratico", "viajante_experiente"] },
        { classe: "atirador", niveis: 3, poderes: ["barragem", "maestria_distancia", "tiro_de_aviso"] }
      ],
      equipamento: ["adaga", "arco_curto", "camisa_seda"]
    },
    {
      nome: "Pugilista",
      des: "d8", vig: "d10", ast: "d6", von: "d8",
      classes: [
        { classe: "furioso", niveis: 3, poderes: ["adrenalina", "frenesi", "resistir"] },
        { classe: "mestre_de_armas", niveis: 2, poderes: ["contra_ataque", "quebra_ossos"] }
      ],
      equipamento: ["soqueira", "soqueira", "tunica_combate"]
    },
    {
      nome: "Samurai",
      des: "d8", vig: "d8", ast: "d8", von: "d8",
      classes: [
        { classe: "espiritualista", niveis: 1, poderes: ["magia_espiritual"] },
        { classe: "guardiao", niveis: 2, poderes: ["maestria_defensiva", "maestria_defensiva"] },
        { classe: "mestre_de_armas", niveis: 2, poderes: ["contra_ataque", "maestria_corpo_a_corpo"] }
      ],
      equipamento: ["katana", "placa_runica"]
    },
    {
      nome: "Soldado",
      des: "d8", vig: "d10", ast: "d6", von: "d8",
      classes: [
        { classe: "guardiao", niveis: 2, poderes: ["guarda_costas", "proteger"] },
        { classe: "mestre_de_armas", niveis: 3, poderes: ["quebra_ossos", "quebra_ossos", "trespassar"] }
      ],
      equipamento: ["brigantina", "escudo_runico", "espada_bronze"]
    }
  ],

  // =============================================
  // LAÇOS - EMOÇÕES
  // =============================================
  emocoes: [
    { id: "admiracao", nome: "Admiração", par: "A", descricao: "Você acredita que tem muito a aprender com essa pessoa e a respeita." },
    { id: "inferioridade", nome: "Inferioridade", par: "A", descricao: "Você inveja essa pessoa ou se sente impotente contra ela." },
    { id: "lealdade", nome: "Lealdade", par: "B", descricao: "Você acredita nos ideais dessa pessoa ou ela ganhou sua confiança." },
    { id: "desconfianca", nome: "Desconfiança", par: "B", descricao: "Você não acredita nas palavras ou intenções dessa pessoa." },
    { id: "afeto", nome: "Afeto", par: "C", descricao: "Você tem bons sentimentos por essa pessoa: amor, amizade ou laço familiar." },
    { id: "odio", nome: "Ódio", par: "C", descricao: "Você quase perde o controle na presença dessa pessoa." }
  ],

  // =============================================
  // NÍVEL INICIAL E REGRAS BÁSICAS
  // =============================================
  regras: {
    nivelInicial: 5,
    nivelMaximo: 50,
    pontosDeNivelIniciais: 5,
    classesMinimas: 2,
    classesMaximas: 3,
    equipamentoInicial: 500,
    dinheiroExtra: "2d6×10",
    pontosFabulaIniciais: 3,
    piBase: 6,
    calcPV: "nível + (dado de Vigor × 5)",
    calcPM: "nível + (dado de Vontade × 5)",
    calcDefesa: "dado atual de Destreza",
    calcDefMagica: "dado atual de Astúcia",
    valoresDado: { "d6": 6, "d8": 8, "d10": 10, "d12": 12 }
  },

  // ================================================================
  // BESTIÁRIO — monstros dos livros (Livro Básico + expansões)
  // def: bônus sobre o dado de DES (ou valor fixo se defFixo:true)
  // defM: bônus sobre o dado de AST
  // ================================================================
  monstros: [
    // ── CONSTRUTOS ──────────────────────────────────────────────
    { id:'lanterna-arcana', nome:'Lanterna Arcana', nivel:5, especie:'Construto', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d8', von:'d10', pv:40, pm:55, init:8, def:1, defM:2,
      tracos:'brilhante, mágica, minúscula, solícita',
      ataques:['R Descarga Elemental (DES+AST) (RA+5) dano fogo/gelo/raio'],
      especial:['Imune: envenenado'] },
    { id:'gargula', nome:'Gárgula', nivel:10, especie:'Construto', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d8', von:'d6', pv:70, pm:50, init:9, def:0, defM:0,
      tracos:'flutuante, sagaz, vigilante, vinculada a um local',
      ataques:['M Garras de Pedra (DES+VIG)+1 (RA+5) físico — atinge DEF.M'],
      especial:['Voo', 'Imune: envenenado'] },
    { id:'soldado-tecnomagico', nome:'Soldado Tecномágico', nivel:10, especie:'Construto', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:80, pm:40, init:5, def:11, defM:0, defFixo:true,
      tracos:'impiedoso, leal, previsível, vigilante',
      ataques:['M Machadada (VIG+VIG)+1 (RA+14) físico — alvo fica lento'],
      especial:['Imune: envenenado', 'Em crise: perde Res. fogo/gelo, dano vira raio'] },
    { id:'tilintalhaço', nome:'Tilintalhaço', nivel:10, especie:'Construto', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d10', von:'d6', pv:60, pm:50, init:13, def:0, defM:0,
      tracos:'barulhento, pequeno, sinistro, vingativo',
      ataques:['M Chute de Bobo (DES+AST)+1 (RA+5) físico — +5 dmg vs abalados/atordoados'],
      especial:['Imune: envenenado'] },
    { id:'ave-navalha', nome:'Ave-Navalha', nivel:15, especie:'Construto', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d8', von:'d6', pv:80, pm:45, init:9, def:0, defM:0,
      tracos:'armada, leal, rápida, voadora',
      ataques:['M Mergulho de Navalha (DES+DES)+1 (RA+10) físico','R Metralhadora (DES+AST)+1 (RA+5) físico multi(2)','R Foguete Escaldante (DES+AST)+1 (RA+10) fogo'],
      especial:['Voo', 'Imune: envenenado, lento, fraco'] },
    { id:'golem-de-bronze', nome:'Golem de Bronze', nivel:15, especie:'Construto', fonte:'Livro Básico',
      des:'d6', vig:'d12', ast:'d8', von:'d6', pv:100, pm:45, init:7, def:2, defM:1,
      tracos:'alto, lento, poderoso, tilintante',
      ataques:['M Soco (DES+VIG)+1 (RA+10) físico — alvo fica atordoado','M Redemoinho (DES+VIG)+1 (RA+5) ar multi(2)'],
      especial:['Imune: envenenado'] },
    { id:'golem-florestal', nome:'Golem Florestal', nivel:20, especie:'Construto', fonte:'Livro Básico',
      des:'d6', vig:'d12', ast:'d6', von:'d10', pv:110, pm:80, init:6, def:0, defM:0,
      tracos:'alto, inflamável, sem emoção, solitário',
      ataques:['M Garra de Casca (VIG+VIG)+2 (RA+10) físico multi(2)','R Onda Vital (DES+VIG)+2 (RA+15) luz'],
      especial:['Imune: envenenado'] },

    // ── DEMÔNIOS ─────────────────────────────────────────────────
    { id:'diabrete', nome:'Diabrete', nivel:5, especie:'Demônio', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d8', von:'d10', pv:50, pm:55, init:8, def:0, defM:0,
      tracos:'covarde, depravado, maquiavélico, sagaz',
      ataques:['M Unhas Congelantes (DES+VON) (RA+5) gelo — atinge DEF.M'],
      especial:['Res: 2 tipos de dano à escolha'] },
    { id:'roda-de-raios', nome:'Roda de Raios', nivel:10, especie:'Demônio', fonte:'Livro Básico',
      des:'d12', vig:'d6', ast:'d6', von:'d8', pv:60, pm:60, init:9, def:0, defM:0,
      tracos:'brilhante, cruel, rápida, risonha',
      ataques:['M Curva Fechada (DES+VIG)+1 (RA+10) físico'],
      especial:['Absorve raio', 'Veloz (relógios +2 seções)'] },
    { id:'uivante-sombrio', nome:'Uivante-Sombrio', nivel:15, especie:'Demônio', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d6', von:'d8', pv:80, pm:55, init:7, def:1, defM:2,
      tracos:'fantasma, grande, silencioso, sobrenatural',
      ataques:['M Mordida Fantasmagórica (DES+VIG)+4 (RA+10) físico — atinge DEF.M'],
      especial:['Res: 2 tipos de dano à escolha'] },
    { id:'equidna', nome:'Equidna', nivel:20, especie:'Demônio', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d10', von:'d10', pv:70, pm:80, init:9, def:0, defM:0,
      tracos:'deslizante, esperta, erudita, inimaginável',
      ataques:['M Emaranhado de Víboras (DES+AST)+5 (RA+15) veneno','R Olhar Frio (DES+VON)+5 (RA+10) gelo — atinge DEF.M'],
      especial:['Res: 2 tipos de dano à escolha', 'Eloquente: +3 testes sociais'] },

    // ── ELEMENTAIS ───────────────────────────────────────────────
    { id:'fada-bolota', nome:'Fada-Bolota', nivel:5, especie:'Elemental', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d6', von:'d10', pv:40, pm:55, init:8, def:0, defM:0,
      tracos:'brilhante, brincalhona, curiosa, gentil',
      ataques:['M Agulha Afiada (DES+DES) (RA+5) físico — +5 vs lentos'],
      especial:['Voo', 'Imune: envenenado, raio', 'Cura aliados: 40 PV'] },
    { id:'fragmento-caotico', nome:'Fragmento Caótico', nivel:5, especie:'Elemental', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d10', von:'d6', pv:50, pm:35, init:9, def:0, defM:0,
      tracos:'alienígena, espalha trevas, faminto, pequeno',
      ataques:['R Dardo Caótico (DES+AST) (RA+5) trevas — alvo fica fraco'],
      especial:['Imune: envenenado, trevas', 'Mente Vazia: imune abalado/atordoado/enfurecido'] },
    { id:'grenado', nome:'Grenado', nivel:10, especie:'Elemental', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d6', von:'d10', pv:60, pm:60, init:7, def:1, defM:2,
      tracos:'brilhante, escaldante, instável, instigável',
      ataques:['M Arroto de Chamas (DES+VON)+1 (RA+10) fogo — alvo perde Res. fogo'],
      especial:['Absorve fogo', 'Imune: envenenado', 'Detonação: explode em 10 fogo ao morrer'] },
    { id:'lodo-estatico', nome:'Lodo Estático', nivel:10, especie:'Elemental', fonte:'Livro Básico',
      des:'d6', vig:'d10', ast:'d6', von:'d10', pv:70, pm:70, init:6, def:1, defM:2,
      tracos:'estático, faminto, lento, mole',
      ataques:['M Golpe Gelatinoso (DES+VIG)+1 (RA+5) físico'],
      especial:['Absorve raio', 'Res: físico', 'Imune: envenenado'] },
    { id:'floco-espinho', nome:'Floco-Espinho', nivel:15, especie:'Elemental', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d10', von:'d8', pv:70, pm:65, init:9, def:1, defM:2,
      tracos:'flutuante, gélida, giratória, medo de calor',
      ataques:['M Mordida Gélida (DES+AST)+1 (RA+5) gelo'],
      especial:['Absorve gelo', 'Imune: envenenado'] },
    { id:'ninfa', nome:'Ninfa', nivel:15, especie:'Elemental', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d10', von:'d8', pv:70, pm:55, init:9, def:0, defM:0,
      tracos:'cautelosa, rápida, sábia, territorial',
      ataques:['M Toque Sazonal (DES+AST)+1 (RA+10) ar — aplica condição por estação'],
      especial:['Imune: envenenado, raio'] },
    { id:'javarrocha', nome:'Javarrocha', nivel:20, especie:'Elemental', fonte:'Livro Básico',
      des:'d8', vig:'d12', ast:'d6', von:'d8', pv:110, pm:60, init:7, def:0, defM:0,
      tracos:'destrutivo, enorme, irritadiço, rochoso',
      ataques:['M Investida Rochosa (DES+VIG)+2 (RA+15) físico multi(2)','M Presa de Rocha (VIG+VIG)+2 (RA+10) físico'],
      especial:['Imune: envenenado', 'Bufada Raivosa: força Investida Rochosa no próximo turno'] },

    // ── FERAS ────────────────────────────────────────────────────
    { id:'morcego-vampiro', nome:'Morcego-Vampiro', nivel:5, especie:'Fera', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d8', von:'d8', pv:50, pm:45, init:9, def:0, defM:0,
      tracos:'agressivo, barulhento, esperto, medo de luz',
      ataques:['M Hematófago (DES+DES) (RA+5) físico — recupera metade do dano','R Guincho (DES+VON) (RA+5) ar — alvo fica atordoado'],
      especial:['Voo'] },
    { id:'rato-gigante', nome:'Rato Gigante', nivel:5, especie:'Fera', fonte:'Livro Básico',
      des:'d12', vig:'d6', ast:'d8', von:'d6', pv:40, pm:35, init:14, def:0, defM:0,
      tracos:'faminto, feroz, medo de fogo, rápido',
      ataques:['M Abocanhada (DES+VIG) (RA+5) físico — alvo fica envenenado'],
      especial:['Em crise: +3 em todos os testes', 'Veloz'] },
    { id:'uivante-cinzento', nome:'Uivante-Cinzento', nivel:5, especie:'Fera', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d8', von:'d6', pv:50, pm:35, init:9, def:0, defM:0,
      tracos:'esperto, leal, perceptivo, vigilante',
      ataques:['M Mordida Feroz (DES+VIG)+3 (RA+10) físico'],
      especial:['Lealdade Feroz: pode proteger aliados'] },
    { id:'talhagarta', nome:'Talhagarta', nivel:5, especie:'Fera', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d6', von:'d8', pv:60, pm:45, init:7, def:2, defM:1,
      tracos:'lenta, pesada, resiliente, territorial',
      ataques:['M Bola Cortante (DES+VIG) (RA+5) físico','M Corte Mandibular (DES+VIG) (RA+5) veneno — alvo fica fraco'],
      especial:['Desenrolar: imune a físico quando usa Guarda'] },
    { id:'vigmiga-bombardeira', nome:'Vigmiga-Bombardeira', nivel:10, especie:'Fera', fonte:'Livro Básico',
      des:'d10', vig:'d10', ast:'d6', von:'d6', pv:70, pm:40, init:12, def:0, defM:0,
      tracos:'explosiva, inflamável, irracional, territorial',
      ataques:['M Batida (DES+VIG)+1 (RA+10) físico','R Canhão (DES+AST)+1 (RA+5) físico — alvo fica atordoado'],
      especial:['Mente Vazia: imune atordoado/enfurecido', 'Enterrar: +2 DEF ao usar Guarda sobre terra'] },
    { id:'peixe-espinho', nome:'Peixe-Espinho', nivel:10, especie:'Fera', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d10', von:'d6', pv:50, pm:40, init:14, def:0, defM:0,
      tracos:'agressivo, pele grossa, pequeno, rápido',
      ataques:['M Mergulho de Espinhos (DES+DES)+1 (RA+10) físico','R Jato Oceânico (DES+AST)+1 (RA+5) gelo — alvo fica lento'],
      especial:['Voo'] },
    { id:'urso-solar', nome:'Urso-Solar', nivel:15, especie:'Fera', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:80, pm:45, init:8, def:1, defM:2,
      tracos:'enorme, esperto, pacífico, peludo',
      ataques:['M Abraço de Urso (DES+VIG)+1 (RA+10) físico — alvo fica fraco'],
      especial:['Poderoso: imune lento/fraco', 'Em crise: +5 dmg e dano vira fogo'] },
    { id:'uivante-branco', nome:'Uivante-Branco', nivel:20, especie:'Fera', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d8', pv:90, pm:60, init:8, def:2, defM:1,
      tracos:'astuto, corajoso, régio, vigilante',
      ataques:['M Mandíbula Branca (DES+VIG)+5 (RA+15) físico — alvo fica fraco'],
      especial:['Aura Majestosa: aliados imunes a abalado'] },

    // ── HUMANOIDES ───────────────────────────────────────────────
    { id:'batedor-kobold', nome:'Batedor Kobold', nivel:5, especie:'Humanoide', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d8', von:'d8', pv:40, pm:45, init:8, def:1, defM:1,
      tracos:'peludo, pequeno, perceptivo, rápido',
      ataques:['M Adaga de Aço (DES+AST)+1 (RA+4) físico — +5 vs alvos com condição','R Pedra (DES+VIG) (RA+5) físico — alvo fica atordoado'],
      especial:[] },
    { id:'bruxo-kobold', nome:'Bruxo Kobold', nivel:5, especie:'Humanoide', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d8', von:'d10', pv:50, pm:75, init:6, def:1, defM:2,
      tracos:'enigmático, peludo, pequeno, sábio',
      ataques:['M Cajado de Carvalho (VON+VON) (RA+6) físico — atinge DEF.M'],
      especial:['Magia: Despertar (melhora atributo aliado)', 'Mau Hálito (veneno)'] },
    { id:'guarda', nome:'Guarda', nivel:5, especie:'Humanoide', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d8', von:'d8', pv:60, pm:45, init:5, def:11, defM:0, defFixo:true,
      tracos:'corajoso, disciplinado, leal, treinado',
      ataques:['M Lança Pesada (DES+VIG) (RA+12) físico','R Besta (DES+AST) (RA+8) físico'],
      especial:['Formação Defensiva: +1 DEF/DEF.M com outros guardas', 'Pode proteger aliados'] },
    { id:'salteador', nome:'Salteador', nivel:5, especie:'Humanoide', fonte:'Livro Básico',
      des:'d6', vig:'d10', ast:'d8', von:'d8', pv:60, pm:45, init:10, def:3, defM:1,
      tracos:'forte, irritadiço, orgulhoso, presunçoso',
      ataques:['M Machado do Salteador (VIG+VIG) (RA+10) físico','M Cotovelada (DES+VIG) (RA+5) físico — alvo perde 10 PM'],
      especial:['Mau Humor: se recupera das condições na 1ª crise'] },
    { id:'colmeiano', nome:'Colmeiano', nivel:10, especie:'Humanoide', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d8', von:'d6', pv:70, pm:50, init:11, def:1, defM:2,
      tracos:'ama a beleza, engenhoso, reservado, zumbidor',
      ataques:['M Colmespada (DES+AST)+5 (RA+10) físico'],
      especial:['Voo', 'Dança Abelheira: aliado faz ataque livre'] },
    { id:'mercenario', nome:'Mercenário', nivel:10, especie:'Humanoide', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d8', von:'d8', pv:60, pm:50, init:5, def:11, defM:1, defFixo:true,
      tracos:'competente, desiludido, impiedoso, taciturno',
      ataques:['M Espada de Bronze (DES+VIG)+5 (RA+11) físico','R Pistola (DES+AST)+4 (RA+8) físico'],
      especial:['Ataque Carregado: próximo ataque multi(2) ignora Res.'] },
    { id:'atirador', nome:'Atirador', nivel:15, especie:'Humanoide', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d10', von:'d6', pv:60, pm:45, init:13, def:1, defM:2,
      tracos:'disciplinado, furtivo, observador, preciso',
      ataques:['M Adaga (DES+AST)+5 (RA+4) físico','R Arco de Atirador (DES+DES)+4 (RA+8) físico — atordoado ou lento'],
      especial:[] },
    { id:'mago-de-batalha', nome:'Mago de Batalha', nivel:20, especie:'Humanoide', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d8', von:'d10', pv:80, pm:90, init:9, def:11, defM:1, defFixo:true,
      tracos:'ambicioso, disciplinado, erudito, sagaz',
      ataques:['M Cajado Decorado (VON+VON)+2 (RA+11) físico — recupera 10 PM'],
      especial:['Magia: Curar (40 PV/3 alvos)', 'Magia: Fulgur (raio/3 alvos, atordoa)'] },

    // ── MONSTROS ─────────────────────────────────────────────────
    { id:'cait-sith', nome:'Cait Sith', nivel:5, especie:'Monstro', fonte:'Livro Básico',
      des:'d8', vig:'d6', ast:'d8', von:'d10', pv:40, pm:65, init:12, def:1, defM:2,
      tracos:'brincalhão, curioso, esperto, minúsculo',
      ataques:['M Arranhão (DES+VIG) (RA+5) físico','R Fogo Fantasmagórico (AST+VON) (RA+5) fogo ou gelo — atinge DEF.M'],
      especial:['Controlar o Calor: +5 dmg de um tipo por cena'] },
    { id:'lodo-brando', nome:'Lodo Brando', nivel:5, especie:'Monstro', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d6', von:'d8', pv:60, pm:55, init:7, def:1, defM:2,
      tracos:'brilhante, caloroso, fofíssimo, macio',
      ataques:['M Lambida Branda (DES+VIG) (RA+10) físico','R Vento Brando (DES+AST) (RA+5) ar'],
      especial:['Dança Branda: cura 30 PV e remove condição'] },
    { id:'mariposa-terror', nome:'Mariposa-Terror', nivel:5, especie:'Monstro', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d6', von:'d8', pv:60, pm:55, init:8, def:0, defM:0,
      tracos:'assustadora, malcheirosa, peluda, voadora',
      ataques:['M Mordida de Mariposa (DES+VIG) (RA+10) físico'],
      especial:['Voo', 'Nuvem Venenosa: envenena até 3 alvos'] },
    { id:'dragonete', nome:'Dragonete', nivel:10, especie:'Monstro', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:70, pm:50, init:8, def:2, defM:1,
      tracos:'escamoso, faminto, pesado, preguiçoso',
      ataques:['M Mordida (VIG+VIG)+4 (RA+10) físico','M Cauda-chicote (DES+VIG)+4 (RA+5) físico multi(2)'],
      especial:['Sopro Dracônico: (RA+15) fogo, alvo abalado'] },
    { id:'hidrozoario', nome:'Hidrozoário', nivel:10, especie:'Monstro', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:70, pm:40, init:8, def:1, defM:2,
      tracos:'brilhante, flutuante, silencioso, transparente',
      ataques:['M Tentáculo Pungente (DES+VIG)+1 (RA+5) raio — alvo fica enfurecido','M Toque Ácido (VIG+VIG)+1 (RA+10) veneno — alvo perde 1 PI'],
      especial:['Voo'] },
    { id:'mau-olhado', nome:'Mau-Olhado', nivel:10, especie:'Monstro', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d6', von:'d8', pv:60, pm:60, init:12, def:0, defM:0,
      tracos:'alado, hipnótico, sagaz, silencioso',
      ataques:['M Garra (DES+VIG)+1 (RA+10) físico','R Olhar Caótico (DES+VON)+1 (RA+5) trevas — -1 ação vs atordoado'],
      especial:['Voo', 'Olhar da Perdição: atordoado+fraco'] },
    { id:'cocatriz', nome:'Cocatriz', nivel:15, especie:'Monstro', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d10', von:'d6', pv:70, pm:45, init:9, def:1, defM:2,
      tracos:'ágil, imprevisível, malcheirosa, pequena',
      ataques:['M Bicada Petrificante (DES+AST)+4 — pode petrificar — atinge DEF.M','M Bicada Tóxica (DES+VIG)+4 (RA+10) veneno'],
      especial:['Pode petrificar alvos lentos (VIG+VON ND10)'] },
    { id:'mimico', nome:'Mímico', nivel:10, especie:'Monstro', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d8', von:'d6', pv:70, pm:45, init:9, def:1, defM:2,
      tracos:'amorfo, furtivo, sagaz, voraz',
      ataques:['M Garra de Mímico (DES+VIG)+4 (RA+5) físico — dobro vs emboscada','R Roubo de Item (DES+AST)+4 (RA+5) físico — alvo perde 2 PI'],
      especial:['Mudança de Forma: se disfarça de objeto'] },

    // ── MORTOS-VIVOS ─────────────────────────────────────────────
    { id:'urna-pavorosa', nome:'Urna Pavorosa', nivel:5, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d6', von:'d10', pv:50, pm:55, init:8, def:1, defM:2,
      tracos:'flutuante, frágil, minúscula, risonha',
      ataques:['M Cutucada da Urna (DES+VIG) (RA+5) físico','R Gargalhada Caótica (DES+VIG) (RA+5) trevas — alvo abalado, atinge DEF.M'],
      especial:['Imune: envenenado', 'Cura pode ferir'] },
    { id:'zumbi', nome:'Zumbi', nivel:5, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d6', vig:'d12', ast:'d6', von:'d8', pv:70, pm:45, init:6, def:2, defM:1,
      tracos:'apodrecido, assustador, irracional, lento',
      ataques:['M Mordida Voraz (DES+VIG) (RA+5) trevas — alvo fica fraco','M Espalmada Zumbi (VIG+VIG) (RA+5) físico'],
      especial:['Mente Vazia: imune abalado/atordoado/enfurecido', 'Imune: envenenado', 'Cura pode ferir'] },
    { id:'mago-esqueleto', nome:'Mago Esqueleto', nivel:10, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d6', vig:'d8', ast:'d8', von:'d10', pv:60, pm:70, init:5, def:2, defM:4,
      tracos:'ambicioso, erudito, esperto, impiedoso',
      ataques:['M Cajado (VON+VON)+1 (RA+6) físico — recupera 5 PM'],
      especial:['Magia: Umbra (trevas/3 alvos, abalados)', 'Imune: envenenado', 'Cura pode ferir'] },
    { id:'soldado-esqueleto', nome:'Soldado Esqueleto', nivel:10, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:70, pm:40, init:6, def:12, defM:0, defFixo:true,
      tracos:'assassino, cruel, irracional, silencioso',
      ataques:['M Espada de Bronze (DES+VIG)+5 (RA+11) físico'],
      especial:['Mente Vazia: imune abalado/atordoado/enfurecido', 'Imune: envenenado', 'Cura pode ferir'] },
    { id:'carnical', nome:'Carniçal', nivel:15, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d8', vig:'d12', ast:'d6', von:'d6', pv:90, pm:45, init:7, def:0, defM:0,
      tracos:'agressivo, aterrorizante, grande, poderoso',
      ataques:['M Garras Furiosas (VIG+VIG)+1 (RA+10) físico multi(2)','M Sopro de Veneno (DES+VIG)+1 (RA+5) veneno — alvo envenena'],
      especial:['Imune: envenenado', 'Cura pode ferir'] },
    { id:'uivante-osseo', nome:'Uivante-Ósseo', nivel:15, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d10', vig:'d10', ast:'d6', von:'d6', pv:80, pm:55, init:8, def:0, defM:0,
      tracos:'feroz, fome eterna, rápido, resiliente',
      ataques:['M Boca Serrilhada (DES+VIG)+1 (RA+10) físico — alvo fica lento'],
      especial:['Sopro de Podridão: trevas+fraco', 'Imune: envenenado', 'Cura pode ferir'] },
    { id:'alma-acorrentada', nome:'Alma-Acorrentada', nivel:20, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d12', vig:'d6', ast:'d8', von:'d8', pv:70, pm:70, init:10, def:0, defM:0,
      tracos:'amaldiçoada, angustiada, etérea, vingativa',
      ataques:['M Garra Furiosa (DES+VON)+5 (RA+10) trevas — alvo enfurecido'],
      especial:['Lamento Medonho: gelo+abalado', 'Imune: envenenado, físico', 'Cura pode ferir'] },
    { id:'mumia', nome:'Múmia', nivel:20, especie:'Morto-Vivo', fonte:'Livro Básico',
      des:'d6', vig:'d10', ast:'d8', von:'d10', pv:90, pm:70, init:7, def:0, defM:0,
      tracos:'amaldiçoada, eternamente leal, inflamável, silenciosa',
      ataques:['M Garra Fúnebre (VIG+VON)+5 (RA+10) terra — lento; se lento→Vul. a tudo'],
      especial:['Maldição Ancestral: todos abalados+fracos ao morrer', 'Mente Vazia', 'Imune: envenenado', 'Cura pode ferir'] },

    // ── PLANTAS ──────────────────────────────────────────────────
    { id:'alraune', nome:'Alraune', nivel:5, especie:'Planta', fonte:'Livro Básico',
      des:'d10', vig:'d6', ast:'d8', von:'d8', pv:50, pm:45, init:9, def:0, defM:0,
      tracos:'malévola, minúscula, rápida, sinistra',
      ataques:['M Tapa de Videira (DES+VIG) (RA+5) físico — +5 vs abalados','R Grito de Alraune (VON+VON) — alvo fica abalado, atinge DEF.M'],
      especial:['Imune: abalado, atordoado, enfurecido'] },
    { id:'mabobora', nome:'Mabóbora', nivel:5, especie:'Planta', fonte:'Livro Básico',
      des:'d8', vig:'d8', ast:'d8', von:'d8', pv:50, pm:55, init:8, def:1, defM:2,
      tracos:'apodrecida, furiosa, malcheirosa, pequena',
      ataques:['M Mordida Podre (DES+VIG)+3 (RA+5) veneno'],
      especial:['Vômito de Abóbora: +5 dmg veneno por cena', 'Imune: abalado, atordoado, enfurecido'] },
    { id:'cogumeiro', nome:'Cogumeiro', nivel:10, especie:'Planta', fonte:'Livro Básico',
      des:'d6', vig:'d10', ast:'d8', von:'d8', pv:70, pm:60, init:7, def:2, defM:1,
      tracos:'ama a lama, lenta, pacífica, sem olhos',
      ataques:['M Tapa de Cogumelo (DES+VIG)+1 (RA+5) físico'],
      especial:['Chapéu Largo: ao usar Guarda, dá Res. a 1 aliado', 'Arroto de Esporos: veneno+atordoado', 'Imune: abalado, atordoado, enfurecido'] },
    { id:'vinha-daninha', nome:'Vinha-Daninha', nivel:10, especie:'Planta', fonte:'Livro Básico',
      des:'d10', vig:'d8', ast:'d8', von:'d6', pv:60, pm:40, init:9, def:12, defM:0, defFixo:true,
      tracos:'agressiva, amaldiçoada, espinhosa, veloz',
      ataques:['M Mordida Sombria (DES+VIG)+1 (RA+10) trevas','M Vinhas Corruptivas (DES+DES)+1 (RA+5) físico — fraco, impede Guarda'],
      especial:['Imune: abalado, atordoado, enfurecido'] },
    { id:'cactonto', nome:'Cactonto', nivel:15, especie:'Planta', fonte:'Livro Básico',
      des:'d8', vig:'d12', ast:'d6', von:'d6', pv:90, pm:55, init:7, def:0, defM:0,
      tracos:'assustador, enorme, sensível à água, territorial',
      ataques:['M Abraço Perfurador (VIG+VIG)+1 (RA+10) físico','R Barragem de Espinhos (DES+VIG)+1 (RA+5) físico'],
      especial:['Drenar Umidade: veneno+cura metade do dano', 'Seiva de Cactonto: remove fraco/lento + ataque livre', 'Imune: abalado, atordoado, enfurecido'] },
    { id:'dracoardil', nome:'Dracoardil', nivel:20, especie:'Planta', fonte:'Livro Básico',
      des:'d8', vig:'d10', ast:'d8', von:'d8', pv:90, pm:60, init:8, def:0, defM:0,
      tracos:'colossal, enraizada, faminta, paciente',
      ataques:['M Devorador de Dragões (VIG+VIG)+5 (RA+10) físico — engole alvos fracos','R Vinha-chicote (DES+VIG)+5 (RA+15) ar — alvo fica fraco'],
      especial:['Gás Entorpecente: alvos perdem metade dos PM', 'Pré-digestão: +5 físico', 'Imune: abalado, atordoado, enfurecido'] },

    // ── NATURAL FANTASY ──────────────────────────────────────────
    { id:'abdomen', nome:'Abdômen (Tonitranea Rex)', nivel:5, especie:'Monstro', fonte:'Natural Fantasy',
      des:'d8', vig:'d10', ast:'d6', von:'d8', pv:60, pm:55, init:7, def:0, defM:0,
      tracos:'grande, eletrostático, espinhoso, resistente',
      ataques:['M Esmagar (DES+VIG) (RA+5) físico — +10 e vira raio se eletrificado'],
      especial:['Espinhos Eletrostáticos: contra-ataca com 5 raio', 'Teia Paralisante: todos lentos', 'Imune: atordoado, enfurecido, abalado'] },
    { id:'thorax', nome:'Tórax (Tonitranea Rex)', nivel:5, especie:'Monstro', fonte:'Natural Fantasy',
      des:'d8', vig:'d8', ast:'d8', von:'d8', pv:100, pm:90, init:10, def:2, defM:1,
      tracos:'encouraçado, coordenado, eletrostático, faminto',
      ataques:['M Garra Relâmpago (DES+VIG)+3 (RA+5) raio — multi(2) vs lentos'],
      especial:['Ascensão Predatória: se pendura, protege partes de corpo a corpo', 'Carga Eletrostática: eletrifica o Abdômen', 'Campeão 2'] },

    // ── HIGH FANTASY ─────────────────────────────────────────────
    { id:'salamandra', nome:'Salamandra', nivel:10, especie:'Fera', fonte:'High Fantasy',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:70, pm:50, init:13, def:12, defM:0, defFixo:true,
      tracos:'devoradora de humanoides, leal, treinada, cruel',
      ataques:['M Mordida Ardente (DES+VIG)+1 (RA+5) fogo — lento e abalado', 'C Sopro Ardente (AST+VON)+1 5PM (RA+10) fogo'],
      especial:['Oportunista: em sucesso crítico aliado, faz ataque livre', 'Imune: fogo; Vulnerável: gelo'] },
    { id:'criomandra', nome:'Criomandra', nivel:10, especie:'Fera', fonte:'High Fantasy',
      des:'d8', vig:'d10', ast:'d8', von:'d6', pv:70, pm:50, init:9, def:2, defM:1,
      tracos:'devoradora de humanoides, leal, treinada, cruel',
      ataques:['M Mordida Congelante (DES+VIG)+1 (RA+5) gelo — +5 vs lentos', 'C Sopro Congelante (AST+VON)+1 5PM (RA+10) gelo'],
      especial:['Guarda-costas: ao usar Guarda aliado fica Resist. a tudo', 'Imune: gelo; Vulnerável: fogo'] },
    { id:'pirata-hf', nome:'Pirata', nivel:10, especie:'Humanoide', fonte:'High Fantasy',
      des:'d8', vig:'d8', ast:'d8', von:'d8', pv:60, pm:50, init:13, def:0, defM:0,
      tracos:'corajoso, observador, leal, intrometido',
      ataques:['M Sabre (DES+VIG)+4 (RA+6) físico', 'R Pistola (DES+VIG)+4 (RA+8) físico'],
      especial:['Segura a Onda, Chefe!: cura líder quando em crise'] },
    { id:'dragao-chamas', nome:'Dragão das Chamas', nivel:20, especie:'Monstro', fonte:'High Fantasy',
      des:'d8', vig:'d10', ast:'d8', von:'d8', pv:360, pm:120, init:13, def:1, defM:2,
      tracos:'colossal, ardente, territorial, majestoso',
      ataques:['M Garras Retalhadoras (DES+VIG)+2 (RA+10) físico — multi(2) em crise', 'M Presas Perfurantes (DES+VIG)+2 (RA+15) físico', 'C Sopro Dracônico (VIG+AST)+2 10PM (RA+15) fogo — +5 vs abalados'],
      especial:['Escamas Reforçadas: Resist. tudo exceto gelo enquanto voa', 'Vitalidade Dracônica: ao entrar em crise recupera 20 PV', 'Imune: fogo; Vulnerável: gelo'] },
    { id:'cerine', nome:'Cerine', nivel:30, especie:'Morto-Vivo', fonte:'High Fantasy',
      des:'d8', vig:'d6', ast:'d10', von:'d10', pv:270, pm:220, init:14, def:2, defM:4,
      tracos:'majestosa, misteriosa, divina, trágica',
      ataques:['M Coração da Deusa (AST+AST)+3 (RA+11) luz — recupera 5 PV'],
      especial:['Morta-Viva: imune envenenado; cura pode ferir', 'Toda Luz Cria Sombras: converte dano luz↔trevas'] },

    // ── NATURAL FANTASY (continuação) ────────────────────────────
    { id:'node', nome:'Node', nivel:10, especie:'Humanoide', fonte:'Natural Fantasy',
      des:'d10', vig:'d8', ast:'d6', von:'d8', pv:120, pm:60, init:10, def:1, defM:1,
      tracos:'determinado, leal, pragmático, costeiro',
      ataques:['M Lançar Rede (DES+VIG)+4 (RA+5) físico multi(2)', 'R Arco do Caçador (DES+DES)+4 (RA+8) físico'],
      especial:['Estilo Maré Alta: DEF→dado de VIG do alvo', 'Velocidade Maré Baixa: −5 dano de criaturas lentas', 'Elite'] },
    { id:'dilon', nome:'Dilon', nivel:10, especie:'Fera', fonte:'Natural Fantasy',
      des:'d6', vig:'d10', ast:'d8', von:'d8', pv:140, pm:60, init:9, def:2, defM:1,
      tracos:'imponente, protetor, costeiro, firme',
      ataques:['M Barbatana (AST+VIG)+1 (RA+5) gelo', 'C Lançar Pedras 5PM (RA+0) terra'],
      especial:['Força da Maré Alta: dano ignora Resistências', 'Resiliência da Maré Baixa: Resist. físico', 'Elite'] },
    { id:'costas-lumivale', nome:'Costas de Lumivale', nivel:20, especie:'Construto', fonte:'Natural Fantasy',
      des:'d8', vig:'d12', ast:'d6', von:'d6', pv:300, pm:100, init:11, def:0, defM:0,
      tracos:'colossal, indiferente, eterno, instável',
      ataques:['M Terreno Instável (VIG+VIG)+2 (RA+10) terra multi(2)'],
      especial:['Construto: imune envenenado, atordoado, enfurecido, abalado'] },
    { id:'fogo-fatuo', nome:'Fogo-Fátuo', nivel:20, especie:'Morto-Vivo', fonte:'Natural Fantasy',
      des:'d12', vig:'d6', ast:'d8', von:'d8', pv:70, pm:70, init:9, def:0, defM:0,
      tracos:'efêmero, melancólico, perigoso, silencioso',
      ataques:['M Chamas Pálidas (DES+VON)+2 (RA+10) fogo', 'C Sussurro da Sepultura (AST+VON)+5 5PM (RA+15) trevas'],
      especial:['Morto-Vivo: imune envenenado; cura pode ferir', 'Chama Frágil: ao ficar vulnerável perde todos PM e condições'] },
    { id:'lanterna-funeraria', nome:'Lanterna Funerária', nivel:20, especie:'Construto', fonte:'Natural Fantasy',
      des:'d8', vig:'d6', ast:'d8', von:'d12', pv:70, pm:90, init:8, def:0, defM:0,
      tracos:'espectral, silenciosa, vigilante, fria',
      ataques:['R Luz Díafana (VON+VON)+2 (RA+10) luz multi(2)'],
      especial:['Construto: imune envenenado', 'Silêncio na Escuridão: ao chegar a 0 PV apaga e fica com PV 1'] },
    { id:'cabeca-lumivale', nome:'Cabeça de Lumivale', nivel:20, especie:'Morto-Vivo', fonte:'Natural Fantasy',
      des:'d8', vig:'d8', ast:'d6', von:'d12', pv:240, pm:180, init:10, def:0, defM:0,
      tracos:'aterrorizante, monumental, sobrenatural, silenciosa',
      ataques:['M Mandíbulas Fúnebres (DES+VIG)+2 (RA+10) terra'],
      especial:['Morto-Vivo: imune envenenado; cura pode ferir', 'Presença Sobrenatural: início de cada rodada todos ficam abalados'] },

    // ── TECHNO FANTASY ───────────────────────────────────────────
    { id:'policial-syntech', nome:'Policial da SynTech', nivel:10, especie:'Humanoide', fonte:'Techno Fantasy',
      des:'d8', vig:'d8', ast:'d8', von:'d8', pv:60, pm:50, init:6, def:10, defM:0, defFixo:true,
      tracos:'blindado, covarde, ressentido, seguidor',
      ataques:['M Cassetete (VIG+VIG)+1 (RA+6) físico', 'R Taser (DES+AST)+1 (RA+5) raio — fraco'],
      especial:['Frustração: ao sofrer dano fica enfurecido; enfurecido→Resist. tudo exceto gelo', 'Explosão: falha→sucesso se enfurecido (RA 0)'] },
    { id:'drone-vigilancia', nome:'Drone de Vigilância', nivel:10, especie:'Construto', fonte:'Techno Fantasy',
      des:'d8', vig:'d6', ast:'d10', von:'d8', pv:50, pm:60, init:10, def:1, defM:2,
      tracos:'controlado à distância, eletrônico, leve, pequeno',
      ataques:['R Fogo Supressivo (DES+AST)+1 (RA+5) físico — lento', 'C Laser de Pintura (AST+VON)+4 10PM — alvo sofre +5 e sem Resist. até ser atingido'],
      especial:['Construto: imune envenenado', 'Voo'] },
    { id:'oito-viii', nome:'Oito (VIII)', nivel:20, especie:'Construto', fonte:'Techno Fantasy',
      des:'d8', vig:'d10', ast:'d10', von:'d6', pv:200, pm:100, init:15, def:1, defM:2,
      tracos:'estratégica, imponente, leal, radical',
      ataques:['M Golpe Quebra-linha (DES+VIG)+2 (RA+10) terra', 'R Canhão de Íons (DES+AST)+2 (RA+10) raio'],
      especial:['Construto: imune envenenado', 'Enxame Defensivo: gasta 20 PM para reduzir dano de aliado pela metade', 'Táticas de Esquadrão: Formação Defensiva/Protocolo Quebra-mago/Sem Piedade', 'Voo'] },
    { id:'nove-ix', nome:'Nove (IX)', nivel:20, especie:'Construto', fonte:'Techno Fantasy',
      des:'d6', vig:'d8', ast:'d8', von:'d12', pv:80, pm:80, init:7, def:0, defM:0,
      tracos:'descuidada, desiludida, indisciplinada, leal',
      ataques:['R Míssil Tufão (AST+VIG)+2 (RA+15) ar', 'C Canhão Gama (AST+VON)+5 10PM (RA+20) gelo — fraco', 'C Ventus (AST+VON)+5 10PM (RA+20) ar — até 3 alvos'],
      especial:['Construto: imune envenenado', 'Eu Cubro Você!: em falha de Oito faz ataque livre (RA 0)', 'Voo'] },
    { id:'sete-vii', nome:'Sete (VII)', nivel:20, especie:'Construto', fonte:'Techno Fantasy',
      des:'d8', vig:'d8', ast:'d10', von:'d8', pv:80, pm:70, init:9, def:0, defM:0,
      tracos:'acrobático, calmo, leal, radicalizado',
      ataques:['M Lança Caduceu (DES+VON)+2 (RA+10) trevas', 'C Curar 10PM — até 3 aliados recuperam 50 PV cada'],
      especial:['Construto: imune envenenado', 'Sub-rotina de Reparo: início do turno remove fraco/lento de um aliado', 'Feedback de Energia: em falha de Oito aliado recupera 10 PM', 'Voo'] }
  ],

  // =============================================
  // PECULIARIDADES (QUIRKS) — Fase 1.3
  // Fonte: data/rules/quirks.json (55 entradas)
  // =============================================
  quirks: [
    {
      id: "almas_entrelacadas",
      name: "Almas Entrelaçadas",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você fez um acordo mágico com outro personagem para habitar o corpo dele e se manifestar fisicamente quando necessário. Quando e por que você fez esse pacto? Isso é parte da natureza mágica de seu povo ou foi uma tentativa desesperada de sobreviver? Qual foi a primeira vez em que isso lhe causou problemas? Ao adquirir esta peculiaridade, escolha outro PJ para ser o hospedeiro da sua alma. Ambos imediatamente criam um Laço um com o outro. Este Laço deve ter 1 emoção dentre admiração, afeto e lealdade. Certifique-se de que o jogador controlando o hospedeiro esteja de acordo com esse relacionamento e queira explorar a natureza dessa peculiaridade com você. Você e o hospedeiro podem se comunicar telepaticamente (em termos de regra, sempre considere que vocês são “capazes de ouvir um ao outro”). Fora das cenas de conflito, você pode entrar ou sair do corpo de seu hospedeiro, aparecendo fisicamante ao seu lado quando desejar. Se estiver a mais de 1 dia de viagem de distância dele, você deseparece para reaparecer ao seu lado. Em um conflito, você pode entrar ou sair do corpo de seu hospedeiro no início do seu turno (fazer isso não exige o uso de uma ação). Enquanto estiver no corpo de seu hospedeiro, você não consegue perceber o mundo exterior com seus sentidos ou interagir fisicamente com ele, bem como as criaturas não podem percebê-lo com seus sentidos nem interagir com você. Mas aqueles capazes de sentir a presença de almas (com rituais ou habilidades semelhantes) perceberão que há duas almas diferentes no corpo do hospedeiro. Você só recebe os benefícios de um descanso se o hospedeiro também descansar. Quando você se render, você imediatamente entra no corpo do seu hospedeiro (e nunca pode ser separado dele como consequência de uma rendição). Quando seu hospedeiro se render, você imediatamente entra em seu corpo e não pode sair até que ele tenha recuperado a consciência. Quando seu hospedeiro se sacrificar, escolha um: Sobrevivência: você imediatamente deixa seu corpo, perde essa peculiaridade, seus PV são reduzidos a 0 e você deve se render. Após disso, seus PV e PM máximos aumentam em 10. Última Despedida: você se sacrifica no lugar de seu hospedeiro, que imediata- mente recupera seus PV até ficar em crise e não precisa se render ou sacrificar.",
      mechanic: null,
    },
    {
      id: "amaldicoado_af",
      name: "Amaldiçoado",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você carrega o fardo de uma maldição. Através de qual efeito sobrenatural ela se manifesta? Como você foi amaldiçoado? Foi puro azar ou uma punição por algo que você fez? Como a maldição pode ser quebrada? Ao adquirir esta peculiaridade, descreva a natureza da sua maldição e a vincule a uma das ameaças presentes no mundo. Quando a ameaça for resolvida, você poderá quebrar sua maldição — descreva como espera que isso aconteça. Exemplos: você erra seus ataques com frequência; sua presença causa uma sensação de terror por si só; sua magia tem a tendência de causar resultados inesperados; criaturas próximas de você sentem dores intensas. Quando estiver prestes a fazer um teste, em vez de fazê-lo, você pode descrever como sua maldição o atrapalha e obter uma falha crítica automática (considere ambos os dados como se você tivesse rolado um 1). Se fizer isso, você recebe 2 Pontos de Fabula, em vez de 1, e gera uma oportunidade normalmente. Se conseguir quebrar sua maldição, você imediatamente recebe um poder heroico a sua escolha (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Isso inclui a escolha de um poder heroico para uma classe que você não aprendeu.",
      mechanic: null,
    },
    {
      id: "arboreo_af",
      name: "Arbóreo",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você é uma criatura botânica senciente e com inteligência humanoide. É o resultado de um experimento mágico ou vem de uma espécie específica? Você se parece com algum tipo de planta, flor ou árvore? Qual é sua relação com as outras criaturas botânicas e com os bosques e florestas deste mundo? Escolha uma condição entre atordoado, enfurecido ou abalado. Você é imune à condição escolhida, mas é Vulnerável a um tipo de dano a sua escolha entre ar, raio, terra, fogo ou gelo. Você também aprende um feitiço de NPC (Livro Básico, páginas 310 e 311) exceto pelo feitiço Devastação. Se um teste de Magia for necessário, você deve usar (AST + VON). Personalize o feitiço conforme for necessário (nome, tipo de dano, condição etc.) Ao lançar esse feitiço sob a luz do sol, seu custo total de PM é reduzido em 5 (mínimo de 0 PM).",
      mechanic: null,
    },
    {
      id: "cerne_elemental_af",
      name: "Cerne Elemental",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você foi imerso no poder de um elemento natural. Você descende de algum elemental ou vinculou sua alma à de algum espírito? Quem poderia tirar vantagem de sua natureza incomum? Quem tem medo de você? Escolha seu tipo de dano elemental entre ar, raio, terra, fogo ou gelo. Você torna-se Resistente ao tipo de dano escolhido. Além disso, sempre que causar dano, você pode mudar o tipo dele tipo escolhido. Por outro lado, você torna-se Vulnerável a um tipo de dano diferente dentre os cinco listados. Você também pode fazer rituais da disciplina elementalismo, mas apenas se manipularem o elemento escolhido (respectivamente: ar, eletricidade, terra/ pedra, fogo e gelo/água).",
      mechanic: null,
    },
    {
      id: "de_um_mundo_distante_af",
      name: "De um Mundo Distante",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Sua presença aqui é uma anomalia, um nó inesperado na tapeçaria do destino: as regras deste mundo às vezes não conseguem contê-lo. Você vem de um planeta distante, quem sabe de uma linha do tempo diferente? Como chegou aqui e quando? Acha que ainda tem chance de voltar? Faria isso se pudesse? Qual ameça terrível seguiu você? Você recebe 1 Ponto de Fabula automaticamente ao participar de um conflito. Você também pode evocar um Traço para rolar novamente mesmo se o teste for uma falha crítica (se o fizer, não recebe 1 Ponto de Fabula pela falha). TÓPICOS SENSÍVEIS Peculiaridades muitas vezes trazem temas complexos à mesa de jogo: por exemplo, Grilhões do Coração pode levar a temas como abuso psicológico e repressão; De um Mundo Distante pode gerar xenofobia e discriminação; Glorioso Destino pode levar a pressão social e expectativas; e Amaldiçoado ou Portador da Ruína podem inserir tragédia na mesa. Até mesmo opções mais simples como Cerne Elemental ou Voo podem fazer com que um personagem seja tratado como “não exatamente humano” pela sociedade. Ao escolher e personalizar peculiaridades, tenha o compromisso de respeitar os limites pessoais dos outros jogadores. Use linhas e véus (Livro Básico, página 140) e prepare-se para pausar o jogo se uma cena deixar alguém desconfortável. Sejam gentis uns com os outros e com vocês mesmos.",
      mechanic: null,
    },
    {
      id: "glorioso_destino",
      name: "Glorioso Destino",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Há uma profecia sobre você, uma que espera por um mundo melhor. Quem recitou ou escreveu a profecia? Você aceita seu destino ou o fardo é grande demais? Alguém semeou dúvidas em seu coração? Com a colaboração de todos do grupo, ao adquirir esta peculiaridade, descreva essa profecia e o que ela previu. Vincule-a a uma ameaça ou emergência do mundo e descreva o sinal ou agouro que o marca como quem cumprirá a profecia. Exemplos: “o garoto com o colar de rubi fará a água voltar às Planícies Ermas” ou “o Marcado destruirá o Dragão do Caos”. No fim de cada sessão (aproximadamente quatro horas de jogo), antes da distribuição de EXP, pense com cuidado e de forma honesta, sobre o que aconteceu durante a sessão e escolha uma das cinco opções abaixo. A escolha é sua, mas no geral vale a pena conversar sobre o que aconteceu com o resto do grupo. A profecia foi cumprida: perca esta peculiaridade, restaure por completo seus PV e PM, se recupere de todas as condições e receba um poder heroico dentre os disponíveis para suas classes (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Você agiu de acordo com a profecia: restaure por completo seus PV e PM e se recupere de todas as condições. Você não agiu nem de acordo nem contra a profecia: nada acontece. Você agiu contra a profecia: receba 1 Ponto de Fabula. A profecia nunca poderá ser cumprida: perca esta peculiaridade, receba 6 Pontos de Fabula e um poder heroico dentre os disponíveis para suas classes (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Após escolher a primeira ou a última opção, o papel dessa profecia em seu mundo chega ao fim. Mesmo que num momento vindouro da campanha uma situação pareça se encaixar nessa profecia, os efeitos desta peculiaridade não se aplicam mais: você está livre para moldar seu destino seguindo sua própria bússola moral. Ou talvez a escolha sempre tenha sido sua? “Faz tempo demais desde a última vez que tive forças para lutar contra meu destino…”",
      mechanic: null,
    },
    {
      id: "grilhoes_do_coracao",
      name: "Grilhões do Coração",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Por muitos anos você obedeceu aos preceitos de uma pessoa ou autoridade, sua existência construída com base nisso. Agora, você começa a ver estas regras sob um ângulo sombrio, e seu coração parece hesitar. Quando você começou a duvidar? Você só pode adquirir esta peculiaridade se o Tema do seu PJ for Dúvida, e isso não pode ser alterado de forma alguma enquanto tiver esta peculiaridade. Ao adquirir esta peculiaridade, crie um Laço com o NPC ou instituição que moldou sua vida até agora. Esse Laço começa com três emoções a sua escolha e não pode ser perdido ou desfeito de forma alguma enquanto você tiver esta peculiaridade (você pode mudar as emoções durante cenas de descanso). Além disso, crie três mandamentos cruciais para o NPC ou instituição: cada mandamento representa algo que você sempre ou nunca deve fazer. Exemplos: o Lorde dos Dragões (sempre obedeça aos dragões, nunca demonstre fraqueza, nunca apague o fogo); a Igreja Alva (sempre fique ao lado dos fiéis, nunca duvide da palavra de um Sacerdote, nunca ouça um demônio). Na primeira vez que você quebrar um mandamento em uma cena, você fica fraco e abalado e perde metade de seus PV e PM atuais (arredondados para baixo), mas também recebe 2 Pontos de Fabula. Se quebrar um mandamento em uma cena de descanso, você sofre as penalidades após a recuperação. Se quebrar múltiplos mandamentos na mesma cena, as penalidades e Pontos de Fabula se aplicam apenas à primeira violação. Após quebrar seus mandamentos 6 vezes, ignore qualquer outra violação a não ser que seja diante de um vilão que segue ou personifica seus mandamentos. Se houver dúvidas de situação seguir os critérios desta peculiaridade, a palavra final deve ser sempre sua. Seja o mais honesto e sincero possível. Após a sua sétima violação, você perde esta peculiaridade e seu Tema muda para um dos seguintes: Pertencimento, Culpa, Justiça ou Vingança. Em seguida, você recebe imediatamente um poder heroico dentre os disponíveis para suas classes (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem), você recupera todos os PV e PM e se recupera de todas as condições. A partir de então, a força de seus Laços é sempre considerada como se fosse 1 ponto maior (por exemplo, um Laço com três emoções terá força 4).",
      mechanic: null,
    },
    {
      id: "heranca",
      name: "Herança",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você tem um ou mais equipamentos com propriedades peculiares: são objetos que estão há gerações em sua família ou foram um presente dado por uma pessoa querida? Que rumores estranhos ou perigosos cercam estes itens? Quem faria de tudo para tirá-los de você? Você recebe um único item raro com o valor de 1.200 zênites ou menos; ou dois itens raros com o valor de até 800 zênites cada. Você pode escolher esses itens em uma das listas disponíveis ou criá-los junto com o resto do grupo. Uma vez por sessão (aproximadamente quatro horas de jogo), o mestre pode oferecer 1 Ponto de Fabula para gerar alguma complicação graças à natureza do(s) item(s) que você carrega (como duelistas rivais ou monstros estranhos atraídos por sua magia). Itens adquiridos por meio desta peculiaridade não podem ser destruídos, danificados, perdidos ou roubados sem a sua permissão.",
      mechanic: null,
    },
    {
      id: "maos_vazias",
      name: "Mãos Vazias",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você rejeita o uso de armas e, em vez disso, faz uso apenas de seu corpo. Você desenvolveu esse estilo de luta por necessidade ou por escolha? É por causa de sua anatomia monstruosa? Seu uso da lâmina tirou vidas demais no passado? Seus ataques desarmados causam 6 pontos de dano adicional. Se estiver no 30º nível ou acima, esse dano adicional aumenta para 10. Além disso, enquanto você não tiver nenhuma arma ou escudo equipado (além de ataque desarmado), sua Defesa e Defesa Mágica aumentam em +1.",
      mechanic: null,
    },
    {
      id: "portador_da_ruina",
      name: "Portador da Ruína",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você tem poder quase ilimitado, mas com um preço: você trará destruição a este mundo. Como sabe disso? Visões estranhas, marcas que aparecem em seu corpo ou alguma outra coisa? O que faz crer de que esse destino é mutável? Ao adquirir essa peculiaridade, diga qual ruína você deverá trazer ao mundo: esta ruína imediatamente se torna uma das ameaças de seu mundo. Exemplos: a Rainha dos Demônios, o Grande Cometa, o Deus da Carnificina. Até sua ruína se concretizar, você não pode se sacrificar (na verdade, os servos da ruína podem até mesmo ajudá-lo a se livrar de situações que evitariam que você cumprisse seu papel nos planos deles). Quando uma regra ou habilidade exige que você gaste Pontos de Vida, Pontos de Mana ou Pontos de Fabula, você pode permitir que sua ruína avance para ignorar esse custo por completo. Descreva quais maus agouros se manifestam e o mestre recebe uma oportunidade (Livro Básico, página 41) que pode ser usada para criar complicações após o fim da cena atual. No fim de cada sessão (aproximadamente quatro horas de jogo), antes da distribuição de EXP, role 2d20. Se o resultado for igual ou menor que seu nível de atual, sua ruína avança (e ela sempre avança a partir do 40º nível). Quando sua ruína avançar pela nona vez, perca esta peculiaridade e sua ruína é concretizada, se manifestando no mundo como um vilão supremo (15 Pontos de Ultima). Em compensação, você recebe um poder heroico dentre os disponíveis para suas classes (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Prepare-se para enfrentar seu destino.",
      mechanic: null,
    },
    {
      id: "prodigios_rivais",
      name: "Prodígios Rivais",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você tem um talento incrível e é um dos melhores em sua área de atuação, mas é uma pena que sempre esteja logo atrás de seu maior rival! Quem é essa pessoa e quando foi a última vez que se enfrentaram? Quem o treinou e quais as expectativas dele para seu futuro? O que você sacrificou para ter essas habilidades? Ao adquirir esta peculiaridade, escolha uma área de especialização: rituais, poderes ou magias. Então, diga quem é seu grande rival: esse NPC é um vilão menor (5 Pontos de Ultima) e você deve criar um Laço com ele, com 1 emoção entre admiração e inferioridade. Quando uma regra ou habilidade ligada à sua especialização exige que você gaste PV ou PM, você pode gastar 1 Ponto de Fabula para ignorar esse custo. Mas, enquanto seu rival estiver presente na cena e tiver 1 ou mais Pontos de Ultima restantes, sempre que você falhar em um teste, considere que foi uma falha crítica (o que significa que o teste não pode ser rolado novamente e você recebe 1 Ponto de Fabula automaticamente). Se o rival não tiver mais Pontos de Ultima, mas escalonar e se transformar em um vilão mais forte, ele recupera seus Pontos de Ultima imediatamente e a penalidade acima volta a ser aplicada. As únicas formas de se livrar dela por completo é caso seu rival morra ou deixe de ser um vilão.",
      mechanic: null,
    },
    {
      id: "regressado",
      name: "Regressado",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você voltou da morte, incapaz de se unir pacificamente ao rio das almas. Você sabe como ou por que isso aconteceu? Como seu estado de pós-vida costuma se manifestar? Você voltou ao seu corpo ou foi parar em um novo? Você não é considerado um ser vivo, é imune á condição envenenado e tem Imunidade a dano de trevas e veneno, mas é Vulnerável a dano de luz. Você não precisa respirar, comer ou beber, mas segue a regra de descanso normalmente. Você também recupera PV e se recupera de condições normalmente (ao contrário de mortos-vivos, efeitos de cura não ferem seu PJ). Por fim, sempre que causar dano, você pode mudar seu tipo para trevas e todo dano de trevas que você causa ignora Imunidades e Resistências.",
      mechanic: null,
    },
    {
      id: "robo_af",
      name: "Robô",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você é um corpo artificial animado por ciência ou magia.Você sabe quem o criou e por quê? Sua existência ameaça alguém? Existem “cópias” suas pelo mundo? Você sempre foi um robô ou ainda tem memórias de uma vida anterior? Você não é considerado um ser vivo, é imune a condição envenenado e tem Imunidade a dano de veneno, também tem Resistência a dano de terra. Você não precisa respirar, comer ou beber, mas segue a regra de descanso normalmente. Você também recupera PV e se recupera de condições normalmente. Você recebe um bônus de +2 em todos os testes para examinar ou interagir com máquinas, tecnologia e construtos (exceto testes de Precisão e Magia).",
      mechanic: null,
    },
    {
      id: "veiculo_velho",
      name: "Veículo Velho",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você tem um veículo bastante usado pelo qual você tem um carinho imenso. Infelizmente, essa tranqueira mal se aguenta em pé e está sempre causando dor de cabeça. Foi você quem o construiu ou foi presente de alguém? Qual defeito ou característica faz com que seja único? O que faz com que seja reconhecível? Você tem um transporte à sua escolha entre os apresentados na p. 125 do Livro Básico (veículo terrestre, navio ou aeronave) ou você tem uma nave espacial (p. 79). O tamanho do transporte pode ser médio ou grande — é o bastante para acomodar você e o resto do grupo, além de uma dúzia de passageiros —, mas não pode ser usado em combate. Uma vez por sessão (aproximadamente quatro horas de jogo), o mestre pode lhe conceder 2 Pontos de Fabula para introduzir uma complicação narrativa relacionada à natureza do transporte ou ao seu dono anterior, mas o veículo não pode ser destruído sem sua permissão.",
      mechanic: null,
    },
    {
      id: "voo_af",
      name: "Voo",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: null,
      description: "Você tem uma ascendência única que confere a habilidade de voar ou levitar. É uma habilidade mágica ou você possui asas? Como essa vantagem em específico moldou a história e a sociedade do seu povo? Como as pessoas normalmente reagem ao vê-lo? Você sabe voar. Além da vantagem evidente na mobilidade, seus ataques corpo a corpo podem acertar criaturas que estiverem voando e você não pode ser alvo de um ataque corpo a corpo a menos que o atacante também esteja voando ou tenha alguma forma de atingir criaturas voando. Enquanto estiver em crise ou não puder voar livremente (por exemplo, se estiver dentro de um veículo projetado para criaturas de tamanho humano ou em um corredor estreito), você perde todos os benefícios desta peculiaridade. Além disso, ao sofrer dano de ar, raio ou gelo em uma cena de conflito, você perde os benefícios desta peculiaridade até o início do próximo turno.",
      mechanic: null,
    },
    {
      id: "amaldicoado_nf",
      name: "Amaldiçoado",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você carrega o fardo de uma maldição. Através de qual efeito sobrenatural ela se manifesta? Como você foi amaldiçoado? Foi puro azar ou uma punição por algo que você fez? Como a maldição pode ser quebrada? Ao adquirir esta peculiaridade, descreva a natureza da sua maldição e a vincule a uma das ameaças presentes no mundo. Quando a ameaça for resolvida, você poderá quebrar sua maldição — descreva como espera que isso aconteça. Exemplos: você erra seus ataques com frequência; sua presença causa uma sensação de terror por si só; sua magia tem a tendência de causar resultados inesperados; criaturas próximas de você sentem dores intensas. Quando estiver prestes a fazer um teste, em vez de fazê-lo, você pode descrever como sua maldição o atrapalha e obter uma falha crítica automática (considere ambos os dados como se você tivesse rolado um 1). Se fizer isso, você recebe 2 Pontos de Fabula, em vez de 1, e gera uma oportunidade normalmente. Se conseguir quebrar sua maldição, você imediatamente recebe um poder heroico a sua escolha (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Isso inclui a escolha de um poder heroico para uma classe que você não aprendeu.",
      mechanic: null,
    },
    {
      id: "arma_antiga",
      name: "Arma Antiga",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você não teme mergulhar em ruínas antigas, pois, de seus túneis frios, recuperou uma arma incomum que salvou sua vida em mais de uma ocasião. Onde você a encontrou? Quando encontrou uma arma parecida? Quem a portava? Com o resto do grupo, crie uma arma personalizada rara (página 112) com valor de 1.200 zênites ou menos. Essa arma deve ter aparência particularmente incomum e tecnológica; recomenda-se fazer uma arma de fogo e então determinar que itens parecidos são raros e misteriosos em seu mundo. Uma vez por sessão (aproximadamente 4h de jogo), o mestre pode lhe conceder 1 Ponto de Fabula para que alguma complicação inesperada aconteça graças à natureza incomum da arma (como máquinas estranhas reagindo à sua presença ou monstros atraídos pela energia especial que ela emite). No entanto, a arma não pode ser destruída, danificada, perdida ou roubada sem sua permissão.",
      mechanic: null,
    },
    {
      id: "arboreo_nf",
      name: "Arbóreo",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você é uma criatura botânica senciente e com inteligência humanoide. Você é parte de uma espécie específica ou é um ser único? Como funciona seu ciclo de vida? Você se parece com algum tipo específico de planta, flor ou árvore? Escolha uma condição entre atordoado, enfurecido ou abalado. Você é imune à condição escolhida, mas é Vulnerável a um tipo de dano a sua escolha entre ar, raio, terra, fogo ou gelo. Você também aprende um feitiço de NPC (Livro Básico, páginas 310 e 311) exceto pelo feitiço Devastação. Se um teste de Magia for necessário, você deve usar (AST + VON). Personalize o feitiço conforme for necessário (nome, tipo de dano, condição etc.) Ao lançar esse feitiço sob a luz do sol, seu custo total de PM é reduzido em 5 (mínimo de 0 PM).",
      mechanic: null,
    },
    {
      id: "cerne_elemental_nf",
      name: "Cerne Elemental",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você foi imerso no poder de um elemento natural. Você descende de algum elemental ou vinculou sua alma à de algum espírito? Quem poderia tirar vantagem de sua natureza incomum? Quem tem medo de você? Escolha seu tipo de dano elemental entre ar, raio, terra, fogo ou gelo. Você torna-se Resistente ao tipo de dano escolhido. Além disso, sempre que causar dano, você pode mudar o tipo escolhido. Por outro lado, você torna-se Vulnerável a um tipo de dano diferente dentre os cinco listados. Você também pode fazer rituais da disciplina elementalismo, mas apenas se manipularem o elemento escolhido (respectivamente ar, eletricidade, terra/pedra, fogo e gelo/água). “Não há nada errado em sentir medo às vezes. É por isso que ficamos juntos: para nossos amigos serem corajosos quando isso acontecer!”",
      mechanic: null,
    },
    {
      id: "desperto",
      name: "Desperto",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você não lembra de muito sobre seu passado, mas, após despertar, percebeu seus arredores nas profundezas. Assim que chegou à superfície, percebeu que não era exatamente como os outros. Você está espontaneamente conectado a tecnologias antigas e possui uma estranha reserva interna de energia que consegue usar. Quem foi a primeira pessoa que você viu? Quais itens você tinha? Tem medo de recuperar suas memórias? Quando uma regra ou habilidade exigir que você gaste até 100 PV, PM ou PI em um conflito, você pode ignorar esse custo. Se fizer isso, não pode ignorar nenhum outro custo novamente até o fim de seu próximo descanso. Descreva de onde vem essa energia intensa e efêmera! Exemplos: uma joia mágica escondida em seu olho esquerdo, um gerador incrustado em seu braço, um circuito arcano semelhante a uma tatuagem. Além disso, quando você encontrar um dispositivo ou criatura conectados a tecnologias antigas ou ao passado de uma ruína, você pode escolher um: perguntar o objetivo original do dispositivo ou criatura para o mestre; ou perguntar para o mestre como ativar o dispositivo ou criatura; ou perguntar ao mestre como desativar o dispositivo ou criatura. O mestre deve responder com informações verdadeiras e você deve descrever o flashback que lhe revela a resposta. Após receber uma resposta dessa maneira pela sexta vez, você se lembra do verdadeiro motivo pelo qual foi deixado dormente no subterrâneo, e o mestre escolhe um: você se lembra de uma pista essencial sobre uma ameaça presente em seu mundo; ou você se lembra da existência de uma nova ameaça e recebe uma pista essencial sobre ela. Importante ressaltar que você continua obtendo todos os benefícios dessa peculiaridade após essa revelação (tanto a habilidade de ignorar custos quanto a de fazer perguntas para o mestre).",
      mechanic: null,
    },
    {
      id: "fera_falante_nf",
      name: "Fera Falante",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você é o último vestígio (ou assim parece) de uma antiga espécie de animal altamente inteligente, traído e caçado pelos humanos. Como é sua aparência, e qual habilidade única você possui? Quem fez com que voltasse a confiar novamente nas pessoas? O que você faria se algo acontecesse a essa pessoa? Você não pode usar nenhum item, exceto acessórios e módulos de arma e armadura (página 161). Mas, enquanto seu espaço de armadura estiver vazio, você recebe um bônus de +2 na Defesa e Defesa Mágica. Você também recebe dois benefícios à sua escolha entre: Você pode equipar armas personalizadas (p. 112). Você aprende um feitiço de NPC (Livro Básico, pp. 310–311); não pode ser Devastação. Se um teste de Magia for necessário, use (VIG + VON). Personalize os efeitos do feitiço conforme necessário (nome, tipo de dano, condições etc.). Seus ataques desarmados causam 6 pontos de dano adicional. Se estiver no 30° nível ou acima, esse dano adicional aumenta para 10 pontos.",
      mechanic: null,
    },
    {
      id: "grimorio_misterioso",
      name: "Grimório Misterioso",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você tem um tomo mágico, velho e pesado. Às vezes, rabiscos e conselhos surgem em suas páginas para ajudar-lhe em aventuras. Onde você o encontrou? Que tipo de personalidade o estilo e o tom do texto revelam? Enquanto tiver essa peculiaridade, seu grimório é um artefato indestrutível que não pode ser perdido ou roubado a menos que seja por meio de uma rendição. Quando seu grupo esbarrar num perigo ou descoberta após um teste de Viagem, você pode fazer uma pergunta em relação a esse perigo ou descoberta ao mestre (pode ser imediatamente ou deixar para mais tarde); o mestre deve responder com informações verdadeiras e descrever como a resposta surge no grimório. Quando seu grimório tiver respondido a 10 perguntas, ele terá dividido quase todo o conhecimento que tem com você. Escolha um: Consciência Desperta: perca esta peculiaridade e seu grimório se transforma num NPC — crie-o com seu grupo, dando-lhe um nome e descrevendo sua aparência. Ele não tem ficha e não participa de nenhum teste ou conflito, mas W aprende dois feitiços à sua escolha entre os de elementalista, entropista e es- piritualista (Livro Básico, pp. 188, 192 e 198). Uma vez por conflito, se solici- tado, o NPC lança um desses feitiços. Feitiços são lançados dessa forma no fim da rodada atual, não exigem PM e seu teste de Magia usa 2d10 (se necessário). Magia Oculta: perca esta peculiaridade, mas seu grimório compartilha com você um último segredo — o mais poderoso de todos. Você recebe um poder heroico à sua escolha entre Cometa, Esperança, Feitiços Extras e Vulcão (Livro Básico, a partir da p. 232). Você pode escolher um poder cujos pré-requisitos não cumpra. Você também pode usar esta peculiaridade para inserir um novo personagem (e jogador) no grupo. Se fizer isso, o personagem que escolheu esse papel deve receber os benefícios listados em Magia Oculta, em vez de Consciência Desperta. Peculiaridades sugeridas para um PJ que entrar na campanha dessa forma são Arbóreo, Fera Falante, Robô e Um Sonho Longo. Qualquer que seja sua escolha, o grimório torna-se um livro normal e o mestre escolhe um: o grimório fornece uma informação crucial em relação a uma ameaça presente em seu mundo; ou o grimório revela a existência de uma nova ameaça e oferece uma informação crucial a respeito dela.",
      mechanic: null,
    },
    {
      id: "herdeiro_relutante",
      name: "Herdeiro Relutante",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você vem da família mais rica e influente da região. De onde vem sua fortuna e reputação? Você é o único herdeiro? O que você não suporta na sua família, e como isso levou levou você a se juntar aos outros personagens? Se você escolher essa peculiaridade durante a criação de personagem, aumente seu dinheiro inicial (Livro Básico, página 165) em 1.000 zênites. Além disso, você tem dois guarda-costas muito leais. Dê-lhes um nome e descreva suas aparências. Eles não têm fichas e nunca participam de testes ou conflitos, mas vocês são inseparáveis e, de alguma forma, eles aparecem sempre que você precisa de ajuda. Seus guarda-costas oferecem os seguintes benefícios: Cuidado! Ao sofrer dano, você pode reduzi-lo à metade. Segue a informação que o senhor solicitou. Em um descanso, você pode fazer uma pergunta ao mestre, que deve responder com informações verdadeiras. Esconda-se, eu cuido disso! Ao criar um fragmento elemental, você pode fazê-lo causar dano adicional igual a (5 + metade de seu nível). Ao usar um desses benefícios, os guarda-costas sofrem 1d6 Pontos de Exaustão. Você não pode contar com a ajuda deles se tiverem 10 ou mais desses pontos. Exaustão é dividida entre os guarda-costas e não é calculada individualmente. Ao final de cada sessão (aproximadamente quatro horas de jogo), seus guarda-costas recuperam até 1d6 Pontos de Exaustão (mínimo de 0).",
      mechanic: null,
    },
    {
      id: "irmaozao",
      name: "Irmãozão",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Seus companheiros de viagem sabem que podem contar com você ao montar acampamento e descansar em meio à pressão constante da aventura. Quem te ensinou a cuidar dos outros? Tem alguém entre os personagens que você vê como irmão mais novo? Que promessa especial você fez a esse personagem? Se a campanha do seu grupo não usa a regra opcional atividades de acampamento (página 130), seu personagem ainda tem acesso a ela: recebendo acesso a três atividades de acampamento em vez de apenas duas. Se seu personagem receber essa peculiaridade durante uma campanha que já usa a regra de atividades de acampamento, você apenas recebe acesso a mais uma atividade de acampamento à sua escolha. Ao fazer atividades de acampamento durante um descanso, escolha um: você faz duas atividades de acampamento diferentes, cujos efeitos não podem ser aplicados à mesma criatura; ou você faz a mesma atividade de acampamento duas vezes, aplicando seus efeitos a duas criaturas diferentes.",
      mechanic: null,
    },
    {
      id: "oficina_itinerante",
      name: "Oficina Itinerante",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você tem um meio de transporte que também funciona como loja e laboratório. Como o obteve? Como ele se move e qual sua fonte de energia? O que o torna reconhecível? Como as pessoas normalmente reagem à passagem dele? Você só pode escolher essa peculiaridade se seu personagem tiver uma ou mais classes entre gourmet (página 148) e inventor (Livro Básico, página 206). Você tem um veículo terrestre (Livro Básico, página 125), grande o suficiente para acomodar você e o resto do seu grupo, além de dois ou três convidados, mas não pode ser usado em combate. Se algum projeto precisar de um ingrediente ou material especial, você pode gastar 1 Ponto de Fabula para, de repente, encontrar algo semelhante em sua oficina. Se fizer isso, a invenção deve ter um defeito terrível (Livro Básico, p. 134).",
      mechanic: null,
    },
    {
      id: "paria_feerico",
      name: "Pária Feérico",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Há muito tempo, você viveu em meio aos seus no Reino das Fadas, em contato constante com o rio das almas… mas faz muito tempo desde sua última visita. O que deu errado? Qual é o estado do Reino no momento? Quem o governa? Você pode se comunicar verbalmente com qualquer criatura das espécies elemental, fera e planta. Você aprende um feitiço à sua escolha dentre os de elementalista, entropista e espiritualista (Livro Básico, pp. 188, 192 e 198). Além disso, você pode fazer rituais da disciplina ritualismo, e pode usar esses rituais para transportar criaturas para dentro ou para fora do Reino das Fadas. No entanto, você também possui uma fraqueza única, típica das fadas: decida com seu grupo que fraqueza é essa. Uma vez por sessão (aproximadamente quatro horas de jogo), o mestre pode lhe conceder 1 Ponto de Fabula para que complicações inesperadas surjam graças a essa fraqueza, ou fazer você falhar automaticamente um teste (isso deve ser feito antes de rolar os dados, pois o resultado do teste e a RA são ambos considerados como 0). Exemplos: você tem alergia a ferro, deve contar todos os grãos de areia ou sal que forem derrubados ou deve imitar quando alguém faz um gesto específico. TÓPICOS SENSÍVEIS Peculiaridades muitas vezes trazem temas complexos à mesa de jogo: por exemplo, Um Sonho Longo apresenta uma dinâmica perigosamente semelhante à de uma doença terminal; Desperto, Fera Falante, Pária Feérico e Robô provavelmente farão o personagem ser visto como uma anomalia ou mesmo uma ameaça. Herdeiro Relutante pode envolver conflito geracional e pressão familiar tóxica; Amaldiçoado ou Sobrevivente pressupõem experiências seriamente traumáticas. Ao escolher e personalizar peculiaridades, tenha o compromisso de respeitar os limites pessoais dos outros jogadores. Use linhas e véus (Livro Básico, página 140) e prepare-se para pausar o jogo se uma cena deixar alguém desconfortável. Sejam gentis uns com os outros e com vocês mesmos.",
      mechanic: null,
    },
    {
      id: "robo_nf",
      name: "Robô",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você é um corpo artificial no qual uma vida misteriosa floresce, o único descendente de uma era perdida nas eras. Sua aparência é orgânica ou mecânica? O que impede você de perceber o mundo ou se comunicar como um humano? Quais memórias fragmentadas você ainda tem da época de sua criação? Você não é considerado um ser vivo, é imune á condição envenenado e tem Imunidade a dano de veneno, também tem Resistência a dano de terra. Você não precisa respirar, comer ou beber, mas segue a regra de descanso normalmente. Você também recupera PV e se recupera de condições normalmente. Você recebe um bônus de +2 em todos os testes para examinar ou interagir com máquinas, tecnologia e construtos (exceto testes de Precisão e Magia).",
      mechanic: null,
    },
    {
      id: "sobrevivente_nf",
      name: "Sobrevivente",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você é um dos poucos sobreviventes de um evento catastrófico natural ou ataque de uma criatura terrível. Quem foi responsável por essa tragédia? Você conseguiu manter contato com outros sobreviventes? Acha que uma reconstrução é possível? Aumente seus PV e PM máximos em 5. Escolha uma opção: receber a capacidade de equipar armas corpo a corpo e à distância, armaduras e escudos marciais; ou aprender qualquer feitiço da lista do elementalista ou espiritualista (Livro Básico, páginas 188 e 198); ou aumentar permanentemente seus PI máximos em 2.",
      mechanic: null,
    },
    {
      id: "um_sonho_longo",
      name: "Um Sonho Longo",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Muito tempo atrás, seu espírito era parte da natureza; então, algo o fez assumir forma humana, embora não para sempre. Foi uma oração ou um tipo de magia? Que parte de sua aparência denuncia sua origem? Você teme esse último adeus? No fim de cada sessão (aproximadamente quatro horas de jogo), antes de distribuir EXP, role 2d20. Se o número que você rolar for igual ou inferior ao nível atual do seu personagem, seu último adeus se aproxima. Quando uma regra ou habilidade exigir que você gaste Pontos de Vida, Pontos de Mana ou Pontos de Fabula, você pode escolher ignorar esse preço. Se fizer isso, seu último adeus se aproxima. No fim de uma cena na qual você ignorou um custo conforme descrito anteriormente, se seu último adeus se aproximou pelo menos 10 vezes, chegou o momento de você abandonar o mundo dos humanos. Você voltará à sua forma original para sempre, como um objeto natural e inanimado. Junto a seu grupo, leve o tempo que precisar para interpretar um último momento agridoce antes que o seu personagem se vá. O mesmo acontecerá se você se sacrificar. Exemplos: você pode se transformar em uma grande árvore guardiã, um rosto na face de um penhasco, uma rocha de formato peculiar ou na estrela mais brilhante do céu. Um personagem cujo último adeus tiver chegado passa a ser considerado morto em termos de jogo e não pode ser trazido de volta. Mas, desse momento em diante, todos os personagens da campanha (incluindo um novo personagem que você criar), recebem 1 Ponto de Fabula adicional no início de cada sessão (aproximadamente quatro horas de jogo).",
      mechanic: null,
    },
    {
      id: "voo_nf",
      name: "Voo",
      sourceBook: "Atlas: Fantasia Natural",
      sourcePage: null,
      description: "Você tem uma ascendência única que confere a habilidade de voar ou levitar. Como essa habilidade funciona? É uma habilidade mágica ou você possui asas? Como essa vantagem em específico moldou a história e a sociedade do seu povo? Como as pessoas normalmente reagem ao vê-lo? Você sabe voar. Além da vantagem evidente na mobilidade, seus ataques corpo a corpo podem acertar criaturas que estiverem voando e você não pode ser alvo de um ataque corpo a corpo a menos que o atacante também esteja voando ou tenha alguma forma de atingir criaturas voando. Enquanto estiver em crise ou não puder voar livremente (por exemplo, se estiver dentro de um veículo projetado para criaturas de tamanho humano ou em um corredor estreito), você perde todos os benefícios desta peculiaridade. Além disso, ao sofrer dano de ar, raio ou gelo em uma cena de conflito, você perde os benefícios desta peculiaridade até o início do próximo turno.",
      mechanic: null,
    },
    {
      id: "agitador",
      name: "Agitador",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Há anos, você atiça as pessoas a lutar contra os opressores, talvez por justiça, talvez por vingança. Qual é o seu alvo principal no momento? Quem ou o que você perdeu devido à sua insubordinação? Quem ou o que está caçando você? Quando descansa dentro ou perto de um assentamento, escolha um: você descobre do que os habitantes estão com medo (ou do que têm raiva); ou você cria um contato que mora e opera nessa área — dê a ele um nome e uma especialização e o mestre define o que ele pede de vocês (como uma ajuda ou pagamento). Exemplos: Mique, a Bruxa, uma ritualista experiente disposta a ajudar em troca de materiais raros; Dois Dedos, um negociante de armas atualmente preso pelas Forças de Segurança Planetária.",
      mechanic: null,
    },
    {
      id: "augure_do_planeta",
      name: "Áugure do Planeta",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "O rio das almas, com seu sofrimento marcado em cicatrizes seculares causadas por poluição e experimentos impiedosos, fala através de você. Como essa dor se manifesta diante de seus olhos? Como essa conexão se formou? Quando recupera PV e/ou PM de um ou mais aliados, cada um deles recupera 5 PV e/ou PM adicionais e você escolhe uma condição entre abalado, atordoado, enfurecido, envenenado, fraco ou lento: cada um desses aliados se recupera da condição escolhida. Se você estiver no 30° nível ou acima, o efeito de recuperação aumenta para 10 PV e/ou PM. Você também pode fazer rituais da disciplina espiritualismo.",
      mechanic: null,
    },
    {
      id: "de_um_mundo_distante_tf",
      name: "De um Mundo Distante",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Sua presença é uma anomalia aqui e, às vezes, você parece mesmo seguir suas próprias regras. Você vem de um planeta distante, quem sabe de uma linha do tempo diferente? Como chegou aqui e quando? Acha que ainda tem chance de voltar? Faria isso se pudesse? Qual ameça terrível seguiu você? Você recebe 1 Ponto de Fabula automaticamente ao participar de um conflito. Você também pode evocar um Traço para rolar novamente mesmo se o teste for uma falha crítica (se o fizer, não recebe 1 Ponto de Fabula pela falha).",
      mechanic: null,
    },
    {
      id: "diabolista",
      name: "Diabolista",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você tem acesso a um talento ou aparelho único que o permite moldar energias da rede de almas em um familiar demoníaco. Como obteve esse poder e qual preço você pagou? Como é a aparência do seu familiar e o que isso diz sobre você? Em conjunto com seu grupo, crie seu familiar: um NPC demônio de nível 5 (Livro Básico, página 302). Essa criatura não tem iniciativa e não sobe de nível, tem no máximo dois ataques básicos, recebe um bônus de +3 em testes de Precisão e testes de Magia, e seus PV máximos são iguais a (cinco vezes o dado básico de Vigor do familiar + metade do seu nível). Quando você chegar ao 20° nível, seu familiar recebe um poder adicional. No 40° nível, seu familiar recebe outro poder adicional. Certifique-se de discutir a escolha desses poderes com o resto do grupo. Quando um NPC que você possa ver e que pertença à espécie demônio for reduzido a 0 PV, se você estiver presente na cena, pode gastar 20 PM. Se o fizer, o mestre revela a ficha inteira dessa criatura e você pode substituir um dos poderes do seu familiar por um dos poderes da criatura (o mestre tem a decisão final sobre quais poderes estão disponíveis e como se aplicarão ao seu familiar). Descreva essa transformação! Se tiver essa peculiaridade, você não pode adquirir o poder Companheiro Fiel, do andarilho (Livro Básico, p. 177), e vice-versa. Seu familiar não joga um turno independente em conflitos, mas, uma vez por turno, você pode gastar uma ação para que ele faça uma ação. Se ele for afetado por qualquer efeito relacionado a turnos (Livro Básico, página 77), esse efeito o afeta durante o seu turno. Seu familiar entra e sai das cenas com você e recebe os mesmos benefícios que você por descansar. Se reduzido a 0 PV, seu familiar some da cena e reaparece ao seu lado no início da próxima cena em que você estiver presente, com PV iguais ao seu valor de crise.",
      mechanic: null,
    },
    {
      id: "experimento_fugitivo",
      name: "Experimento Fugitivo",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você é uma criatura sem precedentes, desenvolvida em um laboratório isolado. O mundo não está pronto para você, nem seus criadores. Como escapou? O que está procurando? Qual foi a primeira pessoa que foi gentil com você? Quando uma regra ou habilidade requer que você gaste 100 ou menos PV, PM ou PI, você pode acumular 1d8 Pontos de Instabilidade para ignorar esse custo. No final de cada sessão (aproximadamente quatro horas de jogo), você perde 1d6 Pontos de Instabilidade (até um mínimo de 0). Se seus Pontos de Instabilidade chegarem a 10 ou mais, seus PV são reduzidos a 0 e você deve se render. As consequências da rendição devem estar ligadas a perda do controle de suas técnicas. Então, perca todos Pontos de Instabilidade.",
      mechanic: null,
    },
    {
      id: "fantasma_cognitivo",
      name: "Fantasma Cognitivo",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você é uma presença nascida nas profundezas da rede de almas, na linha entre demônios e humanos. Você se lembra de seus primeiros momentos? Qual crença, emoção ou memória você personifica? Como isso moldou sua aparência? Escolha dois tipos de dano entre ar, fogo, gelo, luz, raio, terra e trevas. Você se torna Resistente aos tipos de dano escolhidos; escolha um terceiro tipo de dano, você se torna Vulnerável ao tipo de dano escolhido. Você pode fazer rituais da disciplina ritualismo e pode usar esses rituais para transportar criaturas para dentro e fora da rede de almas, assim como para conseguir informações e rastrear entidades dentro da rede de almas.",
      mechanic: null,
    },
    {
      id: "fera_falante_tf",
      name: "Fera Falante",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você é o último vestígio (ou assim parece) de uma antiga espécie de animais altamente inteligentes traídos e caçados pelos humanos. Como é sua aparência, e qual habilidade única você possui? Quem fez com que voltasse a confiar novamente nas pessoas? O que você faria se algo acontecesse a essa pessoa? Você não pode usar nenhum item, exceto acessórios e módulos de arma e armadura (página 161). Mas, enquanto seu espaço de armadura estiver vazio, você recebe um bônus de +2 na Defesa e Defesa Mágica. Você também recebe dois benefícios à sua escolha entre: Você pode equipar armas personalizadas (p. 112). Você aprende um feitiço de NPC (Livro Básico, pp. 310–311); não pode ser Devastação. Se um teste de Magia for necessário, use (VIG + VON). Personalize os efeitos do feitiço conforme necessário (nome, tipo de dano, condições etc.). Seus ataques desarmados causam 6 pontos de dano adicional. Se estiver no 30° nível ou acima, esse dano adicional aumenta para 10 pontos. TÓPICOS SENSÍVEIS Peculiaridades muitas vezes trazem temas complexos à mesa de jogo: por exemplo, Oficial Arrependido e Sobrevivente estão envolvidos com exploração e opressão; Experimento Fugitivo, Robô e Fera Falante trazem personagens que são vistos como ameaças ou anomalias; e mesmo personagens com a peculiaridade Mil Faces, muito mais simples, podem ser tratados com desconfiança e suspeita. Ao escolher e personalizar suas peculiaridades, tenha o compromisso de respeitar os limites pessoais dos outros jogadores. Use linhas e véus (Livro Básico, página 140) e prepare-se para pausar o jogo se uma cena deixar alguém desconfortável. Sejam gentis uns com os outros e com vocês mesmos.",
      mechanic: null,
    },
    {
      id: "inventor_prodigio",
      name: "Inventor Prodígio",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você tem uma paixão ardente por tecnologia e aparelhos estranhos. Que pesquisa inovadora e perigosa você desenvolveu, e qual empresa suspeita está tentando roubar essa informação? Como planejam usá-la? Uma vez por cena de conflito, se precisar gastar PI, você pode ignorar esse custo. Você pode começar projetos. Se um projeto precisar de material ou ingrediente especial, você pode gastar um Ponto de Fabula para declarar que tem esse item. Se fizer isso, a invenção precisa ter um defeito terrível (Livro Básico, p. 134).",
      mechanic: null,
    },
    {
      id: "mil_faces",
      name: "Mil Faces",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você pode se disfarçar para parecer com qualquer outra pessoa. Essa habilidade vem de engenhocas especiais, poderes psíquicos ou uma fisiologia única? Quem foi o primeiro a notar sua mentira? Quem perdeu a confiança em você por isso? Quem tentou contratá-lo para uma operação difícil e como você respondeu? Se estiver longe de olhares curiosos, você pode usar a ação Poder e gastar 1 Ponto de Fabula para se disfarçar como outra criatura humanoide. Se for alguém que você conhece, observou ou pesquisou, também pode adotar sua voz e trejeitos. Seu disfarce engana facilmente qualquer criatura de patente soldado, mas as de patente elite e campeão podem ver através dele se você falhar em um teste ou usando uma oportunidade. Se um vilão estiver na cena, ele pode gastar 1 Ponto de Ultima para revelar sua identidade, por coincidência ou intuição.",
      mechanic: null,
    },
    {
      id: "neo_humano",
      name: "Neo-Humano",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você representa a próxima fase na evolução da humanidade (uma das possíveis pelo menos). O que denuncia sua natureza? Como você a esconde? Você tem um mentor ou alguém que respeite muito? Que entidade ou organização o monitora? Ao adquirir essa peculiaridade, escolha Astúcia, Destreza, Vigor ou Vontade. Quando entrar em uma cena de conflito, escolha um: aumentar o dado atual do atributo escolhido em um (até o máximo de d12); ou, se o dado básico for d12, considerar o dado atual dele como d20 (apenas em testes e desconsiderando condições). O efeito escolhido dura até o fim da cena. Ao escolher uma das opções, o mestre pode gastar uma oportunidade (na cena atual ou depois) para demonstrar os efeitos colaterais de suas habilidades (como cativar uma entidade psíquica, alertar autoridades ou danificar o continuum).",
      mechanic: null,
    },
    {
      id: "oficial_arrependido",
      name: "Oficial Arrependido",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você fez parte de uma milícia, grupo armado, força policial ou unidade militar. Suas mãos e coração estão manchados de sangue inocente. Que evento chocante levou à sua deserção? Quem você acha que jamais perdoará seus atos e por que essa pessoa está certa? Você pode adquirir esta peculiaridade apenas se o Tema de seu personagem for Dúvida ou Culpa, e seu Tema não pode mudar de forma alguma enquanto a tiver. Ao adquirir esta peculiaridade, descreva a organização em que você trabalhou, dê um nome ao vilão que a lidera e liste suas três principais estratégias. Essa organização torna-se uma ameaça ao seu mundo. Exemplos: a Corporação Encruzilhada Galáctica (liderada por Aaron Callisto), que explora recursos naturais dos planetas, acaba com direitos trabalhistas e coloniza o espaço sideral; as Forças de Segurança Deluvianas (lideradas por Natalia Caiden), que usam força excessiva, traficam protótipos de armas tecnomágicas e espalham desinformação; a Companhia Privada Peckerson (liderada por Ezra Allen), que sabota protestos pacíficos, intimida civis e se infiltra em sindicatos. Você conseguiu roubar alguma coisa da organização e, por isso, tem um único item raro custando 1.000z ou menos. Escolha esse item nas listas disponíveis ou crie-o com o resto do grupo. No fim de cada sessão (aproximadamente quatro horas de jogo), se você tiver atrapalhado uma ou mais das estratégias da organização, ou se tiver remediado algum mal que ela tenha causado, ganhe 1 Ponto de Subversão. Se não tiver certeza disso ter acontecido em determinada sessão, é você que tem a palavra final. Seja o mais honesto e sincero possível. Quando precisar gastar Pontos de Fabula, você pode gastar 1 Ponto de Subversão (independentemente da quantidade de Pontos de Fabula necessários). Assim que o vilão liderando a organização for derrotado e se render, você perde essa peculiaridade, aumenta permanentemente seus PV e PM máximos em 10 e muda seu tema para um dos seguintes: Pertencimento, Dever ou Justiça.",
      mechanic: null,
    },
    {
      id: "reliquia_enigmatica",
      name: "Relíquia Enigmática",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você tem uma arma estranha capaz de moldar o tecido da realidade, um artefato de um passado esquecido (ou até de um futuro distante). Como você a obteve e como descobriu seu funcionamento básico? Quem está tentando tirá-la de você? Com o resto do grupo, crie uma relíquia: uma arma personalizada rara (página 112) custando 1.200z ou menos. A relíquia é um artefato, só pode ser destruída com o sacrifício de um PJ e só pode ser roubada ou perdida com uma rendição. Enquanto um PJ ou vilão tiver a relíquia equipada, ele pode fazer a ação Poder para manifestar um poder de sua escolha entre os seguintes: (Apenas PJs) Faça uma única pergunta ao mestre, que deve ser respondida com sinceridade ao descrever as visões mostradas pela relíquia. Escolha uma disciplina entre elementalismo, entropismo, espiritualismo, quimerismo e ritualismo. Até o fim da cena, qualquer personagem com a relíquia equipada pode fazer rituais dessa disciplina pela metade do custo em PM. Até o fim da cena, ataques com a relíquia causam 5 pontos de dano adicional, e todo o dano causado ignora Absorção, Imunidades e Resistências. Além disso, o personagem pode fazer um ataque livre com a relíquia. A segunda e a terceira opções são cumulativas entre si. Usar a segunda opção com quimerismo três vezes na mesma cena, por exemplo, fará com que rituais de quimerismo custem 1/8 do normal em PM. Depois que a relíquia manifestar um poder nas mãos de um PJ, ela gera 1d6 Pontos de Paradoxo. Se os Pontos de Paradoxo de uma relíquia chegarem a 10 ou mais, todos eles são perdidos imediatamente e o jogador rola um d6: 1–4: a relíquia fica completamente inerte e não pode ser equipada até uma condição específica ser atendida (o mestre decide qual). 5–6: a relíquia libera uma força terrível e sem precedentes, causando morte e destruição, uma séria alteração do tempo e espaço ou mesmo o advento de uma nova ameaça para o mundo (à escolha do mestre). Quando um vilão usa o poder da relíquia, ela nunca gera Pontos de Paradoxo. Se você se sacrificar e sua relíquia não for destruída como parte do sacrifício, ela continua na campanha com todas as regras intactas, podendo ser perdida como qualquer outro item (mas ainda sendo destruída apenas com um sacrifício).",
      mechanic: null,
    },
    {
      id: "robo_tf",
      name: "Robô",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você é um humanoide parcial ou completamente mecânico. Você sabe quem o criou e por quê? Existem “cópias” suas pelo mundo? Quando sua personalidade divergente se manifestou pela primeira vez e quais foram as consequências? Você não é considerado um ser vivo, é imune á condição envenenado e tem Imunidade a dano de veneno, também tem Resistência a dano de terra. Você não precisa respirar, comer ou beber, mas segue a regra de descanso normalmente. Você também recupera PV e se recupera de condições normalmente. Você recebe um bônus de +2 em todos os testes para examinar ou interagir com máquinas, tecnologia e construtos (exceto testes de Precisão e Magia).",
      mechanic: null,
    },
    {
      id: "sobrevivente_tf",
      name: "Sobrevivente",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você é um dos poucos sobreviventes de um evento catastrófico, ataque militar ou invasão corporativa. Quem foi responsável por essa tragédia? Você conseguiu manter contato com outros sobreviventes? Acha que uma reconstrução é possível? Aumente seus PV e PM máximos em 5. Escolha uma opção: receber a capacidade de equipar armas corpo a corpo e à distância, armaduras e escudos marciais; ou aprender qualquer feitiço da lista do elementalista ou espiritualista (Livro Básico, páginas 188 e 198); ou aumentar permanentemente seus PI máximos em 2.",
      mechanic: null,
    },
    {
      id: "transporte_roubado",
      name: "Transporte Roubado",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Você tem um transporte que já o tirou de várias encrencas. O problema é que... ele é meio emprestado. O que o torna único? Que tipo de combustível usa? Quem era o dono original e porque essa pessoa o quer de volta? Você tem um transporte à sua escolha entre os apresentados na p. 125 do Livro Básico (veículo terrestre, navio ou aeronave) ou você tem uma nave espacial (p. 79). O tamanho do transporte pode ser médio ou grande — é o bastante para acomodar você e o resto do grupo, além de uma dúzia de passageiros —, e está equipado com armamentos que permitem combate de veículos (p. 65). Uma vez por sessão (aproximadamente quatro horas de jogo), o mestre pode lhe conceder 2 Pontos de Fabula para introduzir uma complicação narrativa relacionada à natureza do transporte ou ao seu dono anterior, mas o veículo não pode ser destruído sem sua permissão.",
      mechanic: null,
    },
    {
      id: "xifossimbiose",
      name: "Xifossimbiose",
      sourceBook: "Atlas: Tecno-Fantasia",
      sourcePage: null,
      description: "Sua capacidade de manifestar um corpo físico é vinculada a uma arma, que deve ser empunhada por outra pessoa. Ela é sua primeira portadora? Como você foi criado? Há outros assim? Com quem se recusou a se unir? Você almeja a liberdade? Ao adquirir essa peculiaridade, escolha outro personagem para agir como seu portador.Vocês dois imediatamente criam um Laço entre si; esse Laço tem uma emoção escolhida entre admiração, desconfiança, inferioridade e lealdade. Certifique-se de que o jogador controlando o portador esteja de acordo com esse relacionamento e queira explorar a natureza dessa peculiaridade com você. Com o resto do grupo, crie seu núcleo: uma arma rara personalizada (página 115) custando 1.200z ou menos. O núcleo não pode ser perdido, roubado ou destruído por meios externos, mas se desintegra automaticamente se você se sacrificar. Ele nunca é considerado marcial (W) e qualquer um pode equipá-lo. Um personagem equipando-o pode usar a ação Poder para mudar os próprios atributos nos testes de Precisão para qualquer combinação de dois atributos diferentes (aplique a mudança para as duas formas se for uma arma mutável). Enquanto tiver essa peculiaridade, apenas seu portador pode usar seu núcleo. Seus Pontos de Vida nunca podem chegar a menos de 1 — qualquer dano a mais é sofrido pelo portador (isso acontece independentemente da distância). Quando seu portador se rende, você some imediatamente, recolhendo-se no núcleo (não importando a distância) e fica em um estado de dormência do qual não pode sair até seu portador recobrar a consciência. O mestre pode impor as consequências dessa rendição sobre você ou seu portador. Quando seu portador se sacrificar, escolha um: Despertar (apenas se a força somada de seus Laços for 8 ou maior). Você perde essa peculiaridade e seu núcleo aparece nas suas mãos. Você executa imediatamente a ação Equipamento sem custo e o equipa. Legado (apenas se outro personagem disposto que você possa ver esteja em cena). Ele se torna seu novo portador e seu núcleo aparece na mochila dele. Estilhaçar. Você se sacrifica no lugar do portador, que recupera imediatamente um número de PV igual ao seu valor de crise e não precisa se render ou sacrificar. Sempre que subir de nível, se a força somada de seus Laços for 10 ou mais, você pode desencadear um Despertar como descrito acima (sem precisar do sacríficio). TECNOSFERAS Tecnosferas são cristais que condensam a energia do rio das almas de todo o mundo. Ao serem colocadas em um equipamento especial, essas gemas reagem e alteram suas características, talvez até concedendo novos poderes ao usuário. As regras opcionais de tecnosferas modificam profundamente várias mecânicas do Livro Básico e têm o objetivo de substituir parte da complexidade do jogo, em vez de aumentá-la. Se optarem por usar essas regras, todos os personagens do grupo devem segui-las sem exceções. Em termos de regras, tecnosferas pegam parte dos elementos que compoem personagens e equipamentos, os transformando em opções modulares: classes, poderes, características e outros agora podem ser trocados livremente. Embora essas regras funcionem especialmente bem no contexto da fantasia tecnológica, elas podem ser usadas em qualquer jogo. Em geral, essas regras não deixam personagens mais fortes que o normal; podemos dizer que os deixam fortes de um jeito diferente. TIPOS DE TECNOSFERA Tecnosferas podem ser divididas em dois grupos: mnemosferas e hoplosferas. Mnemosferas (do grego mnéme, “memória”) são geradas através do acúmulo de pensamentos, emoções e conhecimento presentes no rio das almas, respondendo ao estímulo de novos eventos e experiências. Em termos de jogo, cada mnemosfera é associada a uma classe e dá ao usuário acesso a alguns dos poderes correspondentes. Hoplosferas (do grego óplon, “ferramenta, arma”) são literalmente “coágulos” de energia espiritual ligados a um elemento específico (como fogo ou terra) ou conceito (como cura ou capacidade de lançar feitiços). Em termos de jogo, hoplosferas reforçam os itens nos quais são colocadas ou as habilidades daqueles que as equipam. As próximas páginas apresentam todas as regras necessárias para usar tecnosferas em sua campanha. Elas são bastante complexas, então é importante que todo o grupo tente memorizá-las o melhor possível. TECNOSFERAS MUDAM SEU MUNDO Tecnosferas podem parecer apenas uma opção “mecânica” no começo, mas pelo contrário: têm um impacto forte na narrativa e na construção do mundo, assim como na percepção da magia e da competência dentro do cenário. Ao incorporar tecnosferas em sua campanha, essas dicas podem ser úteis. Como tecnosferas se parecem? Como mnemosferas e hoplosferas são diferentes? Como as tecnosferas são criadas? Há uma facção com o monopólio sobre elas? Qual tecnosfera, hipotética ou lendária, pode mudar o destino do mundo?",
      mechanic: null,
    },
    {
      id: "a_promessa_que_te_detem",
      name: "A Promessa que te Detém",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Você já foi uma entidade de poder inimaginável, capaz de causar morte e destruição num estalar de dedos. No entanto, você fez uma promessa: jamais usar sua força verdadeira outra vez. A quem prometeu isso? Essa pessoa ainda está viva? Que tragédia terrível você não evitou devido a essa promessa? Esta peculiaridade só pode ser escolhida se o Tema do seu personagem for Culpa ou Dever. Além disso, você não pode mudar esse Tema enquanto tiver a peculiaridade. Você aumenta permanentemente seus PV e PM máximos em 5 e aprende um feitiço à sua escolha entre Roubo de Mana, Roubo de Vida e Sopro Amaldiçoado (Livro Básico, p. 311). Escolha seu teste de Magia entre (AST + VON) ou (VIG + VON) e personalize o feitiço como visto no livro. Ao causar dano a uma ou mais criaturas, você pode escolher quebrar sua promessa: você causa exatamente 999 pontos de dano a cada uma delas; esse dano causado ignora Resistência, Imunidade e Absorção; se um ou mais vilões estiverem entre essas criaturas, deixam de ser vilões e perdem todos os Pontos de Ultima (você deve escolher o destino delas conforme as regras normais de NPC). Após quebrar a promessa, seu PJ se torna um vilão supremo e você deve criar um novo personagem.",
      mechanic: null,
    },
    {
      id: "anjo_caido",
      name: "Anjo Caído",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Você já habitou entre as esferas celestiais, banhando-se na glória da luz… mas, agora, encontra-se neste reino de monstros e escuridão. Você busca expiação, trazer luz entre as sombras ou espionar aqueles que conspiram contra os Céus? Desde sua chegada, quais dos seus preconceitos foram postos à prova? Por quem você desenvolveu sentimentos inesperados? Você é Resistente a dano de luz e de trevas. Escolha um: você recebe um item raro no valor de 1.000 zênites ou menos; ou aprende um único feitiço de espiritualista à sua escolha; ou permanentemente aumenta seus PM em 10. Uma vez por sessão (aproximadamente quatro horas de jogo), o mestre pode lhe dar 1 Ponto de Fabula para apresentar complicações inesperadas causadas por sua natureza angelical (por exemplo, algumas criaturas ou artefatos podem reagir de maneiras estranhas devido à sua presença e você pode acabar atraindo a ira de criaturas infernais).",
      mechanic: null,
    },
    {
      id: "delinquente_infernal",
      name: "Delinquente Infernal",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Você faz parte da prestigiosa Academia Infernal, onde as mentes malignas mais promissoras são nutridas numa atmosfera de constante caos. No entanto, representa uma mancha terrível na reputação da instituição: você é… bom. Detestavelmente gentil e cortês, chega nas aulas no horário e com o dever de casa feito. Por que é assim? Você simplesmente deseja se destacar dos outros estudantes ou fez uma promessa a alguém? Que lado sombrio de sua personalidade você manteve escondido? Após descansar em um local, escolha um: descreva como você o deixou melhor (recolhendo lixo no parque, ajudando uma senhora, participando de uma campanha de caridade etc.) e você recebe 1d6 Pontos de Delinquência; ou descreva como você se entrega a um momento de egoísmo e recebe 1 Ponto de Fabula, perdendo todos os Pontos de Delinquência acumulados. Ao causar dano a um vilão ou sofrer dano de um vilão, você causa ou sofre dano adicional igual aos seus Pontos de Delinquência atuais. Quando você faz com que um ou mais aliados recuperem PV e/ou PM, cada um deles recupera uma quantidade de PV e/ou PM adicional igual aos seus Pontos de Delinquência atuais. No fim de cada sessão (aproximadamente quatro horas de jogo), se tiver 10 ou mais Pontos de Delinquência, você recebe um Demérito e perde todos os Pontos de Delinquência acumulados; em seguida, se tiver recebido 3 ou mais Deméritos no total, você é expulso da Academia: você perde essa peculiaridade, recebe 3 Pontos de Fabula e um poder heroico à sua escolha (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Isso inclui a escolha de um poder heroico para uma classe que você não aprendeu. Claro que não! Muitas peculiaridades de Fabula Ultima funcionam em campanhas nas quais malucos incompreendidos e princesas demoníacas inseguras salvam o mundo de quem esconde crueldades em máscaras angelicais. Recomendamos Amaldiçoado, Arauto da Ruína, Arbóreo, Coração Cativo, De um Mundo Distante, Experimento Fugitivo, Fera Falante, Inventor Prodígio e Regressado dos Atlas: High Fantay e Techno Fantasy.",
      mechanic: null,
    },
    {
      id: "herdeiro_da_bruxaria",
      name: "Herdeiro da Bruxaria",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Você vem de uma antiga linhagem de bruxas ligada a uma fonte de poder que causa medo e desconfiança nos humanos. Como isso se manifesta em você? Que problema causou? Quem deseja usar o seu poder de forma exploratória? Escolha um tipo de dano entre ar, fogo, gelo, raio, terra, trevas e veneno. Você recebe Absorção ao tipo de dano escolhido. Além disso, sempre que você causar dano de um tipo que não seja físico, esse dano automaticamente se torna do tipo de escolhido e esse tipo não pode ser alterado ou perdido (este efeito tem prioridade sobre qualquer outra regra no jogo). No entanto, você também é Vulnerável a um tipo de dano diferente baseado no que você escolheu (respectivamente, raio, gelo, fogo, terra, ar, luz e fogo). Você também pode fazer rituais da disciplina ritualismo. Além disso, pode usar ritualismo para manipular o elemento do tipo de dano escolhido, desde que ele esteja presente na cena (respectivamente: ar, fogo, gelo e água, eletricidade, chão e rochas, escuridão e sombras ou matéria apodrecida).",
      mechanic: null,
    },
    {
      id: "gangue_monstruosa",
      name: "Gangue Monstruosa",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Há soberanos demônios; há múmias, vampiros poderosos e até anjos caídos com idades impensáveis; há ínferos menos notáveis, mas que ainda são respeitados. E também há… vocês todos aí. Na verdade, vocês não são grande coisa e… parecem todos iguais. Mas há MUITOS de vocês. Por que estão no fundo da cadeia alimentar? Qual é a sua causa em comum? Quem é o seu líder e como alguém pode facilmente identificá-lo? Seu personagem não é uma única entidade, mas um grupo de monstros liderado por alguém que geralmente fala por todos. Você ainda é considerado como uma única criatura e segue todas as regras normais, com exceções: Pontos de Vida: ao perder PV, descreva como os membros da gangue são derrotados ou mortos; ao recuperá-los, descreva como eles retornam à batalha ou como você reúne novos recrutas. Ao se render, você pode descrever a morte do líder e explicar qual membro da gangue o substitui; ao se sacrificar, a gangue é desfeita para sempre, mas será lembrada com grande respeito. Todos por Um: ao causar dano a uma criatura, se ela não for um enxame (Livro Básico, p. 297), você causa 5 pontos de dano adicional a ela. Um por Todos: você tem Resistência a dano causado por fontes que causam dano apenas a você, mas tem Vulnerabilidade a dano causado por fontes que também causam dano a uma ou mais criaturas além de você. Dano sem tipo ignora estas Afinidades normalmente.",
      mechanic: null,
    },
    {
      id: "monarca_destronado",
      name: "Monarca Destronado",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Seu destino era herdar o cargo de monarca demoníaco, mas as coisas não saíram conforme planejado. Mais especificamente, parece haver pelo menos uma dúzia de herdeiros autoproclamados, quase todos mais fortes e influentes do que você. Como planeja retomar o trono para si? Quem ficou ao seu lado e quem lhe traiu? Alguém sabe sua fraqueza secreta? Como tal fraqueza representa suas inseguranças? Você causa 5 pontos de dano adicional a inimigos de patente soldado. Além disso, ao fazer um teste oposto contra um inimigo de patente elite ou campeão, você obtém um sucesso crítico se ambos os dados mostrarem o mesmo número (apenas se não for uma falha crítica). No entanto, você tem uma fraqueza secreta: decida qual em conjunto com o grupo e conecte-a a um evento do passado do qual seu personagem se envergonha ou ainda terá que confrontar, processar ou superar. Exemplos: luz do sol (porque todos zombavam da sua palidez); figuras maternas (porque você sempre sentiu que não conseguiria estar à altura de sua mãe, a rainha); música clássica (porque seu instrutor de piano era muito rígido). Sempre que falhar em um teste enquanto a sua fraqueza secreta estiver presente na cena, você deve revelá-la automaticamente para todos ao seu redor e considera ambos os dados como se tivessem rolado 1, resultando em uma falha crítica (ou seja, os dados não podem ser rolados novamente e você recebe 1 Ponto de Fabula imediatamente). Se confrontar e processar o evento que originou sua fraqueza secreta, você perde a penalidade descrita acima. Além disso, de agora em diante, a força dos seus Laços é sempre considerada 1 ponto mais alto (por exemplo, um Laço com três emoções terá força 4). Se não tiver certeza de como aplicar estas regras, você é sempre quem tem a palavra final. Jogue com honestidade e sinceridade.",
      mechanic: null,
    },
    {
      id: "servo_in_fiel",
      name: "Servo (In?)fiel",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Você é o braço direito de outro personagem, alguém que pode estar destinado a grandes feitos, mas precisa desesperadamente da sua ajuda, além de demonstrar uma frequente falta de bom senso. Que promessa, dívida ou juramento vincula vocês? Qual sua disposição com esta pessoa? Qual você acha que é a falha mais significativa dela? Você já chegou a pensar que você é quem merece aquele lugar? Que segredo você escondeu dessa pessoa? Ao adquirir esta peculiaridade, escolha outro PJ para se tornar seu suserano. Ambos criam um Laço um com o outro; seu Laço tem uma emoção escolhida entre lealdade e desconfiança e o Laço do seu suserano tem uma emoção escolhida entre admiração, inferioridade ou desconfiança. Certifique-se de que o jogador controlando seu suserano concorda com esta relação e está animado para explorar a natureza única desta peculiaridade junto com você. Quando seu suserano fizer um teste, se você estiver presente na cena, pode oferecer ajuda: você usa as regras de testes em grupo (Livro Básico, p. 50), mas tem sucesso automático em seu teste de Apoio. Se estiverem numa cena de conflito, você não perde o seu turno na rodada atual (ignorando as limitações das regras de trabalho em equipe, Livro Básico, p. 76). Toda vez que o suserano aceitar a sua ajuda em um teste em grupo, você recebe 1 Ponto de Confiança. No fim de cada sessão (aproximadamente quatro horas de jogo), antes de atribuir EXP, role 2d20. Se o resultado for igual ou menor que seu nível de personagem atual, você recebe 1 Ponto de Confiança. Em seguida, se tiver 20 ou mais Pontos de Confiança, escolha um: Desafio: chegou a hora de testar seu suserano. Em conjunto com o jogador que controla o suserano, narre um duelo, desafio ou competição similar na qual o PJ dele deve provar que não precisa de sua ajuda e ele tem sucesso. Em seguida, você perde esta peculiaridade e recebe um poder heroico à sua escolha (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Traição: um momento sombrio no qual você demonstra suas intenções. Em conjunto com o jogador que controla o suserano, narre sua traição e entre em acordo sobre uma consequência adequada (como a perda de um objeto importante, a ressurreição de um adversário terrível ou uma mudança de Tema do seu suserano). Em seguida, seu PJ se torna um vilão menor ou um vilão maior (à escolha do mestre) e você deve criar um novo personagem.",
      mechanic: null,
    },
    {
      id: "supostamente_um_superchefe",
      name: "(Supostamente um) Superchefe",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Você pode se transformar num colosso capaz de reduzir cidades inteiras a cinzas e causar terror no coração de todos os gamers. Ou ao menos é isso que você diz. De onde você vem? Qual a aparência de sua transformação? O que na sua Forma FinalTM lhe envergonha a ponto de não querer usá-la? Ao entrar em crise pela primeira vez numa cena de conflito, você pode assumir a sua Segunda FormaTM até o fim da cena, recebendo os benefícios: Seus ataques recebem a propriedade multi (2). No seu turno, você reduz em –5 todos os custos de PV e PM (mínimo de 0). Ao ficar com 0 PV, se estiver em sua Segunda FormaTM e tiver um ou mais Laços de força 3 ou mais, você pode apagar 2 emoções de um desses Laços. Se o fizer, recupere 999 PV e 999 PM e entre em sua Forma FinalTM até o fim da cena, recebendo os benefícios da Segunda FormaTM e os seguintes: Você recebe um bônus de +4 em testes opostos de força bruta e causa 5 pontos de dano adicional a humanoides e demônios. Se ficar com 0 PV novamente e puder se sacrificar, você deve fazê-lo.",
      mechanic: null,
    },
    {
      id: "teimoso_cetico",
      name: "Teimoso Cético",
      sourceBook: "Codex Extra",
      sourcePage: null,
      description: "Isso de monstros, demônios e magias parece um besteirol saído de algum videogame. Você deve estar sonhando, alguém te hipnotizou… pode ser uma pegadinha! Claro que você não virou uma alma penada no Purgatório ou encontrou um portal mágico. Mas deve admitir: sua memória está meio bagunçada. Se estiver prestes a sofrer os efeitos de um ataque, feitiço, poder ou qual- quer outro efeito causado por outra criatura (seja ele benéfico ou negativo), você deve rolar 1d6: 1-4: os efeitos funcionam e você recebe 1 Ponto de Desconfiança. 5-6: você não acredita nos efeitos, portanto, não os sofre. No fim de cada sessão (aproximadamente quatro horas de jogo), antes de atribuir EXP, role 2d20. Se o resultado for igual ou menor que seu nível de personagem atual, você recebe 1 Ponto de Desconfiança. Em seguida, se tiver 20 ou mais Pontos de Desconfiança, você lembra como chegou neste lugar e o mestre escolhe um: você se lembra de uma pista essencial sobre uma ameaça presente no seu mundo; ou você se lembra da existência de uma nova ameaça e obtém uma pista essencial sobre ela. Ao recuperar a memória, um poder estranho desperta em seu interior: você perde esta peculiaridade e recebe um poder heroico à sua escolha (você pode até escolher um poder heroico cujos requisitos não cumpra, a menos que eles incluam um poder que você não tem). Isso inclui a escolha de um poder heroico para uma classe que você não aprendeu.",
      mechanic: null,
    },
  ],

  // =============================================
  // PODERES ZERO — Fase 1.3
  // Fonte: data/rules/zero-powers.json
  // =============================================
  zeroPowers: [
    {
      id: "poder_desperto",
      name: "Poder Desperto",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: 124,
      variant: "awakened",
      description: "Esta variação é ideal para histórias épicas nas quais um herói manifesta um poder novo e inesperado, isso normalmente acontece quando estão frente a frente com um desastre ou quando algo muda sua visão de mundo. Se usar esta opção, você escolhe o efeito do seu Poder Zero durante a criação do personagem, mas não o seu estopim. Você não tem acesso a esse poder até despertar de uma das formas a seguir: Quando seu PJ chegar a 0 PV em um conflito, você pode despertar seu poder em vez de se render ou de se sacrificar. Quando seu personagem enfrenta uma verdade terrível, um evento ou memória que causa grande felicidade ou dor, ou quando tem acesso a uma fonte de poder crucial para a história — como um artefato — você pode despertar seu poder. Quando um personagem desperta seu poder, ele imediatamente recupera PV até ficar em crise e tem acesso a seu Poder Zero. Ele também deve escolher um estopim zero que combine com o evento que libertou seu potencial oculto. Se o despertar acontecer durante um conflito, o Relógio Zero é imediatamente preenchido. Um PJ pode usar esta regra apenas uma vez por campanha. E é seu jogador quem escolhe quando o despertar acontece — apenas garanta que o momento seja o mais apropriado! “Hoje vamos enfrentá-lo juntos — e não será como da última vez!”",
      mechanic: "O PJ escolhe o efeito do Poder Zero na criação do personagem, mas não o estopim. O poder permanece inacessível até despertar via um de dois gatilhos: (1) chegar a 0 PV em conflito — pode despertar em vez de render ou sacrificar; (2) enfrentar verdade terrível, evento de grande emoção ou acesso a fonte de poder crucial. Ao despertar: recupera PV até ficar em crise, acessa o Poder Zero e escolhe um estopim. Se durante conflito, o Relógio Zero é preenchido imediatamente. Usável apenas uma vez por campanha; o momento é escolha do jogador.",
    },
    {
      id: "poderes_combinados",
      name: "Poderes Combinados",
      sourceBook: "Atlas: Alta Fantasia",
      sourcePage: 124,
      variant: "shared",
      description: "Esta opção conecta os Poderes Zero aos vínculos entre os membros do grupo, em vez de conectá-los a apenas um personagem. Caso escolha essa opção, use estas regras: Cada PJ recebe um estopim zero normalmente, de acordo com as regras, e um Relógio Zero com 4 seções em vez de 6. Cada PJ recebe um efeito zero para cada outro PJ — decidam esse efeito em conjunto. Cada dupla possível de personagens recebe um efeito zero. Você pode usar o efeito zero apenas quando os relógios de ambos os jogadores estiverem completamente preenchidos. Apenas um personagem precisa usar a ação Poder, isso apaga ambos os relógios por completo. Exemplo: em um grupo com quatro PJs, há quatro estopins zero individuais e seis efeitos zero no total. O pistoleiro e o samurai compartilham o efeito Flagelo Zero, que nomearam como “Fatiador de Balas”. Quando ambos os Relógios Zero estiverem preenchidos por completo, qualquer um dos dois pode usar a ação Poder para usar Fatiador de Balas em seu turno. Os efeitos dos Poderes Zero são resolvidos apenas uma vez, como se o personagem tivesse usado um Poder Zero comum. Você deve usar esta opção mais complexa apenas se houver no máximo quatro personagens do jogador no grupo. Lembre-se de atualizar as combinações possíveis a cada mudança no grupo — e é por isso que, nesse caso, não há problemas se houver mais de uma versão do mesmo efeito zero por grupo. Apesar disso, todos os estopins devem ser diferentes. Se combinar esta opção com os Poderes Despertos, apenas inverta um pouco as coisas: escolha seus estopins na criação do personagem e decida o efeito de cada combinação quando um dos personagens despertar seu poder.Além disso, cada PJ pode despertar uma vez para cada outro PJ na campanha com quem criar um poder em conjunto.",
      mechanic: "Cada PJ recebe um estopim zero individual e um Relógio Zero com 4 seções (em vez de 6). Cada dupla de PJs compartilha um efeito zero único, definido em conjunto entre os dois jogadores. O efeito só pode ser usado quando ambos os relógios estiverem completamente preenchidos; apenas um PJ usa a ação Poder (ambos os relógios são esvaziados ao mesmo tempo). Restrição: máximo 4 PJs no grupo. Todos os estopins devem ser diferentes. Compatível com Poder Desperto: inverter a ordem — estopins escolhidos na criação, efeito de cada combinação definido quando o personagem desperta.",
    },
  ],
};

// Exportar para uso no app
if (typeof module !== 'undefined') module.exports = GAMEDATA;
