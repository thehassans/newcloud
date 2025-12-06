import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCreditCard, HiDownload, HiEye } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const UserBilling = () => {
  const { isAuthenticated } = useAuthStore();
  const [invoices, setInvoices] = useState([
    { id: 1001, date: '2025-12-01', description: 'VPS Professional - Dec 2025', amount: 14.99, status: 'paid' },
    { id: 1002, date: '2025-11-01', description: 'Cloud Standard - Nov 2025', amount: 39.99, status: 'paid' },
    { id: 1003, date: '2025-10-01', description: 'VPS Professional - Oct 2025', amount: 14.99, status: 'paid' },
    { id: 1004, date: '2025-01-01', description: 'SSL Wildcard - 2025', amount: 49.99, status: 'pending' },
  ]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status) => {
    return status === 'paid' 
      ? 'bg-green-500/20 text-green-400' 
      : 'bg-yellow-500/20 text-yellow-400';
  };

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <h1 className="mb-8">
          Billing & <span className="gradient-text">Invoices</span>
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Total Invoices</div>
            <div className="text-3xl font-bold text-white">{invoices.length}</div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Total Paid</div>
            <div className="text-3xl font-bold text-green-400">${totalPaid.toFixed(2)}</div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-400">${totalPending.toFixed(2)}</div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="glass-dark rounded-xl border border-dark-800 overflow-hidden">
          <div className="p-6 border-b border-dark-800">
            <h2 className="text-xl font-bold text-white">Invoice History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Invoice #</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Date</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Description</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Amount</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-dark-800/50 hover:bg-dark-800/30"
                  >
                    <td className="py-4 px-6 text-white font-semibold">#{invoice.id}</td>
                    <td className="py-4 px-6 text-dark-300">{invoice.date}</td>
                    <td className="py-4 px-6 text-white">{invoice.description}</td>
                    <td className="py-4 px-6 text-white font-semibold">${invoice.amount.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-primary-400" title="View">
                          <HiEye className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-green-400" title="Download">
                          <HiDownload className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-8 glass-dark p-6 rounded-xl border border-dark-800">
          <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
          <div className="flex items-center space-x-4">
            <HiCreditCard className="w-8 h-8 text-primary-400" />
            <div>
              <div className="text-white font-semibold">Visa ending in 4242</div>
              <div className="text-dark-400 text-sm">Expires 12/2026</div>
            </div>
            <button className="ml-auto btn-primary text-sm px-4 py-2">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBilling;
