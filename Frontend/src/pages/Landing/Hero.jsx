import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { value: '82%', label: 'deadline-failure risk detected' },
  { value: '3x', label: 'fewer missed deadlines' },
  { value: '24/7', label: 'adaptive re-planning' },
  { value: '100%', label: 'personalized coaching' },
]

const scheduleRows = [
  { title: 'Database Assignment', time: '09:00 - 11:30', progress: 82, color: 'bg-cyan-400' },
  { title: 'Calculus Problem Set', time: '13:00 - 15:00', progress: 45, color: 'bg-violet-400' },
  { title: 'Prep for Group Meeting', time: '16:00 - 17:00', progress: 15, color: 'bg-amber-400' },
  { title: 'Physics Reading', time: '19:00 - 20:30', progress: 0, color: 'bg-emerald-400' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}

const wordUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const headlineWords = ['Stop', 'drowning', 'in', 'deadlines.', 'Start', 'flowing.']

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Copy */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
              Your AI-Powered Productivity Coach
            </span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.2rem]"
          >
            {headlineWords.map((w, i) => (
              <motion.span
                key={i}
                variants={wordUp}
                className={`inline-block mr-[0.28em] ${
                  i === 4 || i === 5 ? 'text-violet-400' : 'text-white'
                }`}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          >
            FocusFlow AI doesn't just store tasks. It analyzes deadlines, workload,
            and your habits to continuously generate the smartest schedule, like a
            personal coach that adapts to you.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/register"
              className="rounded-lg bg-violet-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-violet-500"
            >
              Start Planning Free
            </Link>
            <a
              href="#features"
              className="rounded-lg border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                <p className="text-2xl font-extrabold text-violet-400 sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Today's Schedule</p>
                <p className="text-xs text-slate-500">Optimized by AI, 4.2 hrs of focus</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600/20 text-sm text-violet-300">
                AI
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {scheduleRows.map((row, i) => (
                <div
                  key={row.title}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 rounded-full ${row.color}`} />
                      <span className="text-sm font-medium text-slate-200">{row.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{row.time}</span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
                      className={`h-full rounded-full ${row.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-violet-400/20 bg-violet-500/10 p-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-600 text-xs font-bold text-white">
                AI
              </span>
              <p className="text-xs leading-relaxed text-violet-200">
                <span className="font-semibold text-white">Insight:</span> finish
                Database by 11:30. You have an 82% risk of missing it otherwise.
                Doing this today frees your whole Saturday.
              </p>
            </div>
          </div>

          {/* Floating risk card */}
          <div className="absolute -top-6 -right-2 sm:-right-8">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/95 p-3 backdrop-blur">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/20 text-rose-300 text-sm font-bold">
                !
              </span>
              <div>
                <p className="text-[11px] font-bold text-white">High-risk deadline</p>
                <p className="text-[10px] text-slate-400">Database, due Friday</p>
              </div>
            </div>
          </div>

          {/* Floating achievement card */}
          <div className="absolute -bottom-6 -left-2 sm:-left-8">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/95 p-3 backdrop-blur">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/20 text-amber-300 text-sm font-bold">
                7
              </span>
              <div>
                <p className="text-[11px] font-bold text-white">7-Day Streak unlocked</p>
                <p className="text-[10px] text-slate-400">Keep it going!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}