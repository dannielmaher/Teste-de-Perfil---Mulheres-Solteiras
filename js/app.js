/* =============================================================================
 *  INVENTÁRIO ATHENA — lógica do app
 *  Depende de js/inventario.js (window.INVENTARIO).
 * ========================================================================== */

(function () {
  const { ARQUETIPOS, ORDEM, CENARIOS, FRAMING, calcular, rotuloCombinacao } = window.INVENTARIO;
  const CHAVE = "inventario-athena-v1";

  // Estado do teste em andamento.
  let respostas = {};
  let indice = 0;
  let etapa = "mais"; // "mais" -> escolhe a mais parecida; "menos" -> a menos parecida

  /* ---------- Navegação ---------- */
  function irPara(id) {
    document.querySelectorAll(".tela").forEach((t) => t.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");
    window.scrollTo(0, 0);
  }

  /* ---------- Persistência (só no aparelho) ---------- */
  function carregar() {
    try { return JSON.parse(localStorage.getItem(CHAVE)); } catch (e) { return null; }
  }
  function salvar(resultado) {
    localStorage.setItem(CHAVE, JSON.stringify({ resultado, respostas, em: Date.now() }));
  }

  /* ---------- Abertura ---------- */
  function montarAbertura() {
    document.getElementById("framing").textContent = FRAMING;
    const anterior = carregar();
    const btn = document.getElementById("btn-ver-anterior");
    btn.style.display = anterior ? "block" : "none";
  }

  /* ---------- Início do teste ---------- */
  function comecar() {
    respostas = {};
    indice = 0;
    etapa = "mais";
    renderCenario();
    irPara("tela-teste");
  }

  /* ---------- Renderiza o cenário atual ---------- */
  function renderCenario() {
    const cenario = CENARIOS[indice];
    const r = respostas[cenario.id] || {};

    document.getElementById("passo-atual").textContent = `${indice + 1} de ${CENARIOS.length}`;
    document.getElementById("progresso").style.width = `${(indice / CENARIOS.length) * 100}%`;

    document.getElementById("cenario-titulo").textContent = cenario.titulo;
    document.getElementById("cenario-situacao").textContent = cenario.situacao;

    const instrucao = document.getElementById("instrucao");
    instrucao.className = etapa === "mais" ? "instrucao instrucao-mais" : "instrucao instrucao-menos";
    instrucao.innerHTML = etapa === "mais"
      ? "Qual opção <strong>MAIS</strong> se parece com o que você faria?"
      : "E qual <strong>MENOS</strong> se parece com você?";

    const lista = document.getElementById("opcoes");
    lista.innerHTML = "";

    cenario.opcoes.forEach((op) => {
      const chave = op.neutra ? "__neutra" : op.arq;
      const btn = document.createElement("button");
      btn.className = "opcao";
      btn.textContent = op.texto;

      // Marca visualmente o que já foi escolhido.
      if (r.mais === chave) btn.classList.add("escolhida-mais");
      if (r.menos === chave) btn.classList.add("escolhida-menos");

      // Na etapa "menos", a opção já marcada como "mais" fica bloqueada.
      const bloqueada = etapa === "menos" && r.mais === chave;
      if (bloqueada) btn.classList.add("bloqueada");

      btn.addEventListener("click", () => {
        if (bloqueada) return;
        escolher(cenario.id, chave);
      });

      lista.appendChild(btn);
    });

    document.getElementById("btn-voltar-passo").style.visibility =
      (indice === 0 && etapa === "mais") ? "hidden" : "visible";
  }

  /* ---------- Registra a escolha e avança ---------- */
  function escolher(idCenario, chave) {
    const r = respostas[idCenario] || {};
    if (etapa === "mais") {
      r.mais = chave;
      if (r.menos === chave) delete r.menos; // não pode ser as duas coisas
      respostas[idCenario] = r;
      etapa = "menos";
      renderCenario();
    } else {
      r.menos = chave;
      respostas[idCenario] = r;
      avancar();
    }
  }

  function avancar() {
    if (indice < CENARIOS.length - 1) {
      indice++;
      etapa = "mais";
      renderCenario();
    } else {
      finalizar();
    }
  }

  function voltarPasso() {
    if (etapa === "menos") {
      etapa = "mais";
    } else if (indice > 0) {
      indice--;
      etapa = "menos";
    }
    renderCenario();
  }

  /* ---------- Resultado ---------- */
  function finalizar() {
    const resultado = calcular(respostas);
    salvar(resultado);
    mostrarResultado(resultado);
  }

  function mostrarResultado(res) {
    const dom = ARQUETIPOS[res.dominante.chave];
    const sec = res.secundario ? ARQUETIPOS[res.secundario.chave] : null;
    const c = document.getElementById("resultado-conteudo");

    // Barras de perfil — o formato "45% Salvadora | 30% Urgente" do cânone.
    const barras = res.perfil.map((p) => {
      const a = ARQUETIPOS[p.chave];
      return `
        <div class="perfil-linha">
          <div class="perfil-topo">
            <span>${a.emoji} ${a.nome}</span>
            <strong style="color:${a.cor}">${p.pct}%</strong>
          </div>
          <div class="perfil-barra"><div class="perfil-fill" style="width:${p.pct}%;background:${a.cor}"></div></div>
        </div>`;
    }).join("");

    // Combinação dominante + secundário (amplificador).
    const combo = sec ? rotuloCombinacao(res.dominante.chave, res.secundario.chave) : null;

    const blocoSecundario = sec ? `
      <div class="bloco">
        <h3>Padrão que amplifica</h3>
        <p class="destaque-sec"><span style="color:${sec.cor}">${sec.emoji} ${sec.nome}</span> — ${res.secundario.pct}%</p>
        <p>${sec.nucleo} Ele não substitui o primeiro: <strong>modifica</strong> a forma como ele aparece.</p>
        ${combo ? `<p class="combo">Na prática, essa combinação costuma aparecer como <strong>“${combo}”</strong>.</p>` : ""}
      </div>` : "";

    const blocoDifuso = res.difuso ? `
      <div class="bloco bloco-aviso">
        <h3>Perfil difuso</h3>
        <p>Nenhum padrão se destacou com clareza nas suas respostas. Isso não é erro nem falta
        de resultado — costuma acontecer quando você está em transição, ou quando responde
        pensando em relações muito diferentes entre si. Vale refazer pensando em <em>uma</em>
        relação específica.</p>
      </div>` : "";

    c.innerHTML = `
      <div class="res-cabecalho" style="background:linear-gradient(135deg, ${dom.cor}, ${escurecer(dom.cor)})">
        <div class="res-emoji">${dom.emoji}</div>
        <p class="res-rotulo">Seu padrão de entrada</p>
        <div class="res-nome">${dom.nome}</div>
        <div class="res-pct">${res.dominante.pct}%</div>
        <p class="res-nucleo">${dom.nucleo}</p>
      </div>

      <div class="bloco bloco-espelho">
        <h3>A pergunta de espelho</h3>
        <p class="espelho">“${dom.espelho}”</p>
      </div>

      <div class="bloco">
        <h3>Como esse padrão tende a aparecer</h3>
        <p><strong>No que você faz:</strong> ${dom.faz}</p>
        <p><strong>Na sua narrativa interna:</strong> ${dom.pensa}</p>
      </div>

      <div class="bloco">
        <h3>O que ele custa</h3>
        <p>${dom.custo}</p>
      </div>

      <div class="bloco bloco-masculino">
        <h3>Como um homem de valor lê isso</h3>
        <p>${dom.visaoMasculina}</p>
      </div>

      <div class="bloco bloco-forca">
        <h3>A força que não se perde</h3>
        <p>Todo padrão nasce de uma força legítima que perdeu direção. A sua é:
        <strong>${dom.forca}</strong> O trabalho não é destruir isso — é recalibrar.</p>
      </div>

      <div class="bloco bloco-direcionar">
        <h3>A recalibração</h3>
        <p>${dom.recalibracao}</p>
      </div>

      ${blocoSecundario}
      ${blocoDifuso}

      <div class="bloco">
        <h3>Seu perfil completo</h3>
        ${barras}
        <p class="confianca">Nível de confiança desta leitura: <strong>${res.confianca}</strong></p>
      </div>

      <div class="res-acoes">
        <button class="btn btn-secundario btn-bloco" id="btn-compartilhar-res">Compartilhar com uma amiga</button>
        <button class="btn btn-primario btn-bloco" id="btn-refazer">Refazer o inventário</button>
      </div>

      <div class="disclaimer">
        <p><strong>Importante.</strong> Este instrumento identifica padrões que você pode
        reconhecer e transformar. Ele não é avaliação psicológica, não equivale a diagnóstico
        e não substitui terapia — é complementar a ela.</p>
        <p>Você não <em>é</em> um arquétipo. Você está vivendo um padrão. E padrão pode ser
        decodificado, despertado e reposicionado.</p>
      </div>
    `;

    c.querySelector("#btn-refazer").addEventListener("click", comecar);
    c.querySelector("#btn-compartilhar-res").addEventListener("click", () => compartilhar(dom));

    document.getElementById("progresso").style.width = "100%";
    irPara("tela-resultado");
  }

  /* ---------- Compartilhar ---------- */
  function compartilhar(dom) {
    const texto = dom
      ? `Fiz o Inventário ATHENA e o meu padrão de entrada é ${dom.nome}. Faz o seu:`
      : `Encontrei este inventário sobre padrões afetivos. Vale fazer:`;
    const url = location.href.split("#")[0];
    if (navigator.share) {
      navigator.share({ title: "Inventário ATHENA", text: texto, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${texto} ${url}`).then(
        () => alert("Link copiado."),
        () => prompt("Copie o link:", url)
      );
    } else {
      prompt("Copie o link:", url);
    }
  }

  /* ---------- Utilidades ---------- */
  function escurecer(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, ((n >> 16) & 255) - 45);
    const g = Math.max(0, ((n >> 8) & 255) - 45);
    const b = Math.max(0, (n & 255) - 45);
    return `rgb(${r},${g},${b})`;
  }

  /* ---------- Ligações ---------- */
  document.getElementById("btn-comecar").addEventListener("click", comecar);
  document.getElementById("btn-voltar-passo").addEventListener("click", voltarPasso);
  document.getElementById("btn-sobre").addEventListener("click", () => irPara("tela-sobre"));
  document.getElementById("btn-ver-anterior").addEventListener("click", () => {
    const a = carregar();
    if (a && a.resultado) mostrarResultado(a.resultado);
  });
  document.querySelectorAll("[data-inicio]").forEach((b) =>
    b.addEventListener("click", () => { montarAbertura(); irPara("tela-inicio"); })
  );

  montarAbertura();
})();
