import { useEffect, useState } from 'react';
import api from '../services/api';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await api.get('/admin/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <section className="space-y-8 pb-12">
      <h2 className="text-3xl font-semibold text-white">Admin Monitoring</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCard title="Total Logs" value={analytics?.totalLogs || 0} description="All attack events captured in the system." icon="📊" />
          <DashboardCard title="Blocked IPs" value={analytics?.blockedIPs || 0} description="Suspicious IP addresses currently blocked." icon="⛔" />
          <DashboardCard title="Critical Events" value={analytics?.criticalCount || 0} description="High severity events requiring attention." icon="🚨" />
        </div>
      )}
      <div className="card-panel rounded-[2rem] p-6">
        <h3 className="text-2xl font-semibold text-white">Admin Controls</h3>
        <p className="mt-3 text-slate-400">Use the Attack Logs page to inspect events or the API to block IP addresses.</p>
      </div>
    </section>
  );
}
