import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex min-h-screen items-center justify-center">
              <h1 className="text-4xl font-bold text-indigo-600">
                FocusFlow AI
              </h1>
            </main>
          }
        />
      </Routes>
    </div>
  )
}