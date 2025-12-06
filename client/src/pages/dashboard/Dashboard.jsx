import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiServer, HiCreditCard, HiDocumentText, HiUser } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';
import { usersAPI } from '../../lib/api';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [stats, setStats] = useState({
    services: 0,
    invoices: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [servicesRes, invoicesRes, ordersRes] = await Promise.all([
          usersAPI.getServices(),
          usersAPI.getInvoices(),
          usersAPI.getOrders(),
        ]);

        setStats({
          services: servicesRes.data.services.length,
          invoices: invoicesRes.data.invoices.length,
          orders: ordersRes.data.orders.length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const quickLinks = [
    { icon: <HiServer className="w-8 h-8" />, title: 'Services', count: stats.services, link: '/dashboard/services' },
    { icon: <HiCreditCard className="w-8 h-8" />, title: 'Invoices', count: stats.invoices, link: '/dashboard/billing' },
    { icon: <HiDocumentText className="w-8 h-8" />, title: 'Orders', count: stats.orders, link: '/dashboard/billing' },
    { icon: <HiUser className="w-8 h-8" />, title: 'Profile', count: null, link: '/dashboard/profile' },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="mb-2">
            Welcome back, <span className="gradient-text">{user?.first_name || user?.email}</span>!
          </h1>
          <p className="text-dark-400">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark p-6 rounded-xl card-hover border border-dark-800 hover:border-primary-500/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                {item.count !== null && (
                  <span className="text-3xl font-bold gradient-text">{item.count}</span>
                )}
              </div>
              <h3 className="text-white font-semibold">{item.title}</h3>
            </motion.a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="spinner"></div>
            </div>
          ) : stats.services === 0 && stats.orders === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-400 mb-4">No activity yet</p>
              <a href="/servers/vps" className="btn-primary inline-block">
                Browse Services
              </a>
            </div>
          ) : (
            <div className="text-dark-400">
              <p>You have {stats.services} active service{stats.services !== 1 ? 's' : ''}</p>
              <p>You have {stats.invoices} invoice{stats.invoices !== 1 ? 's' : ''}</p>
              <p>You have {stats.orders} order{stats.orders !== 1 ? 's' : ''}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
