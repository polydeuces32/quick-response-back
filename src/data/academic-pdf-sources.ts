import type { AcademicPdfSource } from '@/types/academic-source';

/**
 * Curated open-access materials from MIT and Harvard Law–related projects.
 * We link out rather than mirroring files: check each site’s terms before republishing PDFs.
 */
export const academicPdfSources: AcademicPdfSource[] = [
  {
    id: 'mit-ocw-6-0001-lec1',
    institution: 'MIT',
    title: '6.0001 — Lecture 1 slides (PDF)',
    description:
      'Introduction to Computer Science and Programming in Python (Fall 2016). Example of a direct OCW lecture PDF.',
    url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/e921a690079369751bcce3e34da6c6ee_MIT6_0001F16_Lec1.pdf',
    kind: 'pdf',
    licenseNote:
      'MIT OpenCourseWare is generally offered under CC BY-NC-SA; attribute MIT and instructors, noncommercial share-alike. See ocw.mit.edu/terms.',
  },
  {
    id: 'mit-ocw-6-0001-notes',
    institution: 'MIT',
    title: '6.0001 — Lecture notes (all PDFs)',
    description: 'Index page listing every lecture PDF for the same course.',
    url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/lecture-notes/',
    kind: 'collection',
    licenseNote: 'Same OCW CC BY-NC-SA framework as other materials on that course site.',
  },
  {
    id: 'mit-ocw-terms',
    institution: 'MIT',
    title: 'MIT OpenCourseWare — Terms of use',
    description: 'Official reuse, attribution, and licensing guidance for OCW content.',
    url: 'https://ocw.mit.edu/terms/',
    kind: 'portal',
    licenseNote: 'Use this page before copying or embedding OCW PDFs in your own distributions.',
  },
  {
    id: 'mit-ocw-home',
    institution: 'MIT',
    title: 'MIT OpenCourseWare — Home',
    description: 'Browse thousands of courses; filter by topic to find readings, syllabi, and PDFs.',
    url: 'https://ocw.mit.edu/',
    kind: 'portal',
    licenseNote: 'Per-course license is usually CC BY-NC-SA; some files include third-party “all rights reserved” excerpts.',
  },
  {
    id: 'harvard-cap',
    institution: 'Harvard Law',
    title: 'Caselaw Access Project (case.law)',
    description:
      'Harvard Library Innovation Lab project: search U.S. caselaw; opinions are available as data and rendered documents (including PDF-style views via partner tools).',
    url: 'https://case.law/',
    kind: 'portal',
    licenseNote:
      'Harvard LIL has published CAP under open terms; confirm current terms on case.law and CourtListener before bulk reuse.',
  },
  {
    id: 'harvard-cap-lil',
    institution: 'Harvard Law',
    title: 'Caselaw Access Project — Library Innovation Lab',
    description: 'Background, documentation, and links to the CAP corpus and related tools.',
    url: 'https://lil.law.harvard.edu/our-work/caselaw-access-project/',
    kind: 'portal',
    licenseNote: 'Harvard Law School Library Innovation Lab; follow linked terms for the dataset and APIs.',
  },
  {
    id: 'harvard-h2o',
    institution: 'Harvard Law',
    title: 'H2O Open Casebooks',
    description:
      'Harvard Law–adjacent open casebook platform: faculty-built books, often exportable; many volumes use Creative Commons licenses.',
    url: 'https://opencasebook.org/',
    kind: 'portal',
    licenseNote: 'Each casebook states its own CC license (often BY or BY-NC); read the book’s “license” panel before redistributing.',
  },
];
