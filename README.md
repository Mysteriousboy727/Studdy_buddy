# Cognify - Your AI Study Buddy

A modern, full-stack AI-powered study companion built with Next.js 14, Supabase, and OpenAI. Cognify helps students learn more effectively with AI-powered chat, text summarization, and organized note-taking.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-green)
![OpenAI](https://img.shields.io/badge/OpenAI-API-orange)

## ✨ Features

- **🤖 AI Chat Assistant** - Get instant answers to your study questions with Cognify, your AI study companion
- **📝 Smart Summaries** - Generate concise summaries of long texts, articles, and study materials
- **📚 Saved Notes** - Access all your conversations and summaries in one organized place
- **🔐 Secure Authentication** - Email/password authentication powered by Supabase
- **💾 Persistent Storage** - All your data is securely stored in Supabase
- **📱 Responsive Design** - Beautiful, modern UI that works on all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **AI:** OpenAI API (GPT-3.5-turbo)
- **Deployment Ready:** Vercel, Netlify, or any Node.js hosting

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account ([Sign up here](https://supabase.com))
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Study_Buddy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API**
3. Copy your **Project URL** and **anon public** key

### 4. Create Database Tables

In your Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Summaries table
CREATE TABLE summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_text TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Create policies (users can only see their own data)
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own summaries" ON summaries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own summaries" ON summaries
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

**Important:** Replace the placeholder values with your actual credentials.

### 6. Disable Email Confirmation (Optional)

For immediate signup without email verification:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Settings**
3. Find **"Enable email confirmations"**
4. Turn it **OFF**
5. Save changes

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Study_Buddy/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── signup/
│   │   └── page.tsx          # Signup page
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard (main hub)
│   ├── chat/
│   │   └── page.tsx          # AI chat interface
│   ├── summarize/
│   │   └── page.tsx          # Text summarization
│   ├── notes/
│   │   └── page.tsx          # Saved notes/history
│   ├── actions.ts            # Server actions
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── AuthForm.tsx          # Login/signup form
│   ├── ChatUI.tsx            # Chat interface component
│   └── SummaryForm.tsx       # Summary input form
├── lib/
│   ├── supabase.ts           # Client-side Supabase client
│   ├── supabase-server.ts    # Server-side Supabase client
│   └── openai.ts             # OpenAI client
├── middleware.ts             # Route protection middleware
└── package.json
```

## 🎯 Usage

### For Students

1. **Sign Up/Login** - Create an account or log in
2. **Ask Cognify** - Click "Ask Cognify" to start chatting with your AI study companion
3. **Generate Summaries** - Paste long texts and get instant summaries
4. **View Notes** - Access all your saved conversations and summaries

### Features Overview

#### 💬 AI Chat
- Ask any study-related questions
- Get instant, educational responses
- All conversations are saved automatically

#### 📝 Text Summarization
- Paste any text (articles, notes, etc.)
- Get concise, well-structured summaries
- Summaries are saved for later reference

#### 📚 Notes Management
- View all your chat conversations
- Browse your saved summaries
- Organized by date for easy access

## 🔧 Configuration

### Supabase Setup

1. **Authentication:**
   - Email/Password authentication is enabled by default
   - You can disable email confirmation in Supabase settings for immediate access

2. **Database:**
   - Ensure RLS (Row Level Security) policies are set up correctly
   - Users can only access their own data

### OpenAI Configuration

- Default model: `gpt-3.5-turbo`
- Max tokens: 500 (configurable in `app/actions.ts`)
- You can upgrade to GPT-4 by modifying the model name in the actions file

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables in your hosting platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

## 🐛 Troubleshooting

### Login/Signup Issues

- **Email confirmation required:** Disable email confirmation in Supabase settings
- **Session not persisting:** Check that cookies are enabled in your browser
- **Redirect loops:** Clear browser cache and cookies

### AI Chat Not Working

- **Check OpenAI API key:** Ensure it's set correctly in `.env.local`
- **Check API quota:** Verify you have credits in your OpenAI account
- **Check console:** Open browser DevTools (F12) for error messages

### Database Errors

- **RLS policies:** Ensure Row Level Security policies are set up correctly
- **Table structure:** Verify tables match the schema above
- **Permissions:** Check that authenticated users have insert/select permissions

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Supabase](https://supabase.com)
- AI powered by [OpenAI](https://openai.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review Supabase and OpenAI documentation
3. Open an issue on GitHub

---

**Made with ❤️ for students everywhere**

