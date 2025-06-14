// app/api/insert-quest/route.ts
import { kv } from '../../lib/kv';
import { OpenAI } from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Quest = {
  id: string;
  assignment: string; // <-- gebruik een consistente naam
};

type User = {
  wallet: string;
  inserts: string[];
};

const QUEST_PROMPT = `
You are Foofur, a confused blue dog who accidentally started a memecoin ($FOOF). 
Your job is to generate absurd, ironic social media quests for people who "inserted" FOOF tokens.

Rules:
- Max 280 characters
- Must reference Web3, crypto, or meme culture
- Tone: satirical, confusing, dry humor
- Format: short command, no intro
- Always include $FOOF in the quest
- Always end with a call to action (e.g. "Post it", "Tag 3 friends", "Screenshot and share")
- Always tag @pumpdotfun @FoofSkatie
- Always use one of these hashtags: #memecoins, #FOOF, #FOOFMADNESS, #Web3, #Solana

Examples:
- “Draw a chart showing how $FOOF controls inflation. Post it upside-down.”
- “Tag 3 fake DAOs and say you're merging them. No explanation.”
- “Screenshot a toaster and claim it gave you alpha. Hashtag #InsertToShill”

Generate 1 new quest.
`;

async function generateQuest(): Promise<string> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: QUEST_PROMPT }],
    temperature: 0.95,
  });
  return res.choices[0].message.content?.trim() || "Post iets geks over $FOOF!";
}

export async function POST(req: NextRequest) {
  const { wallet } = await req.json();
  if (!wallet) return NextResponse.json({ error: 'Missing wallet' }, { status: 400 });

  // Genereer een nieuwe quest met OpenAI
  const assignment = await generateQuest();
  const questId = uuidv4();
  const quest: Quest = { id: questId, assignment };

  // Sla quest op in de database
  await kv.set(`quest:${questId}`, quest);

  const insertId = uuidv4();
  const insert = {
    id: insertId,
    wallet,
    questId: quest.id,
    proofUrl: null,
    status: 'pending',
    createdAt: Date.now(),
  };

  await kv.set(`insert:${insertId}`, insert);

  // Update of create user
  const userKey = `user:${wallet}`;
  let user: User = (await kv.get<User>(userKey)) || { wallet, inserts: [] };
  user.inserts.push(insertId);
  await kv.set(userKey, user);

  // Update leaderboard score
  await kv.hincrby('leaderboard', wallet, 1);

  // Geef quest en insertId terug
  return NextResponse.json({ quest, insertId });
}
