import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPost, setToken } from '@/lib/api'

const LENGTH = 6

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(LENGTH).fill(''))
  const [apiError, setApiError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputs = useRef([])
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)

    if (value && index < LENGTH - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH)
    if (!pasted) return

    const next = [...otp]
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setOtp(next)
    inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    const email = sessionStorage.getItem('pendingOtpEmail') || ''
    const flow = sessionStorage.getItem('otpFlow')
    setApiError(null)
    setIsSubmitting(true)
    try {
      if (flow === 'reset-password') {
        sessionStorage.setItem('otpCode', code)
        navigate('/reset-password')
        return
      }
      const res = await apiPost('/auth/verify-otp', { email, code })
      if (res?.token) setToken(res.token)
      else if (res?.access_token) setToken(res.access_token)
      sessionStorage.removeItem('pendingOtpEmail')
      navigate('/')
    } catch (err) {
      setApiError(err.message || 'Verification failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-600/35 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-[-140px] h-[460px] w-[460px] rounded-full bg-fuchsia-600/30 blur-3xl animate-blob [animation-delay:-4s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#020617_100%)]" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Verify your email</h1>
          <p className="mt-2 text-sm text-slate-400">
            We&apos;ve sent a 6-digit code to your email address
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-12 rounded-xl border border-white/10 bg-white/5 text-center text-lg font-bold text-white outline-none transition-colors focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 sm:h-16 sm:w-14"
              />
            ))}
          </div>

          {apiError && (
            <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-violet-500/50 hover:brightness-110 disabled:opacity-50"
            disabled={otp.some((d) => !d) || isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Didn&apos;t receive a code?{' '}
          <button type="button" className="font-medium text-violet-400 hover:text-violet-300">
            Resend
          </button>
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 text-xs text-slate-500 hover:text-white"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
