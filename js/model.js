/*
 * =============================================================================
 *  MODELO PSICOMÉTRICO — "Registro de Possíveis"
 * =============================================================================
 *
 *  Este é o CÉREBRO do app. Não tem IA aqui: é um modelo transparente e
 *  ajustável, no mesmo espírito dos arquétipos que vocês já usam.
 *
 *  Como funciona, em 1 minuto:
 *   1. A mulher responde algumas frases sobre o que o cara FALOU e FEZ.
 *   2. Cada frase pertence a uma DIMENSÃO (ex: Respeito, Consistência...).
 *   3. O app soma os pontos por dimensão e calcula uma leitura geral.
 *   4. Com base no padrão, escolhe um ARQUÉTIPO e gera os ALERTAS.
 *
 *  ---------------------------------------------------------------------------
 *  COMO CALIBRAR (você NÃO precisa saber programar):
 *  ---------------------------------------------------------------------------
 *   • Para trocar o texto de uma frase: edite o campo "texto".
 *   • Para adicionar uma frase nova: copie um bloco { ... } e cole abaixo,
 *     trocando o "id" para um valor único.
 *   • "dimensao": a qual eixo a frase pertence (use uma das chaves de DIMENSOES).
 *   • "peso": quão importante é a frase (1 = normal, 2 = conta o dobro).
 *   • "alerta": true  -> é um SINAL DE ALERTA (quanto mais "Sim", pior).
 *              false -> é um SINAL POSITIVO (quanto mais "Sim", melhor).
 *   • "bandeira": um resumo curto que aparece na leitura quando a resposta
 *     acende esse ponto (verde) ou acende esse alerta (vermelho).
 *
 *  As respostas usam sempre a mesma escala de 0 a 3:
 *      0 = Não / Nunca      1 = Às vezes
 *      2 = Quase sempre     3 = Sempre / Com certeza
 * =============================================================================
 */

/* As seis dimensões avaliadas. Você pode renomear os rótulos à vontade. */
const DIMENSOES = {
  respeito:        { rotulo: "Respeito & Limites",          emoji: "🛡️" },
  consistencia:    { rotulo: "Consistência & Palavra",      emoji: "🧱" },
  transparencia:   { rotulo: "Clareza & Transparência",     emoji: "🔎" },
  disponibilidade: { rotulo: "Interesse Real por Você",     emoji: "💬" },
  intencao:        { rotulo: "Intenção & Direção",          emoji: "🎯" },
  seguranca:       { rotulo: "Segurança (sem controle)",    emoji: "🕊️" },
};

/* A escala de resposta, usada em todas as frases. */
const ESCALA = [
  { valor: 0, texto: "Não / Nunca" },
  { valor: 1, texto: "Às vezes" },
  { valor: 2, texto: "Quase sempre" },
  { valor: 3, texto: "Sempre / Com certeza" },
];

/*
 * O QUESTIONÁRIO.
 * Cada frase é uma observação concreta sobre o que ELE falou ou fez.
 * "alerta: true" = frase de risco (invertida na pontuação).
 */
