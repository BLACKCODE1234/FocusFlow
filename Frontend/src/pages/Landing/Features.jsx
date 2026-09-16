import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const IconScheduler = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const IconPlanner = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a3.75 3.75 0 00-.601-1.303L3.63 9.75l3.612-4.14a3.75 3.75 0 00.601-1.303L8.657 1.5h2.686l.813 2.807a3.75 3.75 0 00.601 1.303l3.54 4.053a.75.75 0 010 1.107l-3.54 4.054a3.75 3.75 0 00-.601 1.088zM12.531 16.5l3.75 4.5-3.75-4.5zM20.625 12h-2.25M19.5 9.375v5.25" />
  </svg>
)

const IconChat = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0zm-2.25 8.25h-2.25l-1.5 2.25c-.75 1.2-2.7 0-2.7 0H8.25M11.25 12h.008v.008H11.25V12zm3.75 0h.008v.008H15V12zm-7.5 0h.008v.008H7.5V12z" />
  </svg>
)

const IconBell = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
)

const IconAdapt = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25M12 3l-2.25 2.25M12 3l2.25 2.25M6 9.75h12m-12 0l2.25-2.25M6 9.75l2.25 2.25M18 15.75H6m12 0l-2.25 2.25M18 15.75L15.75 18" />
  </svg>
)

const IconChart = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

const features = [
  {
    icon: IconScheduler,
    title: 'Intelligent Scheduling Engine',
    desc: 'Continuously evaluates deadlines, importance, workload and your history to auto-recalculate the optimal schedule every time something changes.',
    gradient: 'from-indigo-500 to-violet-500',
    glow: 'shadow-indigo-500/30',
  },
  {
    icon: IconPlanner,
    title: 'AI Planner',
    desc: 'Tell it "I have 5 assignments due next week" — get an optimized step-by-step plan for exactly what to work on, and when.',
    gradient: 'from-violet-500 to-fuchsia-500',
    glow: 'shadow-violet-500/30',
  },
  {
    icon: IconChat,
    title: 'AI Chat Assistant',
    desc: '"I have football tomorrow. Rearrange my schedule." Ask anything — it answers using your real deadlines, calendar and focus history.',
    gradient: 'from-fuchsia-500 to-pink-500',
    glow: 'shadow-fuchsia-500/30',
  },
  {
    icon: IconBell,
    title: 'Smart Notifications',
    desc: 'No more generic reminders. "You\'ve postponed this 3 times." "Start now and you\'ll finish before Friday." Coaching, not pestering.',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/30',
  },
  {
    icon: IconAdapt,
    title: 'Adaptive Workload Engine',
    desc: 'Learns you over time — you focus best in the morning, coding takes longer than reading — and reshapes future schedules to match.',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/30',
  },
  {
    icon: IconChart,
    title: 'Productivity Analytics',
    desc: 'Completion rates, focus time, weekly trends and risk predictions — know exactly where your time goes and what\'s falling behind.',
    gradient: 'from-cyan-500 to-sky-500',
    glow: 'shadow-cyan-500/30',
  },
]

function FeatureCard({ feature, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = feature.icon

  const handleMove = (e) => {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 36, rotate: i % 2 ? 1.5 : -1.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.13, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(167,139,250,0.14), transparent 60%)',
        }}
      />

      {/* Rainbow conic hover border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: '1.5px',
          background:
            'conic-gradient(from 0deg, #818cf8, #e879f9, #fbbf24, #34d399, #22d3ee, #818cf8)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div
        className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg ${feature.glow} transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-white transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-fuchsia-300">
        {feature.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{feature.desc}</p>

      <span
        className={`mt-4 inline-block h-1 w-10 rounded-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 group-hover:w-20`}
      />
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-bold tracking-widest text-fuchsia-400 uppercase">
            ✦ Features ✦
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Your whole productivity
            <span className="gradient-text text-glow"> stack, in one coach</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From smart scheduling to adaptive learning — everything works together
            to keep you ahead, instead of just reminding you that you're behind.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}