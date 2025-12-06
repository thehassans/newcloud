import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSearch, HiEye, HiCheckCircle, HiClock } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const OrderManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', email: 'john@example.com', product: 'VPS Professional', amount: 14.99, status: 'completed', date: '2025-12-05' },
    { id: 2, customer: 'Jane Smith', email: 'jane@example.com', product: 'Cloud Standard', amount: 39.99, status: 'pending', date: '2025-12-05' },
    { id: 3, customer: 'Bob Johnson', email: 'bob@example.com', product: 'Dedicated E5', amount: 179.99, status: 'completed', date: '2025-12-04' },
    { id: 4, customer: 'Alice Williams', email: 'alice@example.com', product: 'SSL Wildcard', amount: 49.99, status: 'processing', date: '2025-12-04' },
    { id: 5, customer: 'Charlie Brown', email: 'charlie@example.com', product: 'VPS Starter', amount: 5.99, status: 'completed', date: '2025-12-03' },
  ]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">
            Order <span className="gradient-text">Management</span>
          </h1>
          <p className="text-dark-400">View and manage all customer orders</p>
        </div>

        {/* Filters */}
        <div className="glass-dark p-6 rounded-xl border border-dark-800 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-12"
              />
              <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="glass-dark rounded-xl border border-dark-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Order ID</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Customer</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Product</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Amount</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Date</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-dark-800/50 hover:bg-dark-800/30"
                  >
                    <td className="py-4 px-6 text-white font-semibold">#{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="text-white">{order.customer}</div>
                      <div className="text-dark-400 text-sm">{order.email}</div>
                    </td>
                    <td className="py-4 px-6 text-dark-300">{order.product}</td>
                    <td className="py-4 px-6 text-white font-semibold">${order.amount}</td>
                    <td className="py-4 px-6 text-dark-300">{order.date}</td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)} bg-transparent border-0`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-primary-400">
                        <HiEye className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-white">{orders.length}</div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-400">
              {orders.filter(o => o.status === 'completed').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">
              {orders.filter(o => o.status === 'pending').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-white">
              ${orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
