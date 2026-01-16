"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AuthFormProps {
  mode: "login" | "signup"
}

// ✅ Change from "export default function" to "export function"
export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError(null)

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        })

        if (error) throw error

        console.log('Signup response:', { session: data.session ? 'exists' : 'none', user: data.user?.id })

        // If session exists, user is auto-confirmed (email confirmation disabled)
        if (data.session) {
          console.log('Session created, redirecting to dashboard')
          const { data: sessionData } = await supabase.auth.getSession()
          console.log('Session verified:', sessionData.session ? 'yes' : 'no')
          
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 300)
        } else if (data.user) {
          // User created but needs email confirmation
          // Try to sign in anyway in case email confirmation is disabled
          console.log('No session, attempting to sign in...')
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (!signInError && signInData.session) {
            console.log('Sign in successful after signup')
            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 300)
          } else {
            setError("Account created! Please check your email to confirm, or disable email confirmation in Supabase settings.")
          }
        } else {
          setError("Signup failed. Please try again.")
        }

      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.error('Login error:', error)
          throw error
        }

        console.log('Login successful, session:', data.session ? 'exists' : 'missing')

        if (data.session) {
          // Verify session is set
          const { data: sessionData } = await supabase.auth.getSession()
          console.log('Session verified:', sessionData.session ? 'yes' : 'no')
          console.log('User ID:', data.user?.id)
          
          // Force a full page reload to ensure middleware picks up the session
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 300)
        } else {
          console.error('No session after login')
          setError("Login failed. No session created. Check if email confirmation is required.")
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  )
}