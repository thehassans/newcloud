import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiChartBar, HiTrendingUp, HiUsers, HiShoppingCart } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const Analytics = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    revenue: {
      total: 45280,
      growth: 23.5,
      data: [
        { month: 'Jan', amount: 3200 },
        { month: 'Feb', amount: 3800 },
        { month: 'Mar', amount: 4200 },
        { month: 'Apr', amount: 3900 },
        { month: 'May', amount: 4500 },
        { month: 'Jun', amount: 5100 },
      ]
    },
    orders: {
      total: 234,
      growth: 18.2,
      data: [
        { status: 'Completed', count: 189, percentage: 81 },
        { status: 'Pending', count: 28, percentage: 12 },
        { status: 'Processing', count: 17, percentage: 7 },
      ]
    },
    users: {
      total: 856,
      growth: 12.8,
      active: 734,
      inactive: 122
    },
    topProducts: [
      { name: 'VPS Professional', sales: 89, revenue: 1335.11 },
      { name: 'Cloud Standard', sales: 67, revenue: 2679.33 },
      { name: 'Dedicated E5', sales: 34, revenue: 6119.66 },
    ]
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-7xl mx-auto">
        <h1 className="mb-8">
          Analytics & <span className="gradient-text">Reports</span>
        </h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: HiChartBar, label: 'Total Revenue', value: `$${stats.revenue.total.toLocaleString()}`, growth: stats.revenue.growth, color: 'from-green-500 to-teal-500' },
            { icon: HiShoppingCart, label: 'Total Orders', value: stats.orders.total, growth: stats.orders.growth, color: 'from-blue-500 to-cyan-500' },
            { icon: HiUsers, label: 'Total Users', value: stats.users.total, growth: stats.users.growth, color: 'from-purple-500 to-pink-500' },
            { icon: HiTrendingUp, label: 'Active Users', value: stats.users.active, growth: 8.5, color: 'from-orange-500 to-red-500' },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark p-6 rounded-xl border border-dark-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">+{metric.growth}%</span>
              </div>
              <div className="text-dark-400 text-sm mb-1">{metric.label}</div>
              <div className="text-3xl font-bold text-white">{metric.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="glass-dark p-8 rounded-xl border border-dark-800">
            <h2 className="text-xl font-bold text-white mb-6">Revenue Trend</h2>
            <div className="space-y-4">
              {stats.revenue.data.map((item, index) => (
                <div key={item.month}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark-400">{item.month}</span>
                    <span className="text-white font-semibold">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.amount / 5100) * 100}%` }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <div className="glass-dark p-8 rounded-xl border border-dark-800">
            <h2 className="text-xl font-bold text-white mb-6">Order Status</h2>
            <div className="space-y-4">
              {stats.orders.data.map((item, index) => (
                <div key={item.status}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark-400">{item.status}</span>
                    <span className="text-white font-semibold">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: index * 0.1 }}
                      className={`h-full ${
                        item.status === 'Completed' ? 'bg-green-500' :
                        item.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="glass-dark p-8 rounded-xl border border-dark-800 lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6">Top Selling Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-dark-800">
                  <tr>
                    <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Product</th>
                    <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Sales</th>
                    <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topProducts.map((product, index) => (
                    <tr key={product.name} className="border-b border-dark-800/50">
                      <td className="py-4 px-4 text-white">{product.name}</td>
                      <td className="py-4 px-4 text-dark-300">{product.sales}</td>
                      <td className="py-4 px-4 text-white font-semibold">${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
