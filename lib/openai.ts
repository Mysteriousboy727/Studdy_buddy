import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey || apiKey.includes('your_')) {
  console.warn('⚠️ OpenAI API key not configured')
}

export const openai = apiKey ? new OpenAI({ apiKey }) : null

