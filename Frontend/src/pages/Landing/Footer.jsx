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
    <footer className="border-t border-white/10 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-lg font-black text-white">
                F
              </span>
              <span className="text-lg font-bold text-white">
                FocusFlow<span className="gradient-text font-extrabold"> AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              An intelligent productivity operating system that thinks, plans,
              adapts and coaches you toward completing your goals — instead of
              just reminding you about deadlines.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
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
            © {new Date().getFullYear()} FocusFlow AI. Built for students &
            professionals.
          </p>
          <div className="flex items-center gap-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.6a4.1 4.1 0 001.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 01-1.8 0A4.1 4.1 0 007.8 17a8.2 8.2 0 01-5.1 1.8c-.3 0-.7 0-1-.1a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
              </svg>
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.4 13.5a5 5 0 01-3.5 2.2v1h-1.8v-1a5.6 5.6 0 01-4.3-2.2l1.4-1a4 4 0 003.3 1.5c1 0 1.8-.4 1.8-1.1 0-.6-.4-.9-1.8-1.2-2.6-.6-3.8-1.5-3.8-3.1 0-1.7 1.3-2.8 3.4-3.2v-1h1.8v1a4.7 4.7 0 013.7 1.9l-1.4 1a3.3 3.3 0 00-2.8-1.2c-.9 0-1.5.4-1.5 1s.6.8 1.9 1.1c2.6.5 3.8 1.5 3.8 3.1z" />
              </svg>
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}