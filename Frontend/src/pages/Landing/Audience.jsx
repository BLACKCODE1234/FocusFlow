import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const audiences = [
  { emoji: '🎓', title: 'Students', desc: 'University, college & high-school — tame exams, essays and group projects.', gradient: 'from-indigo-500/20 to-violet-500/20', ring: 'hover:ring-indigo-400/40' },
  { emoji: '💻', title: 'Developers', desc: 'Ship features on time across repos, tickets, sprints and side projects.', gradient: 'from-cyan-500/20 to-sky-500/20', ring: 'hover:ring-cyan-400/40' },
  { emoji: '🏠', title: 'Remote Workers', desc: 'Structure flexible hours with a coach that adapts to your energy.', gradient: 'from-emerald-500/20 to-teal-500/20', ring: 'hover:ring-emerald-400/40' },
  { emoji: '🧑‍💻', title: 'Freelancers', desc: 'Juggle multiple clients and deadlines without missing a single one.', gradient: 'from-fuchsia-500/20 to-pink-500/20', ring: 'hover:ring-fuchsia-400/40' },
  { emoji: '🔬', title: 'Researchers', desc: 'Plan long projects, papers and experiments across weeks of focus.', gradient: 'from-amber-500/20 to-orange-500/20', ring: 'hover:ring-amber-400/40' },
  { emoji: '🤝', title: 'Teams', desc: 'Shared schedules can be delegated and coordinated by leadership.', gradient: 'from-rose-500/20 to-red-500/20', ring: 'hover:ring-rose-400/40' },
]

export default function Audience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="audience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold tracking-widest text-emerald-400 uppercase">
            Who it's for
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Built for everyone who{' '}
            <span className="gradient-text">has too much to do</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 26, rotate: i % 2 ? 1 : -1 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${a.gradient} p-6 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/5 ${a.ring}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(260px circle at 50% 0%, rgba(255,255,255,0.12), transparent 60%)',
                }}
              />
              <span className="inline-block text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                {a.emoji}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-amber-200">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{a.desc}</p>
              <span
                className={`mt-4 inline-block h-0.5 w-8 rounded-full bg-white/40 transition-all duration-500 group-hover:w-16 group-hover:bg-white`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}