const FRASES = [
  // --- Respeito & Limites ---
  { id: "resp1", dimensao: "respeito", peso: 2, alerta: false,
    texto: "Quando você diz “não” ou coloca um limite, ele respeita numa boa.",
    bandeira: "Respeita os seus limites" },
  { id: "resp2", dimensao: "respeito", peso: 1, alerta: true,
    texto: "Ele fala das ex ou de outras mulheres de forma desrespeitosa.",
    bandeira: "Desrespeita mulheres na conversa" },
  { id: "resp3", dimensao: "respeito", peso: 1, alerta: true,
    texto: "Ele insiste ou pressiona depois que você já disse não.",
    bandeira: "Insiste depois do “não”" },

  // --- Consistência & Palavra ---
  { id: "cons1", dimensao: "consistencia", peso: 2, alerta: false,
    texto: "As atitudes dele batem com as palavras — ele faz o que diz.",
    bandeira: "Palavra e atitude batem" },
  { id: "cons2", dimensao: "consistencia", peso: 1, alerta: false,
    texto: "Ele cumpre o que combina (horários, encontros, promessas).",
    bandeira: "Cumpre o combinado" },
  { id: "cons3", dimensao: "consistencia", peso: 2, alerta: true,
    texto: "Ele some por dias e depois volta como se nada tivesse acontecido.",
    bandeira: "Some e volta (migalhas)" },

  // --- Clareza & Transparência ---
  { id: "tran1", dimensao: "transparencia", peso: 2, alerta: false,
    texto: "Ele é claro sobre o que quer com você.",
    bandeira: "É claro sobre o que quer" },
  { id: "tran2", dimensao: "transparencia", peso: 1, alerta: true,
    texto: "Ele desconversa quando você pergunta algo direto sobre a vida dele.",
    bandeira: "Foge de perguntas diretas" },
  { id: "tran3", dimensao: "transparencia", peso: 1, alerta: true,
    texto: "As histórias dele mudam ou você percebe contradições.",
    bandeira: "Histórias que não fecham" },

  // --- Interesse Real por Você ---
  { id: "disp1", dimensao: "disponibilidade", peso: 2, alerta: false,
    texto: "Ele demonstra interesse pela sua vida, não só pelo encontro.",
    bandeira: "Se interessa por você de verdade" },
  { id: "disp2", dimensao: "disponibilidade", peso: 1, alerta: true,
    texto: "As conversas giram quase sempre em torno de sexo ou aparência.",
    bandeira: "Conversa só puxa pro físico" },

  // --- Intenção & Direção ---
  { id: "inte1", dimensao: "intencao", peso: 2, alerta: false,
    texto: "Ele fala em se conhecerem de verdade / em planos concretos.",
    bandeira: "Sinaliza direção e futuro" },
  { id: "inte2", dimensao: "intencao", peso: 2, alerta: true,
    texto: "Ele foge de qualquer definição sobre “o que vocês são”.",
    bandeira: "Evita qualquer definição" },

  // --- Segurança (sem controle) ---
  { id: "segu1", dimensao: "seguranca", peso: 2, alerta: false,
    texto: "Você se sente calma e segura conversando com ele.",
    bandeira: "Passa segurança e calma" },
  { id: "segu2", dimensao: "seguranca", peso: 2, alerta: true,
    texto: "Ele quer saber onde e com quem você está de um jeito que incomoda.",
    bandeira: "Controle disfarçado de cuidado" },
  { id: "segu3", dimensao: "seguranca", peso: 2, alerta: true,
    texto: "Ele te faz sentir culpada quando você não faz o que ele quer.",
    bandeira: "Usa culpa pra te manipular" },
];

/*
 * OS ARQUÉTIPOS.
 * O app calcula as pontuações e escolhe o PRIMEIRO arquétipo cuja "condição"
 * for verdadeira (de cima pra baixo). Por isso, coloque os alertas mais
 * sérios no topo. Cada condição recebe (g) com:
 *    g.geral            -> nota geral 0..100
 *    g.dim.<chave>      -> nota da dimensão 0..100  (ex: g.dim.seguranca)
 *    g.alertasFortes    -> quantos alertas graves acenderam
 */
const ARQUETIPOS = [
  {
    id: "controlador",
    nome: "O Controlador Disfarçado",
    emoji: "🚩",
    cor: "#e5484d",
    resumo: "Cuidado disfarçado de controle. O charme pode existir, mas os limites somem.",
    conselho: "Segurança de verdade não vem com vigilância nem culpa. Preste muita atenção antes de avançar.",
    condicao: (g) => g.dim.seguranca < 45,
  },
  {
    id: "intermitente",
    nome: "O Intermitente",
    emoji: "🌗",
    cor: "#f76b15",
    resumo: "Aparece e some. Migalhas de atenção que te deixam sempre esperando.",
    conselho: "Constância é atitude, não promessa. Repare se ele só volta quando é conveniente pra ele.",
    condicao: (g) => g.dim.consistencia < 45,
  },
  {
    id: "vitrine",
    nome: "O Encantador de Vitrine",
    emoji: "✨",
    cor: "#f5a623",
    resumo: "Charmoso na conversa, some na hora de agir. Fala bonito, entrega pouco.",
    conselho: "Compare o que ele fala com o que ele faz. Palavra sem atitude é só marketing.",
    condicao: (g) => g.dim.transparencia >= 55 && g.dim.consistencia < 60,
  },
  {
    id: "indefinido",
    nome: "O Indefinido",
    emoji: "🌫️",
    cor: "#8e8e93",
    resumo: "Foge de qualquer definição. Nem sim, nem não — te deixa no limbo.",
    conselho: "Você merece clareza. “Não sei” prolongado costuma ser um “não” confortável pra ele.",
    condicao: (g) => g.dim.intencao < 50,
  },
  {
    id: "construtor",
    nome: "O Construtor",
    emoji: "💚",
    cor: "#30a46c",
    resumo: "Fala e age como quem quer construir algo real. Palavra, atitude e respeito no mesmo lugar.",
    conselho: "Sinais muito verdes. Siga observando com leveza — a consistência ao longo do tempo é a prova final.",
    condicao: (g) => g.geral >= 75 && g.dim.seguranca >= 60,
  },
  {
    id: "sincero",
    nome: "O Sincero em Construção",
    emoji: "🌱",
    cor: "#30a46c",
    resumo: "Honesto sobre onde está, mesmo sem pressa. Respeita e não enrola.",
    conselho: "Bom sinal. Observe se a direção continua clara com o tempo, sem você ter que puxar.",
    condicao: (g) => g.geral >= 60 && g.dim.transparencia >= 60,
  },
  {
    // Rede de segurança: se nada acima bater, cai aqui.
    id: "misto",
    nome: "O Sinal Misto",
    emoji: "🔀",
    cor: "#f5a623",
    resumo: "Manda sinais trocados: uma hora presente, outra distante. Ainda é cedo pra saber.",
    conselho: "Não decida no impulso. Junte mais observações em outros encontros antes de concluir.",
    condicao: () => true,
  },
];

