/*
 * =============================================================================
 *  INVENTÁRIO ATHENA — Teste dos 6 Arquétipos de Sabotagem Afetiva
 * =============================================================================
 *
 *  Este é o "instrumento de entrada" descrito no Código-Fonte do método:
 *  um teste que ajuda a mulher a reconhecer QUAL PADRÃO ELA REPETE.
 *
 *  ⚠️ ATENÇÃO CANÔNICA — não mude isto sem falar com o Danniel:
 *  Os arquétipos descrevem o padrão DELA, nunca um rótulo do homem.
 *  A devolutiva sempre fala em "você TENDE A...", jamais "você É...".
 *
 *  ---------------------------------------------------------------------------
 *  COMO FUNCIONA (formato FHT — Forçado Hierárquico de Tipicidade)
 *  ---------------------------------------------------------------------------
 *  Para cada cenário, ela escolhe DUAS coisas:
 *    • a opção que MAIS se parece com ela  →  +2 pontos pro arquétipo
 *    • a opção que MENOS se parece com ela →  -1 ponto  pro arquétipo
 *
 *  Isso força priorização entre opções todas "defensáveis", o que reduz o
 *  faking good (a tendência de responder o que soa melhor). É a razão técnica
 *  de o teste não usar uma escala simples de concordância.
 *
 *  ---------------------------------------------------------------------------
 *  COMO CALIBRAR (não precisa saber programar)
 *  ---------------------------------------------------------------------------
 *  • Para trocar o texto de um cenário: edite o campo "situacao".
 *  • Para trocar uma resposta: edite o "texto" dentro de "opcoes".
 *  • Para adicionar um cenário: copie um bloco { ... } inteiro e cole abaixo,
 *    trocando o "id". Cada cenário precisa ter as 6 opções (uma por arquétipo).
 *  • "neutra: true" marca a opção equilibrada (distrator). O cânone pede uma
 *    em pelo menos 40% dos cenários — ela não pontua para nenhum arquétipo.
 *
 *  FONTE: os cenários 1 a 6 são VERBATIM do Estudo Metodológico Fundacional
 *  do Inventário ATHENA v1.0. Ver docs/CANONE_INVENTARIO.md.
 * =============================================================================
 */

/* ---------------------------------------------------------------------------
 *  OS 6 ARQUÉTIPOS
 *  Textos extraídos do cânone (@@METODO_ATHENA_PRIME_DIRETRIZES_V2).
 * ------------------------------------------------------------------------- */
