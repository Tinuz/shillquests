// app/api/leaderboard/route.ts
import { kv } from '../../lib/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await kv.hgetall<Record<string, number>>('leaderboard');
  const sorted = Object.entries(data || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([wallet, count]) => ({ wallet, count }));

  return NextResponse.json(sorted);
}
