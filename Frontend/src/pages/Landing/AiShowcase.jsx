import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const messages = [
  { role: 'user', text: 'I have 5 assignments due next week. What should I work on today?' },
  { role: 'ai', text: 'You have ~9 hrs available until Friday. Here\'s your optimized plan:' },
]

const planRows = [
  { title: 'Database Assignment', time: 'Today · 2 hrs', risk: 'high', bar: 'w-9/12' },
  { title: 'Group Project Outline', time: 'Today · 1 hr', risk: 'medium', bar: 'w-6/12' },
  { title: 'Essay Drafting', time: 'Tomorrow · 1.5 hrs', risk: 'low', bar: 'w-4/12' },
]

export default function AiShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="ai" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-[-140px] h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-3xl animate-blob" />
        <div className="absolute right-[-120px] bottom-0 h-[380px] w-[380px] rounded-full bg-fuchsia-600/20 blur-3xl animate-blob [animation-delay:-6s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
            AI Assistant
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Talk to your schedule like a{' '}
            <span className="gradient-text">productivity coach</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            FocusFlow AI answers using your real deadlines, calendar events, task
            history and habits — not generic advice.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              {
                q: '"Am I likely to finish everything?"',
                a: 'Gets a confidence estimate with the exact blockers to fix now.',
              },
              {
                q: '"I feel overwhelmed."',
                a: 'Automatically drops low-priority work from your schedule and re-plans.',
              },
              {
                q: '"Completing this today gives me a free Saturday."',
                a: 'Notifications surface the upside of finishing early — a real motivation engine.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 text-xs font-bold text-white">
                  ✓
                </span>
                <div>
                  <p className="font-medium text-white">{item.q}</p>
                  <p className="text-sm text-slate-400">{item.a}</p>
                </div>
              </motion.div>
            ))}
          </ul>
        </motion.div>

        {/* Chat mockup */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.94, y: 32 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div aria-hidden className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-violet-500/50 via-fuchsia-500/40 to-cyan-400/40 blur-2xl animate-pulse-soft" />

          <div className="absolute -top-3 -right-3 text-lg animate-twinkle" style={{ animationDuration: '3s' }}>✨</div>
          <div className="absolute -bottom-4 -left-4 text-md animate-twinkle" style={{ animationDuration: '4s' }}>💫</div>

          <div className="relative rounded-3xl p-[2px] overflow-hidden shadow-2xl">
            <div
              aria-hidden
              className="absolute inset-0 animate-spin-reverse"
              style={{
                background:
                  'conic-gradient(from 0deg, #22d3ee, #a78bfa, #f472b6, #fcd34d, #34d399, #22d3ee)',
              }}
            />
            <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-slate-900/95 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg animate-pulse-soft">
                ✦
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">FocusFlow Coach</p>
                <p className="text-[11px] text-emerald-400">Online · knows your deadlines</p>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm text-white shadow-lg shadow-violet-500/20">
                {messages[0].text}
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-slate-200">
                {messages[1].text}
              </div>

              <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                {planRows.map((row) => (
                  <motion.div
                    key={row.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + planRows.indexOf(row) * 0.15 }}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">{row.title}</p>
                      <p className="text-[11px] text-slate-500">{row.time}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        row.risk === 'high'
                          ? 'bg-rose-500/15 text-rose-300'
                          : row.risk === 'medium'
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-emerald-500/15 text-emerald-300'
                      }`}
                    >
                      {row.risk}
                    </span>
                  </motion.div>
                ))}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '72%' } : {}}
                    transition={{ duration: 1.2, delay: 1.1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                  />
                </div>
                <p className="text-[11px] text-slate-500">72% confident you finish all 5 on time</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 px-5 py-3.5">
              <div className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-500">
                Ask about your schedule...
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-sm text-white animate-pulse-soft">
                ➤
              </span>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}