import { motion } from 'framer-motion';
import { getUserName, getToken } from '../services/auth';

export default function Navbar({ onToggle, theme, setTheme }) {
  const userName = getToken() ? getUserName() : 'Guest';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#040b17]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={onToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 text-slate-100 transition hover:border-glow hover:text-neon"
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </motion.button>
        <div className="space-y-1">
          <p className="text-sm text-slate-400">AI-Powered SQL Injection Defender</p>
          <h1 className="text-lg font-semibold text-white">Cybersecurity Command Center</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-neon hover:text-neon"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-slate-100">
            {userName}
          </div>
        </div>
      </div>
    </header>
  );
}
