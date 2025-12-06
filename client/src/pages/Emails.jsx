import React from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiCheck } from 'react-icons/hi';

const Emails = () => {
  const emailPlans = [
    {
      id: 'email-starter',
      name: 'Email Starter',
      price: 1.99,
      mailboxes: 5,
      storage: '5 GB',
      features: [
        '5 Email Accounts',
        '5 GB Total Storage',
        'Webmail Access',
        'POP3/IMAP Support',
        'SMTP Support',
        'Anti-Spam & Anti-Virus',
        'Mobile Access',
      ],
    },
    {
      id: 'email-business',
      name: 'Email Business',
      price: 4.99,
      mailboxes: 25,
      storage: '25 GB',
      popular: true,
      features: [
        '25 Email Accounts',
        '25 GB Total Storage',
        'Webmail Access',
        'POP3/IMAP Support',
        'SMTP Support',
        'Advanced Anti-Spam',
        'Anti-Virus Protection',
        'Mobile Sync',
        'Email Forwarding',
        'Auto-Responders',
      ],
    },
    {
      id: 'email-enterprise',
      name: 'Email Enterprise',
      price: 9.99,
      mailboxes: 'Unlimited',
      storage: '100 GB',
      features: [
        'Unlimited Email Accounts',
        '100 GB Total Storage',
        'Webmail Access',
        'POP3/IMAP Support',
        'SMTP Support',
        'Premium Anti-Spam',
        'Anti-Virus Protection',
        'Mobile Sync',
        'Email Forwarding',
        'Auto-Responders',
        'Email Archiving',
        'Priority Support',
      ],
    },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">
            Professional <span className="gradient-text">Email</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Professional email hosting with your own domain. Secure, reliable, and feature-rich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {emailPlans.map((plan, index) => (
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
                  <span className="text-dark-400 ml-2">/month</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <HiCheck className="w-3 h-3 text-primary-400" />
                    </div>
                    <span className="text-dark-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary w-full">Get Started</button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🔒', title: 'Secure & Private', desc: 'Enterprise-grade security with encrypted connections' },
            { icon: '📱', title: 'Mobile Ready', desc: 'Access your email on any device, anywhere' },
            { icon: '🛡️', title: 'Spam Protection', desc: 'Advanced filters keep your inbox clean' },
            { icon: '💼', title: 'Professional', desc: 'Build trust with your own domain email' },
          ].map((feature, i) => (
            <div key={i} className="glass-dark p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
              <p className="text-dark-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emails;
