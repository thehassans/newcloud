import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUser, HiMail, HiPhone, HiLocationMarker, HiSave } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const UserProfile = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [profile, setProfile] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '+880 1XXX-XXXXXX',
    address: '123 Main Street',
    city: 'Dhaka',
    country: 'Bangladesh',
    zipCode: '1000',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [saved, setSaved] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = (e) => {
    e.preventDefault();
    // In real  app, send to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <h1 className="mb-8">
          Profile <span className="gradient-text">Settings</span>
        </h1>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6"
          >
            <p className="text-green-400 font-semibold">✓ Profile updated successfully!</p>
          </motion.div>
        )}

        {/* Profile Information */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Zip Code</label>
                <input
                  type="text"
                  value={profile.zipCode}
                  onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-primary flex items-center space-x-2">
                <HiSave className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800">
          <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="pt-4">
              <button type="submit" className="btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
