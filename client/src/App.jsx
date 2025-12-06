import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/useStore';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/Home';
import VPSServers from './pages/servers/VPSServers';
import CloudServers from './pages/servers/CloudServers';
import DedicatedServers from'./pages/servers/DedicatedServers';
import DataCenters from './pages/DataCenters';
import Checkout from './pages/Checkout';
import Domains from './pages/Domains';
import Contact from './pages/Contact';
import SSL from './pages/SSL';
import Emails from './pages/Emails';
import { Backup, About, Support, Terms } from './pages/PublicPages';

// Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// User Dashboard & Admin
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import PricingManagement from './pages/admin/PricingManagement';
import Settings from './pages/admin/Settings';
import Analytics from './pages/admin/Analytics';
import DataCenterManagement from './pages/admin/DataCenterManagement';
import CurrencyManagement from './pages/admin/CurrencyManagement';
import UserServices from './pages/user/UserServices';
import UserBilling from './pages/user/UserBilling';
import UserDomainsPage from './pages/user/UserDomainsPage';
import SupportTickets from './pages/user/SupportTickets';
import UserProfile from './pages/user/UserProfile';
import { 
  ContentManagement,
  ThemeSettings
} from './pages/DashboardPages';

import './index.css';

function App() {
  const { gradientMode } = useThemeStore();

  React.useEffect(() => {
    document.body.classList.toggle('theme-simple', !gradientMode);
  }, [gradientMode]);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/servers/vps" element={<VPSServers />} />
            <Route path="/servers/cloud" element={<CloudServers />} />
            <Route path="/servers/dedicated" element={<DedicatedServers />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/ssl" element={<SSL />} />
            <Route path="/emails" element={<Emails />} />
            <Route path="/backup" element={<Backup />} />
            <Route path="/datacenters" element={<DataCenters />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Checkout */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/* User Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/services" element={<UserServices />} />
            <Route path="/dashboard/billing" element={<UserBilling />} />
            <Route path="/dashboard/domains" element={<UserDomainsPage />} />
            <Route path="/dashboard/profile" element={<UserProfile />} />
            <Route path="/dashboard/support" element={<SupportTickets />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/pricing" element={<PricingManagement />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/datacenters" element={<DataCenterManagement />} />
          <Route path="/admin/currencies" element={<CurrencyManagement />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/theme" element={<ThemeSettings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
