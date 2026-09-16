import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'

const OTP_LENGTH = 6
const DEMO_CODE = '123456'

export default function VerifyOtp() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || 'you@university.edu'

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [focusedIdx, setFocusedIdx] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendIn, setResendIn] = useState(15)

  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  const handleChange = (idx, val) => {
    if (val.length > 1) {
      // paste handling
      const pasted = val.replace(/\D/g, '').slice(0, OTP_LENGTH)
      if (!pasted) return
      const next = [...digits]
      pasted.split('').forEach((ch, i) => {
        if (idx + i < OTP_LENGTH) next[idx + i] = ch
      })
      setDigits(next)
      setError('')
      const nextFocus = Math.min(idx + pasted.length, OTP_LENGTH - 1)
      setFocusedIdx(nextFocus)
      inputRefs.current[nextFocus]?.focus()
      return
    }

    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[idx] = val
    setDigits(next)
    setError('')

    if (val && idx < OTP_LENGTH - 1) {
      setFocusedIdx(idx + 1)
      inputRefs.current[idx + 1]?.focus()
    }
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      const next = [...digits]
      next[idx - 1] = ''
      setDigits(next)
      setFocusedIdx(idx - 1)
      inputRefs.current[idx - 1]?.focus()
    }
  }

  const code = digits.join('')

  const onVerify = async (e) => {
    e.preventDefault()
    if (code.length < OTP_LENGTH) {
      setError('Enter all 6 digits.')
      return
    }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1300))

    if (code === DEMO_CODE) {
      setLoading(false)
      setSuccess(true)
    } else {
      setLoading(false)
      setError('That code is incorrect. Try again.')
      setDigits(Array(OTP_LENGTH).fill(''))
      setFocusedIdx(0)
      inputRefs.current[0]?.focus()
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-[-140px] h-[460px] w-[460px] rounded-full bg-violet-600/25 blur-3xl animate-blob [animation-delay:-5s]" />
        <div className="absolute bottom-[-120px] left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl animate-blob [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#020617_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Left brand strip */}
        <div className="hidden items-center justify-center lg:flex lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xs text-center"
          >
            <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xl font-black text-white shadow-lg shadow-violet-500/40">
                F
              </span>
              <span className="text-xl font-bold text-white">
                FocusFlow<span className="gradient-text font-extrabold"> AI</span>
              </span>
            </Link>

            <div className="mx-auto mb-8 h-32 w-32 rounded-full bg-gradient-to-br from-violet-600/25 to-cyan-500/25 p-[2px]">
              <div className="grid h-full w-full place-items-center rounded-full bg-slate-950/80 text-5xl backdrop-blur">
                {success ? '🎉' : '✉️'}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              One last step — we verify your email to keep your account and your schedule safe.
            </p>
          </motion.div>
        </div>

        {/* Right form */}
        <div className="relative flex flex-col items-center justify-center py-16 lg:col-span-3 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            <Link
              to="/register"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-white"
            >
              ← Back to sign up
            </Link>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30 lg:hidden">
                    {OTP_LENGTH}
                  </div>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                    Verify your email
                  </h1>
                  <p className="mt-2 text-sm text-slate-400">
                    We sent a 6-digit code to{' '}
                    <span className="font-semibold text-white">{email}</span>
                  </p>

                  {/* OTP digit boxes */}
                  <form onSubmit={onVerify} className="mt-8">
                    <div className="flex justify-center gap-3">
                      {digits.map((d, i) => (
                        <motion.input
                          key={i}
                          ref={(el) => (inputRefs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={OTP_LENGTH - i === 1 ? 1 : OTP_LENGTH - i}
                          value={d}
                          onChange={(e) => handleChange(i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(i, e)}
                          onFocus={() => setFocusedIdx(i)}
                          animate={
                            d
                              ? { scale: [1, 1.12, 1], rotate: [0, -4, 4, 0] }
                              : focusedIdx === i
                                ? { scale: 1.05 }
                                : {}
                          }
                          transition={{ duration: 0.25 }}
                          className={`h-14 w-12 rounded-xl border-2 bg-slate-950/60 text-center text-2xl font-extrabold text-white outline-none backdrop-blur transition-all duration-200 ${
                            error
                              ? 'border-rose-500/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/25'
                              : d
                                ? 'border-violet-400/40 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/25'
                                : 'border-white/10 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/25'
                          }`}
                          style={{ caretColor: 'transparent' }}
                        />
                      ))}
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-center text-sm font-medium text-rose-400"
                      >
                        {error}
                      </motion.p>
                    )}

                    <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                      Demo: use{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setDigits(DEMO_CODE.split(''))
                          setError('')
                          setFocusedIdx(OTP_LENGTH - 1)
                          inputRefs.current[OTP_LENGTH - 1]?.focus()
                        }}
                        className="font-bold text-emerald-300 underline-offset-2 transition-colors hover:text-emerald-200 hover:underline"
                      >
                        {DEMO_CODE}
                      </button>{' '}
                      (backend not connected yet)
                    </p>

                    <motion.button
                      type="submit"
                      disabled={loading || code.length < OTP_LENGTH}
                      whileHover={{ scale: code.length >= OTP_LENGTH ? 1.02 : 1 }}
                      whileTap={{ scale: code.length >= OTP_LENGTH ? 0.97 : 1 }}
                      className="mt-8 group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600/90 via-violet-600/90 to-fuchsia-600/90 py-3.5 text-sm font-bold text-white/90 shadow-lg shadow-violet-900/40 transition-all hover:shadow-violet-900/60 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-violet-900/40"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Verifying...
                          </>
                        ) : (
                          'Verify & continue →'
                        )}
                      </span>
                      {!loading && code.length >= OTP_LENGTH && (
                        <span className="absolute inset-y-0 w-1/3 bg-white/20 blur-md animate-shine" />
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => {
                        setResendIn(15)
                        setDigits(Array(OTP_LENGTH).fill(''))
                        setFocusedIdx(0)
                        inputRefs.current[0]?.focus()
                      }}
                      disabled={resendIn > 0}
                      className="mt-5 w-full text-center text-sm font-semibold text-slate-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-slate-600"
                    >
                      {resendIn > 0
                        ? `Resend code in ${resendIn}s`
                        : 'Resend code'}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                    className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-5xl shadow-2xl shadow-emerald-500/40"
                  >
                    ✓
                  </motion.div>

                  <h2 className="mt-7 text-3xl font-extrabold text-white">
                    You're verified!
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Your account is ready. Time to plan your smartest week ever.
                  </p>

                  <Link
                    to="/login"
                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600/90 via-violet-600/90 to-fuchsia-600/90 px-8 py-3.5 text-sm font-bold text-white/90 shadow-lg shadow-violet-900/40 transition-all hover:shadow-violet-900/60 hover:brightness-110"
                  >
                    Continue to login →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brand strip (mobile only) */}
            <div className="mt-12 flex items-center justify-center gap-3 lg:hidden">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xs font-black text-white">
                F
              </span>
              <span className="text-sm font-bold text-white">
                FocusFlow<span className="gradient-text font-extrabold"> AI</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}