const ARQUETIPOS = {
  salvadora: {
    nome: "A Salvadora",
    emoji: "🛟",
    cor: "#c2410c",
    nucleo: "Confunde amor com resgate e utilidade.",
    // Frase curta que ela reconhece em si mesma
    fala: "Ele tem potencial, só precisa de direção.",
    // Como o padrão aparece (o FAZ da Lei ATHENA)
    faz: "Resolve a vida dele antes de olhar para a própria. Cuida, sustenta, aconselha, protege, justifica e investe no “potencial” do homem.",
    // A narrativa interna (o PENSA)
    pensa: "“Se eu for indispensável, ele vai me valorizar e não vai embora.” No fundo, confunde utilidade com amor e cuidado com carregamento.",
    // O que esse padrão custa
    custo: "Gasta anos de energia em relações assimétricas. Atrai homens que se acomodam e perde contato com as próprias necessidades.",
    // A visão masculina madura
    visaoMasculina: "Ele pode sentir que está sendo administrado, não amado. Um homem de valor não busca uma mãe, uma terapeuta ou uma gestora de crise — busca uma parceira inteira.",
    // A recalibração (o DIRECIONAR)
    recalibracao: "Cuidado é estar ao lado, não carregar. Amor adulto não exige resgate.",
    // A força legítima que não se deve destruir
    forca: "Capacidade de cuidar, apoiar e contribuir — sem carregar o outro.",
    espelho: "Estou amando esse homem ou tentando salvá-lo?",
  },

  distante: {
    nome: "A Distante",
    emoji: "🧊",
    cor: "#0e7490",
    nucleo: "Confunde autonomia com inacessibilidade emocional.",
    fala: "Prefiro não me apegar.",
    faz: "Usa a independência como escudo. Racionaliza o afeto, evita pedir, minimiza necessidades, mantém controle e recua quando a intimidade aprofunda.",
    pensa: "“Não posso precisar. Se eu baixar a guarda, vou me machucar.” No fundo, transforma autonomia em inacessibilidade.",
    custo: "Vive solidão dentro ou fora das relações. Afasta homens emocionalmente disponíveis e depois confirma a crença de que ninguém permanece.",
    visaoMasculina: "Ele pode sentir que não existe espaço real para entrar. O homem de valor respeita autonomia, mas também percebe quando a mulher não permite vínculo.",
    recalibracao: "Vulnerabilidade estratégica não é fraqueza; é abertura com critério.",
    forca: "Autonomia, critério e proteção de limites — sem virar indisponibilidade emocional.",
    espelho: "Estou sendo seletiva ou estou apenas inacessível?",
  },

  carente: {
    nome: "A Carente",
    emoji: "📱",
    cor: "#be185d",
    nucleo: "Confunde atenção com amor e confirmação com valor próprio.",
    fala: "Por que ele não respondeu ainda?",
    faz: "Busca confirmação constante. Monitora mensagens, interpreta silêncios, cobra presença cedo demais, força definições emocionais e reage com ansiedade quando sente distância.",
    pensa: "“Eu só me sinto segura e valiosa quando ele me confirma.” No fundo, confunde atenção com amor e resposta rápida com segurança.",
    custo: "Comunica escassez, sobrecarrega a relação e entrega poder emocional cedo demais. Pode afastar homens maduros pela pressão constante.",
    visaoMasculina: "Ele pode sentir que será responsável por regular emocionalmente a mulher o tempo todo. Um homem de valor busca vínculo, não uma relação baseada em vigilância e urgência.",
    recalibracao: "Recuperar o próprio centro antes de pedir confirmação externa. Desejo de conexão é legítimo; dependência de validação, não.",
    forca: "Desejo legítimo de vínculo, afeto e reciprocidade — sem terceirizar valor próprio.",
    espelho: "Estou escolhendo esse homem ou implorando para ser escolhida?",
  },

  critica: {
    nome: "A Crítica",
    emoji: "🔍",
    cor: "#7c3aed",
    nucleo: "Usa julgamento e exigência como armadura contra decepção.",
    fala: "Ele fez tudo errado de novo.",
    faz: "Enxerga defeitos antes de reconhecer qualidades. Corrige, compara, testa, invalida pequenos gestos e exige um padrão impossível de sustentar.",
    pensa: "“Se eu identificar todas as falhas antes, não serei pega de surpresa nem decepcionada.” No fundo, usa julgamento como proteção.",
    custo: "Corrói admiração, intimidade e leveza. O outro passa a se sentir diminuído, examinado ou permanentemente insuficiente.",
    visaoMasculina: "Ele pode sentir que nunca será suficiente. Um homem de valor suporta conversa madura, mas tende a se afastar de uma relação em que é avaliado o tempo todo e admirado de menos.",
    recalibracao: "Critério não precisa virar ataque. Trocar controle por discernimento e admiração proporcional.",
    forca: "Discernimento, percepção e padrão elevado — sem transformar tudo em julgamento ou ataque.",
    espelho: "Meu padrão é alto ou minha armadura está tentando afastar todo mundo?",
  },

  apagadora: {
    nome: "A Apagadora",
    emoji: "🌫️",
    cor: "#4b5563",
    nucleo: "Diminui-se para manter acesso e evitar abandono.",
    fala: "Tudo bem, faço como você quiser.",
    faz: "Silencia desejos, reduz opiniões, adapta-se em excesso, abandona amigas, rotina e projetos para caber no mundo do outro.",
    pensa: "“Se eu ocupar pouco espaço, ele não vai embora.” No fundo, acredita que seus desejos pesam e que sua presença precisa ser autorizada.",
    custo: "Perde identidade, vitalidade e admiração. Acumula ressentimento silencioso e transforma o vínculo em sobrevivência afetiva.",
    visaoMasculina: "Ele pode sentir ausência de presença própria. Um homem de valor não procura uma sombra moldável, mas uma mulher com identidade, voz e desejo.",
    recalibracao: "Vínculo saudável não exige desaparecimento. Preservar amizades, projetos, critérios e espaços próprios.",
    forca: "Empatia, flexibilidade e capacidade de convivência — sem abandonar a própria identidade.",
    espelho: "Estou sendo amada ou estou me adaptando para não perder acesso?",
  },

  urgente: {
    nome: "A Urgente",
    emoji: "⏱️",
    cor: "#b45309",
    nucleo: "Confunde clareza de intenção com ansiedade de antecipação.",
    fala: "A gente já ficou 3 meses; o que somos?",
    faz: "Acelera marcos do relacionamento, pressiona por definição, interpreta tempo natural como desinteresse e tenta resolver rapidamente a incerteza.",
    pensa: "“Meu tempo está passando. Se eu não garantir logo, vou perder a chance.” No fundo, confunde clareza de intenção com ansiedade de antecipação.",
    custo: "Ativa dinâmicas de perseguição e afastamento. Pode transmitir que o lugar está pronto e qualquer homem minimamente viável poderia ocupá-lo.",
    visaoMasculina: "Ele pode sentir que está sendo encaixado em uma vaga, não reconhecido como indivíduo. Um homem de valor tende a aprofundar com consistência, não sob coerção emocional.",
    recalibracao: "Desejo de futuro precisa caminhar com leitura de realidade, tempo e reciprocidade.",
    forca: "Clareza de intenção e desejo de futuro — sem atropelar tempo, realidade e reciprocidade.",
    espelho: "Quero construir uma vida com esse homem ou apenas acalmar minha ansiedade?",
  },
};

