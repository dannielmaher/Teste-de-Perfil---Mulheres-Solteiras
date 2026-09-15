# Inventário ATHENA

**Teste de Perfil — Mulheres Solteiras.** Um web app (PWA) que ajuda a mulher a reconhecer
**qual padrão ela repete no amor**, a partir dos 6 Arquétipos de Sabotagem Afetiva do método
ATHENA PRIME.

É o **instrumento de entrada** previsto no Código-Fonte do método:

> **Teste / Quiz de Arquétipos** — Futuro instrumento de entrada, consciência e devolutiva
> psicoeducacional.

---

## O que ele faz

Seis situações reais. Em cada uma, ela escolhe o que **mais** e o que **menos** se parece com
ela. No fim, recebe uma leitura com o padrão dominante, o padrão que amplifica, o custo, a
visão masculina madura, a força a preservar e a recalibração.

**A regra que governa tudo:** os arquétipos descrevem o padrão **dela**, nunca um rótulo do
homem. A devolutiva sempre fala em *"você tende a…"*, jamais *"você é…"*.

> "Você não é o arquétipo. Você está vivendo um padrão. E padrão pode ser decodificado,
> despertado e reposicionado."

---

## Por que o formato é assim (e não um quiz comum)

O teste usa **FHT — Forçado Hierárquico de Tipicidade**: ela precisa escolher a opção mais
parecida **e** a menos parecida. Isso força priorização entre alternativas que soam todas
defensáveis.

A razão é técnica e está no cânone: este avatar tem alta capacidade de autoapresentação
positiva. Itens literais que soem como fraqueza disparam *faking good* e **colapsam a
fidedignidade da escala**. O formato FHT e a reformulação do déficit como "excesso de uma
virtude mal-gerenciada" existem exatamente para evitar isso.

**Pontuação:** mais parecida `+2` · menos parecida `−1` · resultado apresentado como perfil
percentual (`45% Salvadora | 30% Urgente | 25% Carente`).

---

## Como testar no celular

```
python3 -m http.server 8099
```

Depois abra `http://localhost:8099` no computador, ou `http://SEU_IP:8099` no celular (mesmo
Wi-Fi).

## Como publicar (grátis, sem loja)

**Netlify Drop** — acesse `app.netlify.com/drop` e arraste esta pasta. Você recebe um link na
hora. **GitHub Pages** — Settings → Pages → escolha a branch e a pasta `/ (root)`.

No celular: iPhone (Safari) → Compartilhar → "Adicionar à Tela de Início". Android (Chrome) →
menu ⋮ → "Instalar app". O ícone fica na tela e o app abre até sem internet.

---

## Como calibrar (sem saber programar)

Tudo está em **`js/inventario.js`**, comentado em português.

| O que você quer mudar | Onde mexer |
|---|---|
| Texto de um cenário | campo `situacao` |
| Uma das respostas | campo `texto` dentro de `opcoes` |
| Descrição de um arquétipo | bloco `ARQUETIPOS` (7 campos por arquétipo) |
| Adicionar um cenário | copie um bloco `{ ... }` inteiro e troque o `id` |

Ao editar, troque a versão no `sw.js` (`v1` → `v2`) para atualizar quem já usou o app.

**Os cenários 1 a 6 são verbatim** do Estudo Metodológico Fundacional. Alterá-los muda o
instrumento — vale conferir com o Danniel antes.

---

## O cânone

O método está documentado em `docs/`, extraído dos documentos-fonte do Drive:

- **`docs/CANONE_ATHENA.md`** — os 6 arquétipos em detalhe, Lei ATHENA, Tríade D, Soberania
  Afetiva, léxico permitido/proibido, posicionamento, ética.
- **`docs/CANONE_INVENTARIO.md`** — o avatar, a arquitetura completa do inventário (35 itens,
  7 áreas, 4 camadas), os 6 cenários, formato do relatório, disclaimers.

Ambos registram os **conflitos e lacunas** encontrados no material original em vez de
disfarçá-los. Vale ler a seção de alertas antes de evoluir o produto.

---

## O que ainda falta

1. **Os 35 itens finais** — hoje o app usa 6 cenários (Camada 1). Faltam as Camadas 2, 3 e 4.
2. **Os valores de corte** — se perderam na conversão do .docx; os atuais são provisórios.
3. **Calibração empírica** — o cânone pede N≥50 para os cortes e N≥100 para a ponderação.
4. **Os 50 green/red flags** do Checklist ATHENA — nunca foram escritos. São o outro app
   possível (leitura do homem), separado deste.

---

## Privacidade

As respostas ficam salvas **apenas no aparelho** (localStorage). Nada é enviado para a
internet.

## Limites

Este instrumento identifica padrões que a pessoa pode reconhecer e transformar. **Não é
avaliação psicológica, não equivale a diagnóstico e não substitui terapia** — é complementar
a ela. O app inclui o texto de encaminhamento profissional previsto no método.
