import React from 'react';
import { motion } from 'framer-motion';
import { HiShieldCheck } from 'react-icons/hi';

const SSL = () => {
  const sslPlans = [
    {
      id: 'ssl-basic',
      name: 'Basic SSL',
      price: 9.99,
      features: [
        'Domain Validation',
        'Basic encryption',
        'Issued in minutes',
        'Padlock indicator',
        '99.9% browser compatibility',
        '$10,000 warranty',
      ],
    },
    {
      id: 'ssl-wildcard',
      name: 'Wildcard SSL',
      price: 49.99,
      popular: true,
      features: [
        'Secures unlimited subdomains',
        'Domain Validation',
        'Strong 256-bit encryption',
        'Issued in minutes',
        'Padlock indicator',
        '99.9% browser compatibility',
        '$100,000 warranty',
      ],
    },
    {
      id: 'ssl-ev',
      name: 'Extended Validation',
      price: 149.99,
      features: [
        'Green address bar',
        'Organization Validation',
        'Highest level of trust',
        'Strong 256-bit encryption',
        'Issued in 3-5 days',
        '99.9% browser compatibility',
        '$1,500,000 warranty',
      ],
    },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">
            SSL <span className="gradient-text">Certificates</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Secure your website with industry-standard SSL certificates.
            Protect your visitors' data and boost SEO rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {sslPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-dark rounded-2xl p-8 card-hover relative ${
                plan.popular ? 'border-2 border-primary-500' : 'border border-dark-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">${plan.price}</span>
                  <span className="text-dark-400 ml-2">/year</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <HiShieldCheck className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-dark-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary w-full">Get Started</button>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🔒', title: 'Data Encryption', desc: 'Protect sensitive information with industry-standard encryption' },
            { icon: '🚀', title: 'SEO Boost', desc: 'Google ranks HTTPS sites higher in search results' },
            { icon: '✅', title: 'Trust Indicator', desc: 'Show visitors your site is safe with padlock icon' },
            { icon: '⚡', title: 'Fast Issuance', desc: 'Get your certificate issued in minutes' },
          ].map((benefit, i) => (
            <div key={i} className="glass-dark p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
              <p className="text-dark-400 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SSL;
