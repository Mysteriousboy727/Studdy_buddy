import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates concise, clear summaries of text while preserving key information.'
        },
        {
          role: 'user',
          content: `Please summarize the following text:\n\n${text}`
        }
      ],
      temperature: 0.5,
      max_tokens: 300
    })

    return NextResponse.json({
      summary: completion.choices[0].message.content
    })
  } catch (error: any) {
    console.error('Summarize API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary' },
      { status: 500 }
    )
  }
}