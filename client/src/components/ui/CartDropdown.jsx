import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingCart, HiX, HiTrash } from 'react-icons/hi';
import { useCartStore, useCurrencyStore } from '../../store/useStore';

const CartDropdown = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const { selectedCurrency } = useCurrencyStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-800">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <HiShoppingCart className="w-6 h-6 mr-2" />
                  Shopping Cart
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg glass-dark hover:bg-dark-700 flex items-center justify-center transition-colors"
                >
                  <HiX className="w-6 h-6 text-dark-400" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <HiShoppingCart className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                  <p className="text-dark-400 mb-4">Your cart is empty</p>
                  <Link
                    to="/servers/vps"
                    onClick={onClose}
                    className="btn-primary inline-block"
                  >
                    Browse Services
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.billingCycle}`}
                      className="glass-dark p-4 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-dark-400">
                            Billing: {item.billingCycle.replace('_', ' ')}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.billingCycle)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.billingCycle, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-white"
                          >
                            −
                          </button>
                          <span className="text-white w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.billingCycle, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-white"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-primary-400 font-bold">
                            ${((item.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-dark-800 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-dark-300">Subtotal:</span>
                  <span className="text-white font-bold">${(total || 0).toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-primary w-full block text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
