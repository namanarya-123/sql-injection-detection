import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import QueryScanner from './pages/QueryScanner';
import AttackLogs from './pages/AttackLogs';
import Analytics from './pages/Analytics';
import Contact from './pages/Contact';
import { getToken, getUserRole } from './services/auth';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const isAuthenticated = () => Boolean(getToken());
  const isAdmin = () => getUserRole() === 'admin';

  return (
    <>
      <div className="min-h-screen bg-night text-slate-100">
        <Navbar onToggle={() => setSidebarOpen((prev) => !prev)} theme={theme} setTheme={setTheme} />
        <div className="flex flex-col lg:flex-row">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className="flex-1 px-4 py-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/user-dashboard" element={isAuthenticated() ? <UserDashboard /> : <Navigate to="/login" />} />
                  <Route path="/admin-dashboard" element={isAuthenticated() && isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />} />
                  <Route path="/scanner" element={isAuthenticated() ? <QueryScanner /> : <Navigate to="/login" />} />
                  <Route path="/attack-logs" element={isAuthenticated() && isAdmin() ? <AttackLogs /> : <Navigate to="/login" />} />
                  <Route path="/analytics" element={isAuthenticated() && isAdmin() ? <Analytics /> : <Navigate to="/login" />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
