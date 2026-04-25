import { NextResponse } from 'next/server';
import words from '@/data/words.json';

export async function GET() {
  try {
    if (words.length === 0) {
      return NextResponse.json({ error: 'No words found' }, { status: 404 });
    }
    
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    return NextResponse.json(randomWord);
  } catch (error) {
    console.error('Error fetching random word:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


