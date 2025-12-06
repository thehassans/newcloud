import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSearch, HiUserCircle, HiBan, HiCheckCircle } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const UserManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', services: 3 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', services: 5 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'suspended', services: 0 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'user', status: 'active', services: 2 },
  ]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleStatusToggle = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
        : u
    ));
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">
            User <span className="gradient-text">Management</span>
          </h1>
          <p className="text-dark-400">Manage all user accounts and permissions</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-12"
            />
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-dark rounded-xl border border-dark-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">User</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Email</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Role</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Services</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userItem, index) => (
                  <motion.tr
                    key={userItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-dark-800/50 hover:bg-dark-800/30"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <HiUserCircle className="w-10 h-10 text-dark-500" />
                        <div>
                          <div className="text-white font-semibold">{userItem.name}</div>
                          <div className="text-dark-400 text-sm">ID: #{userItem.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-dark-300">{userItem.email}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 uppercase">
                        {userItem.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-white">{userItem.services}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        userItem.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {userItem.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleStatusToggle(userItem.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          userItem.status === 'active'
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {userItem.status === 'active' ? (
                          <span className="flex items-center space-x-1">
                            <HiBan className="w-4 h-4" />
                            <span>Suspend</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1">
                            <HiCheckCircle className="w-4 h-4" />
                            <span>Activate</span>
                          </span>
                        )}
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
            <div className="text-dark-400 text-sm mb-1">Total Users</div>
            <div className="text-3xl font-bold text-white">{users.length}</div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Active</div>
            <div className="text-3xl font-bold text-green-400">
              {users.filter(u => u.status === 'active').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Suspended</div>
            <div className="text-3xl font-bold text-red-400">
              {users.filter(u => u.status === 'suspended').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-1">Total Services</div>
            <div className="text-3xl font-bold text-white">
              {users.reduce((acc, u) => acc + u.services, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
