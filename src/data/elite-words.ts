// MIT/Harvard Elite Vocabulary Database
// Advanced academic and intellectual terminology for sophisticated comebacks

import type { Word } from '@/types/word';

export const eliteWords = [
  // MIT Engineering & Science Terms
  {
    term: "ALGORITHMIC",
    definition: "Relating to or using algorithms; systematic and logical",
    example: "Your approach is quite algorithmic, but lacks the necessary heuristic flexibility.",
    tone: "professional",
    category: "mit-tech",
    sophistication: "high"
  },
  {
    term: "HEURISTIC",
    definition: "Enabling a person to discover or learn something for themselves",
    example: "That's a rather heuristic methodology you've employed there.",
    tone: "witty",
    category: "mit-tech",
    sophistication: "high"
  },
  {
    term: "PARADIGM",
    definition: "A typical example or pattern of something; a model",
    example: "Your thinking represents an outdated paradigm in modern discourse.",
    tone: "sarcastic",
    category: "mit-tech",
    sophistication: "high"
  },
  {
    term: "SYNTHESIS",
    definition: "The combination of ideas to form a theory or system",
    example: "Your argument lacks the necessary synthesis to be compelling.",
    tone: "professional",
    category: "mit-tech",
    sophistication: "high"
  },
  {
    term: "OPTIMIZATION",
    definition: "The action of making the best or most effective use of a situation or resource",
    example: "Your solution requires significant optimization to be viable.",
    tone: "professional",
    category: "mit-tech",
    sophistication: "high"
  },

  // Harvard Law & Philosophy Terms
  {
    term: "JURISPRUDENCE",
    definition: "The theory and philosophy of law",
    example: "Your understanding of jurisprudence seems rather elementary.",
    tone: "sarcastic",
    category: "harvard-law",
    sophistication: "elite"
  },
  {
    term: "EPISTEMOLOGY",
    definition: "The theory of knowledge, especially regarding its methods, validity, and scope",
    example: "Your epistemological framework is fundamentally flawed.",
    tone: "professional",
    category: "harvard-law",
    sophistication: "elite"
  },
  {
    term: "ONTOLOGY",
    definition: "The branch of metaphysics dealing with the nature of being",
    example: "Your ontological assumptions are quite questionable.",
    tone: "sarcastic",
    category: "harvard-law",
    sophistication: "elite"
  },
  {
    term: "HERMENEUTICS",
    definition: "The theory and methodology of interpretation",
    example: "Your hermeneutic approach reveals a superficial understanding.",
    tone: "professional",
    category: "harvard-law",
    sophistication: "elite"
  },
  {
    term: "DIALECTICAL",
    definition: "Relating to the logical discussion of ideas and opinions",
    example: "Your argument lacks the necessary dialectical rigor.",
    tone: "professional",
    category: "harvard-law",
    sophistication: "elite"
  },

  // Advanced Academic Vocabulary
  {
    term: "PERSPICACIOUS",
    definition: "Having a ready insight into and understanding of things",
    example: "That's a rather perspicacious observation, though somewhat obvious.",
    tone: "witty",
    category: "academic",
    sophistication: "high"
  },
  {
    term: "SAGACIOUS",
    definition: "Having or showing good judgment; wise",
    example: "Your sagacious advice is noted, though perhaps misplaced.",
    tone: "sarcastic",
    category: "academic",
    sophistication: "high"
  },
  {
    term: "ACUMEN",
    definition: "The ability to make good judgments and quick decisions",
    example: "Your business acumen is impressive, though your social skills need work.",
    tone: "witty",
    category: "academic",
    sophistication: "high"
  },
  {
    term: "CACOPHONY",
    definition: "A harsh, discordant mixture of sounds",
    example: "Your argument creates a cacophony of logical inconsistencies.",
    tone: "sarcastic",
    category: "academic",
    sophistication: "high"
  },
  {
    term: "EUPHONIOUS",
    definition: "Pleasing to the ear; harmonious",
    example: "Your reasoning is quite euphonious, though ultimately meaningless.",
    tone: "witty",
    category: "academic",
    sophistication: "high"
  },

  // Sophisticated Witty Terms
  {
    term: "FACETIOUS",
    definition: "Treating serious issues with deliberately inappropriate humor",
    example: "Your facetious remarks reveal a lack of intellectual depth.",
    tone: "sarcastic",
    category: "witty",
    sophistication: "high"
  },
  {
    term: "SARDONIC",
    definition: "Grimly mocking or cynical",
    example: "Your sardonic wit is appreciated, though somewhat predictable.",
    tone: "witty",
    category: "witty",
    sophistication: "high"
  },
  {
    term: "MORDANT",
    definition: "Biting and caustic in thought, manner, or style",
    example: "Your mordant commentary adds little to the conversation.",
    tone: "sarcastic",
    category: "witty",
    sophistication: "high"
  },
  {
    term: "LACONIC",
    definition: "Using very few words; concise",
    example: "Your laconic response suggests either wisdom or ignorance.",
    tone: "witty",
    category: "witty",
    sophistication: "high"
  },
  {
    term: "TACITURN",
    definition: "Reserved or uncommunicative in speech; saying little",
    example: "Your taciturn nature is either profound or simply antisocial.",
    tone: "sarcastic",
    category: "witty",
    sophistication: "high"
  },

  // Elite Social Commentary
  {
    term: "OBNOXIOUS",
    definition: "Extremely unpleasant; offensive",
    example: "Your obnoxious behavior is quite the spectacle.",
    tone: "sarcastic",
    category: "social",
    sophistication: "medium"
  },
  {
    term: "PRETENTIOUS",
    definition: "Attempting to impress by affecting greater importance than is actually possessed",
    example: "Your pretentious display of knowledge is rather transparent.",
    tone: "sarcastic",
    category: "social",
    sophistication: "medium"
  },
  {
    term: "PEDANTIC",
    definition: "Overly concerned with minute details or formalisms",
    example: "Your pedantic corrections add nothing to the discussion.",
    tone: "sarcastic",
    category: "social",
    sophistication: "medium"
  },
  {
    term: "POMPOUS",
    definition: "Affectedly and irritatingly grand, solemn, or self-important",
    example: "Your pompous attitude is quite the turn-off.",
    tone: "sarcastic",
    category: "social",
    sophistication: "medium"
  },
  {
    term: "CONDESCENDING",
    definition: "Having or showing a feeling of patronizing superiority",
    example: "Your condescending tone is neither helpful nor appreciated.",
    tone: "sarcastic",
    category: "social",
    sophistication: "medium"
  },

  // Advanced Psychological Terms
  {
    term: "COGNITIVE",
    definition: "Relating to mental processes of perception, memory, judgment, and reasoning",
    example: "Your cognitive abilities seem to be functioning at a basic level.",
    tone: "sarcastic",
    category: "psychology",
    sophistication: "high"
  },
  {
    term: "METACOGNITIVE",
    definition: "Awareness and understanding of one's own thought processes",
    example: "Your metacognitive awareness appears to be somewhat limited.",
    tone: "professional",
    category: "psychology",
    sophistication: "elite"
  },
  {
    term: "HEURISTIC",
    definition: "Enabling a person to discover or learn something for themselves",
    example: "Your heuristic approach is commendable, though inefficient.",
    tone: "witty",
    category: "psychology",
    sophistication: "high"
  },
  {
    term: "COGNITIVE",
    definition: "Relating to mental processes of perception, memory, judgment, and reasoning",
    example: "Your cognitive dissonance is showing.",
    tone: "sarcastic",
    category: "psychology",
    sophistication: "high"
  },
  {
    term: "INTROSPECTION",
    definition: "The examination of one's own mental and emotional processes",
    example: "A little introspection might do you some good.",
    tone: "witty",
    category: "psychology",
    sophistication: "high"
  },

  // Elite Business & Economics
  {
    term: "SYNERGISTIC",
    definition: "Relating to the interaction of elements that when combined produce a total effect greater than the sum of the individual elements",
    example: "Your synergistic approach is theoretically sound but practically flawed.",
    tone: "professional",
    category: "business",
    sophistication: "high"
  },
  {
    term: "PARADIGM",
    definition: "A typical example or pattern of something; a model",
    example: "Your business model represents an outdated paradigm.",
    tone: "sarcastic",
    category: "business",
    sophistication: "high"
  },
  {
    term: "LEVERAGE",
    definition: "Use borrowed capital for an investment, expecting the profits made to be greater than the interest payable",
    example: "Your leverage strategy is quite risky, though potentially profitable.",
    tone: "professional",
    category: "business",
    sophistication: "high"
  },
  {
    term: "SCALABILITY",
    definition: "The ability to be easily expanded or upgraded on demand",
    example: "Your solution lacks the necessary scalability for growth.",
    tone: "professional",
    category: "business",
    sophistication: "high"
  },
  {
    term: "OPTIMIZATION",
    definition: "The action of making the best or most effective use of a situation or resource",
    example: "Your process requires significant optimization to be competitive.",
    tone: "professional",
    category: "business",
    sophistication: "high"
  }
];

export type EliteWord = (typeof eliteWords)[number];

export function eliteWordToWord(w: EliteWord, id = 0): Word {
  return {
    id,
    term: w.term,
    definition: w.definition,
    example: w.example ?? null,
    tone: w.tone ?? null,
    createdAt: new Date(),
  };
}

export const getEliteWordsByCategory = (category: string) => {
  return eliteWords.filter(word => word.category === category);
};

export const getEliteWordsBySophistication = (level: 'medium' | 'high' | 'elite') => {
  return eliteWords.filter(word => word.sophistication === level);
};

export const getRandomEliteWord = () => {
  return eliteWords[Math.floor(Math.random() * eliteWords.length)];
};

export const getEliteWordsByTone = (tone: string) => {
  return eliteWords.filter(word => word.tone === tone);
};
