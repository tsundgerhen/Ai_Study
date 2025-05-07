import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const rawText = await req.text();
  const token = process.env.CHIMEGE_API_TOKEN || '38ec0d033e827c663ab96f53dc207e843ba408ff4598229abb83486034eb8f0f';

  try {
    // Step 1: Normalize the text
    const normalizeRes = await fetch('https://api.chimege.com/v1.2/normalize-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'plain/text',
        token,
      },
      body: rawText,
    });

    if (!normalizeRes.ok) {
      const error = await normalizeRes.text();
      console.error('Normalization failed:', error);
      return new Response('Normalization failed: ' + error, { status: 400 });
    }

    const normalizedText = await normalizeRes.text();

    // Step 2: Synthesize the normalized text
    const synthesizeRes = await fetch('https://api.chimege.com/v1.2/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'plain/text',
        token,
      },
      body: normalizedText,
    });

    if (!synthesizeRes.ok) {
      const error = await synthesizeRes.text();
      console.error('Synthesis failed:', error);
      return new Response('Synthesis failed: ' + error, { status: 500 });
    }

    const audioBuffer = await synthesizeRes.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
      },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}