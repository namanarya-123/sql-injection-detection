import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const colors = ['#00ffd5', '#39ff14', '#f8c040', '#ff5d5d'];

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/admin/analytics');
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <section className="space-y-8 pb-12">
      <div className="card-panel rounded-[2rem] p-8">
        <h2 className="text-3xl font-semibold text-white">Analytics</h2>
        <p className="mt-3 text-slate-400">View system metrics and attack trends in charts.</p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card-panel rounded-[2rem] p-6">
            <h3 className="text-xl font-semibold text-white">Severity Distribution</h3>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.severityBreakdown} innerRadius={55} outerRadius={90} dataKey="value" label>
                    {data.severityBreakdown.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-panel rounded-[2rem] p-6">
            <h3 className="text-xl font-semibold text-white">Monthly Attack Trend</h3>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyScans}>
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00ffd5" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
