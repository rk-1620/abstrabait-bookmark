# 📌 Smart Bookmark

A minimal, secure, real-time bookmark management application built with **Next.js (App Router)** and **Supabase**.

Users can securely log in with Google, save private bookmarks, and see real-time updates across multiple tabs or devices.

---

## 🚀 Live Demo

👉 https://your-project-name.vercel.app  

---

## ✨ Features

### 🔐 Authentication
- Google OAuth login
- Secure session handling
- Protected routes
- Logout support

### 📂 Bookmark Management
- Add bookmark
- Delete bookmark
- Auto-format URL (adds https:// if missing)
- Empty state handling
- Loading state handling

### 🔒 Data Privacy
- Row Level Security (RLS) enabled
- Users can only access their own bookmarks
- Secure database access via Supabase

### ⚡ Real-Time Updates
- Live updates using Supabase Realtime
- Syncs across multiple tabs/devices

### 🎨 UI & UX
- Clean SaaS-style design
- Responsive layout
- Modern Tailwind styling
- Soft gradients & hover animations

---

## 🏗 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend (BaaS)
- Supabase (PostgreSQL)
- Supabase Auth (Google OAuth)
- Supabase Realtime

### Deployment
- Vercel

---

## 🗄 Database Schema

### `bookmarks` table

| Column      | Type        | Description |
|------------|------------|------------|
| id         | uuid (PK)  | Unique bookmark ID |
| user_id    | uuid       | References auth.users |
| title      | text       | Bookmark title |
| url        | text       | Bookmark URL |
| created_at | timestamp  | Auto-generated |

---

## 🔐 Row Level Security Policies

RLS is enabled on the `bookmarks` table with the following condition:

```sql
auth.uid() = user_id
```

This ensures users can:
- View their own bookmarks
- Insert their own bookmarks
- Delete their own bookmarks

Complete data isolation is enforced at the database level.

---

## 🧠 Architecture Overview

```
Next.js (Client)
        ↓
Supabase Auth (Google OAuth)
        ↓
Supabase Database (Postgres + RLS)
        ↓
Supabase Realtime
```

No custom backend required.

---

## 🛠 Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/smart-bookmark.git
cd smart-bookmark
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🌍 Production Deployment

Deployed on **Vercel**

Deployment Steps:

1. Push project to GitHub
2. Import repository into Vercel
3. Add environment variables in Vercel settings
4. Configure Supabase Site URL
5. Deploy

---

## 🧩 Key Technical Decisions

### Why Supabase?
- Built-in Auth
- Realtime subscriptions
- PostgreSQL database
- Row Level Security
- No custom backend required

### Why Realtime + Optimistic UI?
- Optimistic UI improves user experience
- Realtime ensures cross-tab/device synchronization

### Why RLS?
- Prevents cross-user data access
- Enforces database-level security

---

## 📚 What This Project Demonstrates

- OAuth integration
- Secure database design
- Real-time architecture
- Production deployment workflow
- Modern React architecture (App Router)
- Type-safe TypeScript usage

---

## 🔮 Future Improvements

- Edit bookmark
- Search & filter
- Duplicate prevention
- Toast notifications
- Dark mode toggle
- Bookmark categories/tags
- Custom domain

---

## 👨‍💻 Author

Rakesh Kumar  
Full Stack Developer (Next.js + Supabase + TypeScript)

---

# 🎯 Summary

Smart Bookmark is a production-ready full-stack SaaS-style application demonstrating:

- Authentication
- Database security
- Real-time updates
- Clean UI design
- Deployment best practices