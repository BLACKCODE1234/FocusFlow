import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const particles = [
  { top: '12%', left: '8%', size: 3, color: '#e879f9', dur: 7, delay: 0 },
  { top: '28%', left: '90%', size: 4, color: '#67e8f9', dur: 9, delay: 1.2 },
  { top: '44%', left: '14%', size: 2, color: '#fcd34d', dur: 6, delay: 0.4 },
  { top: '58%', left: '96%', size: 3, color: '#a78bfa', dur: 8, delay: 2 },
  { top: '72%', left: '6%', size: 4, color: '#6ee7b7', dur: 9, delay: 0.8 },
  { top: '85%', left: '85%', size: 2, color: '#f472b6', dur: 6, delay: 1.6 },
  { top: '18%', left: '55%', size: 2, color: '#fff', dur: 7, delay: 2.4 },
  { top: '66%', left: '70%', size: 3, color: '#a78bfa', dur: 8, delay: 3 },
]

const show = (i = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12 } },
})

export default function AuthShell({ children, eyebrow }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-[-140px] h-[460px] w-[460px] rounded-full bg-fuchsia-600/25 blur-3xl animate-blob [animation-delay:-5s]" />
        <div className="absolute bottom-[-120px] left-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl animate-blob [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#020617_100%)]" />
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

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-gradient-to-br from-indigo-950/60 via-slate-950 to-fuchsia-950/40 p-12 lg:flex">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
          </div>

          <motion.div variants={show(0)} initial="hidden" animate="show">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xl font-black text-white shadow-lg shadow-violet-500/40">
                F
              </span>
              <span className="text-xl font-bold text-white">
                FocusFlow<span className="gradient-text font-extrabold"> AI</span>
              </span>
            </Link>
          </motion.div>

          <div className="relative py-10">
            <motion.div variants={show(1)} initial="hidden" animate="show">
              <p className="text-sm font-bold tracking-widest text-fuchsia-400 uppercase">
                {eyebrow || 'Welcome back'}
              </p>
              <h2 className="mt-3 max-w-md text-4xl leading-tight font-extrabold text-white">
                Your mightiest day starts with{' '}
                <span className="gradient-text text-glow">one log in.</span>
              </h2>
            </motion.div>

            <motion.div variants={show(2)} initial="hidden" animate="show" className="mt-10 space-y-4">
              {[
                { icon: '✦', text: 'AI has rebuilt your schedule since yesterday' },
                { icon: '🔥', text: 'You cleared 2 deadlines while you were away' },
                { icon: '📍', text: '1 task is at risk — 45 minutes fixes it' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm ${
                    i === 0 ? 'animate-float' : i === 1 ? 'animate-float-slow' : 'animate-float-slower'
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm">
                    {item.icon}
                  </span>
                  <p className="text-sm font-medium text-slate-200">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={show(3)} initial="hidden" animate="show">
            <p className="text-xs text-slate-500">
              Trusted by students & professionals to plan{' '}
              <span className="text-slate-300 font-semibold">4M+ hours</span> of focused work.
            </p>
          </motion.div>
        </div>

        {/* Right form panel */}
        <div className="relative flex items-center justify-center px-4 py-16 sm:px-10 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}