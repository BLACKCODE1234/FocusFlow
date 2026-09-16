import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthShell from './AuthShell.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-300">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs font-medium text-rose-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

function inputClass(hasError) {
  return `w-full rounded-xl border bg-slate-950/60 py-3 pl-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 backdrop-blur ${
    hasError
      ? 'border-rose-500/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30'
      : 'border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30'
  }`
}

function StrengthMeter({ password }) {
  const score = useMemo(() => {
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/\d/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  }, [password])

  const labels = ['Too weak', 'Weak', 'Okay', 'Good', 'Strong']
  const colors = ['bg-rose-500', 'bg-amber-500', 'bg-cyan-400', 'bg-emerald-400', 'bg-emerald-400']

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? colors[score - 1] : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-[11px] font-medium text-slate-500">
        {labels[score]}
      </p>
    </div>
  )
}

export default function Register() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendIn, setResendIn] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password') || ''
  const emailWatch = watch('email') || ''

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  const onContinue = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1100))
    setLoading(false)
    setStep(2)
    setResendIn(10)
  }

  const onVerify = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      setOtpError('Enter the 6-digit code we sent you.')
      return
    }
    setOtpError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1100))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  const stepVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir * -60, scale: 0.97 }),
  }

  return (
    <AuthShell eyebrow="Join FocusFlow">
      <div className="mb-8 -mt-6 flex items-center gap-3 lg:hidden">
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
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-white"
      >
        ← Back to home
      </Link>

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-3">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <span
              className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-all duration-300 ${
                step >= s
                  ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30'
                  : 'border border-white/15 bg-white/5 text-slate-500'
              }`}
            >
              {step > s ? '✓' : s}
            </span>
            <span className={`text-xs font-semibold ${step >= s ? 'text-white' : 'text-slate-500'}`}>
              {s === 1 ? 'Your details' : 'Verify email'}
            </span>
            {s === 1 && <span className="h-px w-8 bg-white/15" />}
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-white">
        {step === 1 ? 'Create your account' : 'Check your inbox'}
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        {step === 1
          ? 'Free forever. 60 seconds to your first smart plan.'
          : `We sent a 6-digit code to ${emailWatch || 'your email'}.`}
      </p>

      <AnimatePresence mode="wait" custom={step}>
        {/* Step 1 — details */}
        {step === 1 && (
          <motion.form
            key="details"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onSubmit={handleSubmit(onContinue)}
            noValidate
            className="mt-8 space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" id="firstName" error={errors.firstName?.message}>
                <input
                  id="firstName"
                  autoComplete="given-name"
                  placeholder="Alex"
                  className={inputClass(errors.firstName)}
                  {...register('firstName', { required: 'First name is required' })}
                />
              </Field>
              <Field label="Last name" id="lastName" error={errors.lastName?.message}>
                <input
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Rivera"
                  className={inputClass(errors.lastName)}
                  {...register('lastName', { required: 'Last name is required' })}
                />
              </Field>
            </div>

            <Field label="Email" id="email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                className={inputClass(errors.email)}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: emailPattern, message: 'Enter a valid email address' },
                })}
              />
            </Field>

            <Field label="Password" id="password" error={errors.password?.message}>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className={`${inputClass(errors.password)} pr-12`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Use at least 8 characters' },
                  })}
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
              <StrengthMeter password={password} />
            </Field>

            <Field label="Confirm password" id="confirm" error={errors.confirm?.message}>
              <input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className={inputClass(errors.confirm)}
                {...register('confirm', {
                  required: 'Confirm your password',
                  validate: (v) => v === password || 'Passwords do not match',
                })}
              />
            </Field>

            <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm text-slate-400 select-none">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-slate-900 accent-violet-500"
                {...register('terms', { required: 'You must accept the terms' })}
              />
              <span>
                I agree to the{' '}
                <a href="#" className="font-semibold text-violet-400 hover:text-violet-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-violet-400 hover:text-violet-300">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="-mt-3 text-xs font-medium text-rose-400">{errors.terms.message}</p>
            )}

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
                    Creating your account...
                  </>
                ) : (
                  'Create account →'
                )}
              </span>
              {!loading && <span className="absolute inset-y-0 w-1/3 bg-white/20 blur-md animate-shine" />}
            </motion.button>
          </motion.form>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <motion.form
            key="otp"
            custom={2}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onSubmit={onVerify}
            className="mt-8 space-y-6"
          >
            <div>
              <label htmlFor="otp" className="mb-2 block text-sm font-semibold text-slate-300">
                Enter 6-digit code
              </label>
              <input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                autoFocus
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ''))
                  setOtpError('')
                }}
                placeholder="••••••"
                className={`w-full rounded-2xl border bg-slate-950/60 py-4 text-center text-2xl font-extrabold tracking-[0.6em] text-white placeholder-slate-600 outline-none transition-all duration-200 backdrop-blur ${
                  otpError
                    ? 'border-rose-500/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30'
                    : 'border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30'
                }`}
              />
              {otpError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs font-medium text-rose-400"
                >
                  {otpError}
                </motion.p>
              )}
              <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                Demo code: <span className="font-bold text-emerald-300">123456</span> (backend not connected yet)
              </p>
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
                    Verifying...
                  </>
                ) : (
                  'Verify & get started →'
                )}
              </span>
              {!loading && <span className="absolute inset-y-0 w-1/3 bg-white/20 blur-md animate-shine" />}
            </motion.button>

            <button
              type="button"
              onClick={() => {
                setOtp('')
                setResendIn(10)
              }}
              disabled={resendIn > 0}
              className="w-full text-center text-sm font-semibold text-slate-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-slate-600"
            >
              {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-3.5"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/25 text-emerald-300">✓</span>
            <p className="text-sm font-semibold text-emerald-200">
              Account verified! (Demo — login flow hasn't started yet)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          or sign up with
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

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
        Sign up with Google
      </motion.button>

      <p className="mt-8 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-violet-400 transition-colors hover:text-violet-300">
          Log in
        </Link>
      </p>
    </AuthShell>
  )
}