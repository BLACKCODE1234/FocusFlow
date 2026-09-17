import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Product',
    links: ['Features', 'AI Assistant', 'Pricing', 'Changelog'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Documentation', 'Productivity Guides', 'Help Center'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Press'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'Cookie Settings'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 text-lg font-black text-white">
                F
              </span>
              <span className="text-lg font-bold text-white">
                FocusFlow <span className="text-violet-400 font-extrabold">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              An intelligent productivity operating system that thinks, plans,
              adapts and coaches you toward completing your goals, instead of
              just reminding you about deadlines.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FocusFlow AI. Built for students and
            professionals.
          </p>
          <p className="text-xs text-slate-500">Made with care.</p>
        </div>
      </div>
    </footer>
  )
}