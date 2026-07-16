# 💗 Registro de Possíveis

Um **web app** (PWA) leve e psicométrico que ajuda mulheres solteiras a
**lerem os sinais** de um homem antes de se envolverem. Ela registra o que ele
**falou e fez**, e o app devolve uma leitura com **pontuação, arquétipo e
alertas** — num tom leve e fácil de mandar pra uma amiga: *"olha esse aqui, vamos testar?"*

> **Sem IA que "adivinha" o cara.** O cérebro é um **modelo psicométrico**
> transparente (no espírito dos arquétipos), definido e calibrado por você. É um
> espelho organizado das observações da própria mulher — quem decide é ela.

---

## 📱 Como testar no seu celular (2 minutos)

O app é só um site que vira app. Pra ver funcionando:

1. **No computador**, dentro desta pasta, rode um servidorzinho local:
   ```
   python3 -m http.server 8099
   ```
2. No navegador do **computador**, abra: `http://localhost:8099`
3. Pra abrir no **celular** (no mesmo Wi-Fi), descubra o IP do computador e
   acesse `http://SEU_IP:8099` no navegador do celular.

Não quer mexer com isso? Veja a seção **"Publicar de graça"** abaixo — é ainda
mais fácil.

---

## 🚀 Publicar de graça (sem loja, sem taxa anual)

Você **não precisa** da Apple Store nem da Play Store pra começar. O jeito mais
rápido e barato:

### Opção 1 — Netlify Drop (o mais fácil, arrasta e solta)
1. Acesse **app.netlify.com/drop**
2. **Arraste esta pasta inteira** pra dentro da página.
3. Pronto: você recebe um link tipo `https://seu-app.netlify.app`. É esse link
   que a mulher abre no celular e "instala" na tela inicial.

### Opção 2 — GitHub Pages (gratuito, já que o projeto está no GitHub)
1. No repositório, vá em **Settings → Pages**.
2. Em "Source", escolha a branch e a pasta **/ (root)**. Salve.
3. Em ~1 minuto o app fica no ar num link `https://...github.io/...`.

Depois de publicado, no celular:
- **iPhone (Safari):** botão Compartilhar → "Adicionar à Tela de Início".
- **Android (Chrome):** menu ⋮ → "Instalar app" / "Adicionar à tela inicial".

O ícone 💗 aparece na tela como um app normal e abre até **sem internet**.

---

## 💰 Cobrar a "taxinha barata"

Como é um link, é fácil colocar um **pagamento na frente** dele:
- **Hotmart / Kiwify / Eduzz** (Brasil): você vende o "acesso" e entrega o link.
- **Stripe / Mercado Pago**: link de pagamento ou assinatura mensal baixa.

O modelo ideal pro seu caso é **assinatura baixinha** (ex.: alguns reais/mês) ou
**pagamento único** de acesso vitalício.

---

## 🎛️ Como CALIBRAR o teste (você não precisa saber programar)

Todo o "cérebro" está em **`js/model.js`**, com instruções em português no topo
do arquivo. Lá você pode, sem medo:
- **Trocar o texto** de qualquer frase.
- **Adicionar/remover** frases (é só copiar um bloco `{ ... }`).
- Ajustar **pesos** (o quanto cada frase importa).
- Editar os **arquétipos** (nomes, emojis, cores, resumos e conselhos).
- Mudar as **faixas** de pontuação (verde / amarelo / vermelho).

Cada campo tem um comentário explicando o que faz. Se editar os arquivos,
lembre de trocar a versão no `sw.js` (`v1` → `v2`) pra atualizar quem já usou.

---

## 🗂️ O que tem em cada arquivo

| Arquivo | Para que serve |
|---|---|
| `index.html` | As telas do app |
| `css/styles.css` | O visual (cores no topo, fáceis de trocar) |
| `js/model.js` | **O modelo psicométrico** — perguntas e arquétipos (calibre aqui) |
| `js/app.js` | A lógica (navegação, salvar fichas, resultado) |
| `manifest.webmanifest` + `sw.js` + `icons/` | O que faz virar "app instalável" e offline |

---

## 🔒 Privacidade

Tudo é salvo **só no aparelho da usuária** (localStorage do navegador). Nada é
enviado pra internet. Isso é importante num app com um tema sensível como esse.

---

## 🧭 Próximos passos (ideias)

- **Ebook** como complemento (o mesmo conteúdo/conceitos em texto).
- Camada de **IA opcional** pra interpretar anotações em texto livre e sugerir
  em qual critério encaixa (mantendo o modelo psicométrico como base confiável).
- **Histórico e comparação** entre vários "possíveis".
- Empacotar como **app nativo** (via Capacitor) pras lojas, se o projeto crescer.

---

### ⚠️ Aviso
Ferramenta de autoconhecimento e entretenimento — **não** é laudo psicológico
nem aconselhamento profissional. A intuição da usuária vem sempre em primeiro
lugar.