/* Ordem canônica de exibição. */
const ORDEM = ["salvadora", "distante", "carente", "critica", "apagadora", "urgente"];

/* ---------------------------------------------------------------------------
 *  OS CENÁRIOS (Camada 1 — Comportamento Situacional / SJT)
 *  Cenários 1 a 6 são VERBATIM do Estudo Metodológico Fundacional.
 * ------------------------------------------------------------------------- */
const CENARIOS = [
  {
    id: "c1",
    titulo: "Mensagem não respondida",
    situacao: "Você enviou uma mensagem importante para ele às 14h. São 20h e você ainda não recebeu resposta.",
    opcoes: [
      { arq: "salvadora", texto: "“Espero que esteja tudo bem, posso ajudar em algo?”" },
      { arq: "distante",  texto: "“Não vou ficar dependendo de resposta.”" },
      { arq: "carente",   texto: "“Será que errei algo? Por que ele não responde?”" },
      { arq: "critica",   texto: "“Isso é falta de consideração, típico dele.”" },
      { arq: "apagadora", texto: "“Não vou incomodar, com certeza está ocupado.”" },
      { arq: "urgente",   texto: "“Preciso saber logo o que está acontecendo.”" },
    ],
  },
  {
    id: "c2",
    titulo: "A definição do relacionamento",
    situacao: "Você está há 4 meses com alguém. Quando você traz o assunto de exclusividade, ele diz que “está gostando muito e não precisa de rótulos”.",
    opcoes: [
      { arq: "salvadora", texto: "“Vou deixar no ritmo dele, não quero que se sinta pressionado.”" },
      { arq: "distante",  texto: "“Na verdade, eu também não preciso de rótulos.”" },
      { arq: "carente",   texto: "“Isso significa que ele não está certo de mim.”" },
      { arq: "critica",   texto: "“Homem que não sabe o que quer é um desperdício de tempo.”" },
      { arq: "apagadora", texto: "“Tudo bem, eu me adapto.”" },
      { arq: "urgente",   texto: "“Tenho algumas semanas para ver se avança; não tenho tempo a perder.”" },
    ],
  },
  {
    id: "c3",
    titulo: "O parceiro inconsistente",
    situacao: "Ele é extremamente atencioso durante uma semana, depois fica distante e menos comunicativo por alguns dias, sem explicação clara.",
    opcoes: [
      { arq: "salvadora", texto: "“Ele deve estar passando por algo, vou ser mais presente.”" },
      { arq: "distante",  texto: "“Prefiro essa versão mais tranquila mesmo.”" },
      { arq: "carente",   texto: "“Essa inconsistência vai me enlouquecer; preciso de estabilidade.”" },
      { arq: "critica",   texto: "“Adulto saudável não trata parceiro assim; isso é sinal de alerta.”" },
      { arq: "apagadora", texto: "“Me moldo ao ritmo dele; sou versátil.”" },
      { arq: "urgente",   texto: "“Preciso entender o padrão ou posso ir embora.”" },
    ],
  },
  {
    id: "c4",
    titulo: "O ex reaparece",
    situacao: "Seu ex entra em contato após 8 meses sem falar, dizendo que sentiu sua falta e quer conversar.",
    opcoes: [
      { arq: "salvadora", texto: "“Vou conversar, não quero que ele fique mal.”" },
      { arq: "distante",  texto: "“Esse capítulo está encerrado para mim.”" },
      { arq: "carente",   texto: "“Será que desta vez seria diferente?”" },
      { arq: "critica",   texto: "“Ele provavelmente está sozinho e precisando de atenção.”" },
      { arq: "apagadora", texto: "“Não quero ser rude, mas também não sei o que quero.”" },
      { arq: "urgente",   texto: "“Ou voltamos logo ou encerro de vez.”" },
    ],
  },
  {
    id: "c5",
    titulo: "Conflito sobre necessidades",
    situacao: "Você diz a ele que se sentiu negligenciada esta semana. Ele responde: “você é muito sensível, não fiz nada de errado”.",
    opcoes: [
      { arq: "salvadora", texto: "“Talvez eu tenha exagerado; deve ser meu estresse.”" },
      { arq: "distante",  texto: "“Não vale a pena; fico melhor sozinha com isso.”" },
      { arq: "carente",   texto: "“Ele não me entende; vou perder ele por isso.”" },
      { arq: "critica",   texto: "“Não sou sensível — você de fato me ignorou.”" },
      { arq: "apagadora", texto: "“Talvez ele tenha razão, sou mesmo muito sensível.”" },
      { arq: "urgente",   texto: "“Precisa ficar claro agora se você acha que minhas necessidades são válidas.”" },
    ],
  },
  {
    id: "c6",
    titulo: "O encontro cancelado",
    situacao: "Você está há 2 meses com alguém de quem está gostando muito. Ele cancela um encontro no último momento “porque surgiu algo no trabalho”.",
    opcoes: [
      { arq: "salvadora", texto: "Respondo “tudo bem” e imediatamente pergunto se ele precisa de ajuda." },
      { arq: "distante",  texto: "Respondo “tudo bem”, mas internamente me desligo um pouco." },
      { arq: "carente",   texto: "Fico muito ansiosa e passo horas ruminando se é verdade ou se ele perdeu o interesse." },
      { arq: "critica",   texto: "Fico irritada com a falta de consideração e considero cobrar." },
      { arq: "apagadora", texto: "Respondo “ok”, mas sinto aquele vazio familiar de não importar." },
      { arq: "urgente",   texto: "Imediatamente sugiro uma nova data e pergunto quando podemos remarcar." },
      { arq: null, neutra: true, texto: "Lamento de verdade, digo que fiquei frustrada e sigo com a minha noite." },
    ],
  },
];

