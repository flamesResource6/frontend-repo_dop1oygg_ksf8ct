import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const QuizifyPage = () => {
  const [topic, setTopic] = useState('')
  const [mode, setMode] = useState('daily')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch(`${API}/quizify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic, mode }) })
      const data = await res.json()
      setResult(typeof data === 'string' ? data : (data.output || JSON.stringify(data, null, 2)))
    } catch (e) {
      setResult('Error contacting backend.')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
        <div className="text-lg font-semibold">Quizify</div>
        <p className="text-sm text-zinc-400">Generate quizzes by topic. Modes: Daily Quiz, Stats, Ranks.</p>
        <div className="mt-4 grid sm:grid-cols-3 gap-2">
          <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Topic (e.g., Calculus)" className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 outline-none" />
          <select value={mode} onChange={e=>setMode(e.target.value)} className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 outline-none">
            <option value="daily">Daily Quiz</option>
            <option value="stats">Stats</option>
            <option value="ranks">Ranks</option>
            <option value="custom">Custom</option>
          </select>
          <button onClick={run} className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">Generate</button>
        </div>
        <pre className="mt-4 whitespace-pre-wrap text-sm text-zinc-200">{loading? 'Loading...' : result}</pre>
      </div>
    </div>
  )
}

export default QuizifyPage
