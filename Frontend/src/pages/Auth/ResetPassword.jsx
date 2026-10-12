import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { apiPost } from '@/lib/api'
import AuthLayout from '@/components/AuthLayout'
import TextField from '@/components/TextField'
import SubmitButton from '@/components/SubmitButton'
import FormError from '@/components/FormError'

export default function ResetPassword() {
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
      await apiPost('/auth/reset-password', {
        email: sessionStorage.getItem('pendingOtpEmail') || '',
        code: sessionStorage.getItem('otpCode') || '',
        password: data.password,
      })
      sessionStorage.removeItem('pendingOtpEmail')
      sessionStorage.removeItem('otpCode')
      sessionStorage.removeItem('otpFlow')
      navigate('/login')
    } catch (err) {
      setApiError(err.message || 'Could not reset password')
    }
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Choose a strong password for your account"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-amber hover:text-amber/80">
            Log in
          </Link>
        </>
      }
    >
      <TextField
        id="password"
        label="New password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.password}
        registration={register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Must be at least 8 characters' },
        })}
      />

      <TextField
        id="confirmPassword"
        label="Confirm new password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmPassword}
        registration={register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value, formValues) =>
            value === formValues.password || 'Passwords do not match',
        })}
      />

      <FormError message={apiError} />

      <SubmitButton loading={isSubmitting} loadingText="Resetting...">
        Reset password
      </SubmitButton>
    </AuthLayout>
  )
}
