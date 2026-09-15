# ELE JÁ TE DISSE — Volume 1 · As conversas

Ebook do funil de entrada do método ATHENA PRIME. Aprovado pelo Maestro em 11/09/2026.

## Arquivos

| Arquivo | O que é |
|---|---|
| `vol1-conversas.md` | **A fonte.** Todo o texto do livro. É aqui que se edita. |
| `build-docx.js` | Gera o `.docx` paginado a partir da fonte. |
| `ELE_JA_TE_DISSE_Vol1_PILOTO.docx` | O livro montado — 6×9", capa, sumário, numeração. |

## Como regerar o .docx depois de editar o texto

```
cd ebook
npm install docx      # só na primeira vez
node build-docx.js
```

## As marcas da fonte

O `.md` usa marcadores no início de cada linha, lidos pelo `build-docx.js`:

`@COVER@` `@SUB@` `@VOL@` `@AUTHOR@` — a capa ·
`@PART@` `@PARTSUB@` `@PARTNOTE@` — abertura de parte ·
`@CHNUM@` `@H1@` `@H2@` `@H3@` — títulos ·
`@P@` parágrafo · `@Q@` citação na voz dela · `@BIG@` a pergunta de observação ·
`@PAGEBREAK@` quebra de página.

Para editar o texto, basta mudar o que vem depois do marcador.

## ⚠️ O que ainda não é definitivo

Os nove blocos **"O que ele está fazendo"** foram escritos por aproximação, para o livro
existir e o Maestro avaliar a forma. **Só ele pode escrevê-los de verdade** — é a tradução
em primeira pessoa masculina, a demanda não atendida que dá razão ao produto.

Pendente também: disparar a pesquisa (Perplexity Passo 1), que audita a literatura de
ghosting, a segurança do encontro presencial e o preço do concorrente.

## O cânone que este livro obedece

Ver `../docs/CANONE_ATHENA.md`. Em resumo: **gesto observável + custo + escolha**, nunca
causa interna, nunca identidade. E as quatro linhas de morte — não virar coach de conquista,
não virar diagnóstico, não culpar a mulher, não ensinar a otimizar perfil.
