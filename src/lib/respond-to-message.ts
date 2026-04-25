import { getEliteWordsByTone } from '@/data/elite-words';
import type { EliteResponse } from '@/types/elite-response';
import type { SuggestedResponse, Word } from '@/types/word';

const SNIPPET_MAX = 280;

/** Collapse whitespace and truncate for safe inclusion in reply text. */
export function messageSnippet(raw: string, maxChars = SNIPPET_MAX): string {
  const t = raw.trim().replace(/\s+/g, ' ');
  if (!t) return '';
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars - 1).trimEnd()}…`;
}

export type MessageTone = 'question' | 'thanks' | 'apology' | 'complaint' | 'neutral';

export function inferMessageTone(raw: string): MessageTone {
  const t = raw.trim().toLowerCase();
  if (!t) return 'neutral';
  if (/\?\s*$/.test(t) || /\b(what|when|where|why|how|who|could you|can you|would you)\b/.test(t)) {
    return 'question';
  }
  if (/\b(thanks|thank you|tysm|ty|appreciate it|much appreciated)\b/i.test(t)) return 'thanks';
  if (/\b(sorry|apolog|my bad|forgive)\b/.test(t)) return 'apology';
  if (/\b(never|worst|unacceptable|outrageous|angry|furious|ridiculous|disappointed)\b/.test(t)) {
    return 'complaint';
  }
  return 'neutral';
}

function pickDistinctWords(pool: Word[], n: number): Word[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Basic mode: three replies that quote / react to the pasted message, plus vocabulary hooks.
 */
export function buildBasicResponses(message: string, pool: Word[]): SuggestedResponse[] {
  const snippet = messageSnippet(message);
  const tone = inferMessageTone(message);
  const chosen = pickDistinctWords(pool, 3);
  const wPlain = chosen[0] ?? pool[0];
  const wWitty = chosen[1] ?? pool[0];
  const wDevil = chosen[2] ?? pool[0];

  const plainOpen: Record<MessageTone, string> = {
    question: `On your message ("${snippet}"), here's a calm read: I'll treat it as a question and keep the answer direct.`,
    thanks: `Thanks for sending this: "${snippet}". I've read it carefully—I'll match your tone and keep things clear.`,
    apology: `I see what you're communicating here: "${snippet}". Thanks for the context; I'll keep my reply constructive and forward-looking.`,
    complaint: `You spelled out a real concern in: "${snippet}". I'll acknowledge what's on the table and keep my response professional.`,
    neutral: `Regarding what you wrote ("${snippet}"), here's a steady reply you can send without escalating.`,
  };

  const plain = `${plainOpen[tone]} If it helps, tell me the outcome you want next (clarity, apology, boundary, or a concrete next step).`;

  const witty = `Reading "${snippet}" lands as intentionally ${wWitty.term.toLowerCase()}—almost a flex of ${wWitty.definition?.toLowerCase() || 'tone'}. I'd answer in kind: mirror their energy once, then add one crisp sentence that states exactly what you need.`;

  const devilish = `So… "${snippet}". That's impressively ${wDevil.term.toLowerCase()} as theater; as strategy it's basically ${wDevil.definition?.toLowerCase() || 'thin ice'}. If you mean business, tighten the ask so they can't dodge it.`;

  return [
    { type: 'plain', text: plain, word: wPlain },
    { type: 'witty', text: witty, word: wWitty },
    { type: 'devilish', text: devilish, word: wDevil },
  ];
}

/**
 * Elite mode: three replies that reference the pasted text and weave in elite vocabulary.
 */
export function buildEliteResponses(message: string): EliteResponse[] {
  const snippet = messageSnippet(message, 240);
  const academicWords = getEliteWordsByTone('professional');
  const wittyWords = getEliteWordsByTone('witty');
  const devilishWords = getEliteWordsByTone('sarcastic');

  const wa = pick(academicWords);
  const ww = pick(wittyWords);
  const wd = pick(devilishWords);

  const academicTemplates = [
    () =>
      `On your note ("${snippet}"), the framing reads ${wa.term.toLowerCase()} in how it sequences the stakes. If the goal is to move a skeptical reader, the underlying ${wa.definition?.toLowerCase() || 'structure'} needs one explicit claim and one concrete next step—not just atmosphere.`,
    () =>
      `Interpreting your message—"${snippet}"—with a scholarly lens: it leans ${wa.term.toLowerCase()} in tone. That's fine as an opener, but closure usually requires tightening the ${wa.definition?.toLowerCase() || 'argument'} so someone could act on it without mind-reading.`,
  ];

  const wittyTemplates = [
    () =>
      `"${snippet}" has main-character energy—almost ${ww.term.toLowerCase()}—which pairs nicely with ${ww.definition?.toLowerCase() || 'self-awareness'}. Reply with one line that matches their vibe, then one line that names the single thing you're optimizing for.`,
    () =>
      `If we're honest, "${snippet}" is doing a little ${ww.term.toLowerCase()} dance: charming, except I'm still guessing the ask. Answer warm, then add one precise question they can answer in a sentence.`,
  ];

  const devilishTemplates = [
    () =>
      `Re: "${snippet}"—what a ${wd.term.toLowerCase()} performance, complete with implied ${wd.definition?.toLowerCase() || 'gravitas'}. If the goal is outcomes, swap intensity for specificity: what changed, what you want, and by when.`,
    () =>
      `You wrote: "${snippet}". Admirably ${wd.term.toLowerCase()}, if the brief was "set a mood." If the brief was "move a decision," add a line a committee could calendar.`,
  ];

  return [
    {
      type: 'academic',
      text: pick(academicTemplates)(),
      word: wa,
      sophistication: 'elite',
      category: 'academic',
    },
    {
      type: 'witty',
      text: pick(wittyTemplates)(),
      word: ww,
      sophistication: 'high',
      category: 'witty',
    },
    {
      type: 'devilish',
      text: pick(devilishTemplates)(),
      word: wd,
      sophistication: 'elite',
      category: 'devilish',
    },
  ];
}
