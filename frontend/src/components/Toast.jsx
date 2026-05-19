export default function Toast({ message, type = 'info' }) {
  const typeClasses = {
    error: 'border-red-500/30 bg-red-500/10 text-red-200',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    info: 'border-slate-500/30 bg-slate-500/10 text-slate-100',
  };

  return (
    <div className={`rounded-3xl border px-5 py-4 shadow-glow ${typeClasses[type]}`}>
      <p>{message}</p>
    </div>
  );
}
