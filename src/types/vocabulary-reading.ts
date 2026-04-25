export type VocabularyTrack = 'witty' | 'academic';

export interface VocabularyPdfSource {
  id: string;
  track: VocabularyTrack;
  title: string;
  description: string;
  url: string;
  /** Short attribution, e.g. host school or publisher */
  hostInstitution: string;
  licenseNote: string;
}
