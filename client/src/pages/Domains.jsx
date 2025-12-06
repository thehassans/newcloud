import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiCheck, HiX } from 'react-icons/hi';

const Domains = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const tlds = [
    { extension: '.com', price: 12.99, popular: true },
    { extension: '.net', price: 14.99 },
    { extension: '.org', price: 13.99 },
    { extension: '.io', price: 39.99 },
    { extension: '.co', price: 29.99 },
    { extension: '.app', price: 19.99 },
    { extension: '.dev', price: 15.99 },
    { extension: '.tech', price: 24.99 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    
    // Simulate API search
    setTimeout(() => {
      const results = tlds.map(tld => ({
        domain: searchQuery.toLowerCase().replace(/\s+/g, ''),
        ...tld,
        available: Math.random() > 0.5,
      }));
      setSearchResults(results);
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">
            Find Your Perfect <span className="gradient-text">Domain</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Search for available domain names and secure your online presence today
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your domain..."
                  className="w-full pl-12"
                  required
                />
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
              </div>
              <button
                type="submit"
                disabled={searching}
                className="btn-primary px-8"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Search Results for "{searchQuery}"
            </h2>
            {searchResults.map((result, index) => (
              <motion.div
                key={result.extension}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-dark p-6 rounded-xl flex items-center justify-between ${
                  result.available ? 'border border-green-500/30' : 'border border-dark-800'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    result.available 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {result.available ? (
                      <HiCheck className="w-6 h-6" />
                    ) : (
                      <HiX className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {result.domain}{result.extension}
                    </h3>
                    <p className={`text-sm ${
                      result.available ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.available ? 'Available' : 'Taken'}
                    </p>
                  </div>
                </div>

                {result.available && (
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold gradient-text">
                        ${result.price}
                      </p>
                      <p className="text-sm text-dark-400">/year</p>
                    </div>
                    <button className="btn-primary">
                      Add to Cart
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Popular TLDs */}
        {!searchResults && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Popular Domain Extensions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tlds.map((tld, index) => (
                <motion.div
                  key={tld.extension}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-dark p-6 rounded-xl text-center card-hover ${
                    tld.popular ? 'border-2 border-primary-500' : 'border border-dark-800'
                  }`}
                >
                  {tld.popular && (
                    <div className="mb-2">
                      <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-3xl font-bold text-white mb-2">{tld.extension}</h3>
                  <p className="text-2xl font-bold gradient-text mb-4">${tld.price}</p>
                  <p className="text-sm text-dark-400 mb-4">/year</p>
                  <button className="w-full px-4 py-2 border-2 border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500/10 transition-all">
                    Register
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🔒', title: 'Free Privacy Protection', desc: 'Keep your personal information private' },
            { icon: '🔄', title: 'Easy Domain Transfer', desc: 'Transfer your domains to us hassle-free' },
            { icon: '⚡', title: 'Instant Activation', desc: 'Get your domain up and running immediately' },
          ].map((feature, i) => (
            <div key={i} className="text-center">
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

export default Domains;
