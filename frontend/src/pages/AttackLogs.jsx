import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { badgeClass, formatDate } from '../utils/helpers';

export default function AttackLogs() {
  const [logs, setLogs] = useState([]);
  const [severity, setSeverity] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/admin/logs');
        setLogs(response.data.logs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = severity === 'All' ? logs : logs.filter((log) => log.severity === severity);

  return (
    <section className="space-y-8 pb-12">
      <div className="card-panel rounded-[2rem] p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Attack Logs</h2>
            <p className="mt-3 text-slate-400">Filter and inspect suspicious queries from recent scans.</p>
          </div>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-neon">
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-700">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-200">
                <tr>
                  <th className="px-4 py-4">Query</th>
                  <th className="px-4 py-4">Severity</th>
                  <th className="px-4 py-4">Confidence</th>
                  <th className="px-4 py-4">IP Address</th>
                  <th className="px-4 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#07101f]/80">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-slate-400">
                      No attack logs available for this severity level.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log._id}>
                      <td className="px-4 py-4 max-w-xs truncate">{log.query}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-4 py-4">{log.confidence}</td>
                      <td className="px-4 py-4">{log.ipAddress}</td>
                      <td className="px-4 py-4">{formatDate(log.createdAt)}</td>
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
