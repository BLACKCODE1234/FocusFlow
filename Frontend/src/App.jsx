import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Landing = lazy(() => import('./pages/Landing/Landing.jsx'))
const Register = lazy(() => import('./pages/Auth/Register.jsx'))
const Login = lazy(() => import('./pages/Auth/Login.jsx'))
const VerifyOtp = lazy(() => import('./pages/Auth/VerifyOtp.jsx'))

function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-fuchsia-500" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Suspense>
  )
}