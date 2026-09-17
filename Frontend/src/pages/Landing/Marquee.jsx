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
    <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
      <div className="flex w-max gap-10 animate-marquee">
        {row.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-semibold tracking-widest text-slate-400 whitespace-nowrap uppercase"
          >
            {word}
            <span className="text-violet-400/50">/</span>
          </span>
        ))}
      </div>
    </section>
  )
}