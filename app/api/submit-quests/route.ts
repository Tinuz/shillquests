// app/api/submit-quest/route.ts
import { kv } from '../../lib/kv';
import { NextRequest, NextResponse } from 'next/server';

type Insert = {
  id: string;
  wallet: string;
  questId: string;
  proofUrl: string | null;
  status: 'pending' | 'submitted';
  createdAt: number;
};

export async function POST(req: NextRequest) {
  const { insertId, proofUrl } = await req.json();
  if (!insertId || !proofUrl) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

  const key = `insert:${insertId}`;
  const insert = await kv.get<Insert>(key);
  if (!insert) return NextResponse.json({ error: 'Insert not found' }, { status: 404 });

  insert.proofUrl = proofUrl;
  insert.status = 'submitted';
  await kv.set(key, insert);

  return NextResponse.json({ success: true });
}
