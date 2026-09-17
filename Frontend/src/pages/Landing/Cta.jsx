import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Cta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center sm:px-16"
        >
          <p className="text-sm font-bold tracking-widest text-violet-400 uppercase">
            No more missed deadlines
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Your schedule, optimized for you, starting today
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-slate-400">
            Create your account in under a minute and let FocusFlow AI build your
            first plan tonight.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="rounded-lg bg-violet-600 px-8 py-4 text-sm font-bold text-white hover:bg-violet-500"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-white/15 px-8 py-4 text-sm font-bold text-white hover:bg-white/10"
            >
              I have an account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}