import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthShell from './AuthShell.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async () => {
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  const inputBase =
    'w-full rounded-xl border bg-slate-950/60 py-3 pl-4 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 backdrop-blur'

  return (
    <AuthShell eyebrow="Welcome back">
      <div className="relative mb-8 -mt-6 flex items-center gap-3 lg:hidden">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-lg font-black text-white">
            F
          </span>
          <span className="text-lg font-bold text-white">
            FocusFlow<span className="gradient-text font-extrabold"> AI</span>
          </span>
        </Link>
      </div>

      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-white"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-white">Log in</h1>
      <p className="mt-2 text-sm text-slate-400">
        Welcome back, rockstar. Your coach missed you.
      </p>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-5"
        animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-300">
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@university.edu"
              className={`${inputBase} ${
                errors.email
                  ? 'border-rose-500/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30'
                  : 'border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: emailPattern, message: 'Enter a valid email address' },
              })}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs font-medium text-rose-400"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-300">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs font-semibold text-violet-400 transition-colors hover:text-violet-300">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`${inputBase} pr-12 ${
                errors.password
                  ? 'border-rose-500/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30'
                  : 'border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30'
              }`}
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-slate-500 transition-colors hover:text-violet-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs font-medium text-rose-400"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Remember me + submit */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-400 select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-900 accent-violet-500"
            />
            Remember me
          </label>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600/90 via-violet-600/90 to-fuchsia-600/90 py-3.5 text-sm font-bold text-white/90 shadow-lg shadow-violet-900/40 transition-all hover:shadow-violet-900/60 hover:brightness-110 disabled:opacity-80"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Checking your schedule...
              </>
            ) : (
              'Log in →'
            )}
          </span>
          {!loading && <span className="absolute inset-y-0 w-1/3 bg-white/30 blur-md animate-shine" />}
        </motion.button>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-3.5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/25 text-emerald-300">✓</span>
              <p className="text-sm font-semibold text-emerald-200">
                Welcome back! (Demo — backend not connected yet)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          or continue with
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Google OAuth */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.03] py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-cyan-300/40 hover:bg-cyan-500/10"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 002.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        Continue with Google
      </motion.button>

      <p className="mt-8 text-center text-sm text-slate-400">
        New to FocusFlow?{' '}
        <Link to="/register" className="font-bold text-violet-400 transition-colors hover:text-violet-300">
          Create a free account
        </Link>
      </p>
    </AuthShell>
  )
}