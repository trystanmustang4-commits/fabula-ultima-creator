// Archetypes for the PJ Generator
// Each archetype has: id, nome, descricao, icone, tags,
//   progressao[nivel] = { classes: [{id, niveis, poderes[]}] }
// progressao is defined for levels 5, 10, 15, 20 — interpolated for others

const ARQUETIPOS = [
  // ── 1. Guerreiro de Escudo — 🟡 guerreiro_sombrio → comandante ──────────
  {
    id: 'guerreiro-escudo',
    nome: 'Guerreiro de Escudo',
    descricao: 'Protetor de aliados, linha de frente inabalável.',
    icone: '🛡️',
    tags: ['tanque', 'proteção', 'físico'],
    atributosPrim: ['vig', 'des'],
    suggestedQuirks: ['glorioso_destino', 'grilhoes_do_coracao'],
    suggestedZeroPower: 'poder_desperto',
    progressao: {
      5:  { classes: [{ id:'guardiao', niveis:3, poderes:['proteger','maestria_defensiva','fortaleza'] }, { id:'comandante', niveis:2, poderes:['carga_de_cavalaria','carruagem_devastadora'] }] },
      10: { classes: [{ id:'guardiao', niveis:5, poderes:['proteger','maestria_defensiva','fortaleza','guarda_costas','duplo_escudeiro'] }, { id:'comandante', niveis:3, poderes:['carga_de_cavalaria','carruagem_devastadora','decreto_do_bispo'] }, { id:'furioso', niveis:2, poderes:['adrenalina','resistir'] }] },
      15: { classes: [{ id:'guardiao', niveis:6, poderes:['proteger','maestria_defensiva','fortaleza','guarda_costas','duplo_escudeiro','proteger'] }, { id:'comandante', niveis:5, poderes:['carga_de_cavalaria','carruagem_devastadora','decreto_do_bispo','gambito_da_dama','roque_do_rei'] }, { id:'furioso', niveis:4, poderes:['adrenalina','resistir','frenesi','espirito_indomavel'] }] },
      20: { classes: [{ id:'guardiao', niveis:8, poderes:['proteger','maestria_defensiva','fortaleza','guarda_costas','duplo_escudeiro','proteger','maestria_defensiva','fortaleza'] }, { id:'comandante', niveis:6, poderes:['carga_de_cavalaria','carruagem_devastadora','decreto_do_bispo','gambito_da_dama','roque_do_rei','carga_de_cavalaria'] }, { id:'furioso', niveis:6, poderes:['adrenalina','resistir','frenesi','espirito_indomavel','provocar','adrenalina'] }] }
    }
  },

  // ── 2. Espadachim Sombrio — 🟡 ladino → lamina_carmesim ─────────────────
  {
    id: 'espadachim-sombrio',
    nome: 'Espadachim Sombrio',
    descricao: 'Combatente veloz que usa trevas e golpes certeiros.',
    icone: '🗡️',
    tags: ['dano', 'físico', 'sombra', 'velocidade'],
    atributosPrim: ['des', 'vig'],
    suggestedQuirks: ['amaldicoado_af', 'portador_da_ruina'],
    suggestedZeroPower: 'poder_desperto',
    progressao: {
      5:  { classes: [{ id:'guerreiro_sombrio', niveis:3, poderes:['golpe_sombras','agonia','coracao_escuridao'] }, { id:'mestre_de_armas', niveis:2, poderes:['contra_ataque','trespassar'] }] },
      10: { classes: [{ id:'guerreiro_sombrio', niveis:5, poderes:['golpe_sombras','agonia','coracao_escuridao','licao_dolorosa','sangue_trevas'] }, { id:'mestre_de_armas', niveis:3, poderes:['contra_ataque','trespassar','maestria_corpo_a_corpo'] }, { id:'lamina_carmesim', niveis:2, poderes:['arsenal_vermelho','dobrar_sangue'] }] },
      15: { classes: [{ id:'guerreiro_sombrio', niveis:6, poderes:['golpe_sombras','agonia','coracao_escuridao','licao_dolorosa','sangue_trevas','golpe_sombras'] }, { id:'mestre_de_armas', niveis:5, poderes:['contra_ataque','trespassar','maestria_corpo_a_corpo','chuva_de_laminas','quebra_ossos'] }, { id:'lamina_carmesim', niveis:4, poderes:['arsenal_vermelho','dobrar_sangue','escudo_escarlate','frenesi_sanguinolento'] }] },
      20: { classes: [{ id:'guerreiro_sombrio', niveis:8, poderes:['golpe_sombras','agonia','coracao_escuridao','licao_dolorosa','sangue_trevas','golpe_sombras','agonia','coracao_escuridao'] }, { id:'mestre_de_armas', niveis:6, poderes:['contra_ataque','trespassar','maestria_corpo_a_corpo','chuva_de_laminas','quebra_ossos','contra_ataque'] }, { id:'lamina_carmesim', niveis:6, poderes:['arsenal_vermelho','dobrar_sangue','escudo_escarlate','frenesi_sanguinolento','hemofagia','arsenal_vermelho'] }] }
    }
  },

  // ── 3. Mago Elemental — 🟢 manter ───────────────────────────────────────
  {
    id: 'mago-elemental',
    nome: 'Mago Elemental',
    descricao: 'Mestre dos quatro elementos, devastador em área.',
    icone: '🔥',
    tags: ['magia', 'dano', 'elemental', 'área'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['cerne_elemental_af'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy', 'natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'elementalista', niveis:3, poderes:['magia_elemental','lamina_magica','mortalha_elemental'] }, { id:'arcanista', niveis:2, poderes:['arcanismo_ritualista','arcano_emergencial'] }] },
      10: { classes: [{ id:'elementalista', niveis:5, poderes:['magia_elemental','lamina_magica','mortalha_elemental','sobrecarga','arma_elemental'] }, { id:'arcanista', niveis:3, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano'] }, { id:'erudito', niveis:2, poderes:['analise_rapida','concentrado'] }] },
      15: { classes: [{ id:'elementalista', niveis:6, poderes:['magia_elemental','lamina_magica','mortalha_elemental','sobrecarga','arma_elemental','magia_elemental'] }, { id:'arcanista', niveis:5, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar'] }, { id:'erudito', niveis:4, poderes:['analise_rapida','concentrado','lampejo_saber','professor'] }] },
      20: { classes: [{ id:'elementalista', niveis:8, poderes:['magia_elemental','lamina_magica','mortalha_elemental','sobrecarga','arma_elemental','magia_elemental','lamina_magica','mortalha_elemental'] }, { id:'arcanista', niveis:6, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar','arcanismo_ritualista'] }, { id:'erudito', niveis:6, poderes:['analise_rapida','concentrado','lampejo_saber','professor','ritualismo_erudito','analise_rapida'] }] }
    }
  },

  // ── 4. Curandeiro Sagrado — 🟡 erudito → invocador ──────────────────────
  {
    id: 'curandeiro',
    nome: 'Curandeiro Sagrado',
    descricao: 'Suporte espiritual, cura aliados e convoca entidades de amparo.',
    icone: '✨',
    tags: ['suporte', 'cura', 'espiritual', 'invocação'],
    atributosPrim: ['von', 'ast'],
    suggestedQuirks: ['desperto', 'um_sonho_longo'],
    suggestedZeroPower: 'poder_desperto',
    progressao: {
      5:  { classes: [{ id:'espiritualista', niveis:3, poderes:['magia_espiritual','aura_protetora','expulsar_trevas'] }, { id:'orador', niveis:2, poderes:['encorajar','confio_em_voce'] }] },
      10: { classes: [{ id:'espiritualista', niveis:5, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual'] }, { id:'orador', niveis:3, poderes:['encorajar','confio_em_voce','aliado_inesperado'] }, { id:'invocador', niveis:2, poderes:['invocacao','cascata'] }] },
      15: { classes: [{ id:'espiritualista', niveis:6, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual','magia_espiritual'] }, { id:'orador', niveis:5, poderes:['encorajar','confio_em_voce','aliado_inesperado','condenar','persuasivo'] }, { id:'invocador', niveis:4, poderes:['invocacao','cascata','harmonia_elemental','expandir_manancial'] }] },
      20: { classes: [{ id:'espiritualista', niveis:8, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual','magia_espiritual','aura_protetora','expulsar_trevas'] }, { id:'orador', niveis:6, poderes:['encorajar','confio_em_voce','aliado_inesperado','condenar','persuasivo','encorajar'] }, { id:'invocador', niveis:6, poderes:['invocacao','cascata','harmonia_elemental','expandir_manancial','invocacoes_conectadas','invocacao'] }] }
    }
  },

  // ── 5. Bárbaro Furioso — 🟡 guardiao → mutante ──────────────────────────
  {
    id: 'barbaro-furioso',
    nome: 'Bárbaro Furioso',
    descricao: 'Combatente selvagem com regeneração sobrenatural e fúria bestial.',
    icone: '⚔️',
    tags: ['dano', 'físico', 'fúria', 'transformação'],
    atributosPrim: ['vig', 'des'],
    suggestedQuirks: ['experimento_fugitivo', 'neo_humano'],
    suggestedZeroPower: 'poder_desperto',
    progressao: {
      5:  { classes: [{ id:'furioso', niveis:3, poderes:['frenesi','adrenalina','espirito_indomavel'] }, { id:'mestre_de_armas', niveis:2, poderes:['quebra_ossos','maestria_corpo_a_corpo'] }] },
      10: { classes: [{ id:'furioso', niveis:5, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir'] }, { id:'mestre_de_armas', niveis:3, poderes:['quebra_ossos','maestria_corpo_a_corpo','contra_ataque'] }, { id:'mutante', niveis:2, poderes:['teriomorfose','acromorfose'] }] },
      15: { classes: [{ id:'furioso', niveis:6, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir','frenesi'] }, { id:'mestre_de_armas', niveis:5, poderes:['quebra_ossos','maestria_corpo_a_corpo','contra_ataque','trespassar','chuva_de_laminas'] }, { id:'mutante', niveis:4, poderes:['teriomorfose','acromorfose','biofagia','ecdise'] }] },
      20: { classes: [{ id:'furioso', niveis:8, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir','frenesi','adrenalina','espirito_indomavel'] }, { id:'mestre_de_armas', niveis:6, poderes:['quebra_ossos','maestria_corpo_a_corpo','contra_ataque','trespassar','chuva_de_laminas','quebra_ossos'] }, { id:'mutante', niveis:6, poderes:['teriomorfose','acromorfose','biofagia','ecdise','genoclepse','teriomorfose'] }] }
    }
  },

  // ── 6. Ladino Arqueiro — 🟡 andarilho → bandoleiro ──────────────────────
  {
    id: 'ladino-arqueiro',
    nome: 'Ladino Arqueiro',
    descricao: 'Atirador furtivo que atinge pontos vitais à distância.',
    icone: '🏹',
    tags: ['dano', 'distância', 'furtividade', 'velocidade'],
    atributosPrim: ['des', 'ast'],
    suggestedQuirks: ['arma_antiga', 'sobrevivente_nf'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'atirador', niveis:3, poderes:['maestria_distancia','tiro_de_aviso','zona_de_perigo'] }, { id:'ladino', niveis:2, poderes:['alta_velocidade','golpe_baixo'] }] },
      10: { classes: [{ id:'atirador', niveis:5, poderes:['maestria_distancia','tiro_de_aviso','zona_de_perigo','barragem','fogo_cruzado'] }, { id:'ladino', niveis:3, poderes:['alta_velocidade','golpe_baixo','esquiva'] }, { id:'bandoleiro', niveis:2, poderes:['sertanejo','cabra_da_peste'] }] },
      15: { classes: [{ id:'atirador', niveis:6, poderes:['maestria_distancia','tiro_de_aviso','zona_de_perigo','barragem','fogo_cruzado','maestria_distancia'] }, { id:'ladino', niveis:5, poderes:['alta_velocidade','golpe_baixo','esquiva','roubo_de_alma','vejo_voce_mais_tarde'] }, { id:'bandoleiro', niveis:4, poderes:['sertanejo','cabra_da_peste','valhacouto','lider_de_bando'] }] },
      20: { classes: [{ id:'atirador', niveis:8, poderes:['maestria_distancia','tiro_de_aviso','zona_de_perigo','barragem','fogo_cruzado','maestria_distancia','tiro_de_aviso','zona_de_perigo'] }, { id:'ladino', niveis:6, poderes:['alta_velocidade','golpe_baixo','esquiva','roubo_de_alma','vejo_voce_mais_tarde','alta_velocidade'] }, { id:'bandoleiro', niveis:6, poderes:['sertanejo','cabra_da_peste','valhacouto','lider_de_bando','redistribuir_riquezas','sertanejo'] }] }
    }
  },

  // ── 7. Guerreiro Versátil — 🟢 manter ───────────────────────────────────
  {
    id: 'guerreiro-versatil',
    nome: 'Guerreiro Versátil',
    descricao: 'Combatente equilibrado, adaptável a qualquer situação.',
    icone: '⚔️',
    tags: ['físico', 'versátil', 'equilibrado'],
    atributosPrim: ['des', 'vig'],
    suggestedQuirks: ['maos_vazias', 'heranca'],
    suggestedZeroPower: 'poderes_combinados',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'mestre_de_armas', niveis:3, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas'] }, { id:'guardiao', niveis:2, poderes:['proteger','fortaleza'] }] },
      10: { classes: [{ id:'mestre_de_armas', niveis:4, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos'] }, { id:'guardiao', niveis:3, poderes:['proteger','fortaleza','maestria_defensiva'] }, { id:'atirador', niveis:3, poderes:['maestria_distancia','tiro_de_aviso','barragem'] }] },
      15: { classes: [{ id:'mestre_de_armas', niveis:5, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos','trespassar'] }, { id:'guardiao', niveis:5, poderes:['proteger','fortaleza','maestria_defensiva','guarda_costas','duplo_escudeiro'] }, { id:'atirador', niveis:5, poderes:['maestria_distancia','tiro_de_aviso','barragem','fogo_cruzado','zona_de_perigo'] }] },
      20: { classes: [{ id:'mestre_de_armas', niveis:7, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos','trespassar','maestria_corpo_a_corpo','contra_ataque'] }, { id:'guardiao', niveis:6, poderes:['proteger','fortaleza','maestria_defensiva','guarda_costas','duplo_escudeiro','proteger'] }, { id:'atirador', niveis:7, poderes:['maestria_distancia','tiro_de_aviso','barragem','fogo_cruzado','zona_de_perigo','maestria_distancia','tiro_de_aviso'] }] }
    }
  },

  // ── 8. Mago Arcano — 🟡 elementalista → simbolista ──────────────────────
  {
    id: 'mago-arcano',
    nome: 'Mago Arcano',
    descricao: 'Estudioso do arcano, invocador de rituais e símbolos de poder.',
    icone: '🔮',
    tags: ['magia', 'ritual', 'arcano', 'símbolos'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['grimorio_misterioso', 'herdeiro_da_bruxaria'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'arcanista', niveis:3, poderes:['arcanismo_ritualista','circulo_arcano','vincular_e_invocar'] }, { id:'erudito', niveis:2, poderes:['concentrado','ritualismo_erudito'] }] },
      10: { classes: [{ id:'arcanista', niveis:5, poderes:['arcanismo_ritualista','circulo_arcano','vincular_e_invocar','arcano_emergencial','regeneracao_arcana'] }, { id:'erudito', niveis:3, poderes:['concentrado','ritualismo_erudito','lampejo_saber'] }, { id:'simbolista', niveis:2, poderes:['simbolos_magicos','simbolismo'] }] },
      15: { classes: [{ id:'arcanista', niveis:6, poderes:['arcanismo_ritualista','circulo_arcano','vincular_e_invocar','arcano_emergencial','regeneracao_arcana','arcanismo_ritualista'] }, { id:'erudito', niveis:5, poderes:['concentrado','ritualismo_erudito','lampejo_saber','analise_rapida','professor'] }, { id:'simbolista', niveis:4, poderes:['simbolos_magicos','simbolismo','conexao_simbolica','miragem'] }] },
      20: { classes: [{ id:'arcanista', niveis:8, poderes:['arcanismo_ritualista','circulo_arcano','vincular_e_invocar','arcano_emergencial','regeneracao_arcana','arcanismo_ritualista','circulo_arcano','vincular_e_invocar'] }, { id:'erudito', niveis:6, poderes:['concentrado','ritualismo_erudito','lampejo_saber','analise_rapida','professor','ritualismo_erudito'] }, { id:'simbolista', niveis:6, poderes:['simbolos_magicos','simbolismo','conexao_simbolica','miragem','toque_pessoal','simbolos_magicos'] }] }
    }
  },

  // ── 9. Orador Bardo — 🔴 espiritualista → virtuoso ──────────────────────
  {
    id: 'orador-bardo',
    nome: 'Orador Bardo',
    descricao: 'Músico combatente que inspira aliados com canto e palavra.',
    icone: '🎶',
    tags: ['suporte', 'música', 'inspiração', 'social'],
    atributosPrim: ['von', 'ast'],
    suggestedQuirks: ['glorioso_destino', 'herdeiro_relutante'],
    suggestedZeroPower: 'poderes_combinados',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'orador', niveis:3, poderes:['encorajar','confio_em_voce','aliado_inesperado'] }, { id:'andarilho', niveis:2, poderes:['papo_taverna','companheiro_fiel'] }] },
      10: { classes: [{ id:'orador', niveis:5, poderes:['encorajar','confio_em_voce','aliado_inesperado','condenar','persuasivo'] }, { id:'andarilho', niveis:3, poderes:['papo_taverna','companheiro_fiel','cacador_tesouros'] }, { id:'virtuoso', niveis:2, poderes:['magicanto','harmonia'] }] },
      15: { classes: [{ id:'orador', niveis:6, poderes:['encorajar','confio_em_voce','aliado_inesperado','condenar','persuasivo','encorajar'] }, { id:'andarilho', niveis:5, poderes:['papo_taverna','companheiro_fiel','cacador_tesouros','pratico','viajante_experiente'] }, { id:'virtuoso', niveis:4, poderes:['magicanto','harmonia','canto_da_sereia','vibrato'] }] },
      20: { classes: [{ id:'orador', niveis:8, poderes:['encorajar','confio_em_voce','aliado_inesperado','condenar','persuasivo','encorajar','confio_em_voce','aliado_inesperado'] }, { id:'andarilho', niveis:6, poderes:['papo_taverna','companheiro_fiel','cacador_tesouros','pratico','viajante_experiente','papo_taverna'] }, { id:'virtuoso', niveis:6, poderes:['magicanto','harmonia','canto_da_sereia','vibrato','barreira_sonora','magicanto'] }] }
    }
  },

  // ── 10. Inventor Alquimista — 🟡 andarilho → mercador ───────────────────
  {
    id: 'inventor',
    nome: 'Inventor Alquimista',
    descricao: 'Criador de itens, poções e engenhocas — e mestre em vendê-las.',
    icone: '⚗️',
    tags: ['suporte', 'itens', 'criativo', 'versátil'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['oficina_itinerante', 'inventor_prodigio'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['natural-fantasy', 'techno-fantasy'],
    progressao: {
      5:  { classes: [{ id:'inventor', niveis:3, poderes:['engenhocas','formula_secreta','chuva_de_pocoes'] }, { id:'erudito', niveis:2, poderes:['analise_rapida','lampejo_saber'] }] },
      10: { classes: [{ id:'inventor', niveis:5, poderes:['engenhocas','formula_secreta','chuva_de_pocoes','item_emergencial','visionario'] }, { id:'erudito', niveis:3, poderes:['analise_rapida','lampejo_saber','concentrado'] }, { id:'mercador', niveis:2, poderes:['estoque_pessoal','verdadeiro_tesouro'] }] },
      15: { classes: [{ id:'inventor', niveis:6, poderes:['engenhocas','formula_secreta','chuva_de_pocoes','item_emergencial','visionario','engenhocas'] }, { id:'erudito', niveis:5, poderes:['analise_rapida','lampejo_saber','concentrado','professor','ritualismo_erudito'] }, { id:'mercador', niveis:4, poderes:['estoque_pessoal','verdadeiro_tesouro','ja_ouvi_falar','data_de_validade'] }] },
      20: { classes: [{ id:'inventor', niveis:8, poderes:['engenhocas','formula_secreta','chuva_de_pocoes','item_emergencial','visionario','engenhocas','formula_secreta','chuva_de_pocoes'] }, { id:'erudito', niveis:6, poderes:['analise_rapida','lampejo_saber','concentrado','professor','ritualismo_erudito','analise_rapida'] }, { id:'mercador', niveis:6, poderes:['estoque_pessoal','verdadeiro_tesouro','ja_ouvi_falar','data_de_validade','ventos_do_comercio','estoque_pessoal'] }] }
    }
  },

  // ── 11. Guerreiro Arcano — 🔴 guerreiro_sombrio → cavaleiro_magico ───────
  {
    id: 'guerreiro-arcano',
    nome: 'Guerreiro Arcano',
    descricao: 'Combina força física com magia elemental e transformação mágica.',
    icone: '⚡',
    tags: ['físico', 'magia', 'híbrido', 'transformação'],
    atributosPrim: ['des', 'ast'],
    suggestedQuirks: ['cerne_elemental_af', 'voo_af'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'elementalista', niveis:3, poderes:['arma_elemental','lamina_magica','magia_elemental'] }, { id:'mestre_de_armas', niveis:2, poderes:['maestria_corpo_a_corpo','contra_ataque'] }] },
      10: { classes: [{ id:'elementalista', niveis:4, poderes:['arma_elemental','lamina_magica','magia_elemental','mortalha_elemental'] }, { id:'mestre_de_armas', niveis:3, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas'] }, { id:'cavaleiro_magico', niveis:3, poderes:['alma_ferida','coracao_ardente','impulso_do_coracao'] }] },
      15: { classes: [{ id:'elementalista', niveis:5, poderes:['arma_elemental','lamina_magica','magia_elemental','mortalha_elemental','sobrecarga'] }, { id:'mestre_de_armas', niveis:5, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','trespassar','quebra_ossos'] }, { id:'cavaleiro_magico', niveis:5, poderes:['alma_ferida','coracao_ardente','impulso_do_coracao','magitransformacao','transformacao_aprimorada'] }] },
      20: { classes: [{ id:'elementalista', niveis:7, poderes:['arma_elemental','lamina_magica','magia_elemental','mortalha_elemental','sobrecarga','arma_elemental','lamina_magica'] }, { id:'mestre_de_armas', niveis:6, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','trespassar','quebra_ossos','maestria_corpo_a_corpo'] }, { id:'cavaleiro_magico', niveis:7, poderes:['alma_ferida','coracao_ardente','impulso_do_coracao','magitransformacao','transformacao_aprimorada','alma_ferida','coracao_ardente'] }] }
    }
  },

  // ── 12. Pistoleiro Ágil — 🟡 furioso → malandro ─────────────────────────
  {
    id: 'atirador-pistoleiro',
    nome: 'Pistoleiro Ágil',
    descricao: 'Atirador fora-da-lei: precisão, malandragem e o primeiro disparo.',
    icone: '🔫',
    tags: ['distância', 'velocidade', 'dano', 'malandragem'],
    atributosPrim: ['des', 'vig'],
    suggestedQuirks: ['agitador', 'oficial_arrependido'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['techno-fantasy'],
    progressao: {
      5:  { classes: [{ id:'atirador', niveis:3, poderes:['maestria_distancia','barragem','fogo_cruzado'] }, { id:'ladino', niveis:2, poderes:['alta_velocidade','esquiva'] }] },
      10: { classes: [{ id:'atirador', niveis:5, poderes:['maestria_distancia','barragem','fogo_cruzado','tiro_de_aviso','zona_de_perigo'] }, { id:'ladino', niveis:3, poderes:['alta_velocidade','esquiva','golpe_baixo'] }, { id:'malandro', niveis:2, poderes:['golpe_aproveitador','explorar_fraqueza'] }] },
      15: { classes: [{ id:'atirador', niveis:6, poderes:['maestria_distancia','barragem','fogo_cruzado','tiro_de_aviso','zona_de_perigo','maestria_distancia'] }, { id:'ladino', niveis:5, poderes:['alta_velocidade','esquiva','golpe_baixo','roubo_de_alma','vejo_voce_mais_tarde'] }, { id:'malandro', niveis:4, poderes:['golpe_aproveitador','explorar_fraqueza','jeitinho','gambiarra'] }] },
      20: { classes: [{ id:'atirador', niveis:8, poderes:['maestria_distancia','barragem','fogo_cruzado','tiro_de_aviso','zona_de_perigo','maestria_distancia','barragem','fogo_cruzado'] }, { id:'ladino', niveis:6, poderes:['alta_velocidade','esquiva','golpe_baixo','roubo_de_alma','vejo_voce_mais_tarde','alta_velocidade'] }, { id:'malandro', niveis:6, poderes:['golpe_aproveitador','explorar_fraqueza','jeitinho','gambiarra','engabelar','golpe_aproveitador'] }] }
    }
  },

  // ── 13. Mago Sombrio — 🔴 guerreiro_sombrio → simbolista ────────────────
  {
    id: 'mago-sombrio',
    nome: 'Mago Sombrio',
    descricao: 'Conjurador de magia entropica e ilusões, manipula destino e azar.',
    icone: '💀',
    tags: ['magia', 'trevas', 'controle', 'enfraquecimento'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['diabolista', 'portador_da_ruina'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'entropista', niveis:3, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte'] }, { id:'simbolista', niveis:2, poderes:['miragem','simbolismo'] }] },
      10: { classes: [{ id:'entropista', niveis:5, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte','canalizar_trevas','ritual_entropico'] }, { id:'simbolista', niveis:3, poderes:['miragem','simbolismo','toque_pessoal'] }, { id:'arcanista', niveis:2, poderes:['arcanismo_ritualista','arcano_emergencial'] }] },
      15: { classes: [{ id:'entropista', niveis:6, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte','canalizar_trevas','ritual_entropico','magia_entropica'] }, { id:'simbolista', niveis:5, poderes:['miragem','simbolismo','toque_pessoal','conexao_simbolica','simbolos_magicos'] }, { id:'arcanista', niveis:4, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana'] }] },
      20: { classes: [{ id:'entropista', niveis:8, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte','canalizar_trevas','ritual_entropico','magia_entropica','nuvem_de_azar','sete_da_sorte'] }, { id:'simbolista', niveis:6, poderes:['miragem','simbolismo','toque_pessoal','conexao_simbolica','simbolos_magicos','miragem'] }, { id:'arcanista', niveis:6, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar','arcanismo_ritualista'] }] }
    }
  },

  // ── 14. Quimerista Selvagem — 🟡 elementalista → mutante ─────────────────
  {
    id: 'quimerista',
    nome: 'Quimerista Selvagem',
    descricao: 'Transforma-se absorvendo e mutando características de monstros.',
    icone: '🐉',
    tags: ['transformação', 'adaptação', 'físico', 'mutação'],
    atributosPrim: ['vig', 'ast'],
    suggestedQuirks: ['xifossimbiose', 'neo_humano'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['techno-fantasy', 'natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'quimerista', niveis:3, poderes:['quimerismo_ritualista','lingua_das_feras','consumir'] }, { id:'furioso', niveis:2, poderes:['frenesi','adrenalina'] }] },
      10: { classes: [{ id:'quimerista', niveis:5, poderes:['quimerismo_ritualista','lingua_das_feras','consumir','imitacao_magica','patogenese'] }, { id:'furioso', niveis:3, poderes:['frenesi','adrenalina','espirito_indomavel'] }, { id:'mutante', niveis:2, poderes:['genoclepse','acromorfose'] }] },
      15: { classes: [{ id:'quimerista', niveis:6, poderes:['quimerismo_ritualista','lingua_das_feras','consumir','imitacao_magica','patogenese','quimerismo_ritualista'] }, { id:'furioso', niveis:5, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir'] }, { id:'mutante', niveis:4, poderes:['genoclepse','acromorfose','biofagia','teriomorfose'] }] },
      20: { classes: [{ id:'quimerista', niveis:8, poderes:['quimerismo_ritualista','lingua_das_feras','consumir','imitacao_magica','patogenese','quimerismo_ritualista','lingua_das_feras','consumir'] }, { id:'furioso', niveis:6, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir','frenesi'] }, { id:'mutante', niveis:6, poderes:['genoclepse','acromorfose','biofagia','teriomorfose','ecdise','genoclepse'] }] }
    }
  },

  // ── 15. Paladino Curandeiro — 🟡 mestre_de_armas → cavaleiro_magico ──────
  {
    id: 'paladino-curandeiro',
    nome: 'Paladino Curandeiro',
    descricao: 'Guerreiro sagrado que protege, cura e se transforma pelo fervor.',
    icone: '🌟',
    tags: ['físico', 'suporte', 'cura', 'transformação'],
    atributosPrim: ['vig', 'von'],
    suggestedQuirks: ['glorioso_destino', 'grilhoes_do_coracao'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'guardiao', niveis:3, poderes:['proteger','guarda_costas','fortaleza'] }, { id:'espiritualista', niveis:2, poderes:['magia_espiritual','aura_protetora'] }] },
      10: { classes: [{ id:'guardiao', niveis:4, poderes:['proteger','guarda_costas','fortaleza','maestria_defensiva'] }, { id:'espiritualista', niveis:4, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna'] }, { id:'cavaleiro_magico', niveis:2, poderes:['alma_ferida','coracao_ardente'] }] },
      15: { classes: [{ id:'guardiao', niveis:5, poderes:['proteger','guarda_costas','fortaleza','maestria_defensiva','duplo_escudeiro'] }, { id:'espiritualista', niveis:6, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual','magia_espiritual'] }, { id:'cavaleiro_magico', niveis:4, poderes:['alma_ferida','coracao_ardente','impulso_do_coracao','magitransformacao'] }] },
      20: { classes: [{ id:'guardiao', niveis:7, poderes:['proteger','guarda_costas','fortaleza','maestria_defensiva','duplo_escudeiro','proteger','guarda_costas'] }, { id:'espiritualista', niveis:7, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual','magia_espiritual','aura_protetora'] }, { id:'cavaleiro_magico', niveis:6, poderes:['alma_ferida','coracao_ardente','impulso_do_coracao','magitransformacao','transformacao_aprimorada','alma_ferida'] }] }
    }
  },

  // ── 16. Tático Erudito — 🔴 andarilho → comandante ──────────────────────
  {
    id: 'tatico-erudito',
    nome: 'Tático Erudito',
    descricao: 'General acadêmico que comanda o campo com conhecimento e estratégia.',
    icone: '📚',
    tags: ['suporte', 'controle', 'conhecimento', 'comando'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['glorioso_destino', 'heranca'],
    suggestedZeroPower: 'poderes_combinados',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'erudito', niveis:3, poderes:['analise_rapida','lampejo_saber','professor'] }, { id:'orador', niveis:2, poderes:['encorajar','condenar'] }] },
      10: { classes: [{ id:'erudito', niveis:5, poderes:['analise_rapida','lampejo_saber','professor','concentrado','ritualismo_erudito'] }, { id:'orador', niveis:3, poderes:['encorajar','condenar','persuasivo'] }, { id:'comandante', niveis:2, poderes:['gambito_da_dama','decreto_do_bispo'] }] },
      15: { classes: [{ id:'erudito', niveis:6, poderes:['analise_rapida','lampejo_saber','professor','concentrado','ritualismo_erudito','analise_rapida'] }, { id:'orador', niveis:5, poderes:['encorajar','condenar','persuasivo','confio_em_voce','aliado_inesperado'] }, { id:'comandante', niveis:4, poderes:['gambito_da_dama','decreto_do_bispo','roque_do_rei','carga_de_cavalaria'] }] },
      20: { classes: [{ id:'erudito', niveis:8, poderes:['analise_rapida','lampejo_saber','professor','concentrado','ritualismo_erudito','analise_rapida','lampejo_saber','professor'] }, { id:'orador', niveis:6, poderes:['encorajar','condenar','persuasivo','confio_em_voce','aliado_inesperado','encorajar'] }, { id:'comandante', niveis:6, poderes:['gambito_da_dama','decreto_do_bispo','roque_do_rei','carga_de_cavalaria','carruagem_devastadora','gambito_da_dama'] }] }
    }
  },

  // ── 17. Assassino das Sombras — 🟡 entropista → malandro ─────────────────
  {
    id: 'assassino',
    nome: 'Assassino das Sombras',
    descricao: 'Elimina alvos com precisão cirúrgica, golpes sujos e desaparece.',
    icone: '🌑',
    tags: ['dano', 'furtividade', 'single-target', 'malandragem'],
    atributosPrim: ['des', 'ast'],
    suggestedQuirks: ['mil_faces', 'de_um_mundo_distante_tf'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['techno-fantasy'],
    progressao: {
      5:  { classes: [{ id:'ladino', niveis:3, poderes:['golpe_baixo','alta_velocidade','vejo_voce_mais_tarde'] }, { id:'guerreiro_sombrio', niveis:2, poderes:['golpe_sombras','agonia'] }] },
      10: { classes: [{ id:'ladino', niveis:5, poderes:['golpe_baixo','alta_velocidade','vejo_voce_mais_tarde','esquiva','roubo_de_alma'] }, { id:'guerreiro_sombrio', niveis:3, poderes:['golpe_sombras','agonia','coracao_escuridao'] }, { id:'malandro', niveis:2, poderes:['golpe_aproveitador','explorar_fraqueza'] }] },
      15: { classes: [{ id:'ladino', niveis:6, poderes:['golpe_baixo','alta_velocidade','vejo_voce_mais_tarde','esquiva','roubo_de_alma','golpe_baixo'] }, { id:'guerreiro_sombrio', niveis:5, poderes:['golpe_sombras','agonia','coracao_escuridao','licao_dolorosa','sangue_trevas'] }, { id:'malandro', niveis:4, poderes:['golpe_aproveitador','explorar_fraqueza','jeitinho','gambiarra'] }] },
      20: { classes: [{ id:'ladino', niveis:8, poderes:['golpe_baixo','alta_velocidade','vejo_voce_mais_tarde','esquiva','roubo_de_alma','golpe_baixo','alta_velocidade','vejo_voce_mais_tarde'] }, { id:'guerreiro_sombrio', niveis:6, poderes:['golpe_sombras','agonia','coracao_escuridao','licao_dolorosa','sangue_trevas','golpe_sombras'] }, { id:'malandro', niveis:6, poderes:['golpe_aproveitador','explorar_fraqueza','jeitinho','gambiarra','engabelar','golpe_aproveitador'] }] }
    }
  },

  // ── 18. Furioso Guerreiro — 🟢 manter ───────────────────────────────────
  {
    id: 'furioso-guerreiro',
    nome: 'Furioso Guerreiro',
    descricao: 'Usa adrenalina e ataques furiosos sombrios para dominar o campo.',
    icone: '💢',
    tags: ['dano', 'físico', 'fúria', 'sombra'],
    atributosPrim: ['vig', 'des'],
    suggestedQuirks: ['portador_da_ruina', 'amaldicoado_af'],
    suggestedZeroPower: 'poder_desperto',
    progressao: {
      5:  { classes: [{ id:'furioso', niveis:3, poderes:['frenesi','provocar','espirito_indomavel'] }, { id:'mestre_de_armas', niveis:2, poderes:['maestria_corpo_a_corpo','chuva_de_laminas'] }] },
      10: { classes: [{ id:'furioso', niveis:5, poderes:['frenesi','provocar','espirito_indomavel','adrenalina','resistir'] }, { id:'mestre_de_armas', niveis:4, poderes:['maestria_corpo_a_corpo','chuva_de_laminas','quebra_ossos','trespassar'] }, { id:'guerreiro_sombrio', niveis:1, poderes:['agonia'] }] },
      15: { classes: [{ id:'furioso', niveis:6, poderes:['frenesi','provocar','espirito_indomavel','adrenalina','resistir','frenesi'] }, { id:'mestre_de_armas', niveis:5, poderes:['maestria_corpo_a_corpo','chuva_de_laminas','quebra_ossos','trespassar','contra_ataque'] }, { id:'guerreiro_sombrio', niveis:4, poderes:['agonia','golpe_sombras','coracao_escuridao','licao_dolorosa'] }] },
      20: { classes: [{ id:'furioso', niveis:8, poderes:['frenesi','provocar','espirito_indomavel','adrenalina','resistir','frenesi','provocar','espirito_indomavel'] }, { id:'mestre_de_armas', niveis:6, poderes:['maestria_corpo_a_corpo','chuva_de_laminas','quebra_ossos','trespassar','contra_ataque','maestria_corpo_a_corpo'] }, { id:'guerreiro_sombrio', niveis:6, poderes:['agonia','golpe_sombras','coracao_escuridao','licao_dolorosa','sangue_trevas','agonia'] }] }
    }
  },

  // ── 19. Invocador de Criaturas — 🔴 arcanista primário → invocador primário
  {
    id: 'invocador',
    nome: 'Invocador de Criaturas',
    descricao: 'Vincula e invoca criaturas mágicas para combater e proteger.',
    icone: '🌀',
    tags: ['invocação', 'magia', 'suporte', 'natural'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['desperto', 'fera_falante_nf'],
    suggestedZeroPower: 'poderes_combinados',
    subgenres: ['natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'invocador', niveis:3, poderes:['invocacao','cascata','harmonia_elemental'] }, { id:'espiritualista', niveis:2, poderes:['magia_espiritual','ritualismo_espiritual'] }] },
      10: { classes: [{ id:'invocador', niveis:5, poderes:['invocacao','cascata','harmonia_elemental','expandir_manancial','invocacoes_conectadas'] }, { id:'espiritualista', niveis:3, poderes:['magia_espiritual','ritualismo_espiritual','aura_protetora'] }, { id:'arcanista', niveis:2, poderes:['arcanismo_ritualista','arcano_emergencial'] }] },
      15: { classes: [{ id:'invocador', niveis:6, poderes:['invocacao','cascata','harmonia_elemental','expandir_manancial','invocacoes_conectadas','invocacao'] }, { id:'espiritualista', niveis:5, poderes:['magia_espiritual','ritualismo_espiritual','aura_protetora','expulsar_trevas','bencao_eterna'] }, { id:'arcanista', niveis:4, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana'] }] },
      20: { classes: [{ id:'invocador', niveis:8, poderes:['invocacao','cascata','harmonia_elemental','expandir_manancial','invocacoes_conectadas','invocacao','cascata','harmonia_elemental'] }, { id:'espiritualista', niveis:6, poderes:['magia_espiritual','ritualismo_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','magia_espiritual'] }, { id:'arcanista', niveis:6, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar','arcanismo_ritualista'] }] }
    }
  },

  // ── 20. Apostador do Destino — 🟢 manter (Opção A: Orador permanece) ─────
  {
    id: 'apostador',
    nome: 'Apostador do Destino',
    descricao: 'Joga com o azar, poderes imprevisíveis mas poderosos.',
    icone: '🎲',
    tags: ['azar', 'imprevisível', 'dano', 'controle'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['glorioso_destino', 'a_promessa_que_te_detem'],
    suggestedZeroPower: 'poder_desperto',
    progressao: {
      5:  { classes: [{ id:'entropista', niveis:3, poderes:['sete_da_sorte','magia_entropica','nuvem_de_azar'] }, { id:'ladino', niveis:2, poderes:['alta_velocidade','roubo_de_alma'] }] },
      10: { classes: [{ id:'entropista', niveis:5, poderes:['sete_da_sorte','magia_entropica','nuvem_de_azar','canalizar_trevas','ritual_entropico'] }, { id:'ladino', niveis:3, poderes:['alta_velocidade','roubo_de_alma','golpe_baixo'] }, { id:'orador', niveis:2, poderes:['persuasivo','aliado_inesperado'] }] },
      15: { classes: [{ id:'entropista', niveis:6, poderes:['sete_da_sorte','magia_entropica','nuvem_de_azar','canalizar_trevas','ritual_entropico','sete_da_sorte'] }, { id:'ladino', niveis:5, poderes:['alta_velocidade','roubo_de_alma','golpe_baixo','esquiva','vejo_voce_mais_tarde'] }, { id:'orador', niveis:4, poderes:['persuasivo','aliado_inesperado','encorajar','condenar'] }] },
      20: { classes: [{ id:'entropista', niveis:8, poderes:['sete_da_sorte','magia_entropica','nuvem_de_azar','canalizar_trevas','ritual_entropico','sete_da_sorte','magia_entropica','nuvem_de_azar'] }, { id:'ladino', niveis:6, poderes:['alta_velocidade','roubo_de_alma','golpe_baixo','esquiva','vejo_voce_mais_tarde','alta_velocidade'] }, { id:'orador', niveis:6, poderes:['persuasivo','aliado_inesperado','encorajar','condenar','confio_em_voce','persuasivo'] }] }
    }
  },

  // ── 21. Sombra Selvagem — 🟡 guerreiro_sombrio → lamina_carmesim ─────────
  {
    id: 'sombra-selvagem',
    nome: 'Sombra Selvagem',
    descricao: 'Predador que usa sangue como recurso e muta sob a lua.',
    icone: '🐺',
    tags: ['trevas', 'físico', 'transformação', 'sangue'],
    atributosPrim: ['des', 'vig'],
    suggestedQuirks: ['xifossimbiose', 'fera_falante_tf'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['techno-fantasy'],
    progressao: {
      5:  { classes: [{ id:'quimerista', niveis:3, poderes:['quimerismo_ritualista','consumir','lingua_das_feras'] }, { id:'lamina_carmesim', niveis:2, poderes:['hemofagia','dobrar_sangue'] }] },
      10: { classes: [{ id:'quimerista', niveis:4, poderes:['quimerismo_ritualista','consumir','lingua_das_feras','imitacao_magica'] }, { id:'lamina_carmesim', niveis:4, poderes:['hemofagia','dobrar_sangue','arsenal_vermelho','frenesi_sanguinolento'] }, { id:'furioso', niveis:2, poderes:['frenesi','adrenalina'] }] },
      15: { classes: [{ id:'quimerista', niveis:5, poderes:['quimerismo_ritualista','consumir','lingua_das_feras','imitacao_magica','patogenese'] }, { id:'lamina_carmesim', niveis:5, poderes:['hemofagia','dobrar_sangue','arsenal_vermelho','frenesi_sanguinolento','escudo_escarlate'] }, { id:'furioso', niveis:5, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir'] }] },
      20: { classes: [{ id:'quimerista', niveis:7, poderes:['quimerismo_ritualista','consumir','lingua_das_feras','imitacao_magica','patogenese','quimerismo_ritualista','consumir'] }, { id:'lamina_carmesim', niveis:7, poderes:['hemofagia','dobrar_sangue','arsenal_vermelho','frenesi_sanguinolento','escudo_escarlate','hemofagia','dobrar_sangue'] }, { id:'furioso', niveis:6, poderes:['frenesi','adrenalina','espirito_indomavel','provocar','resistir','frenesi'] }] }
    }
  },

  // ── 22. Explorador Furtivo — 🟡 atirador → bandoleiro ───────────────────
  {
    id: 'explorador-furtivo',
    nome: 'Explorador Furtivo',
    descricao: 'Ranger fora-da-lei que conhece os caminhos e domina o território.',
    icone: '🌿',
    tags: ['velocidade', 'furtividade', 'exploração', 'sertão'],
    atributosPrim: ['des', 'ast'],
    suggestedQuirks: ['sobrevivente_nf', 'arma_antiga'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'andarilho', niveis:3, poderes:['viajante_experiente','cacador_tesouros','pratico'] }, { id:'ladino', niveis:2, poderes:['alta_velocidade','esquiva'] }] },
      10: { classes: [{ id:'andarilho', niveis:5, poderes:['viajante_experiente','cacador_tesouros','pratico','companheiro_fiel','papo_taverna'] }, { id:'ladino', niveis:3, poderes:['alta_velocidade','esquiva','golpe_baixo'] }, { id:'bandoleiro', niveis:2, poderes:['valhacouto','sertanejo'] }] },
      15: { classes: [{ id:'andarilho', niveis:6, poderes:['viajante_experiente','cacador_tesouros','pratico','companheiro_fiel','papo_taverna','viajante_experiente'] }, { id:'ladino', niveis:5, poderes:['alta_velocidade','esquiva','golpe_baixo','roubo_de_alma','vejo_voce_mais_tarde'] }, { id:'bandoleiro', niveis:4, poderes:['valhacouto','sertanejo','cabra_da_peste','redistribuir_riquezas'] }] },
      20: { classes: [{ id:'andarilho', niveis:8, poderes:['viajante_experiente','cacador_tesouros','pratico','companheiro_fiel','papo_taverna','viajante_experiente','cacador_tesouros','pratico'] }, { id:'ladino', niveis:6, poderes:['alta_velocidade','esquiva','golpe_baixo','roubo_de_alma','vejo_voce_mais_tarde','alta_velocidade'] }, { id:'bandoleiro', niveis:6, poderes:['valhacouto','sertanejo','cabra_da_peste','redistribuir_riquezas','lider_de_bando','valhacouto'] }] }
    }
  },

  // ── 23. Guardião Combatente — 🟢 manter ─────────────────────────────────
  {
    id: 'guardiao-combatente',
    nome: 'Guardião Combatente',
    descricao: 'Tanque ofensivo que protege e pune atacantes.',
    icone: '🏰',
    tags: ['tanque', 'proteção', 'contraataque', 'físico'],
    atributosPrim: ['vig', 'des'],
    suggestedQuirks: ['maos_vazias', 'glorioso_destino'],
    suggestedZeroPower: 'poderes_combinados',
    progressao: {
      5:  { classes: [{ id:'guardiao', niveis:3, poderes:['proteger','maestria_defensiva','guarda_costas'] }, { id:'mestre_de_armas', niveis:2, poderes:['contra_ataque','quebra_ossos'] }] },
      10: { classes: [{ id:'guardiao', niveis:5, poderes:['proteger','maestria_defensiva','guarda_costas','fortaleza','duplo_escudeiro'] }, { id:'mestre_de_armas', niveis:3, poderes:['contra_ataque','quebra_ossos','maestria_corpo_a_corpo'] }, { id:'furioso', niveis:2, poderes:['adrenalina','provocar'] }] },
      15: { classes: [{ id:'guardiao', niveis:6, poderes:['proteger','maestria_defensiva','guarda_costas','fortaleza','duplo_escudeiro','proteger'] }, { id:'mestre_de_armas', niveis:5, poderes:['contra_ataque','quebra_ossos','maestria_corpo_a_corpo','chuva_de_laminas','trespassar'] }, { id:'furioso', niveis:4, poderes:['adrenalina','provocar','frenesi','resistir'] }] },
      20: { classes: [{ id:'guardiao', niveis:8, poderes:['proteger','maestria_defensiva','guarda_costas','fortaleza','duplo_escudeiro','proteger','maestria_defensiva','guarda_costas'] }, { id:'mestre_de_armas', niveis:6, poderes:['contra_ataque','quebra_ossos','maestria_corpo_a_corpo','chuva_de_laminas','trespassar','contra_ataque'] }, { id:'furioso', niveis:6, poderes:['adrenalina','provocar','frenesi','resistir','espirito_indomavel','adrenalina'] }] }
    }
  },

  // ── 24. Aventureiro Generalista — 🟢 manter ──────────────────────────────
  {
    id: 'generalista',
    nome: 'Aventureiro Generalista',
    descricao: 'Sem especialização definida, adaptável a qualquer papel.',
    icone: '🌐',
    tags: ['versátil', 'equilibrado', 'generalista'],
    atributosPrim: ['des', 'ast'],
    suggestedQuirks: ['herdeiro_relutante', 'paria_feerico'],
    suggestedZeroPower: 'poderes_combinados',
    progressao: {
      5:  { classes: [{ id:'andarilho', niveis:2, poderes:['viajante_experiente','cacador_tesouros'] }, { id:'mestre_de_armas', niveis:2, poderes:['maestria_corpo_a_corpo','contra_ataque'] }, { id:'erudito', niveis:1, poderes:['analise_rapida'] }] },
      10: { classes: [{ id:'andarilho', niveis:3, poderes:['viajante_experiente','cacador_tesouros','pratico'] }, { id:'mestre_de_armas', niveis:3, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas'] }, { id:'erudito', niveis:2, poderes:['analise_rapida','lampejo_saber'] }, { id:'orador', niveis:2, poderes:['encorajar','persuasivo'] }] },
      15: { classes: [{ id:'andarilho', niveis:4, poderes:['viajante_experiente','cacador_tesouros','pratico','papo_taverna'] }, { id:'mestre_de_armas', niveis:4, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos'] }, { id:'erudito', niveis:4, poderes:['analise_rapida','lampejo_saber','concentrado','ritualismo_erudito'] }, { id:'orador', niveis:3, poderes:['encorajar','persuasivo','confio_em_voce'] }] },
      20: { classes: [{ id:'andarilho', niveis:5, poderes:['viajante_experiente','cacador_tesouros','pratico','papo_taverna','companheiro_fiel'] }, { id:'mestre_de_armas', niveis:5, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos','trespassar'] }, { id:'erudito', niveis:5, poderes:['analise_rapida','lampejo_saber','concentrado','ritualismo_erudito','professor'] }, { id:'orador', niveis:5, poderes:['encorajar','persuasivo','confio_em_voce','aliado_inesperado','condenar'] }] }
    }
  },

  // ── A. Dançarino de Batalha ───────────────────────────────────────────────
  {
    id: 'dançarino',
    nome: 'Dançarino de Batalha',
    descricao: 'Arte como arma — mobilidade extrema e performance no campo de batalha.',
    icone: '💃',
    tags: ['físico', 'velocidade', 'performance', 'mobilidade'],
    atributosPrim: ['des', 'von'],
    suggestedQuirks: ['glorioso_destino', 'voo_af'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'dancarino', niveis:3, poderes:['danca','dancarino_de_guerra','me_acompanhe'] }, { id:'mestre_de_armas', niveis:2, poderes:['maestria_corpo_a_corpo','contra_ataque'] }] },
      10: { classes: [{ id:'dancarino', niveis:5, poderes:['danca','dancarino_de_guerra','me_acompanhe','sapateado_frenetico','troca_de_figurino'] }, { id:'mestre_de_armas', niveis:3, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas'] }, { id:'ladino', niveis:2, poderes:['alta_velocidade','esquiva'] }] },
      15: { classes: [{ id:'dancarino', niveis:6, poderes:['danca','dancarino_de_guerra','me_acompanhe','sapateado_frenetico','troca_de_figurino','danca'] }, { id:'mestre_de_armas', niveis:5, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','trespassar','quebra_ossos'] }, { id:'ladino', niveis:4, poderes:['alta_velocidade','esquiva','golpe_baixo','vejo_voce_mais_tarde'] }] },
      20: { classes: [{ id:'dancarino', niveis:8, poderes:['danca','dancarino_de_guerra','me_acompanhe','sapateado_frenetico','troca_de_figurino','danca','dancarino_de_guerra','me_acompanhe'] }, { id:'mestre_de_armas', niveis:6, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','trespassar','quebra_ossos','maestria_corpo_a_corpo'] }, { id:'ladino', niveis:6, poderes:['alta_velocidade','esquiva','golpe_baixo','vejo_voce_mais_tarde','roubo_de_alma','alta_velocidade'] }] }
    }
  },

  // ── B. Floralista Místico ─────────────────────────────────────────────────
  {
    id: 'floralista',
    nome: 'Floralista Místico',
    descricao: 'Natureza viva como força ativa — cura, controle e espírito da floresta.',
    icone: '🌸',
    tags: ['suporte', 'natureza', 'cura', 'controle'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['um_sonho_longo', 'fera_falante_nf'],
    suggestedZeroPower: 'poderes_combinados',
    subgenres: ['natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'floralista', niveis:3, poderes:['arvore_da_vida','cloromancia','influencia_verdejante'] }, { id:'espiritualista', niveis:2, poderes:['magia_espiritual','aura_protetora'] }] },
      10: { classes: [{ id:'floralista', niveis:5, poderes:['arvore_da_vida','cloromancia','influencia_verdejante','enxerto','jardinagem_marcial'] }, { id:'espiritualista', niveis:3, poderes:['magia_espiritual','aura_protetora','expulsar_trevas'] }, { id:'orador', niveis:2, poderes:['encorajar','confio_em_voce'] }] },
      15: { classes: [{ id:'floralista', niveis:6, poderes:['arvore_da_vida','cloromancia','influencia_verdejante','enxerto','jardinagem_marcial','arvore_da_vida'] }, { id:'espiritualista', niveis:5, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual'] }, { id:'orador', niveis:4, poderes:['encorajar','confio_em_voce','aliado_inesperado','persuasivo'] }] },
      20: { classes: [{ id:'floralista', niveis:8, poderes:['arvore_da_vida','cloromancia','influencia_verdejante','enxerto','jardinagem_marcial','arvore_da_vida','cloromancia','influencia_verdejante'] }, { id:'espiritualista', niveis:6, poderes:['magia_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','ritualismo_espiritual','magia_espiritual'] }, { id:'orador', niveis:6, poderes:['encorajar','confio_em_voce','aliado_inesperado','persuasivo','condenar','encorajar'] }] }
    }
  },

  // ── C. Gourmet Alquimista ─────────────────────────────────────────────────
  {
    id: 'gourmet',
    nome: 'Gourmet Alquimista',
    descricao: 'Culinária como magia — cria buffs únicos e consumíveis lendários.',
    icone: '🍲',
    tags: ['suporte', 'itens', 'culinária', 'social'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['heranca', 'sobrevivente_nf'],
    suggestedZeroPower: 'poderes_combinados',
    subgenres: ['natural-fantasy'],
    progressao: {
      5:  { classes: [{ id:'gourmet', niveis:3, poderes:['culinaria','feito_com_amor','cozinheiro_viajante'] }, { id:'inventor', niveis:2, poderes:['engenhocas','formula_secreta'] }] },
      10: { classes: [{ id:'gourmet', niveis:5, poderes:['culinaria','feito_com_amor','cozinheiro_viajante','garfo_e_faca','sal_e_pimenta'] }, { id:'inventor', niveis:3, poderes:['engenhocas','formula_secreta','chuva_de_pocoes'] }, { id:'erudito', niveis:2, poderes:['analise_rapida','lampejo_saber'] }] },
      15: { classes: [{ id:'gourmet', niveis:6, poderes:['culinaria','feito_com_amor','cozinheiro_viajante','garfo_e_faca','sal_e_pimenta','culinaria'] }, { id:'inventor', niveis:5, poderes:['engenhocas','formula_secreta','chuva_de_pocoes','item_emergencial','visionario'] }, { id:'erudito', niveis:4, poderes:['analise_rapida','lampejo_saber','concentrado','professor'] }] },
      20: { classes: [{ id:'gourmet', niveis:8, poderes:['culinaria','feito_com_amor','cozinheiro_viajante','garfo_e_faca','sal_e_pimenta','culinaria','feito_com_amor','cozinheiro_viajante'] }, { id:'inventor', niveis:6, poderes:['engenhocas','formula_secreta','chuva_de_pocoes','item_emergencial','visionario','engenhocas'] }, { id:'erudito', niveis:6, poderes:['analise_rapida','lampejo_saber','concentrado','professor','ritualismo_erudito','analise_rapida'] }] }
    }
  },

  // ── D. Esper Psiônico ─────────────────────────────────────────────────────
  {
    id: 'esper',
    nome: 'Esper Psiônico',
    descricao: 'A magia é interna, mental, sem gestos — telecinesia, hipercognição, percepção.',
    icone: '🧠',
    tags: ['magia', 'mente', 'controle', 'psiônico'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['neo_humano', 'experimento_fugitivo'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['techno-fantasy'],
    progressao: {
      5:  { classes: [{ id:'esper', niveis:3, poderes:['dons_psiquicos','foco_cognitivo','hipercognicao'] }, { id:'arcanista', niveis:2, poderes:['arcanismo_ritualista','arcano_emergencial'] }] },
      10: { classes: [{ id:'esper', niveis:5, poderes:['dons_psiquicos','foco_cognitivo','hipercognicao','navegador','psicocinese'] }, { id:'arcanista', niveis:3, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano'] }, { id:'erudito', niveis:2, poderes:['concentrado','analise_rapida'] }] },
      15: { classes: [{ id:'esper', niveis:6, poderes:['dons_psiquicos','foco_cognitivo','hipercognicao','navegador','psicocinese','dons_psiquicos'] }, { id:'arcanista', niveis:5, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar'] }, { id:'erudito', niveis:4, poderes:['concentrado','analise_rapida','lampejo_saber','professor'] }] },
      20: { classes: [{ id:'esper', niveis:8, poderes:['dons_psiquicos','foco_cognitivo','hipercognicao','navegador','psicocinese','dons_psiquicos','foco_cognitivo','hipercognicao'] }, { id:'arcanista', niveis:6, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar','arcanismo_ritualista'] }, { id:'erudito', niveis:6, poderes:['concentrado','analise_rapida','lampejo_saber','professor','ritualismo_erudito','concentrado'] }] }
    }
  },

  // ── E. Piloto Combatente ──────────────────────────────────────────────────
  {
    id: 'piloto',
    nome: 'Piloto Combatente',
    descricao: 'O veículo é a identidade — sem a máquina, é metade de uma pessoa.',
    icone: '🚀',
    tags: ['distância', 'tecnologia', 'veículo', 'armamento'],
    atributosPrim: ['des', 'vig'],
    suggestedQuirks: ['de_um_mundo_distante_tf', 'oficial_arrependido'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['techno-fantasy'],
    progressao: {
      5:  { classes: [{ id:'piloto', niveis:3, poderes:['veiculo_pessoal','pulso_firme','coracao_no_motor'] }, { id:'atirador', niveis:2, poderes:['maestria_distancia','barragem'] }] },
      10: { classes: [{ id:'piloto', niveis:5, poderes:['veiculo_pessoal','pulso_firme','coracao_no_motor','compressao_tecnologica','configuracao_flexivel'] }, { id:'atirador', niveis:3, poderes:['maestria_distancia','barragem','fogo_cruzado'] }, { id:'mestre_de_armas', niveis:2, poderes:['maestria_corpo_a_corpo','contra_ataque'] }] },
      15: { classes: [{ id:'piloto', niveis:6, poderes:['veiculo_pessoal','pulso_firme','coracao_no_motor','compressao_tecnologica','configuracao_flexivel','veiculo_pessoal'] }, { id:'atirador', niveis:5, poderes:['maestria_distancia','barragem','fogo_cruzado','tiro_de_aviso','zona_de_perigo'] }, { id:'mestre_de_armas', niveis:4, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos'] }] },
      20: { classes: [{ id:'piloto', niveis:8, poderes:['veiculo_pessoal','pulso_firme','coracao_no_motor','compressao_tecnologica','configuracao_flexivel','veiculo_pessoal','pulso_firme','coracao_no_motor'] }, { id:'atirador', niveis:6, poderes:['maestria_distancia','barragem','fogo_cruzado','tiro_de_aviso','zona_de_perigo','maestria_distancia'] }, { id:'mestre_de_armas', niveis:6, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos','trespassar','maestria_corpo_a_corpo'] }] }
    }
  },

  // ── F. Astrólogo do Destino ───────────────────────────────────────────────
  {
    id: 'astrologo',
    nome: 'Astrólogo do Destino',
    descricao: 'Invoca criaturas do folclore brasileiro — as estrelas determinam o azar.',
    icone: '⭐',
    tags: ['magia', 'destino', 'invocação', 'folclore'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['glorioso_destino', 'a_promessa_que_te_detem'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['natural-fantasy', 'high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'astrologo', niveis:3, poderes:['constelacao_do_boitata','constelacao_do_boto','constelacao_do_saci'] }, { id:'espiritualista', niveis:2, poderes:['magia_espiritual','ritualismo_espiritual'] }] },
      10: { classes: [{ id:'astrologo', niveis:5, poderes:['constelacao_do_boitata','constelacao_do_boto','constelacao_do_saci','constelacao_do_cao_dourado','constelacao_da_rasga_mortalha'] }, { id:'espiritualista', niveis:3, poderes:['magia_espiritual','ritualismo_espiritual','aura_protetora'] }, { id:'entropista', niveis:2, poderes:['magia_entropica','sete_da_sorte'] }] },
      15: { classes: [{ id:'astrologo', niveis:6, poderes:['constelacao_do_boitata','constelacao_do_boto','constelacao_do_saci','constelacao_do_cao_dourado','constelacao_da_rasga_mortalha','constelacao_do_boitata'] }, { id:'espiritualista', niveis:5, poderes:['magia_espiritual','ritualismo_espiritual','aura_protetora','expulsar_trevas','bencao_eterna'] }, { id:'entropista', niveis:4, poderes:['magia_entropica','sete_da_sorte','nuvem_de_azar','canalizar_trevas'] }] },
      20: { classes: [{ id:'astrologo', niveis:8, poderes:['constelacao_do_boitata','constelacao_do_boto','constelacao_do_saci','constelacao_do_cao_dourado','constelacao_da_rasga_mortalha','constelacao_do_boitata','constelacao_do_boto','constelacao_do_saci'] }, { id:'espiritualista', niveis:6, poderes:['magia_espiritual','ritualismo_espiritual','aura_protetora','expulsar_trevas','bencao_eterna','magia_espiritual'] }, { id:'entropista', niveis:6, poderes:['magia_entropica','sete_da_sorte','nuvem_de_azar','canalizar_trevas','ritual_entropico','magia_entropica'] }] }
    }
  },

  // ── G. Carteador Trapaceiro — Entropista → Mercador ──────────────────────
  {
    id: 'carteador',
    nome: 'Carteador Trapaceiro',
    descricao: 'O jogo como filosofia — apostador de cartas que comercia em risco.',
    icone: '🃏',
    tags: ['azar', 'cartas', 'furtividade', 'controle'],
    atributosPrim: ['des', 'ast'],
    suggestedQuirks: ['grilhoes_do_coracao', 'a_promessa_que_te_detem'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'carteador', niveis:3, poderes:['cartas_magicas','dobro_ou_nada','mulligan'] }, { id:'ladino', niveis:2, poderes:['alta_velocidade','roubo_de_alma'] }] },
      10: { classes: [{ id:'carteador', niveis:5, poderes:['cartas_magicas','dobro_ou_nada','mulligan','altos_e_baixos','carta_armadilha'] }, { id:'ladino', niveis:3, poderes:['alta_velocidade','roubo_de_alma','golpe_baixo'] }, { id:'mercador', niveis:2, poderes:['estoque_pessoal','verdadeiro_tesouro'] }] },
      15: { classes: [{ id:'carteador', niveis:6, poderes:['cartas_magicas','dobro_ou_nada','mulligan','altos_e_baixos','carta_armadilha','cartas_magicas'] }, { id:'ladino', niveis:5, poderes:['alta_velocidade','roubo_de_alma','golpe_baixo','esquiva','vejo_voce_mais_tarde'] }, { id:'mercador', niveis:4, poderes:['estoque_pessoal','verdadeiro_tesouro','ja_ouvi_falar','data_de_validade'] }] },
      20: { classes: [{ id:'carteador', niveis:8, poderes:['cartas_magicas','dobro_ou_nada','mulligan','altos_e_baixos','carta_armadilha','cartas_magicas','dobro_ou_nada','mulligan'] }, { id:'ladino', niveis:6, poderes:['alta_velocidade','roubo_de_alma','golpe_baixo','esquiva','vejo_voce_mais_tarde','alta_velocidade'] }, { id:'mercador', niveis:6, poderes:['estoque_pessoal','verdadeiro_tesouro','ja_ouvi_falar','data_de_validade','ventos_do_comercio','estoque_pessoal'] }] }
    }
  },

  // ── H. Forjador de Almas ──────────────────────────────────────────────────
  {
    id: 'forjador',
    nome: 'Forjador de Almas',
    descricao: 'Manifesta e anima armas com alma própria — identidade forjada em aço e espírito.',
    icone: '⚒️',
    tags: ['físico', 'almas', 'criação', 'espiritual'],
    atributosPrim: ['vig', 'von'],
    suggestedQuirks: ['arma_antiga', 'portador_da_ruina'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'forjador_de_almas', niveis:3, poderes:['manifestar_arma','animar_arma','forjar_caracteristica'] }, { id:'guardiao', niveis:2, poderes:['proteger','fortaleza'] }] },
      10: { classes: [{ id:'forjador_de_almas', niveis:5, poderes:['manifestar_arma','animar_arma','forjar_caracteristica','coletar_almas','forjar_feitico'] }, { id:'guardiao', niveis:3, poderes:['proteger','fortaleza','maestria_defensiva'] }, { id:'mestre_de_armas', niveis:2, poderes:['maestria_corpo_a_corpo','contra_ataque'] }] },
      15: { classes: [{ id:'forjador_de_almas', niveis:6, poderes:['manifestar_arma','animar_arma','forjar_caracteristica','coletar_almas','forjar_feitico','manifestar_arma'] }, { id:'guardiao', niveis:5, poderes:['proteger','fortaleza','maestria_defensiva','guarda_costas','duplo_escudeiro'] }, { id:'mestre_de_armas', niveis:4, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos'] }] },
      20: { classes: [{ id:'forjador_de_almas', niveis:8, poderes:['manifestar_arma','animar_arma','forjar_caracteristica','coletar_almas','forjar_feitico','manifestar_arma','animar_arma','forjar_caracteristica'] }, { id:'guardiao', niveis:6, poderes:['proteger','fortaleza','maestria_defensiva','guarda_costas','duplo_escudeiro','proteger'] }, { id:'mestre_de_armas', niveis:6, poderes:['maestria_corpo_a_corpo','contra_ataque','chuva_de_laminas','quebra_ossos','trespassar','maestria_corpo_a_corpo'] }] }
    }
  },

  // ── I. Necromante das Sombras ─────────────────────────────────────────────
  {
    id: 'necromante',
    nome: 'Necromante das Sombras',
    descricao: 'Invoca mortos, comanda pelo medo — morte como transição, não fim.',
    icone: '💀',
    tags: ['magia', 'trevas', 'mortos', 'horror'],
    atributosPrim: ['ast', 'von'],
    suggestedQuirks: ['amaldicoado_af', 'portador_da_ruina'],
    suggestedZeroPower: 'poder_desperto',
    subgenres: ['high-fantasy'],
    progressao: {
      5:  { classes: [{ id:'necromante', niveis:3, poderes:['filhos_da_sepultura','medo_e_a_chave','rondo_do_pesadelo'] }, { id:'entropista', niveis:2, poderes:['magia_entropica','nuvem_de_azar'] }] },
      10: { classes: [{ id:'necromante', niveis:5, poderes:['filhos_da_sepultura','medo_e_a_chave','rondo_do_pesadelo','alem_do_reino_da_morte','por_quem_os_sinos_dobram'] }, { id:'entropista', niveis:3, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte'] }, { id:'arcanista', niveis:2, poderes:['arcanismo_ritualista','arcano_emergencial'] }] },
      15: { classes: [{ id:'necromante', niveis:6, poderes:['filhos_da_sepultura','medo_e_a_chave','rondo_do_pesadelo','alem_do_reino_da_morte','por_quem_os_sinos_dobram','filhos_da_sepultura'] }, { id:'entropista', niveis:5, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte','canalizar_trevas','ritual_entropico'] }, { id:'arcanista', niveis:4, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana'] }] },
      20: { classes: [{ id:'necromante', niveis:8, poderes:['filhos_da_sepultura','medo_e_a_chave','rondo_do_pesadelo','alem_do_reino_da_morte','por_quem_os_sinos_dobram','filhos_da_sepultura','medo_e_a_chave','rondo_do_pesadelo'] }, { id:'entropista', niveis:6, poderes:['magia_entropica','nuvem_de_azar','sete_da_sorte','canalizar_trevas','ritual_entropico','magia_entropica'] }, { id:'arcanista', niveis:6, poderes:['arcanismo_ritualista','arcano_emergencial','circulo_arcano','regeneracao_arcana','vincular_e_invocar','arcanismo_ritualista'] }] }
    }
  }
];

if (typeof module !== 'undefined') module.exports = ARQUETIPOS;
