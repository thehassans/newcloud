import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { productsAPI } from '../../lib/api';
import { useCartStore } from '../../store/useStore';

const CloudServers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const [selectedCycle, setSelectedCycle] = useState('monthly');

  const billingCycles = [
    { value: 'monthly', label: 'Monthly', discount: 0 },
    { value: 'quarterly', label: 'Quarterly', discount: 5 },
    { value: 'semi_annually', label: 'Semi-Annually', discount: 10 },
    { value: 'annually', label: 'Annually', discount: 15 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productsAPI.getAll({ type: 'cloud' });
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch cloud products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sample Cloud plans
  const samplePlans = [
    {
      id: 'cloud-basic',
      name: 'Cloud Basic',
      cpu_cores: 2,
      ram_gb: 4,
      storage_gb: 80,
      bandwidth_tb: 3,
      price_monthly: 19.99,
      price_quarterly: 56.99,
      price_semi_annually: 107.99,
      price_annually: 199.99,
      features: ['2 vCPU Cores', '4 GB RAM', '80 GB SSD Storage', '3 TB Bandwidth', 'Auto-Scaling', 'Load Balancer', 'Free SSL', '24/7 Support'],
    },
    {
      id: 'cloud-standard',
      name: 'Cloud Standard',
      cpu_cores: 4,
      ram_gb: 8,
      storage_gb: 160,
      bandwidth_tb: 5,
      price_monthly: 39.99,
      price_quarterly: 113.99,
      price_semi_annually: 215.99,
      price_annually: 399.99,
      features: ['4 vCPU Cores', '8 GB RAM', '160 GB SSD Storage', '5 TB Bandwidth', 'Auto-Scaling', 'Load Balancer', 'Free SSL', 'Priority Support', 'Snapshots'],
      popular: true,
    },
    {
      id: 'cloud-premium',
      name: 'Cloud Premium',
      cpu_cores: 8,
      ram_gb: 16,
      storage_gb: 320,
      bandwidth_tb: 10,
      price_monthly: 79.99,
      price_quarterly: 227.99,
      price_semi_annually: 431.99,
      price_annually: 799.99,
      features: ['8 vCPU Cores', '16 GB RAM', '320 GB SSD Storage', '10 TB Bandwidth', 'Auto-Scaling', 'Advanced Load Balancer', 'Free SSL', 'Dedicated Support', 'Snapshots', 'CDN Integration'],
    },
  ];

  const displayPlans = products.length > 0 ? products : samplePlans;

  const getPrice = (plan) => {
    const priceKey = `price_${selectedCycle}`;
    return plan[priceKey] || plan.price_monthly;
  };

  const handleAddToCart = (plan) => {
    addItem(plan, selectedCycle);
    alert(`${plan.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen section-padding flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="mb-4">
            Cloud <span className="gradient-text">Servers</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Scalable cloud infrastructure with auto-scaling, load balancing,
            and enterprise-grade performance.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {billingCycles.map((cycle) => (
              <button
                key={cycle.value}
                onClick={() => setSelectedCycle(cycle.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCycle === cycle.value
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    : 'glass-dark text-dark-300 hover:text-white border border-dark-700'
                }`}
              >
                {cycle.label}
                {cycle.discount > 0 && (
                  <span className="ml-2 text-xs">Save {cycle.discount}%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayPlans.map((plan, index) => (
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
                  <span className="text-4xl font-bold gradient-text">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-dark-400 ml-2">/{selectedCycle === 'monthly' ? 'mo' : 'cycle'}</span>
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

              <button
                onClick={() => handleAddToCart(plan)}
                className="btn-primary w-full"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-center mb-12">
            Why Choose <span className="gradient-text">Cloud Hosting</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Auto-Scaling', desc: 'Automatically scale resources based on demand' },
              { icon: '🔄', title: 'Load Balancing', desc: 'Distribute traffic for optimal performance' },
              { icon: '📊', title: 'Real-time Monitoring', desc: 'Track performance metrics in real-time' },
              { icon: '💾', title: 'Automated Backups', desc: 'Daily snapshots with instant recovery' },
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
    </div>
  );
};

export default CloudServers;
