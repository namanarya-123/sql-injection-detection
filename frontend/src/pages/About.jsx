export default function About() {
  return (
    <section className="space-y-8 pb-12">
      <div className="rounded-[2rem] border border-slate-700 bg-[#07101f]/90 p-10 shadow-glow">
        <h2 className="text-3xl font-semibold text-white">About the System</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          The AI-Powered SQL Injection Detection & Prevention System is designed as an introductory cybersecurity project with a professional SOC-style interface. It combines pattern-based detection and a simplified confidence model to highlight potential threats.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'Simplified Detection', text: 'Built for beginners, using clear regex rules and easily extendable AI scoring.' },
          { title: 'Admin Controls', text: 'Gain experience with role-based access, logs, and security monitoring.' },
          { title: 'Modern UI', text: 'A polished dashboard layout with responsive design and animated elements.' },
        ].map((card) => (
          <div key={card.title} className="card-panel rounded-3xl p-6">
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-slate-400">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
