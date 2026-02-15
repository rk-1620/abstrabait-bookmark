"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { User, RealtimeChannel } from "@supabase/supabase-js"

type Bookmark = {
  id: string
  title: string
  url: string
  user_id: string
  created_at: string
}

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  // ✅ Add Bookmark
  const addBookmark = async () => {
    if (!title.trim() || !url.trim() || !user) return

    let formattedUrl = url.trim()

    // Auto add https if missing
    if (!formattedUrl.startsWith("http")) {
      formattedUrl = `https://${formattedUrl}`
    }

    setAdding(true)

    await supabase.from("bookmarks").insert({
      title: title.trim(),
      url: formattedUrl,
      user_id: user.id,
    })

    setTitle("")
    setUrl("")
    setAdding(false)
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  useEffect(() => {
    let channel: RealtimeChannel | null = null

    const init = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/login")
        return
      }

      setUser(data.user)

      const { data: bookmarksData } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false })

      if (bookmarksData) {
        setBookmarks(bookmarksData)
      }

      channel = supabase
        .channel("bookmarks")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "bookmarks" },
          async () => {
            const { data } = await supabase
              .from("bookmarks")
              .select("*")
              .order("created_at", { ascending: false })

            if (data) setBookmarks(data)
          }
        )
        .subscribe()

      setLoading(false)
    }

    init()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [router])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Smart Bookmark
        </h1>
        <button
          onClick={handleLogout}
          className="w-30 flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          Logout
        </button>
      </div>

      {/* Add Form */}
      <div className="flex flex-col sm:flex-row bg-white text-gray-700 gap-3 mb-8">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
        />
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition bg-white text-gray-700"
        />
        <button
          onClick={addBookmark}
          disabled={adding}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Empty State */}
      {bookmarks.length === 0 ? (
        <div className="text-center text-gray-400 mt-16 text-lg">
          📌 No bookmarks yet. Add your first one!
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-gray-50 border border-gray-200 p-5 rounded-xl flex justify-between items-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="max-w-[80%]">
                <a
                  href={b.url}
                  target="_blank"
                  className="font-medium text-blue-600 hover:underline break-all"
                >
                  {b.title}
                </a>
                <p className="text-sm text-gray-500 mt-1 break-all">
                  {b.url}
                </p>
              </div>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)
}