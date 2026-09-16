import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { value: '82%', label: 'deadline-failure risk detected' },
  { value: '3×', label: 'fewer missed deadlines' },
  { value: '24/7', label: 'adaptive re-planning' },
  { value: '100%', label: 'personalized coaching' },
]

const particles = [
  { top: '14%', left: '6%', size: 3, color: '#e879f9', dur: 7, delay: 0 },
  { top: '22%', left: '90%', size: 4, color: '#67e8f9', dur: 9, delay: 1.2 },
  { top: '36%', left: '16%', size: 2, color: '#fcd34d', dur: 6, delay: 0.4 },
  { top: '48%', left: '96%', size: 3, color: '#a78bfa', dur: 8, delay: 2 },
  { top: '60%', left: '4%', size: 4, color: '#6ee7b7', dur: 9, delay: 0.8 },
  { top: '66%', left: '88%', size: 2, color: '#f472b6', dur: 6, delay: 1.6 },
  { top: '78%', left: '12%', size: 3, color: '#67e8f9', dur: 7, delay: 2.4 },
  { top: '88%', left: '80%', size: 4, color: '#fcd34d', dur: 8, delay: 0.6 },
  { top: '8%', left: '48%', size: 2, color: '#a78bfa', dur: 6, delay: 3 },
  { top: '30%', left: '72%', size: 3, color: '#fff', dur: 9, delay: 1.8 },
  { top: '70%', left: '58%', size: 2, color: '#fff', dur: 7, delay: 2.8 },
  { top: '94%', left: '34%', size: 3, color: '#e879f9', dur: 8, delay: 3.4 },
]

const headlineWords = [
  'Stop',
  'drowning',
  'in',
  'deadlines.',
  'Start',
  'flowing.',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}

const wordUp = {
  hidden: { opacity: 0, y: 24, rotate: 6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

const scheduleRows = [
  { title: 'Database Assignment', time: '09:00 – 11:30', progress: 82, color: 'bg-cyan-400', dot: 'bg-cyan-400' },
  { title: 'Calculus Problem Set', time: '13:00 – 15:00', progress: 45, color: 'bg-violet-400', dot: 'bg-violet-400' },
  { title: 'Prep for Group Meeting', time: '16:00 – 17:00', progress: 15, color: 'bg-amber-400', dot: 'bg-amber-400' },
  { title: 'Physics Reading', time: '19:00 – 20:30', progress: 0, color: 'bg-emerald-400', dot: 'bg-emerald-400' },
]

function Particles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}55`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-600/35 blur-3xl animate-blob" />
        <div className="absolute top-16 right-[-140px] h-[460px] w-[460px] rounded-full bg-fuchsia-600/30 blur-3xl animate-blob [animation-delay:-4s]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/25 blur-3xl animate-blob [animation-delay:-8s]" />
        <div className="absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-3xl animate-blob [animation-delay:-2s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#020617_100%)]" />
        <Particles />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Copy */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold text-fuchsia-200 shadow-lg shadow-fuchsia-500/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse-soft" />
              Your AI-Powered Productivity Coach
              <span className="text-amber-300">✦</span>
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
                  i === 0 || i === 1 || i === 3 ? 'text-white' : i === 4
                    ? 'gradient-text text-glow'
                    : 'gradient-text'
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
            and your habits to continuously generate the smartest schedule — like a
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
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-500/40 transition-transform hover:scale-105"
            >
              <span className="relative z-10">Start Planning Free</span>
              <span className="absolute inset-y-0 w-1/3 bg-white/40 blur-md animate-shine" />
            </Link>
            <a
              href="#features"
              className="rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-cyan-200"
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
              <div
                key={s.label}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition-colors hover:border-white/15"
              >
                <p className="gradient-text text-2xl font-extrabold transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40, rotateY: -14 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md [perspective:1200px]"
        >
          {/* Glow ring */}
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/50 via-fuchsia-500/40 to-cyan-400/50 blur-2xl animate-pulse-soft" />

          {/* Rotating conic frame */}
          <div className="relative rounded-[2rem] p-[2.5px] overflow-hidden shadow-2xl">
            <div
              aria-hidden
              className="absolute inset-0 animate-spin-slower"
              style={{
                background:
                  'conic-gradient(from 0deg, #818cf8, #e879f9, #fbbf24, #34d399, #22d3ee, #818cf8)',
              }}
            />
            <div className="relative flex aspect-[4/5] flex-col overflow-hidden rounded-[calc(2rem-2.5px)] bg-slate-900/95 p-6 backdrop-blur-xl">
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-violet-600/40 blur-3xl" />
                <div className="absolute bottom-0 -left-16 h-40 w-40 rounded-full bg-cyan-500/40 blur-3xl" />
              </div>

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Today's Schedule</p>
                  <p className="text-xs text-slate-500">Optimized by AI · 4.2 hrs of focus</p>
                </div>
                <motion.span
                  animate={{ rotate: [0, 12, -8, 12, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-lg shadow-lg shadow-orange-500/30"
                >
                  🔥
                </motion.span>
              </div>

              <div className="relative mt-5 space-y-3">
                {scheduleRows.map((row, i) => (
                  <div
                    key={row.title}
                    className="rounded-2xl border border-white/5 bg-white/[0.04] p-3.5 transition-colors hover:border-white/15"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${row.dot} animate-pulse-soft`} />
                        <span className="text-sm font-medium text-slate-200">{row.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{row.time}</span>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.progress}%` }}
                        transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
                        className={`h-full rounded-full ${row.color} shadow-[0_0_12px_rgba(255,255,255,0.35)]`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-4 flex items-start gap-3 rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 p-3.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm animate-pulse-soft">
                  ✦
                </span>
                <p className="text-xs leading-relaxed text-violet-200">
                  <span className="font-semibold text-white">AI Insight:</span> finish
                  Database by 11:30 — you have an 82% risk of missing it otherwise.
                  Doing this today frees your whole Saturday.
                </p>
              </div>
            </div>
          </div>

          {/* Floating risk card */}
          <div className="absolute -top-8 -right-2 sm:-right-8 animate-float">
            <div className="flex items-center gap-3 rounded-2xl border border-rose-400/25 bg-slate-900/95 p-3.5 shadow-2xl shadow-rose-500/20 backdrop-blur-xl">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-500/25 text-rose-300">⚠</span>
              <div>
                <p className="text-[11px] font-bold text-white">High-risk deadline</p>
                <p className="text-[10px] text-slate-400">Database · due Friday</p>
              </div>
            </div>
          </div>

          {/* Floating achievement card */}
          <div className="absolute -bottom-8 -left-2 sm:-left-8 animate-float-slow">
            <div className="flex items-center gap-3 rounded-2xl border border-amber-400/25 bg-slate-900/95 p-3.5 shadow-2xl shadow-amber-500/20 backdrop-blur-xl">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/25 text-amber-300">🏆</span>
              <div>
                <p className="text-[11px] font-bold text-white">7-Day Streak unlocked</p>
                <p className="text-[10px] text-slate-400">Keep it going!</p>
              </div>
            </div>
          </div>

          {/* Floating focus-timer chip */}
          <div className="absolute top-[38%] -right-4 sm:-right-12 hidden sm:block animate-float-slower">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-slate-900/95 px-4 py-2 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span className="text-[11px] font-bold text-white">Focus session · 52:14</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-slate-500 hover:text-white lg:flex"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
        <span className="animate-bounce-soft text-lg">⌄</span>
      </motion.a>
    </section>
  )
}