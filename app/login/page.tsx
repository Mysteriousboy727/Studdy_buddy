"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import { AuthForm } from "@/components/AuthForm" // ✅ Named import with curly braces

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        console.log('Session found, redirecting to chat')
        window.location.href = "/dashboard"
      }
    }
    checkSession()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">Login</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your Cognify account
            </p>
          </div>
          <AuthForm mode="login" />
        </div>
      </main>
    </div>
  )
}