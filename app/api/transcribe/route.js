import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    // Extract formData from the incoming request
    const formData = await request.formData();
    
    // Get the audio file from the form data
    const file = formData.get('audio');

    // Validate if a file was uploaded
    if (!file) {
      return NextResponse.json({ error: 'No audio file provided.' }, { status: 400 });
    }

    // Call OpenAI Whisper API directly with the File object (no need to save to disk)
    const response = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      response_format: 'verbose_json',
    });

    // Return the transcribed text and detected language back to the client
    return NextResponse.json({
      text: response.text,
      language: response.language,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process audio file.' }, { status: 500 });
  }
}