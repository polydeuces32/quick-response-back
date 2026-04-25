import { NextResponse } from 'next/server';
import words from '@/data/words.json';

export async function GET() {
  try {
    return NextResponse.json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
