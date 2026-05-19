export default function Contact() {
  return (
    <div className="rounded-[2rem] border border-slate-700 bg-[#07101f]/90 p-10 shadow-glow">
      <h2 className="text-3xl font-semibold text-white">Contact & Support</h2>
      <p className="mt-4 max-w-3xl text-slate-300">
        Need help extending this project or deploying your own security dashboard? Reach out on GitHub or use your own email service to connect with your team.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-white">Project Notes</h3>
          <p className="mt-3 text-slate-400">This starter template is built for college projects, demo portfolios, and hackathons. Customize rules, branding, and analytics as needed.</p>
        </div>
        <div className="rounded-3xl border border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-white">Deployment Tips</h3>
          <p className="mt-3 text-slate-400">Use Vercel for the frontend and Render for the backend. Connect your MongoDB Atlas URI and enable CORS for your frontend domain.</p>
        </div>
      </div>
    </div>
  );
}
