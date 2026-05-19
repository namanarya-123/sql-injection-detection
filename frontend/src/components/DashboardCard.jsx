import { motion } from 'framer-motion';

export default function DashboardCard({ title, value, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card-panel rounded-3xl border border-slate-700 p-6 shadow-glow"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/80 text-neon">{icon}</div>
      </div>
      <p className="mt-4 text-slate-400">{description}</p>
    </motion.div>
  );
}
