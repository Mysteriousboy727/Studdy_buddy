import Navbar from '@/components/Navbar'
import { AuthForm } from '@/components/AuthForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">Sign Up</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create your Cognify account to get started
            </p>
          </div>
          <AuthForm mode="signup" />
        </div>
      </main>
    </div>
  )
}

