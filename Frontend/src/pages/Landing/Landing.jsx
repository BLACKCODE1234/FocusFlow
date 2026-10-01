import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import Marquee from './Marquee.jsx'
import Signals from './Signals.jsx'
import Features from './Features.jsx'
import AiShowcase from './AiShowcase.jsx'
import Audience from './Audience.jsx'
import Cta from './Cta.jsx'
import Footer from './Footer.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas font-grotesk text-ink">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Signals />
        <Features />
        <AiShowcase />
        <Audience />
      </main>
      <Cta />
      <Footer />
    </div>
  )
}
