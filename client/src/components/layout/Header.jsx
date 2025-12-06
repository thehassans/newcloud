import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX, HiShoppingCart, HiUser, HiGlobeAlt, HiChevronDown } from 'react-icons/hi';
import { useAuthStore, useCartStore } from '../../store/useStore';
import CartDropdown from '../ui/CartDropdown';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Servers',
      subMenu: [
        { name: 'VPS Servers', href: '/servers/vps' },
        { name: 'Cloud Servers', href: '/servers/cloud' },
        { name: 'Dedicated Servers', href: '/servers/dedicated' },
      ],
    },
    { name: 'Domains', href: '/domains' },
    {
      name: 'Security & Tools',
      subMenu: [
        { name: 'SSL Certificates', href: '/ssl' },
        { name: 'Professional Emails', href: '/emails' },
        { name: 'Website Backup', href: '/backup' },
      ],
    },
    { name: 'Data Centers', href: '/datacenters' },
    { name: 'Support', href: '/support' },
  ];

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-dark-800">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">MC</span>
            </div>
            <span className="text-2xl font-display font-bold gradient-text hidden sm:inline">
              Magnetic Clouds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.subMenu ? (
                <div key={item.name} className="relative group">
                  <button className="text-dark-300 hover:text-white transition-colors py-2 flex items-center space-x-1">
                    <span>{item.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="width" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="glass rounded-lg p-2 shadow-xl">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-dark-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-dark-300 hover:text-primary-400 transition-colors"
            >
              <HiShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors">
                  <HiUser className="w-6 h-6" />
                  <span className="hidden md:inline">{user?.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass rounded-lg p-2 shadow-xl">
                    <Link to="/dashboard" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg">
                      Dashboard
                    </Link>
                    <Link to="/dashboard/services" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg">
                      My Services
                    </Link>
                    <Link to="/dashboard/billing" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg">
                      Billing
                    </Link>
                    <Link to="/dashboard/profile" className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 rounded-lg">
                      Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-accent-400 hover:text-accent-300 hover:bg-dark-800/50 rounded-lg">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-dark-800/50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm px-6 py-2">
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-dark-300 hover:text-white"
            >
              {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 glass rounded-lg p-4"
          >
            {navigation.map((item) => (
              <div key={item.name} className="py-2">
                {item.subMenu ? (
                  <>
                    <div className="font-semibold text-white mb-2">{item.name}</div>
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block pl-4 py-2 text-dark-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block text-dark-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Cart Dropdown */}
      <CartDropdown isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
