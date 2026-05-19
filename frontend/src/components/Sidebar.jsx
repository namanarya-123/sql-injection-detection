import { Link } from 'react-router-dom';
import { getUserRole } from '../services/auth';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Features', path: '/features' },
  { label: 'Scanner', path: '/scanner' },
  { label: 'Contact', path: '/contact' },
];

const adminItems = [
  { label: 'Logs', path: '/attack-logs' },
  { label: 'Analytics', path: '/analytics' },
];

export default function Sidebar({ open, setOpen }) {
  const role = getUserRole();
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-[#08111e] p-6 shadow-2xl shadow-black/20 transition-transform duration-300 lg:relative lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:w-80`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-neon">SOC Dashboard</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Threat Monitor</h2>
        </div>
        <button className="lg:hidden text-slate-300" onClick={() => setOpen(false)}>✕</button>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className="block rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-200 transition hover:border-neon hover:text-neon"
          >
            {item.label}
          </Link>
        ))}
        {role === 'admin' && adminItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className="block rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-200 transition hover:border-neon hover:text-neon"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10 rounded-3xl border border-slate-700 bg-[#091622] p-5 text-sm text-slate-300">
        <p className="text-neon">Secure mode active</p>
        <p className="mt-2 text-slate-400">Scan and monitor SQL traffic with AI-enabled detection.</p>
      </div>
    </aside>
  );
}
