import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiServer, HiPlay, HiPause, HiRefresh } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const UserServices = () => {
  const { isAuthenticated } = useAuthStore();
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'VPS Professional', 
      type: 'VPS',
      status: 'active', 
      ipAddress: '192.168.1.100',
      nextBilling: '2025-01-05',
      price: 14.99
    },
    { 
      id: 2, 
      name: 'Cloud Standard', 
      type: 'Cloud',
      status: 'active', 
      ipAddress: '192.168.1.101',
      nextBilling: '2025-01-10',
      price: 39.99
    },
    { 
      id: 3, 
      name: 'SSL Wildcard', 
      type: 'SSL',
      status: 'pending', 
      domain: 'example.com',
      nextBilling: '2025-12-05',
      price: 49.99
    },
  ]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'suspended': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <h1 className="mb-8">
          My <span className="gradient-text">Services</span>
        </h1>

        {services.length === 0 ? (
          <div className="glass-dark p-12 rounded-xl text-center">
            <HiServer className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400 mb-4">You don't have any active services yet</p>
            <a href="/servers/vps" className="btn-primary inline-block">
              Browse Services
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark p-6 rounded-xl border border-dark-800"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                      <HiServer className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-dark-400">
                        <span>#{service.id} · {service.type}</span>
                        {service.ipAddress && <span>IP: {service.ipAddress}</span>}
                        {service.domain && <span>Domain: {service.domain}</span>}
                      </div>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                        <span className="text-dark-400 text-sm">
                          Next billing: {service.nextBilling}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-2xl font-bold gradient-text">
                      ${service.price}/mo
                    </div>
                    {service.type !== 'SSL' && (
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-green-400" title="Start">
                          <HiPlay className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-yellow-400" title="Stop">
                          <HiPause className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-blue-400" title="Restart">
                          <HiRefresh className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserServices;
