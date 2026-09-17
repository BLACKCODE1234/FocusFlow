import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const messages = [
  { role: 'user', text: 'I have 5 assignments due next week. What should I work on today?' },
  { role: 'ai', text: 'You have ~9 hrs available until Friday. Here is your optimized plan:' },
]

const planRows = [
  { title: 'Database Assignment', time: 'Today, 2 hrs', risk: 'high' },
  { title: 'Group Project Outline', time: 'Today, 1 hr', risk: 'medium' },
  { title: 'Essay Drafting', time: 'Tomorrow, 1.5 hrs', risk: 'low' },
]

const riskStyles = {
  high: 'bg-rose-500/15 text-rose-300',
  medium: 'bg-amber-500/15 text-amber-300',
  low: 'bg-emerald-500/15 text-emerald-300',
}

export default function AiShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="ai" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold tracking-widest text-violet-400 uppercase">
            AI Assistant
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Talk to your schedule like a productivity coach
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            FocusFlow AI answers using your real deadlines, calendar events, task
            history and habits, not generic advice.
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
                a: 'Notifications surface the upside of finishing early, a real motivation engine.',
              },
            ].map((item) => (
              <li key={item.q} className="flex items-start gap-3">
                <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-violet-600 text-[10px] font-bold text-white">
                  /
                </span>
                <div>
                  <p className="font-medium text-white">{item.q}</p>
                  <p className="text-sm text-slate-400">{item.a}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Chat mockup */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">
                AI
              </span>
              <div>
                <p className="text-sm font-bold text-white">FocusFlow Coach</p>
                <p className="text-[11px] text-emerald-400">Online, knows your deadlines</p>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-violet-600 px-4 py-2.5 text-sm text-white">
                {messages[0].text}
              </div>
              <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-slate-200">
                {messages[1].text}
              </div>

              <div className="space-y-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                {planRows.map((row) => (
                  <div key={row.title} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">{row.title}</p>
                      <p className="text-[11px] text-slate-500">{row.time}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${riskStyles[row.risk]}`}
                    >
                      {row.risk}
                    </span>
                  </div>
                ))}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '72%' } : {}}
                    transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-violet-400"
                  />
                </div>
                <p className="text-[11px] text-slate-500">72% confident you finish all 5 on time</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 px-5 py-3.5">
              <div className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-500">
                Ask about your schedule...
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">
                /
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}