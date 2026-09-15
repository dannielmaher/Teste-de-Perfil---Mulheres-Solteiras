const fs = require('fs');
const d = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
        PageBreak, Footer, PageNumber, TableOfContents, BorderStyle,
        SectionType, convertInchesToTwip } = d;

const OURO = '8A6D1F', TINTA = '1B1A25', CINZA = '55505F', CLARO = '857F92';
const SERIF = 'Georgia';

const lines = fs.readFileSync('livro.md','utf8').split('\n');
const kids = [];
const P = (text, o={}) => new Paragraph({
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { after: o.after ?? 160, line: o.line ?? 300, before: o.before ?? 0 },
  indent: o.indent,
  border: o.border,
  children: [ new TextRun({ text, font: o.font || SERIF, size: o.size || 22,
    color: o.color || TINTA, italics: !!o.italics, bold: !!o.bold,
    allCaps: !!o.caps, characterSpacing: o.cs || 0 }) ],
});

for (const raw of lines) {
  const line = raw.trim();
  if (!line) continue;
  const m = line.match(/^@([A-Z0-9]+)@(.*)$/);
  if (!m) continue;
  const [, tag, txt] = m;

  switch (tag) {
    case 'COVER':
      kids.push(new Paragraph({ spacing:{ before: 3200, after: 0 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 64, color: TINTA, characterSpacing: 40 }) ]}));
      break;
    case 'SUB':
      kids.push(new Paragraph({ spacing:{ before: 260, after: 0 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 24, color: CINZA, italics: true }) ]}));
      break;
    case 'VOL':
      kids.push(new Paragraph({ spacing:{ before: 900, after: 0 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 20, color: OURO, characterSpacing: 60 }) ]}));
      break;
    case 'AUTHOR':
      kids.push(new Paragraph({ spacing:{ before: 2600, after: 0 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 22, color: CINZA, characterSpacing: 40 }) ]}));
      break;
    case 'PAGEBREAK':
      kids.push(new Paragraph({ children:[ new PageBreak() ] }));
      break;
    case 'PART':
      kids.push(new Paragraph({ spacing:{ before: 2800, after: 0 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt.toUpperCase(), font: SERIF, size: 24, color: OURO, characterSpacing: 90 }) ]}));
      break;
    case 'PARTSUB':
      kids.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing:{ before: 240, after: 240 },
        alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 44, color: TINTA }) ]}));
      break;
    case 'PARTNOTE':
      kids.push(new Paragraph({ spacing:{ before: 0, after: 0 }, alignment: AlignmentType.CENTER,
        indent:{ left: convertInchesToTwip(0.9), right: convertInchesToTwip(0.9) },
        children:[ new TextRun({ text: txt, font: SERIF, size: 21, color: CINZA, italics: true }) ]}));
      break;
    case 'CHNUM':
      kids.push(new Paragraph({ spacing:{ before: 700, after: 100 },
        children:[ new TextRun({ text: txt.toUpperCase(), font: SERIF, size: 18, color: OURO, characterSpacing: 70 }) ]}));
      break;
    case 'H1':
      kids.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing:{ before: 0, after: 340 },
        children:[ new TextRun({ text: txt, font: SERIF, size: 40, color: TINTA }) ]}));
      break;
    case 'H2':
      kids.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing:{ before: 0, after: 320 },
        children:[ new TextRun({ text: txt, font: SERIF, size: 28, color: CINZA, italics: true }) ]}));
      break;
    case 'H3':
      kids.push(new Paragraph({ heading: HeadingLevel.HEADING_3, spacing:{ before: 420, after: 170 },
        children:[ new TextRun({ text: txt.toUpperCase(), font: SERIF, size: 17, color: OURO, bold: true, characterSpacing: 60 }) ]}));
      break;
    case 'Q':
      kids.push(new Paragraph({ spacing:{ before: 120, after: 260, line: 300 },
        indent:{ left: convertInchesToTwip(0.35) },
        border:{ left:{ style: BorderStyle.SINGLE, size: 12, color: OURO, space: 14 } },
        children:[ new TextRun({ text: txt, font: SERIF, size: 23, color: CINZA, italics: true }) ]}));
      break;
    case 'BIG':
      kids.push(new Paragraph({ spacing:{ before: 220, after: 240, line: 300 },
        alignment: AlignmentType.CENTER,
        indent:{ left: convertInchesToTwip(0.5), right: convertInchesToTwip(0.5) },
        children:[ new TextRun({ text: txt, font: SERIF, size: 26, color: TINTA, italics: true, bold: true }) ]}));
      break;
    case 'ENDNOTE':
      kids.push(new Paragraph({ spacing:{ before: 3400, after: 0 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 19, color: OURO, characterSpacing: 40 }) ]}));
      break;
    case 'ENDNOTE2':
      kids.push(new Paragraph({ spacing:{ before: 140 }, alignment: AlignmentType.CENTER,
        children:[ new TextRun({ text: txt, font: SERIF, size: 19, color: CLARO }) ]}));
      break;
    case 'P':
    default:
      kids.push(P(txt));
  }
}

// Sumário, inserido logo após a capa
const toc = [
  new Paragraph({ children:[ new PageBreak() ] }),
  new Paragraph({ heading: HeadingLevel.HEADING_1, spacing:{ before: 400, after: 380 },
    children:[ new TextRun({ text:'Sumário', font: SERIF, size: 40, color: TINTA }) ]}),
  new TableOfContents('Sumário', { hyperlink: true, headingStyleRange: '1-2' }),
];
const capaLen = 4;
kids.splice(capaLen, 0, ...toc);

const doc = new Document({
  creator: 'Danniel Maher',
  title: 'ELE JÁ TE DISSE — Volume 1',
  description: 'Volume 1 — As conversas',
  styles: { default: { document: { run:{ font: SERIF, size: 22, color: TINTA } } } },
  sections: [{
    properties: {

      page: {
        size: { width: convertInchesToTwip(6), height: convertInchesToTwip(9) },
        margin: { top: convertInchesToTwip(0.85), bottom: convertInchesToTwip(0.85),
                  left: convertInchesToTwip(0.75), right: convertInchesToTwip(0.75) },
      },
      titlePage: true,
    },
    footers: { default: new Footer({ children:[ new Paragraph({ alignment: AlignmentType.CENTER,
      spacing:{ before: 200 },
      children:[ new TextRun({ children:[ PageNumber.CURRENT ], font: SERIF, size: 17, color: CLARO }) ]}) ]}) },
    children: kids,
  }],
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync('ELE_JA_TE_DISSE_Vol1_PILOTO.docx', b);
  console.log('OK', b.length, 'bytes ·', kids.length, 'parágrafos');
});
