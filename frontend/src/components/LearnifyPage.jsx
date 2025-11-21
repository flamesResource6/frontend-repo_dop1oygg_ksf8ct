import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const Card = ({ title, children }) => (
  <div className="rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur">
    <div className="font-semibold mb-2">{title}</div>
    {children}
  </div>
)

const LearnifyPage = () => {
  const [text, setText] = useState('')
  const [mode, setMode] = useState('explanation')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!text.trim()) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch(`${API}/learnify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, mode }) })
      const data = await res.json()
      setResult(data.output || JSON.stringify(data, null, 2))
    } catch (e) {
      setResult('Error contacting backend.')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Input">
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste notes or text here..." className="w-full h-48 px-3 py-2 rounded-xl bg-white/10 border border-white/10 outline-none" />
          <div className="mt-3 flex gap-2 flex-wrap text-sm">
            {['explanation','flashcards','summary','mcqs'].map(m => (
              <button key={m} onClick={()=>setMode(m)} className={`px-3 py-1.5 rounded-full ${mode===m? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/10'}`}>{m}</button>
            ))}
            <button onClick={run} className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">Convert</button>
          </div>
        </Card>
        <Card title="Output">
          <pre className="whitespace-pre-wrap text-sm text-zinc-200">{loading? 'Loading...' : result }</pre>
        </Card>
      </div>
    </div>
  )
}

export default LearnifyPage
