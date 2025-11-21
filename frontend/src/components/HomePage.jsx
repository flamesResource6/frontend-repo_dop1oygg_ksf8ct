import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Sparkles, BookOpen, ClipboardList } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-600/40 to-cyan-500/40 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-600/30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-300 drop-shadow"
            >
              ZoxNova – Your AI Learning Partner.
            </motion.h1>
            <p className="mt-4 text-zinc-300">Built by Vishal. Powered by AI.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/edubot" className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]">Open EduBot</Link>
              <Link to="/learnify" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20">Learnify</Link>
              <Link to="/quizify" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20">Quizify</Link>
            </div>
          </div>
          <div className="h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: MessageSquare, title: 'Chat-style Answers', desc: 'Converse like ChatGPT with markdown and math support.' },
            { icon: Sparkles, title: 'Generate', desc: 'Essays, study plans, summaries, diagrams & images.' },
            { icon: BookOpen, title: 'Learnify', desc: 'Turn notes into flashcards, summaries, and MCQs.' },
            { icon: ClipboardList, title: 'Quizify', desc: 'Daily quizzes with stats and ranks.' },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white/5 border border-white/10 shadow-lg backdrop-blur">
              <f.icon className="text-cyan-300" />
              <div className="mt-3 font-semibold">{f.title}</div>
              <div className="text-sm text-zinc-300">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
