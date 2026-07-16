/* =============================================================================
 *  Registro de Possíveis — Lógica do app (navegação, questionário, salvar)
 *  Depende de js/model.js (window.MODELO).
 * ========================================================================== */

(function () {
  const { DIMENSOES, ESCALA, FRASES, calcular } = window.MODELO;
  const CHAVE_STORAGE = "registro-possiveis-fichas-v1";

  // Estado da avaliação em andamento.
  let respostasAtuais = {};
  let fichaEditandoId = null;

  /* ---------- Persistência (salva só no aparelho, via localStorage) ---------- */
  function carregarFichas() {
    try { return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || []; }
    catch (e) { return []; }
  }
  function salvarFichas(fichas) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(fichas));
  }

  /* ---------- Navegação entre telas ---------- */
  function irPara(idTela) {
    document.querySelectorAll(".tela").forEach((t) => t.classList.remove("ativa"));
    document.getElementById(idTela).classList.add("ativa");
    window.scrollTo(0, 0);
  }

  /* ---------- Tela inicial: lista de fichas ---------- */
  function renderInicio() {
    const fichas = carregarFichas().sort((a, b) => b.criadoEm - a.criadoEm);
    const lista = document.getElementById("lista-fichas");
    const vazio = document.getElementById("vazio");
    lista.innerHTML = "";

    vazio.classList.toggle("escondido", fichas.length > 0);

    fichas.forEach((ficha) => {
      const r = ficha.resultado;
      const el = document.createElement("div");
      el.className = "ficha";
      el.innerHTML = `
        <div class="ficha-medalha" style="background:${r.arquetipo.cor}">${r.arquetipo.emoji}</div>
        <div class="ficha-info">
          <div class="ficha-nome">${escapar(ficha.nome || "Sem nome")}</div>
          <div class="ficha-arq">${r.arquetipo.nome}</div>
        </div>
        <div class="ficha-nota" style="color:${r.faixa.cor}">${r.geral}</div>
        <button class="ficha-apagar" title="Apagar" aria-label="Apagar">🗑️</button>
      `;
      el.addEventListener("click", (ev) => {
        if (ev.target.classList.contains("ficha-apagar")) return;
        mostrarResultado(ficha.resultado, ficha.nome);
      });
      el.querySelector(".ficha-apagar").addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (confirm(`Apagar a ficha "${ficha.nome || "Sem nome"}"?`)) {
          salvarFichas(carregarFichas().filter((f) => f.id !== ficha.id));
          renderInicio();
        }
      });
      lista.appendChild(el);
    });
  }

  /* ---------- Questionário ---------- */
  function iniciarNovoTeste() {
    respostasAtuais = {};
    fichaEditandoId = null;
    document.getElementById("nome-cara").value = "";
    renderPerguntas();
    atualizarProgresso();
    irPara("tela-teste");
  }

  function renderPerguntas() {
    const container = document.getElementById("perguntas");
    container.innerHTML = "";
    FRASES.forEach((frase) => {
      const dim = DIMENSOES[frase.dimensao];
      const bloco = document.createElement("div");
      bloco.className = "pergunta";
      bloco.dataset.id = frase.id;
      bloco.innerHTML = `
        <div class="pergunta-dim">${dim.emoji} ${dim.rotulo}</div>
        <div class="pergunta-texto">${frase.texto}</div>
        <div class="opcoes">
          ${ESCALA.map((op) => `<button class="opcao" data-valor="${op.valor}">${op.texto}</button>`).join("")}
        </div>
      `;
      bloco.querySelectorAll(".opcao").forEach((btn) => {
        btn.addEventListener("click", () => {
          bloco.querySelectorAll(".opcao").forEach((b) => b.classList.remove("marcada"));
          btn.classList.add("marcada");
          respostasAtuais[frase.id] = Number(btn.dataset.valor);
          atualizarProgresso();
        });
      });
      container.appendChild(bloco);
    });
  }

  function atualizarProgresso() {
    const total = FRASES.length;
    const feitas = Object.keys(respostasAtuais).length;
    document.getElementById("progresso").style.width = `${(feitas / total) * 100}%`;
  }

  function verResultado() {
    const total = FRASES.length;
    const feitas = Object.keys(respostasAtuais).length;
    if (feitas < total) {
      const faltam = total - feitas;
      if (!confirm(`Faltam ${faltam} resposta(s). A leitura fica mais certeira com tudo respondido. Ver mesmo assim?`)) {
        // Rola até a primeira pergunta sem resposta.
        const pendente = FRASES.find((f) => respostasAtuais[f.id] === undefined);
        if (pendente) document.querySelector(`.pergunta[data-id="${pendente.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }

    const nome = document.getElementById("nome-cara").value.trim();
    const resultado = calcular(respostasAtuais);

    // Salva/atualiza a ficha.
    const fichas = carregarFichas();
    const registro = {
      id: fichaEditandoId || gerarId(),
      nome,
      resultado,
      respostas: respostasAtuais,
      criadoEm: Date.now(),
    };
    const idx = fichas.findIndex((f) => f.id === registro.id);
    if (idx >= 0) fichas[idx] = registro; else fichas.push(registro);
    salvarFichas(fichas);

    mostrarResultado(resultado, nome);
  }

  /* ---------- Tela de resultado ---------- */
  function mostrarResultado(r, nome) {
    const c = document.getElementById("resultado-conteudo");
    const arq = r.arquetipo;

    const dimsHtml = Object.keys(DIMENSOES).map((chave) => {
      const nota = r.dim[chave];
      if (nota === null) return "";
      const d = DIMENSOES[chave];
      const cor = nota >= 65 ? "var(--verde)" : nota >= 45 ? "var(--amarelo)" : "var(--vermelho)";
      return `
        <div class="dim-linha">
          <div class="dim-topo">
            <span class="dim-nome">${d.emoji} ${d.rotulo}</span>
            <span class="dim-valor" style="color:${cor}">${nota}</span>
          </div>
          <div class="dim-barra"><div class="dim-fill" style="width:${nota}%;background:${cor}"></div></div>
        </div>`;
    }).join("");

    const positivosHtml = r.positivos.length
      ? `<div class="bloco"><h3>💚 Sinais a favor</h3><div class="tags">${r.positivos.map((t) => `<span class="tag tag-verde">${escapar(t)}</span>`).join("")}</div></div>`
      : "";

    const alertasHtml = r.alertas.length
      ? `<div class="bloco"><h3>🚩 Fique atenta a</h3><div class="tags">${r.alertas.map((t) => `<span class="tag tag-vermelha">${escapar(t)}</span>`).join("")}</div></div>`
      : "";

    c.innerHTML = `
      <div class="res-cabecalho" style="background:linear-gradient(135deg, ${arq.cor}, ${sombrear(arq.cor)})">
        <div class="res-emoji">${arq.emoji}</div>
        <div class="res-arq-nome">${arq.nome}</div>
        ${nome ? `<div class="res-nome-cara">sobre: ${escapar(nome)}</div>` : ""}
        ${anelSVG(r.geral)}
        <div class="res-faixa">${r.faixa.emoji} ${r.faixa.rotulo}</div>
        <p class="res-resumo">${arq.resumo}</p>
      </div>

      <div class="conselho">💡 ${arq.conselho}</div>

      <div class="bloco"><h3>📊 Leitura por dimensão</h3>${dimsHtml}</div>
      ${positivosHtml}
      ${alertasHtml}

      <div class="res-acoes">
        <button class="btn btn-secundario btn-bloco" id="btn-compartilhar-res">🔗 Mandar pra uma amiga testar</button>
        <button class="btn btn-primario btn-bloco" id="btn-voltar-inicio">Voltar ao início</button>
      </div>

      <p class="aviso-final">Isto é um espelho das suas observações, não um veredito. Quem decide é você. 💗</p>
    `;

    c.querySelector("#btn-voltar-inicio").addEventListener("click", () => { renderInicio(); irPara("tela-inicio"); });
    c.querySelector("#btn-compartilhar-res").addEventListener("click", () => compartilhar(nome, arq));

    irPara("tela-resultado");
  }

  /* ---------- Anel de nota em SVG ---------- */
  function anelSVG(nota) {
    const raio = 46, circ = 2 * Math.PI * raio;
    const preenchido = circ * (nota / 100);
    return `
      <svg class="res-nota-anel" width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="${raio}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="10"/>
        <circle cx="60" cy="60" r="${raio}" fill="none" stroke="#fff" stroke-width="10"
          stroke-linecap="round" stroke-dasharray="${preenchido} ${circ}"
          transform="rotate(-90 60 60)"/>
        <text x="60" y="58" text-anchor="middle" class="anel-num">${nota}</text>
        <text x="60" y="76" text-anchor="middle" class="anel-txt">de 100</text>
      </svg>`;
  }

  /* ---------- Compartilhar ---------- */
  function compartilhar(nome, arq) {
    const texto = arq
      ? `Fiz o teste "Registro de Possíveis" 💗 Deu "${arq.nome}" ${arq.emoji}. Faz o seu também:`
      : `Achei esse teste "Registro de Possíveis" 💗 A gente registra o que o cara fala e vê os sinais. Bora testar?`;
    const url = location.href.split("#")[0];
    if (navigator.share) {
      navigator.share({ title: "Registro de Possíveis", text: texto, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${texto} ${url}`).then(
        () => alert("Link copiado! É só colar pra sua amiga. 💗"),
        () => prompt("Copie o link:", url)
      );
    }
  }

  /* ---------- Utilidades ---------- */
  function gerarId() { return "f" + Math.floor(performance.now() * 1000) + "" + carregarFichas().length; }
  function escapar(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function sombrear(hex) {
    // Escurece uma cor hex ~18% pra fazer o degradê do cabeçalho.
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, ((n >> 16) & 255) - 40);
    const g = Math.max(0, ((n >> 8) & 255) - 40);
    const b = Math.max(0, (n & 255) - 40);
    return `rgb(${r},${g},${b})`;
  }

  /* ---------- Ligações de botões ---------- */
  document.getElementById("btn-nova").addEventListener("click", iniciarNovoTeste);
  document.getElementById("btn-ver-resultado").addEventListener("click", verResultado);
  document.getElementById("btn-compartilhar").addEventListener("click", () => compartilhar(null, null));
  document.getElementById("btn-sobre").addEventListener("click", () => irPara("tela-sobre"));
  document.querySelectorAll("[data-voltar]").forEach((b) =>
    b.addEventListener("click", () => { renderInicio(); irPara("tela-inicio"); })
  );

  /* ---------- Início ---------- */
  renderInicio();
})();
