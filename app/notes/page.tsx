"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'

interface Note {
  id: string
  type: 'message' | 'summary'
  content: string
  created_at: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch messages
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20)

        // Fetch summaries
        const { data: summaries } = await supabase
          .from('summaries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20)

        const allNotes: Note[] = [
          ...(messages || []).map(m => ({
            id: m.id,
            type: 'message' as const,
            content: m.content,
            created_at: m.created_at
          })),
          ...(summaries || []).map(s => ({
            id: s.id,
            type: 'summary' as const,
            content: s.summary,
            created_at: s.created_at
          }))
        ].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        setNotes(allNotes)
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saved Notes</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">No saved notes yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Your chats and summaries will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map(note => (
              <div key={note.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    note.type === 'message' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {note.type === 'message' ? 'Chat' : 'Summary'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(note.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}