import { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDate } from '../utils/helpers';

export default function UserDashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ scans: 0, attacks: 0, highSeverity: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/scan/history');
        const entries = response.data.history || [];
        setHistory(entries.slice(0, 5));
        const attacks = entries.filter((item) => item.result.malicious).length;
        const highSeverity = entries.filter((item) => item.result.severity === 'High' || item.result.severity === 'Critical').length;
        setStats({ scans: entries.length, attacks, highSeverity });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <section className="space-y-8 pb-12">
      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardCard title="Total Scans" value={stats.scans} description="Total SQL queries scanned by your account." icon="🛡️" />
        <DashboardCard title="Threats Detected" value={stats.attacks} description="Queries marked as malicious from your history." icon="⚠️" />
        <DashboardCard title="High Severity" value={stats.highSeverity} description="Critical and high-risk findings." icon="🔥" />
      </div>
      <div className="card-panel rounded-[2rem] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Recent Scan History</h2>
            <p className="mt-2 text-slate-400">Review your latest SQL injections and inspection results.</p>
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-700">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-200">
                <tr>
                  <th className="px-4 py-4">Query</th>
                  <th className="px-4 py-4">Result</th>
                  <th className="px-4 py-4">Severity</th>
                  <th className="px-4 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#07101f]/80">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-slate-400">
                      No scans found yet. Start scanning queries on the Scanner page.
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-4 max-w-xs truncate">{item.query}</td>
                      <td className="px-4 py-4">{item.result.malicious ? 'Malicious' : 'Safe'}</td>
                      <td className="px-4 py-4">{item.result.severity}</td>
                      <td className="px-4 py-4">{formatDate(item.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
