import { PrismaClient } from '@prisma/client';
import words from '../src/data/words.json';
import harvardWords from '../src/data/harvard-words.json';
import { academicPdfSources } from '../src/data/academic-pdf-sources';
import { vocabularyPdfSources } from '../src/data/vocabulary-pdf-sources';

const prisma = new PrismaClient();

function mapAcademicBucket(institution: string): string {
  return institution === 'MIT' ? 'mit' : 'harvard';
}

async function main() {
  await prisma.readingResource.deleteMany();
  await prisma.dictionaryEntry.deleteMany();

  for (const w of words) {
    await prisma.dictionaryEntry.create({
      data: {
        id: w.id,
        term: w.term,
        definition: w.definition ?? null,
        example: w.example ?? null,
        tone: w.tone ?? null,
        category: null,
        sophistication: null,
        lexicon: 'main',
        createdAt: new Date(w.createdAt),
      },
    });
  }

  for (const w of harvardWords) {
    await prisma.dictionaryEntry.create({
      data: {
        id: w.id,
        term: w.term,
        definition: w.definition,
        example: w.example,
        tone: w.tone,
        category: w.category,
        sophistication: w.sophistication,
        lexicon: 'elite',
      },
    });
  }

  for (const s of academicPdfSources) {
    await prisma.readingResource.create({
      data: {
        slug: s.id,
        bucket: mapAcademicBucket(s.institution),
        title: s.title,
        description: s.description,
        url: s.url,
        kind: s.kind,
        licenseNote: s.licenseNote,
        visible: false,
      },
    });
  }

  for (const s of vocabularyPdfSources) {
    await prisma.readingResource.create({
      data: {
        slug: s.id,
        bucket: s.track,
        title: s.title,
        description: s.description,
        url: s.url,
        kind: 'pdf',
        licenseNote: s.licenseNote,
        visible: false,
      },
    });
  }

  const mainCount = await prisma.dictionaryEntry.count({ where: { lexicon: 'main' } });
  const eliteCount = await prisma.dictionaryEntry.count({ where: { lexicon: 'elite' } });
  const readingCount = await prisma.readingResource.count();
  console.log(`Seeded ${mainCount} main + ${eliteCount} elite dictionary words (${mainCount + eliteCount} total), ${readingCount} reading resources.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
