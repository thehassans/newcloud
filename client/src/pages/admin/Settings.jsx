import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSave, HiColorSwatch, HiCurrencyDollar, HiGlobe } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const Settings = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [settings, setSettings] = useState({
    siteName: 'Magnetic Clouds',
    siteTagline: 'Premium Hosting Provider Bangladesh',
    defaultCurrency: 'USD',
    themeMode: 'gradient',
    maintenanceMode: false,
    enableRegistration: true,
    enableGuestCheckout: false,
  });

  const [saved, setSaved] = useState(false);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleSave = () => {
    // In real app, send to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">
              Platform <span className="gradient-text">Settings</span>
            </h1>
            <p className="text-dark-400">Configure system-wide settings</p>
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
            <p className="text-green-400 font-semibold">✓ Settings saved successfully!</p>
          </motion.div>
        )}

        {/* General Settings */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <HiGlobe className="w-6 h-6 mr-2" />
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Site Tagline</label>
              <input
                type="text"
                value={settings.siteTagline}
                onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Currency Settings */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <HiCurrencyDollar className="w-6 h-6 mr-2" />
            Currency Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Default Currency</label>
            <select
              value={settings.defaultCurrency}
              onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
              className="w-full"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="BDT">BDT - Bangladeshi Taka</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <HiColorSwatch className="w-6 h-6 mr-2" />
            Theme Settings
          </h2>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Theme Mode</label>
            <select
              value={settings.themeMode}
              onChange={(e) => setSettings({ ...settings, themeMode: e.target.value })}
              className="w-full"
            >
              <option value="gradient">Gradient (Premium)</option>
              <option value="simple">Simple</option>
            </select>
            <p className="text-dark-500 text-sm mt-2">
              Gradient theme enables premium glassmorphism effects throughout the site
            </p>
          </div>
        </div>

        {/* System Settings */}
        <div className="glass-dark p-8 rounded-xl border border-dark-800">
          <h2 className="text-xl font-bold text-white mb-6">System Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Maintenance Mode</div>
                <div className="text-dark-400 text-sm">Disable public access to the site</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Enable Registration</div>
                <div className="text-dark-400 text-sm">Allow new users to create accounts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableRegistration}
                  onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Guest Checkout</div>
                <div className="text-dark-400 text-sm">Allow checkout without account</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableGuestCheckout}
                  onChange={(e) => setSettings({ ...settings, enableGuestCheckout: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
