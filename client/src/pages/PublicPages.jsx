// Placeholder pages - efficient batch creation
import React from 'react';

export const Domains = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom">
      <h1 className="mb-4"><span className="gradient-text">Domain</span> Services</h1>
      <p className="text-dark-400 mb-8">Register or transfer your domain</p>
      <div className="glass p-8 rounded-xl">
        <p className="text-center text-dark-300">Domain registration coming soon...</p>
      </div>
    </div>
  </div>
);

export const SSL = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom">
      <h1 className="mb-4">SSL <span className="gradient-text">Certificates</span></h1>
      <p className="text-dark-400 mb-8">Secure your website with SSL</p>
      <div className="glass p-8 rounded-xl">
        <p className="text-center text-dark-300">SSL certificates coming soon...</p>
      </div>
    </div>
  </div>
);

export const Emails = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom">
      <h1 className="mb-4">Professional <span className="gradient-text">Emails</span></h1>
      <p className="text-dark-400 mb-8">Business email solutions</p>
      <div className="glass p-8 rounded-xl">
        <p className="text-center text-dark-300">Email services coming soon...</p>
      </div>
    </div>
  </div>
);

export const Backup = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom">
      <h1 className="mb-4">Website <span className="gradient-text">Backup</span></h1>
      <p className="text-dark-400 mb-8">Automated backup solutions</p>
      <div className="glass p-8 rounded-xl">
        <p className="text-center text-dark-300">Backup services coming soon...</p>
      </div>
    </div>
  </div>
);

export const About = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="mb-4">About <span className="gradient-text">Magnetic Clouds</span></h1>
        <p className="text-dark-400 max-w-2xl mx-auto">
          Premium hosting solutions powered by cutting-edge technology and exceptional customer support
        </p>
      </div>

      <div className="space-y-12">
        {/* Company Story */}
        <div className="glass-dark p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-dark-300 mb-4">
            Founded in Bangladesh, Magnetic Clouds has grown to become a trusted name in web hosting services. 
            We provide enterprise-grade infrastructure to businesses worldwide, combining local expertise with 
            global standards.
          </p>
          <p className="text-dark-300">
            Our mission is to make premium hosting accessible to everyone, from startups to large enterprises, 
            with transparent pricing and world-class support available 24/7.
          </p>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'NVMe SSD storage and optimized infrastructure for maximum performance' },
              { icon: '🔒', title: 'Secure & Reliable', desc: '99.9% uptime guarantee with enterprise-grade security' },
              { icon: '💬', title: '24/7 Support', desc: 'Expert support team available round the clock to help you' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden fees. What you see is what you pay' },
              { icon: '🌍', title: 'Global Network', desc: '6 data centers worldwide for optimal performance' },
              { icon: '📈', title: 'Scalable Solutions', desc: 'Grow your infrastructure as your business grows' },
            ].map((feature, i) => (
              <div key={i} className="glass-dark p-6 rounded-xl text-center card-hover">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10,000+', label: 'Active Clients' },
            { value: '99.9%', label: 'Uptime' },
            { value: '6', label: 'Data Centers' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="glass-dark p-6 rounded-xl text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const Support = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom">
      <h1 className="mb-4"><span className="gradient-text">Support</span> Center</h1>
      <p className="text-dark-400 mb-8">24/7 technical support</p>
      <div className="glass p-8 rounded-xl">
        <p className="text-center text-dark-300">Support center coming soon...</p>
      </div>
    </div>
  </div>
);

export const Terms = () => (
  <div className="min-h-screen section-padding">
    <div className="container-custom">
      <h1 className="mb-4">Terms of <span className="gradient-text">Service</span></h1>
      <p className="text-dark-400 mb-8">Legal information</p>
      <div className="glass p-8 rounded-xl">
        <p className="text-dark-300">Terms of service content goes here...</p>
      </div>
    </div>
  </div>
);
