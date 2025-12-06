import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { productsAPI } from '../../lib/api';
import { useCartStore, useCurrencyStore } from '../../store/useStore';

const VPSServers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const { selectedCurrency } = useCurrencyStore();

  const billingCycles = [
    { value: 'monthly', label: 'Monthly', discount: 0 },
    { value: 'quarterly', label: 'Quarterly', discount: 5 },
    { value: 'semi_annually', label: 'Semi-Annually', discount: 10 },
    { value: 'annually', label: 'Annually', discount: 15 },
  ];

  const [selectedCycle, setSelectedCycle] = useState('monthly');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productsAPI.getAll({ type: 'vps' });
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch VPS products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sample VPS plans (fallback if no DB data)
  const samplePlans = [
    {
      id: 'vps-starter',
      name: 'VPS Starter',
      cpu_cores: 1,
      ram_gb: 1,
      storage_gb: 25,
      bandwidth_tb: 1,
      price_monthly: 5.99,
      price_quarterly: 16.99,
      price_semi_annually: 31.99,
      price_annually: 59.99,
      features: ['1 vCPU Core', '1 GB RAM', '25 GB NVMe SSD', '1 TB Bandwidth', 'Free SSL', '24/7 Support'],
    },
    {
      id: 'vps-professional',
      name: 'VPS Professional',
      cpu_cores: 2,
      ram_gb: 4,
      storage_gb: 80,
      bandwidth_tb: 3,
      price_monthly: 14.99,
      price_quarterly: 42.99,
      price_semi_annually: 79.99,
      price_annually: 149.99,
      features: ['2 vCPU Cores', '4 GB RAM', '80 GB NVMe SSD', '3 TB Bandwidth', 'Free SSL', 'Priority Support', 'DDoS Protection'],
      popular: true,
    },
    {
      id: 'vps-business',
      name: 'VPS Business',
      cpu_cores: 4,
      ram_gb: 8,
      storage_gb: 160,
      bandwidth_tb: 5,
      price_monthly: 29.99,
      price_quarterly: 84.99,
      price_semi_annually: 159.99,
      price_annually: 299.99,
      features: ['4 vCPU Cores', '8 GB RAM', '160 GB NVMe SSD', '5 TB Bandwidth', 'Free SSL', 'Dedicated Support', 'Advanced DDoS Protection', 'Free Backups'],
    },
  ];

  const displayPlans = products.length > 0 ? products : samplePlans;

  const getPrice = (plan) => {
    const priceKey = `price_${selectedCycle}`;
    return plan[priceKey] || plan.price_monthly;
  };

  const handleAddToCart = (plan) => {
    addItem(plan, selectedCycle);
    // Could show a toast notification here
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">
            VPS <span className="gradient-text">Servers</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Powerful virtual private servers with dedicated resources, full root access,
            and enterprise-grade performance.
          </p>

          {/* Billing Cycle Toggle */}
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

        {/* Pricing Cards */}
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
                {(plan.features || [
                  `${plan.cpu_cores} vCPU Core${plan.cpu_cores > 1 ? 's' : ''}`,
                  `${plan.ram_gb} GB RAM`,
                  `${plan.storage_gb} GB NVMe SSD`,
                  `${plan.bandwidth_tb} TB Bandwidth`,
                ]).map((feature, i) => (
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

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-center mb-12">
            Why Choose Our <span className="gradient-text">VPS Hosting</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'NVMe SSD Storage', desc: 'Lightning-fast NVMe drives for maximum performance' },
              { icon: '🔒', title: 'Full Root Access', desc: 'Complete control over your server environment' },
              { icon: '📈', title: 'Scalable Resources', desc: 'Upgrade anytime as your needs grow' },
              { icon: '🛡️', title: 'DDoS Protection', desc: 'Advanced security included at no extra cost' },
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

export default VPSServers;
