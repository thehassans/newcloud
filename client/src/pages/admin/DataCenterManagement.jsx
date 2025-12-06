import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiServer, HiPencil, HiTrash, HiPlus } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const DataCenterManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [datacenters, setDatacenters] = useState([
    { id: 1, name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, status: 'active' },
    { id: 2, name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, status: 'active' },
    { id: 3, name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, status: 'active' },
    { id: 4, name: 'Frankfurt', country: 'Germany', lat: 50.1109, lng: 8.6821, status: 'active' },
    {id: 5, name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, status: 'active' },
    { id: 6, name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, status: 'active' },
  ]);

  const [showModal, setShowModal] = useState(false);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">
              Data Center <span className="gradient-text">Management</span>
            </h1>
            <p className="text-dark-400">Manage global data center locations</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center space-x-2">
            <HiPlus className="w-5 h-5" />
            <span>Add Location</span>
          </button>
        </div>

        <div className="glass-dark rounded-xl border border-dark-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Location</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Country</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Coordinates</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Status</th>
                <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {datacenters.map((dc) => (
                <tr key={dc.id} className="border-t border-dark-800/50 hover:bg-dark-800/30">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <HiServer className="w-6 h-6 text-primary-400" />
                      <span className="text-white font-semibold">{dc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-dark-300">{dc.country}</td>
                  <td className="py-4 px-6 text-dark-300">
                    {dc.lat.toFixed(4)}, {dc.lng.toFixed(4)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      {dc.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-primary-400">
                        <HiPencil className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-red-400">
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataCenterManagement;
