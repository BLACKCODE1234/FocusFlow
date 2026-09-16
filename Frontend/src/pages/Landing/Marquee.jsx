const words = [
  'Smart Scheduling',
  'Adaptive Learning',
  'AI Coaching',
  'Risk Prediction',
  'Burnout Detection',
  'Focus Analytics',
  'Smart Notifications',
  'Streak Achievements',
  'Auto Re-planning',
  'Personalized Insights',
]

export default function Marquee() {
  const row = [...words, ...words]

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-indigo-600 via-fuchsia-600 via-40% to-amber-500 py-4 shadow-lg shadow-fuchsia-900/40">
      <div className="flex w-max gap-10 animate-marquee">
        {row.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-extrabold tracking-widest text-white whitespace-nowrap uppercase"
          >
            {word}
            <span className="animate-pulse-soft text-amber-300">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}