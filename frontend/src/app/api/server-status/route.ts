import { NextResponse } from 'next/server';

export const revalidate = 30;

export async function GET() {
  const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP || 'play.sigmasmp.de';
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ online: false }, { status: 200 });
  }
}
