import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { saveAuth } from '../services/auth';
import Toast from '../components/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      saveAuth(response.data);
      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-700 bg-[#07101f]/90 p-10 shadow-glow">
      <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>
      <p className="mt-3 text-slate-400">Log in to scan SQL queries and view threat analytics.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-200">
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-neon"
          />
        </label>
        <label className="block text-sm text-slate-200">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-neon"
          />
        </label>
        {error && <Toast message={error} type="error" />}
        <button
          type="submit"
          className="w-full rounded-3xl bg-neon px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-400">
        New to the dashboard?{' '}
        <Link to="/signup" className="text-neon underline">
          Create an account.
        </Link>
      </p>
    </div>
  );
}
