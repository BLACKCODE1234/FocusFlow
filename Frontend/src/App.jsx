import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Landing = lazy(() => import('./pages/Landing/Landing.jsx'))

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
      </Routes>
    </Suspense>
  )
}