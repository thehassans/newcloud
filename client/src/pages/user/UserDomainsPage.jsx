import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiGlobe, HiRefresh, HiCog } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const UserDomains = () => {
  const { isAuthenticated } = useAuthStore();
  const [domains, setDomains] = useState([
    { 
      id: 1, 
      name: 'example.com', 
      status: 'active',
      registrationDate: '2024-01-15',
      expiryDate: '2026-01-15',
      autoRenew: true
    },
    { 
      id: 2, 
      name: 'mysite.net', 
      status: 'active',
      registrationDate: '2024-03-20',
      expiryDate: '2025-03-20',
      autoRenew: false
    },
    { 
      id: 3, 
      name: 'testdomain.org', 
      status: 'expiring',
      registrationDate: '2023-12-01',
      expiryDate: '2025-12-30',
      autoRenew: true
    },
  ]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'expiring': return 'bg-yellow-500/20 text-yellow-400';
      case 'expired': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1>
            My <span className="gradient-text">Domains</span>
          </h1>
          <a href="/domains" className="btn-primary">
            Register New Domain
          </a>
        </div>

        {domains.length === 0 ? (
          <div className="glass-dark p-12 rounded-xl text-center">
            <HiGlobe className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400 mb-4">You don't have any domains yet</p>
            <a href="/domains" className="btn-primary inline-block">
              Register Domain
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark p-6 rounded-xl border border-dark-800"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <HiGlobe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{domain.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-dark-400 mb-2">
                        <span>Registered: {domain.registrationDate}</span>
                        <span>Expires: {domain.expiryDate}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(domain.status)}`}>
                          {domain.status}
                        </span>
                        {domain.autoRenew && (
                          <span className="flex items-center text-xs text-green-400">
                            <HiRefresh className="w-4 h-4 mr-1" />
                            Auto-renew enabled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-2">
                      <HiCog className="w-4 h-4" />
                      <span>Manage</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Total Domains</div>
            <div className="text-3xl font-bold text-white">{domains.length}</div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Active</div>
            <div className="text-3xl font-bold text-green-400">
              {domains.filter(d => d.status === 'active').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Expiring Soon</div>
            <div className="text-3xl font-bold text-yellow-400">
              {domains.filter(d => d.status === 'expiring').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDomains;
