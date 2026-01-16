import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back{user.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your learning journey?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/chat"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ask Cognify</h2>
            <p className="text-gray-600">
              Chat with your AI study companion. Get instant answers to your questions.
            </p>
          </Link>

          <Link
            href="/summarize"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Summary</h2>
            <p className="text-gray-600">
              Summarize long texts, articles, and study materials in seconds.
            </p>
          </Link>

          <Link
            href="/notes"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View Saved Notes</h2>
            <p className="text-gray-600">
              Access all your saved conversations and summaries.
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}

