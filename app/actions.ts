'use server'

import { createClient } from '@/lib/supabase-server'
import { openai } from '@/lib/openai'

export async function sendChatMessage(userId: string, message: string) {
  if (!openai) {
    throw new Error('OpenAI is not configured. Please set OPENAI_API_KEY in your .env.local file.')
  }

  const supabase = await createClient()

  // Save user message
  await supabase.from('messages').insert({
    user_id: userId,
    role: 'user',
    content: message,
  })

  // Get AI response
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are Cognify, a helpful AI study companion. Provide clear, educational, and concise answers to help students learn.',
      },
      {
        role: 'user',
        content: message,
      },
    ],
    max_tokens: 500,
  })

  const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

  // Save AI response
  await supabase.from('messages').insert({
    user_id: userId,
    role: 'assistant',
    content: aiResponse,
  })

  return aiResponse
}

export async function generateSummary(userId: string, originalText: string) {
  if (!openai) {
    throw new Error('OpenAI is not configured. Please set OPENAI_API_KEY in your .env.local file.')
  }

  const supabase = await createClient()

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful study assistant. Create concise, well-structured summaries of the provided text. Focus on key points and main ideas.',
      },
      {
        role: 'user',
        content: `Please summarize the following text:\n\n${originalText}`,
      },
    ],
    max_tokens: 500,
  })

  const summary = completion.choices[0]?.message?.content || 'Sorry, I could not generate a summary.'

  // Save to database
  await supabase.from('summaries').insert({
    user_id: userId,
    original_text: originalText,
    summary: summary,
  })

  return summary
}

export async function getMessages(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getSummaries(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('summaries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

