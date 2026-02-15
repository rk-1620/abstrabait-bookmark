"use client"

import { supabase } from "@/lib/supabase"

export default function Login() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center">

        {/* Logo / Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Smart Bookmark
        </h1>

        <p className="text-gray-500 mb-8">
          Save and manage your links securely.
        </p>

        {/* Google Button */}
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          {/* Google Icon */}
{/* Google Icon */}
<svg
  className="w-6 h-6"
  viewBox="0 0 48 48"
  xmlns="http://www.w3.org/2000/svg"
>
  <path fill="#4285F4" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.5 2.2 30.2 0 24 0 14.6 0 6.5 5.5 2.5 13.4l7.8 6C12.1 13.1 17.6 9.5 24 9.5z"/>
  <path fill="#34A853" d="M46.1 24.5c0-1.7-.2-3.3-.5-4.8H24v9.1h12.4c-.5 2.7-2 5-4.2 6.6l6.6 5.1c3.9-3.6 7.3-9 7.3-16z"/>
  <path fill="#FBBC05" d="M10.3 28.4c-.6-1.7-.9-3.5-.9-5.4s.3-3.7.9-5.4l-7.8-6C.9 15.4 0 19.6 0 24s.9 8.6 2.5 12.4l7.8-6z"/>
  <path fill="#EA4335" d="M24 48c6.2 0 11.5-2 15.4-5.5l-6.6-5.1c-2 1.4-4.5 2.2-8.8 2.2-6.4 0-11.9-3.6-13.7-8.9l-7.8 6C6.5 42.5 14.6 48 24 48z"/>
</svg>

          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  )
}