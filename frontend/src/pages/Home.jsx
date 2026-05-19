import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="space-y-8 pb-12">
      <div className="rounded-[2rem] border border-slate-700 bg-[#07101f]/90 p-10 shadow-glow">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-neon">Secure SOC Platform</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              AI-Powered SQL Injection Detection & Prevention
            </h1>
            <p className="max-w-2xl text-slate-300">
              Scan SQL queries, detect suspicious payloads, and monitor threat metrics with a modern cybersecurity dashboard built for beginners and professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="rounded-2xl bg-neon px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Get Started
              </Link>
              <Link to="/features" className="rounded-2xl border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-neon hover:text-neon">
                Explore Features
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2rem] border border-glow bg-[#04101d] p-8 shadow-glow"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Live scanner preview</p>
            <pre className="mt-6 overflow-x-auto rounded-3xl bg-slate-950/80 p-6 text-sm leading-6 text-slate-200">
{`SELECT * FROM users
WHERE email = 'admin@example.com'
AND password = 'password'; --
OR 1=1
`}
            </pre>
          </motion.div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Real-Time Detection', value: 'Regex + AI', description: 'Scan and flag suspicious SQL payloads instantly.' },
          { title: 'Attack History', value: 'Stored Securely', description: 'Review every scan and response from your account.' },
          { title: 'Admin Monitoring', value: 'Log Control', description: 'Manage attacks, block IPs, and track metrics.' },
        ].map((item) => (
          <div key={item.title} className="card-panel rounded-3xl p-6">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-5xl font-bold text-neon">{item.value}</p>
            <p className="mt-4 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
