import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const audiences = [
  { emoji: '🎓', title: 'Students', desc: 'University, college and high-school. Tame exams, essays and group projects.' },
  { emoji: '💻', title: 'Developers', desc: 'Ship features on time across repos, tickets, sprints and side projects.' },
  { emoji: '🏠', title: 'Remote Workers', desc: 'Structure flexible hours with a coach that adapts to your energy.' },
  { emoji: '🧑‍💻', title: 'Freelancers', desc: 'Juggle multiple clients and deadlines without missing a single one.' },
  { emoji: '🔬', title: 'Researchers', desc: 'Plan long projects, papers and experiments across weeks of focus.' },
  { emoji: '🤝', title: 'Teams', desc: 'Shared schedules can be delegated and coordinated by leadership.' },
]

export default function Audience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="audience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold tracking-widest text-violet-400 uppercase">
            Who it's for
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Built for everyone who has too much to do
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="inline-block text-3xl">{a.emoji}</span>
              <h3 className="mt-4 text-lg font-bold text-white">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}