import type { Document } from '../types/document'

export const documents: Document[] = [
  {
    id: 'atlas-de-investigacion',
    title: 'Atlas de investigación abierta',
    authors: [
      { firstName: 'Luz', lastName: 'Aguirre', ci: '101' },
      { firstName: 'Marco', lastName: 'Paredes', ci: '102' },
      { firstName: 'Ana', lastName: 'Soto', ci: '103' },
    ],
    docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    createdAt: new Date('2026-01-14T10:00:00.000Z'),
    updatedAt: new Date('2026-04-12T15:30:00.000Z'),
  },
  {
    id: 'biblioteca-minimal',
    title: 'Biblioteca digital minimalista',
    authors: [
      { firstName: 'Sofía', lastName: 'Beltrán', ci: '201' },
      { firstName: 'Diego', lastName: 'Mora', ci: '202' },
    ],
    docUrl: 'https://mozilla.github.io/pdf.js/web/annotation-layer.pdf',
    createdAt: new Date('2026-02-02T10:00:00.000Z'),
    updatedAt: new Date('2026-04-10T11:15:00.000Z'),
  },
  {
    id: 'memoria-editorial',
    title: 'Memoria editorial de archivo',
    authors: [
      { firstName: 'Carlos', lastName: 'Núñez', ci: '301' },
      { firstName: 'Julia', lastName: 'Reyes', ci: '302' },
    ],
    docUrl: 'https://mozilla.github.io/pdf.js/web/canvas.pdf',
    createdAt: new Date('2026-02-19T10:00:00.000Z'),
    updatedAt: new Date('2026-04-08T08:45:00.000Z'),
  },
  {
    id: 'catalogo-lecturas',
    title: 'Catálogo de lecturas contemporáneas',
    authors: [{ firstName: 'Elena', lastName: 'Vargas', ci: '401' }],
    docUrl: 'https://mozilla.github.io/pdf.js/web/helloworld.pdf',
    createdAt: new Date('2026-03-01T10:00:00.000Z'),
    updatedAt: new Date('2026-04-14T19:20:00.000Z'),
  },
]
