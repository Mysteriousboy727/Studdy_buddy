import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl || supabaseUrl.includes('your_')) {
  console.error('❌ Supabase URL not configured properly')
}

if (!supabaseAnonKey || supabaseAnonKey.length < 100) {
  console.error('❌ Supabase anon key appears incomplete (should be 200+ characters)')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})