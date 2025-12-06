import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSave } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const PricingManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [pricing, setPricing] = useState({
    vps: {
      starter: { monthly: 5.99, quarterly: 15.99, annually: 59.99 },
      professional: { monthly: 14.99, quarterly: 39.99, annually: 149.99 },
      enterprise: { monthly: 29.99, quarterly: 79.99, annually: 299.99 },
    },
    cloud: {
      basic: { monthly: 19.99, quarterly: 54.99, annually: 199.99 },
      standard: { monthly: 39.99, quarterly: 109.99, annually: 399.99 },
      premium: { monthly: 79.99, quarterly: 219.99, annually: 799.99 },
    },
    dedicated: {
      e3: { monthly: 99.99, quarterly: 279.99, annually: 999.99 },
      e5: { monthly: 179.99, quarterly: 499.99, annually: 1799.99 },
      dual_e5: { monthly: 299.99, quarterly: 849.99, annually: 2999.99 },
    },
  });

  const [saved, setSaved] = useState(false);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handlePriceChange = (category, plan, period, value) => {
    setPricing({
      ...pricing,
      [category]: {
        ...pricing[category],
        [plan]: {
          ...pricing[category][plan],
          [period]: parseFloat(value) || 0,
        },
      },
    });
  };

  const handleSave = () => {
    // In real app, send to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const PricingSection = ({ title, category, plans }) => (
    <div className="glass-dark p-8 rounded-xl border border-dark-800 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-800">
              <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Plan</th>
              <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Monthly</th>
              <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Quarterly</th>
              <th className="text-left py-3 px-4 text-dark-400 font-semibold text-sm">Annually</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(plans).map(([planKey, planData]) => (
              <tr key={planKey} className="border-b border-dark-800/50">
                <td className="py-4 px-4 text-white capitalize">
                  {planKey.replace('_', ' ')}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="text-dark-400 mr-2">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={planData.monthly}
                      onChange={(e) => handlePriceChange(category, planKey, 'monthly', e.target.value)}
                      className="w-24 bg-dark-800 border border-dark-700 rounded px-3 py-2 text-white"
                    />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="text-dark-400 mr-2">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={planData.quarterly}
                      onChange={(e) => handlePriceChange(category, planKey, 'quarterly', e.target.value)}
                      className="w-24 bg-dark-800 border border-dark-700 rounded px-3 py-2 text-white"
                    />
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="text-dark-400 mr-2">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={planData.annually}
                      onChange={(e) => handlePriceChange(category, planKey, 'annually', e.target.value)}
                      className="w-24 bg-dark-800 border border-dark-700 rounded px-3 py-2 text-white"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">
              Pricing <span className="gradient-text">Management</span>
            </h1>
            <p className="text-dark-400">Update pricing for all hosting plans</p>
          </div>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
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
            <p className="text-green-400 font-semibold">✓ Pricing updated successfully!</p>
          </motion.div>
        )}

        <PricingSection title="VPS Servers" category="vps" plans={pricing.vps} />
        <PricingSection title="Cloud Servers" category="cloud" plans={pricing.cloud} />
        <PricingSection title="Dedicated Servers" category="dedicated" plans={pricing.dedicated} />
      </div>
    </div>
  );
};

export default PricingManagement;
