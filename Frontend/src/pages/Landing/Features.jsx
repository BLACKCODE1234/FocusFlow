import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    title: 'Intelligent Scheduling Engine',
    desc: 'Continuously evaluates deadlines, importance, workload and your history to auto-recalculate the optimal schedule every time something changes.',
  },
  {
    title: 'AI Planner',
    desc: 'Tell it "I have 5 assignments due next week", get an optimized step-by-step plan for exactly what to work on, and when.',
  },
  {
    title: 'AI Chat Assistant',
    desc: '"I have football tomorrow. Rearrange my schedule." Ask anything. It answers using your real deadlines, calendar and focus history.',
  },
  {
    title: 'Smart Notifications',
    desc: 'No more generic reminders. "You postponed this 3 times." "Start now and you finish before Friday." Coaching, not pestering.',
  },
  {
    title: 'Adaptive Workload Engine',
    desc: 'Learns you over time. You focus best in the morning. Coding takes longer than reading. Future schedules adapt to match.',
  },
  {
    title: 'Productivity Analytics',
    desc: 'Completion rates, focus time, weekly trends and risk predictions. Know exactly where your time goes and what is falling behind.',
  },
]

function FeatureCard({ feature, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: 'easeOut' }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
    >
      <h3 className="text-lg font-bold text-white">{feature.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold tracking-widest text-violet-400 uppercase">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Your whole productivity stack, in one coach
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From smart scheduling to adaptive learning, everything works together
            to keep you ahead, instead of just reminding you that you're behind.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}