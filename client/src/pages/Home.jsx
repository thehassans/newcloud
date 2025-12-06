import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiServer, HiGlobeAlt, HiShieldCheck, HiSparkles, HiClock, HiSupport } from 'react-icons/hi';

const Home = () => {
  const features = [
    {
      icon: <HiServer className="w-8 h-8" />,
      title: 'High Performance',
      description: 'Enterprise-grade hardware with NVMe SSD storage and latest generation processors',
    },
    {
      icon: <HiGlobeAlt className="w-8 h-8" />,
      title: 'Global Data Centers',
      description: 'Worldwide presence with data centers across Bangladesh, USA, Europe, and Asia',
    },
    {
      icon: <HiShieldCheck className="w-8 h-8" />,
      title: 'Free SSL & Security',
      description: 'Complimentary SSL certificates and advanced DDoS protection for all services',
    },
    {
      icon: <HiSparkles className="w-8 h-8" />,
      title: '99.9% Uptime',
      description: 'Industry-leading uptime guarantee backed by our SLA',
    },
    {
      icon: <HiClock className="w-8 h-8" />,
      title: '45-Day Money Back',
      description: 'Risk-free guarantee - full refund within first 45 days',
    },
    {
      icon: <HiSupport className="w-8 h-8" />,
      title: '24/7 Expert Support',
      description: 'Round-the-clock technical support from certified professionals',
    },
  ];

  const services = [
    {
      title: 'VPS Servers',
      description: 'Powerful virtual private servers with full root access and dedicated resources',
      image: '🖥️',
      link: '/servers/vps',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Cloud Servers',
      description: 'Scalable cloud infrastructure that grows with your business',
      image: '☁️',
      link: '/servers/cloud',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Dedicated Servers',
      description: 'Enterprise-grade bare metal servers for maximum performance',
      image: '⚡',
      link: '/servers/dedicated',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Domain Registration',
      description: 'Secure your perfect domain name with competitive pricing',
      image: '🌐',
      link: '/domains',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container-custom relative z-10 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="mb-6">
              <span className="gradient-text">Premium Hosting</span>
              <br />
              Solutions for Your Business
            </h1>
            <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
              Experience ultra-fast, reliable hosting with enterprise-grade infrastructure. 
              Based in Bangladesh, serving the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/servers/vps" className="btn-primary">
                Get Started
              </Link>
              <Link to="/datacenters" className="px-8 py-3 border-2 border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500/10 transition-all duration-300">
                View Data Centers
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-sm text-dark-400">Uptime SLA</div>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-sm text-dark-400">Support</div>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">6+</div>
                <div className="text-sm text-dark-400">Global DCs</div>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">45 Days</div>
                <div className="text-sm text-dark-400">Money Back</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our <span className="gradient-text">Services</span></h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Comprehensive hosting solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={service.link}>
                  <div className="glass-dark p-8 rounded-2xl card-hover h-full border border-dark-800 hover:border-primary-500/50">
                    <div className={`text-6xl mb-4 bg-gradient-to-br ${service.gradient} bg-clip-text`}>
                      {service.image}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-dark-400 mb-4">{service.description}</p>
                    <div className="text-primary-400 font-semibold flex items-center">
                      Learn More 
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose <span className="gradient-text">Magnetic Clouds</span></h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Industry-leading features and unmatched support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                  <p className="text-dark-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="glass-dark rounded-3xl p-12 text-center border border-dark-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10"></div>
            <div className="relative z-10">
              <h2 className="mb-4">Ready to Get Started?</h2>
              <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and experience the Magnetic Clouds difference
              </p>
              <Link to="/signup" className="btn-primary inline-block">
                Create Your Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
