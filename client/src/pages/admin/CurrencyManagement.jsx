import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCurrencyDollar, HiPencil, HiSave } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const CurrencyManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [currencies, setCurrencies] = useState([
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.00, default: true, active: true },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', rate: 110.50, default: false, active: true },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, default: false, active: true },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, default: false, active: true },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.25, default: false, active: true },
  ]);

  const [saved, setSaved] = useState(false);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleRateChange = (code, newRate) => {
    setCurrencies(currencies.map(c => 
      c.code === code ? { ...c, rate: parseFloat(newRate) || 0 } : c
    ));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">
              Currency <span className="gradient-text">Management</span>
            </h1>
            <p className="text-dark-400">Manage exchange rates and active currencies</p>
          </div>
          <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
            <HiSave className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6"
          >
            <p className="text-green-400 font-semibold">✓ Currency rates updated successfully!</p>
          </motion.div>
        )}

        <div className="glass-dark rounded-xl border border-dark-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Currency</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Code</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Symbol</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Exchange Rate (to USD)</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Default</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency.code} className="border-t border-dark-800/50 hover:bg-dark-800/30">
                  <td className="py-4 px-6 text-white font-semibold">{currency.name}</td>
                  <td className="py-4 px-6 text-dark-300">{currency.code}</td>
                  <td className="py-4 px-6 text-white text-lg">{currency.symbol}</td>
                  <td className="py-4 px-6">
                    <input
                      type="number"
                      step="0.01"
                      value={currency.rate}
                      onChange={(e) => handleRateChange(currency.code, e.target.value)}
                      className="w-32 bg-dark-800 border border-dark-700 rounded px-3 py-2 text-white"
                      disabled={currency.default}
                    />
                  </td>
                  <td className="py-4 px-6">
                    {currency.default && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-400">
                        Default
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      currency.active 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {currency.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 glass-dark p-6 rounded-xl border border-dark-800">
          <p className="text-dark-400 text-sm">
            <strong className="text-white">Note:</strong> Exchange rates are relative to USD (1.00). 
            To convert from USD to another currency, multiply by the rate. Example: $10 USD × 110.50 = ৳1,105 BDT
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyManagement;
