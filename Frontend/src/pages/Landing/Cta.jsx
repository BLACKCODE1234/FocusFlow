import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Cta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl animate-blob" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] p-[2.5px] overflow-hidden"
        >
          {/* Rotating rainbow frame */}
          <div
            aria-hidden
            className="absolute inset-0 animate-spin-slower"
            style={{
              background:
                'conic-gradient(from 0deg, #818cf8, #e879f9, #fbbf24, #34d399, #22d3ee, #818cf8)',
            }}
          />

          <div className="relative overflow-hidden rounded-[calc(2.5rem-2.5px)] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-16 text-center sm:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-white/25 blur-3xl animate-blob" />
              <div className="absolute right-1/5 -bottom-20 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl animate-blob [animation-delay:-5s]" />
              <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl animate-blob [animation-delay:-8s]" />
            </div>

            <div className="relative">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-sm font-bold tracking-widest text-white/80 uppercase"
              >
                ✦ No more missed deadlines ✦
              </motion.p>
              <h2 className="mx-auto mt-4 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl text-glow">
                Your schedule, optimized for you — starting today
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-white/80">
                Create your account in under a minute and let FocusFlow AI build
                your first plan tonight.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  to="/register"
                  className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 text-sm font-bold text-violet-700 shadow-2xl shadow-black/30 transition-transform hover:scale-110"
                >
                  <span className="relative z-10">Create free account</span>
                  <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-indigo-300 to-fuchsia-300 blur-md animate-shine" />
                </Link>
                <Link
                  to="/login"
                  className="rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-105"
                >
                  I have an account
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}