import Link from 'next/link';
import { BookOpen, ExternalLink, FileText, Library, Sparkles } from 'lucide-react';
import { academicPdfSources } from '@/data/academic-pdf-sources';
import { vocabularyPdfSources } from '@/data/vocabulary-pdf-sources';
import type { AcademicInstitution } from '@/types/academic-source';
import type { VocabularyTrack } from '@/types/vocabulary-reading';

function badgeStyle(institution: AcademicInstitution) {
  return institution === 'MIT'
    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
    : 'bg-red-800 text-white dark:bg-red-900 dark:text-red-100';
}

function trackBadgeStyle(track: VocabularyTrack) {
  return track === 'witty'
    ? 'bg-violet-700 text-white dark:bg-violet-600 dark:text-white'
    : 'bg-emerald-800 text-white dark:bg-emerald-900 dark:text-emerald-100';
}

function kindLabel(kind: 'pdf' | 'collection' | 'portal') {
  switch (kind) {
    case 'pdf':
      return 'Direct PDF';
    case 'collection':
      return 'PDF collection';
    default:
      return 'Portal / terms';
  }
}

export default function ResourcesPage() {
  const mit = academicPdfSources.filter((s) => s.institution === 'MIT');
  const harvard = academicPdfSources.filter((s) => s.institution === 'Harvard Law');
  const wittyPdfs = vocabularyPdfSources.filter((s) => s.track === 'witty');
  const academicPdfs = vocabularyPdfSources.filter((s) => s.track === 'academic');

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-8">
        <p className="text-sm uppercase tracking-widest text-red-600 dark:text-red-400 mb-4">
          Open materials
        </p>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-black dark:text-white mb-6">
          Readings &amp; vocabulary PDFs
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Curated external PDFs and portals. This app does not mirror the files; open each link in a new tab and follow the
          host&apos;s license before copying or republishing.
        </p>

        {/* Witty + Academic vocabulary PDFs */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-violet-600 dark:text-violet-400" aria-hidden />
            Witty — clever &amp; sophisticated language
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Rhetoric, figures of speech, and style tools (irony, metaphor, antithesis, ethos / pathos / logos, etc.)—useful
            vocabulary for sharp, layered, witty discourse.
          </p>
          <ul className="space-y-6">
            {wittyPdfs.map((item) => (
              <li
                key={item.id}
                className="border border-violet-200 dark:border-violet-900/60 p-6 bg-violet-50/40 dark:bg-slate-800/50"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 ${trackBadgeStyle('witty')}`}>
                    Witty
                  </span>
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.hostInstitution}</span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{item.licenseNote}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-violet-700 dark:text-violet-300 font-medium uppercase tracking-wide text-sm hover:underline"
                >
                  Open PDF
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-emerald-700 dark:text-emerald-400" aria-hidden />
            Academic — scholarly &amp; high-register vocabulary
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
            Academic Word List (AWL), corpus-based academic vocabulary samples, and advanced study lists—geared toward dense,
            formal reading and writing.
          </p>
          <ul className="space-y-6">
            {academicPdfs.map((item) => (
              <li
                key={item.id}
                className="border border-emerald-200 dark:border-emerald-900/60 p-6 bg-emerald-50/40 dark:bg-slate-800/50"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 ${trackBadgeStyle('academic')}`}>
                    Academic
                  </span>
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{item.hostInstitution}</span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{item.licenseNote}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium uppercase tracking-wide text-sm hover:underline"
                >
                  Open PDF
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white mb-6 flex items-center gap-2">
            <FileText className="w-7 h-7 text-red-600" aria-hidden />
            MIT (OpenCourseWare)
          </h2>
          <ul className="space-y-6">
            {mit.map((item) => (
              <li
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-slate-800/50"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 ${badgeStyle(item.institution)}`}>
                    {item.institution}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {kindLabel(item.kind)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{item.licenseNote}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-medium uppercase tracking-wide text-sm hover:underline"
                >
                  Open
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-black dark:text-white mb-6 flex items-center gap-2">
            <Library className="w-7 h-7 text-red-600" aria-hidden />
            Harvard Law &amp; related open legal corpora
          </h2>
          <ul className="space-y-6">
            {harvard.map((item) => (
              <li
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-slate-800/50"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 ${badgeStyle(item.institution)}`}>
                    {item.institution}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {kindLabel(item.kind)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{item.licenseNote}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-medium uppercase tracking-wide text-sm hover:underline"
                >
                  Open
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
          For MIT OCW reuse and citation format, see{' '}
          <a
            href="https://ocw.mit.edu/terms/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 dark:text-red-400 underline"
          >
            ocw.mit.edu/terms
          </a>
          . This list is for convenience only and is not legal advice about copyright.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
