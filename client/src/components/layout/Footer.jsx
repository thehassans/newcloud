import React from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'VPS Servers', href: '/servers/vps' },
      { name: 'Cloud Servers', href: '/servers/cloud' },
      { name: 'Dedicated Servers', href: '/servers/dedicated' },
      { name: 'Domain Registration', href: '/domains' },
      { name: 'SSL Certificates', href: '/ssl' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Data Centers', href: '/datacenters' },
      { name: 'Support Center', href: '/support' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    support: [
      { name: '24/7 Technical Support', href: '/support' },
      { name: 'Knowledge Base', href: '/support' },
      { name: 'Contact Support', href: '/contact' },
      { name: 'Money Back Guarantee', href: '/about' },
      { name: 'Free SSL Certificates', href: '/ssl' },
    ],
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <span className="text-xl font-display font-bold gradient-text">
                Magnetic Clouds
              </span>
            </div>
            <p className="text-dark-400 mb-6">
              Premium hosting provider in Bangladesh. Reliable, fast, and secure hosting solutions for your business.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-primary-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>45-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free SSL Certificates</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24/7 Technical Support</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-dark-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-dark-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-dark-400">
                <HiLocationMarker className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3 text-dark-400">
                <HiMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:support@magneticclouds.com" className="hover:text-primary-400 transition-colors">
                  support@magneticclouds.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-dark-400">
                <HiPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+880123456789" className="hover:text-primary-400 transition-colors">
                  +880 123 456 789
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <FaFacebookF className="text-dark-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <FaTwitter className="text-dark-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <FaLinkedinIn className="text-dark-300" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <FaInstagram className="text-dark-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-500 text-sm">
            © {currentYear} Magnetic Clouds. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-dark-500 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
