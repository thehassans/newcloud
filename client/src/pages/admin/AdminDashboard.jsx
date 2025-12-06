import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUsers, HiShoppingCart, HiCurrencyDollar, HiServer } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState({
    totalUsers: 156,
    totalOrders: 89,
    revenue: 15420,
    activeServices: 234,
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: 'John Doe', product: 'VPS Professional', amount: 14.99, status: 'completed' },
    { id: 2, customer: 'Jane Smith', product: 'Cloud Standard', amount: 39.99, status: 'pending' },
    { id: 3, customer: 'Bob Johnson', product: 'Dedicated E5', amount: 179.99, status: 'completed' },
  ]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const statCards = [
    {
      icon: <HiUsers className="w-8 h-8" />,
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <HiShoppingCart className="w-8 h-8" />,
      title: 'Total Orders',
      value: stats.totalOrders,
      change: '+8%',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: <HiCurrencyDollar className="w-8 h-8" />,
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+23%',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <HiServer className="w-8 h-8" />,
      title: 'Active Services',
      value: stats.activeServices,
      change: '+15%',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-dark-400">Welcome back, {user?.first_name || 'Admin'}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark p-6 rounded-xl border border-dark-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-dark-400 text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
            <button className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Order ID</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Customer</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Product</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Amount</th>
                  <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-dark-800/50 hover:bg-dark-800/30">
                    <td className="py-4 px-4 text-white">#{order.id}</td>
                    <td className="py-4 px-4 text-white">{order.customer}</td>
                    <td className="py-4 px-4 text-dark-300">{order.product}</td>
                    <td className="py-4 px-4 text-white font-semibold">${order.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <a href="/admin/products" className="glass-dark p-6 rounded-xl border border-dark-800 hover:border-primary-500/50 transition-all card-hover">
            <h3 className="text-white font-semibold mb-2">Manage Products</h3>
            <p className="text-dark-400 text-sm">Add, edit, or remove hosting plans</p>
          </a>
          <a href="/admin/users" className="glass-dark p-6 rounded-xl border border-dark-800 hover:border-primary-500/50 transition-all card-hover">
            <h3 className="text-white font-semibold mb-2">Manage Users</h3>
            <p className="text-dark-400 text-sm">View and manage user accounts</p>
          </a>
          <a href="/admin/pricing" className="glass-dark p-6 rounded-xl border border-dark-800 hover:border-primary-500/50 transition-all card-hover">
            <h3 className="text-white font-semibold mb-2">Update Pricing</h3>
            <p className="text-dark-400 text-sm">Adjust pricing for all services</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
