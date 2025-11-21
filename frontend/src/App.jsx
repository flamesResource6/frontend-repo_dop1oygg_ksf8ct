import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, BookOpenText, ClipboardList, Sun, Moon, Plus, Settings, Save, Image, FileText } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import HomePage from './components/HomePage'
import EduBotPage from './components/EduBotPage'
import LearnifyPage from './components/LearnifyPage'
import QuizifyPage from './components/QuizifyPage'

const Layout = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const d = localStorage.getItem('zoxnova-theme')
    return d ? d === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('zoxnova-theme', dark ? 'dark' : 'light')
  }, [dark])

  const location = useLocation()

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#0b1020] via-[#0e1230] to-[#0b1020] text-zinc-100 overflow-x-hidden`}>
      <nav className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 dark:bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.6)]" />
            <span className="tracking-wide">ZoxNova</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/edubot" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-sm">EduBot</Link>
            <Link to="/learnify" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-sm">Learnify</Link>
            <Link to="/quizify" className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-sm">Quizify</Link>
            <button onClick={() => setDark(d => !d)} className="ml-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-400">
          <div>© {new Date().getFullYear()} ZoxNova • Made by Vishal</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/edubot"
        element={
          <Layout>
            <EduBotPage />
          </Layout>
        }
      />
      <Route
        path="/learnify"
        element={
          <Layout>
            <LearnifyPage />
          </Layout>
        }
      />
      <Route
        path="/quizify"
        element={
          <Layout>
            <QuizifyPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
