import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { productsAPI } from '../../lib/api';
import { useCartStore } from '../../store/useStore';

const DedicatedServers = () => {
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
        const { data } = await productsAPI.getAll({ type: 'dedicated' });
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch dedicated products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sample Dedicated plans
  const samplePlans = [
    {
      id: 'dedicated-e3',
      name: 'E3-1230',
      cpu_cores: 4,
      ram_gb: 16,
      storage_gb: 1000,
      bandwidth_tb: 10,
      price_monthly: 99.99,
      price_quarterly: 284.99,
      price_semi_annually: 539.99,
      price_annually: 999.99,
      features: ['Intel Xeon E3-1230', '16 GB DDR4 RAM', '1 TB NVMe SSD', '10 TB Bandwidth', 'Full Root Access', 'IPMI Access', 'Free SSL', '24/7 Monitoring'],
    },
    {
      id: 'dedicated-e5',
      name: 'E5-2670',
      cpu_cores: 8,
      ram_gb: 32,
      storage_gb: 2000,
      bandwidth_tb: 20,
      price_monthly: 179.99,
      price_quarterly: 512.99,
      price_semi_annually: 971.99,
      price_annually: 1799.99,
      features: ['Intel Xeon E5-2670', '32 GB DDR4 RAM', '2 TB NVMe SSD', '20 TB Bandwidth', 'Full Root Access', 'IPMI Access', 'Free SSL', 'Dedicated Support', 'Hardware RAID'],
      popular: true,
    },
    {
      id: 'dedicated-dual',
      name: 'Dual E5-2690',
      cpu_cores: 16,
      ram_gb: 64,
      storage_gb: 4000,
      bandwidth_tb: 50,
      price_monthly: 299.99,
      price_quarterly: 854.99,
      price_semi_annually: 1619.99,
      price_annually: 2999.99,
      features: ['Dual Intel Xeon E5-2690', '64 GB DDR4 RAM', '4 TB NVMe SSD', '50 TB Bandwidth', 'Full Root Access', 'IPMI Access', 'Free SSL', 'Priority Support', 'Hardware RAID', 'Custom Configuration'],
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
            <span className="gradient-text">Dedicated</span> Servers
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Enterprise-grade bare metal servers with maximum performance,
            full control, and dedicated resources.
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
            Why Choose <span className="gradient-text">Dedicated Servers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚀', title: 'Maximum Performance', desc: 'Bare metal servers with no virtualization overhead' },
              { icon: '🔒', title: 'Complete Control', desc: 'Full root access and complete server control' },
              { icon: '🛡️', title: 'Enhanced Security', desc: 'Isolated environment with dedicated resources' },
              { icon: '⚙️', title: 'Custom Configuration', desc: 'Customize hardware to meet your exact needs' },
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

export default DedicatedServers;
