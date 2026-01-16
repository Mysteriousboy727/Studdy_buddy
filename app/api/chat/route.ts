import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const messages = [
      {
        role: 'system' as const,
        content: 'You are Cognify, a helpful AI study assistant. Help students understand concepts, explain topics clearly, and provide educational guidance.'
      },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500
    })

    return NextResponse.json({
      response: completion.choices[0].message.content
    })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    )
  }
}