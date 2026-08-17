import { NextResponse } from 'next/server';

const REQUIRED_FIELDS = ['fullName', 'email', 'projectType', 'details'] as const;

export async function POST(request: Request) {
  const webAppUrl = process.env.APPS_SCRIPT_WEBAPP_URL;

  if (!webAppUrl) {
    return NextResponse.json(
      { ok: false, error: 'Form submissions are not configured yet.' },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const payload: Record<string, string> = {};
  for (const field of REQUIRED_FIELDS) {
    const value = typeof body[field] === 'string' ? body[field].trim() : '';
    if (!value) {
      return NextResponse.json({ ok: false, error: 'Please fill in all fields.' }, { status: 400 });
    }
    payload[field] = value;
  }

  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      result = {};
    }

    if (!response.ok || result.ok === false) {
      return NextResponse.json(
        { ok: false, error: result.error || 'Unable to send your inquiry right now.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to send your inquiry right now.' },
      { status: 502 }
    );
  }
}
