import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cognify - Your AI Study Buddy',
  description: 'AI-powered study companion with summaries, quizzes, and flashcards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

