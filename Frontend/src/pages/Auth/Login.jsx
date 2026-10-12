import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { apiPost, setToken } from '@/lib/api'
import AuthLayout from '@/components/AuthLayout'
import TextField from '@/components/TextField'
import SubmitButton from '@/components/SubmitButton'
import FormError from '@/components/FormError'

export default function Login() {
  const [apiError, setApiError] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    setApiError(null)
    try {
      const res = await apiPost('/auth/login', {
        email: data.email,
        password: data.password,
      })
      if (res?.token) setToken(res.token)
      else if (res?.access_token) setToken(res.access_token)
      navigate('/')
    } catch (err) {
      setApiError(err.message || 'Login failed')
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your account"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-amber hover:text-amber/80">
            Sign up
          </Link>
        </>
      }
    >
      <TextField
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
        registration={register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
        })}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password}
        registration={register('password', {
          required: 'Password is required',
        })}
      />

      <FormError message={apiError} />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-amber"
          />
          <span className="text-[0.8rem] text-dim">Remember me</span>
        </label>
        <Link to="/forgot-password" className="font-medium text-amber hover:text-amber/80">
          Forgot password?
        </Link>
      </div>

      <SubmitButton loading={isSubmitting} loadingText="Logging in...">
        Log in
      </SubmitButton>
    </AuthLayout>
  )
}
