import { useState } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function QueryScanner() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await api.post('/scan/query', { query });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to scan query.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="card-panel rounded-[2rem] p-8">
        <h2 className="text-3xl font-semibold text-white">SQL Query Scanner</h2>
        <p className="mt-3 text-slate-400">Paste a SQL statement and scan it for injection patterns and suspicious behavior.</p>
        <form onSubmit={handleScan} className="mt-8 space-y-6">
          <textarea
            rows="8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            placeholder="SELECT * FROM users WHERE username = 'admin' OR 1=1; --"
            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none focus:border-neon"
          />
          <div className="flex flex-wrap gap-4">
            <button type="submit" className="rounded-3xl bg-neon px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70" disabled={loading}>
              {loading ? 'Scanning...' : 'Scan Query'}
            </button>
            <button type="button" onClick={() => setQuery('')} className="rounded-3xl border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-neon hover:text-neon">
              Clear
            </button>
          </div>
        </form>
      </div>
      {loading && <LoadingSpinner />}
      {error && <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">{error}</div>}
      {result && (
        <div className="card-panel rounded-[2rem] p-8">
          <h3 className="text-2xl font-semibold text-white">Scan Results</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-700 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Malicious</p>
              <p className={`mt-3 text-4xl font-semibold ${result.malicious ? 'text-red-400' : 'text-emerald-400'}`}>{result.malicious ? 'YES' : 'NO'}</p>
            </div>
            <div className="rounded-3xl border border-slate-700 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Severity</p>
              <p className="mt-3 text-4xl font-semibold text-neon">{result.severity}</p>
            </div>
            <div className="rounded-3xl border border-slate-700 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Confidence</p>
              <p className="mt-3 text-4xl font-semibold text-cyan-300">{result.confidence}</p>
            </div>
            <div className="rounded-3xl border border-slate-700 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Detected Patterns</p>
              <p className="mt-3 text-slate-200">{result.patterns?.join(', ') || 'None'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
