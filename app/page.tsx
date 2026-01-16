import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Cognify – Your AI Study Buddy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your study sessions with AI-powered summaries, interactive quizzes, and intelligent flashcards. 
              Make learning efficient and enjoyable.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Better Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Summaries</h3>
              <p className="text-gray-600">
                Generate concise summaries of long texts, articles, and study materials. 
                Save time and focus on what matters most.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ask Cognify</h3>
              <p className="text-gray-600">
                Get instant answers to your study questions. Our AI tutor is available 24/7 
                to help you understand complex concepts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Saved Notes</h3>
              <p className="text-gray-600">
                Keep all your summaries and conversations organized. Access your study 
                history anytime, anywhere.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-blue-600 rounded-lg p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of students who are already using Cognify to ace their exams.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Learning Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

