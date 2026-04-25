import type { VocabularyPdfSource } from '@/types/vocabulary-reading';

/**
 * Direct PDFs for witty (rhetoric / style) vs academic (scholarly word lists).
 * URLs verified with HTTP 200; licenses vary—read each host’s terms before mirroring files in git.
 */
export const vocabularyPdfSources: VocabularyPdfSource[] = [
  // --- WITTY: rhetoric, irony, diction, figures of speech (clever / sophisticated discourse) ---
  {
    id: 'mit-ocw-rhetoric-toolchest',
    track: 'witty',
    title: 'MIT OCW — “Rhetoric Tool Chest” (PDF)',
    description:
      'From 21W.747 Rhetoric (Spring 2015): definitions of rhetorical concepts—useful for sharp, self-aware, persuasive language.',
    url: 'https://ocw.mit.edu/courses/21w-747-rhetoric-spring-2015/2c3905c420a795b39c1f3a4b09287e6e_MIT21W_747S15_rhetoric.pdf',
    hostInstitution: 'MIT OpenCourseWare',
    licenseNote:
      'Typically MIT OCW CC BY-NC-SA; attribute course and instructors. See https://ocw.mit.edu/terms/',
  },
  {
    id: 'csueb-rhetorical-devices',
    track: 'witty',
    title: 'Rhetorical devices in writing (PDF)',
    description:
      'Student handout covering irony, hyperbole, metaphor, antithesis, ethos/pathos/logos, and related devices—good for witty, layered prose.',
    url: 'https://www.csueastbay.edu/scaa/files/docs/student-handouts/rhetorical-devices.pdf',
    hostInstitution: 'California State University, East Bay',
    licenseNote: 'Campus student-support material; link for study use—check CSUEB site policy before redistributing copies.',
  },
  {
    id: 'pbs-literary-rhetorical-devices',
    track: 'witty',
    title: 'Selected literary & rhetorical devices (PDF)',
    description:
      'Short glossary-style list (allusion, anaphora, antithesis, tricolon, etc.) from PBS LearningMedia—handy for precise, “witty” analysis vocabulary.',
    url: 'https://static.pbslearningmedia.org/media/media_files/2838ca9a-e2a9-463a-8b9f-1004095f8426/c1e9629c-ccad-4db6-b5d1-7f6d15048fef.pdf',
    hostInstitution: 'PBS LearningMedia',
    licenseNote: 'Follow PBS LearningMedia terms of use for the resource; not assumed CC-0.',
  },
  // --- ACADEMIC: high-register / scholarly word lists ---
  {
    id: 'vuw-awl-headwords',
    track: 'academic',
    title: 'Academic Word List — headwords (PDF)',
    description:
      'Coxhead AWL headwords (570 families) in one compact PDF—classic high-frequency academic vocabulary for reading and writing.',
    url: 'https://www.wgtn.ac.nz/lals/resources/academicwordlist/awl-headwords/Headwords-of-the-Academic-Word-List.pdf',
    hostInstitution: 'Te Herenga Waka — Victoria University of Wellington',
    licenseNote: 'Hosted by LALS as an AWL teaching resource; do not assume unrestricted commercial reuse.',
  },
  {
    id: 'textproject-awl',
    track: 'academic',
    title: 'Academic Word List (TextProject PDF)',
    description:
      'Print-friendly AWL document from TextProject—aligned with Coxhead’s academic corpus work for ELA / literacy instruction.',
    url: 'https://textproject.org/wp-content/uploads/resources/Academic-word-list.pdf',
    hostInstitution: 'TextProject',
    licenseNote:
      'TextProject states CC BY-NC-ND 3.0 for this resource (noncommercial, no derivatives); see textproject.org for current wording.',
  },
  {
    id: 'academicwords-sample',
    track: 'academic',
    title: 'Academic Vocabulary List — sample export (PDF)',
    description:
      'Large sample from academicwords.info (Davies / Gardner AVL project)—frequency-oriented academic lemmas beyond the classic AWL.',
    url: 'https://www.academicwords.info/samples/allWords.pdf',
    hostInstitution: 'academicwords.info (BYU / corpus linguistics)',
    licenseNote: 'See academicwords.info for purchase/licensing of full lists; this sample is for evaluation—verify terms before bulk reuse.',
  },
  {
    id: 'isu-gre-vocab',
    track: 'academic',
    title: 'GRE vocabulary review (PDF)',
    description:
      'Iowa State Student Success handout: advanced general-academic and test-register words with definitions—useful for dense, formal diction.',
    url: 'https://isu.edu/media/libraries/student-success/tutoring/gre/gre_vocabulary.pdf',
    hostInstitution: 'Iowa State University',
    licenseNote: 'University tutoring resource; intended for student study—confirm ISU media policy before republishing.',
  },
];
