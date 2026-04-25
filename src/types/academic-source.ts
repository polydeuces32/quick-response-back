export type AcademicInstitution = 'MIT' | 'Harvard Law';

export interface AcademicPdfSource {
  id: string;
  institution: AcademicInstitution;
  title: string;
  description: string;
  /** HTTPS URL to a PDF or to a page that hosts downloads */
  url: string;
  kind: 'pdf' | 'collection' | 'portal';
  licenseNote: string;
}