/* Texto de abertura — VERBATIM do protocolo anti-desejabilidade social. */
const FRAMING = "Este instrumento não tem respostas certas ou erradas. Seu valor está na precisão — quanto mais honesta você for, mais personalizadas serão as insights da sua jornada.";

/* =============================================================================
 *  MOTOR DE CÁLCULO
 *  Formato FHT: "mais parecida" = +2 · "menos parecida" = -1
 * ============================================================================= */

const PONTOS_MAIS = 2;
const PONTOS_MENOS = -1;

/*
 * respostas = { c1: {mais: "carente", menos: "distante"}, ... }
 * Devolve o perfil completo.
 */
function calcular(respostas) {
  const bruto = {};
  ORDEM.forEach((a) => (bruto[a] = 0));

  let respondidos = 0;
  let escolhasNeutras = 0;

  for (const cenario of CENARIOS) {
    const r = respostas[cenario.id];
    if (!r || !r.mais) continue;
    respondidos++;

    // "neutra" é o distrator: não pontua, mas conta como sinal de
    // desejabilidade social se for escolhida com muita frequência.
    if (r.mais === "__neutra") escolhasNeutras++;
    else if (bruto[r.mais] !== undefined) bruto[r.mais] += PONTOS_MAIS;

    if (r.menos && r.menos !== "__neutra" && bruto[r.menos] !== undefined) {
      bruto[r.menos] += PONTOS_MENOS;
    }
  }

  // Desloca para que o menor valor seja 0 — evita percentuais negativos.
  const valores = ORDEM.map((a) => bruto[a]);
  const minimo = Math.min(...valores);
  const deslocado = {};
  ORDEM.forEach((a) => (deslocado[a] = bruto[a] - minimo));

  const soma = ORDEM.reduce((t, a) => t + deslocado[a], 0);

  // Perfil percentual — o formato de apresentação que o cânone pede.
  const perfil = ORDEM.map((a) => ({
    chave: a,
    bruto: bruto[a],
    pct: soma > 0 ? Math.round((deslocado[a] / soma) * 100) : Math.round(100 / ORDEM.length),
  })).sort((x, y) => y.pct - x.pct);

  const dominante = perfil[0];
  const segundo = perfil[1];

  // Secundário só conta se for expressivo e não empatar com o dominante.
  const margem = dominante.pct - segundo.pct;
  const secundario = segundo.pct >= 18 && margem >= 5 ? segundo : null;

  // Perfil difuso: nenhum padrão se destaca o suficiente.
  const difuso = dominante.pct < 28 || (margem < 5 && dominante.pct < 35);

  // Confiança da classificação (proxy honesto: separação + completude).
  let confianca = "Baixa";
  if (respondidos >= CENARIOS.length && margem >= 12) confianca = "Alta";
  else if (respondidos >= CENARIOS.length - 1 && margem >= 6) confianca = "Moderada";

  // Sinal interno de desejabilidade social — nota para a mentora, nunca
  // exibida para a cliente (regra do cânone).
  const sinalDS = escolhasNeutras >= 2;

  return { perfil, dominante, secundario, difuso, confianca, sinalDS, respondidos, total: CENARIOS.length };
}

/*
 * Combinação dominante + secundário. O cânone chama de "amplificadores ou
 * modificadores" e dá dois exemplos, reproduzidos aqui.
 */
const COMBINACOES = {
  "salvadora+urgente": "cuidado com prazo",
  "salvadora+apagadora": "cuidado invisível",
};

function rotuloCombinacao(a, b) {
  return COMBINACOES[`${a}+${b}`] || null;
}

window.INVENTARIO = { ARQUETIPOS, ORDEM, CENARIOS, FRAMING, calcular, rotuloCombinacao };
