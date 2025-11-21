import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Settings, Save, Image as ImageIcon, FileText } from 'lucide-react'
import MarkdownIt from 'markdown-it'
import texmath from 'markdown-it-texmath'
import 'katex/dist/katex.min.css'

const md = new MarkdownIt({ html: true, linkify: true, breaks: true }).use(texmath, { engine: require('katex'), delimiters: 'dollars' })

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const ChatMessage = ({ role, content }) => (
  <div className={`w-full flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 border ${role==='user' ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border-white/20' : 'bg-white/5 border-white/10'} backdrop-blur`}
      dangerouslySetInnerHTML={{ __html: md.render(content || '') }}
    />
  </div>
)

const EduBotPage = () => {
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('zoxnova-chat')||'[]'))
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => { localStorage.setItem('zoxnova-chat', JSON.stringify(messages)) }, [messages])
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }) }, [messages, loading])

  const send = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'chat', messages: newMessages })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.output || 'No response' }])
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error contacting AI backend.' }])
    } finally {
      setLoading(false)
    }
  }

  const saveChat = async () => {
    try {
      await fetch(`${API}/chats/save`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: messages[0]?.content?.slice(0,40) || 'ZoxNova Chat', messages }) })
    } catch (e) {}
  }

  const actions = [
    { label: 'Solve', prompt: 'Solve the following step-by-step:' },
    { label: 'Summarize', prompt: 'Summarize briefly:' },
    { label: 'Essay', prompt: 'Write a concise essay about:' },
    { label: 'Study Plan', prompt: 'Create a 7-day study plan on:' },
    { label: 'Explain', prompt: 'Explain in steps:' },
    { label: 'PDF', prompt: 'Draft a PDF-friendly outline for:' },
    { label: 'Quiz', prompt: 'Create quiz questions on:' },
    { label: 'Diagram', prompt: 'Describe a diagram for:' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-4">
      <aside className="hidden md:flex md:col-span-3 lg:col-span-3 flex-col gap-3">
        <div className="rounded-2xl p-3 bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="font-semibold">EduBot</div>
            <button className="px-2 py-1 rounded-full bg-white/10 text-sm">New Chat</button>
          </div>
          <div className="mt-3 text-sm text-zinc-400">Saved Chats</div>
          <div className="mt-2 text-xs text-zinc-500">Local storage is used for now.</div>
        </div>
        <div className="rounded-2xl p-3 bg-white/5 border border-white/10">
          <div className="font-semibold mb-2">Settings</div>
          <div className="text-sm text-zinc-400">Dark/Light, animations, etc.</div>
        </div>
      </aside>

      <section className="col-span-12 md:col-span-9 lg:col-span-9">
        <div ref={listRef} className="h-[62vh] md:h-[68vh] overflow-y-auto rounded-2xl p-4 bg-white/5 border border-white/10 space-y-4">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          {loading && (
            <div className="text-sm text-zinc-400">EduBot is typing...</div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send() }} placeholder="Ask anything..." className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-400" />
          <button onClick={send} className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">Send</button>
          <button onClick={saveChat} title="Save" className="px-3 py-3 rounded-xl bg-white/10 border border-white/10"><Save size={16}/></button>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {actions.map((a, i) => (
            <button key={i} onClick={()=>setInput(`${a.prompt} `)} className="text-left px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10">{a.label}</button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default EduBotPage