/* Faixas da leitura geral (a “tarja” colorida do resultado). */
const FAIXAS = [
  { min: 75, rotulo: "Sinais verdes",  emoji: "💚", cor: "#30a46c" },
  { min: 58, rotulo: "Promissor",      emoji: "💛", cor: "#f5a623" },
  { min: 42, rotulo: "Vale observar",  emoji: "🧡", cor: "#f76b15" },
  { min: 0,  rotulo: "Muitos alertas", emoji: "🚩", cor: "#e5484d" },
];

/* =============================================================================
 *  MOTOR DE CÁLCULO — normalmente você não precisa mexer daqui pra baixo.
 * ============================================================================= */

/* Converte a resposta bruta (0..3) em "pontos bons" 0..100, invertendo alertas. */
function pontuarFrase(frase, valor) {
  const bruto = frase.alerta ? (3 - valor) : valor; // alerta: quanto mais, pior
  return (bruto / 3) * 100;
}

/*
 * Recebe um objeto { idDaFrase: valor } e devolve a leitura completa:
 *   { geral, dim:{...}, faixa, arquetipo, positivos:[], alertas:[] }
 */
function calcular(respostas) {
  const somaDim = {}, pesoDim = {};
  const positivos = [], alertas = [];
  let alertasFortes = 0;

  for (const frase of FRASES) {
    const valor = respostas[frase.id];
    if (valor === undefined || valor === null) continue;

    const pontos = pontuarFrase(frase, valor);
    somaDim[frase.dimensao] = (somaDim[frase.dimensao] || 0) + pontos * frase.peso;
    pesoDim[frase.dimensao] = (pesoDim[frase.dimensao] || 0) + frase.peso;

    // Monta listas de bandeiras verdes / vermelhas para exibir na leitura.
    if (frase.alerta && valor >= 2) {
      alertas.push(frase.bandeira);
      if (frase.peso >= 2) alertasFortes++;
    }
    if (!frase.alerta && valor >= 2) {
      positivos.push(frase.bandeira);
    }
  }

  // Nota por dimensão (0..100).
  const dim = {};
  for (const chave in DIMENSOES) {
    dim[chave] = pesoDim[chave] ? Math.round(somaDim[chave] / pesoDim[chave]) : null;
  }

  // Nota geral = média das dimensões respondidas.
  const notas = Object.values(dim).filter((n) => n !== null);
  const geral = notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : 0;

  const g = { geral, dim, alertasFortes };
  const arquetipo = ARQUETIPOS.find((a) => a.condicao(g)) || ARQUETIPOS[ARQUETIPOS.length - 1];
  const faixa = FAIXAS.find((f) => geral >= f.min);

  return { geral, dim, faixa, arquetipo, positivos, alertas };
}

/* Deixa tudo acessível para o app.js */
window.MODELO = { DIMENSOES, ESCALA, FRASES, ARQUETIPOS, FAIXAS, calcular };
