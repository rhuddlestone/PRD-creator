import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { title, description, techStack, pages } = await req.json();

    // Read the prompt template
    const promptTemplate = fs.readFileSync(
      path.join(process.cwd(), 'prompt.txt'),
      'utf-8'
    );

    // Replace placeholders in the prompt
    const filledPrompt = promptTemplate
      .replace('{{PROJECT_NAME}}', title)
      .replace('{{PROJECT_DESCRIPTION}}', description)
      .replace('{{TECH_STACK}}', techStack)
      .replace('{{PAGE_LIST}}', JSON.stringify(pages, null, 2));

    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      prompt: filledPrompt,
    });

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Error generating PRD:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRD' },
      { status: 500 }
    );
  }
}
