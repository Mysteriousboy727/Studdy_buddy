"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'

export default function SummarizePage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || loading) return

    setLoading(true)
    setSummary('')

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSummary(data.summary)

      // Save to Supabase
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('summaries').insert({
          user_id: user.id,
          original_text: text,
          summary: data.summary
        })
      }
    } catch (error) {
      console.error('Summarize error:', error)
      setSummary('Error: Failed to generate summary. Please check your OpenAI API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-2">Generate Summary</h1>
          <p className="text-gray-600 mb-6">
            Paste your text below and get a concise summary
          </p>

          <form onSubmit={handleSummarize} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text to Summarize
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
                rows={10}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating Summary...' : 'Generate Summary'}
            </button>
          </form>

          {summary && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="font-semibold text-green-900 mb-2">Summary:</h2>
              <p className="text-green-800 whitespace-pre-wrap">{summary}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}