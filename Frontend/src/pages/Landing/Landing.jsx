import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import Marquee from './Marquee.jsx'
import Features from './Features.jsx'
import AiShowcase from './AiShowcase.jsx'
import Audience from './Audience.jsx'
import Cta from './Cta.jsx'
import Footer from './Footer.jsx'

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <AiShowcase />
        <Audience />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}