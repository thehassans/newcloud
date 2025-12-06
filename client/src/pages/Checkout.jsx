import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiShoppingCart, HiCreditCard, HiCheckCircle } from 'react-icons/hi';
import { useCartStore, useAuthStore } from '../store/useStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: 'Bangladesh',
    zipCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePlaceOrder = async () => {
    // In a real app, this would send order to backend
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/dashboard');
    }, 3000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen section-padding flex items-center justify-center">
        <div className="text-center">
          <HiShoppingCart className="w-24 h-24 text-dark-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-dark-400 mb-6">Add some services to get started</p>
          <button onClick={() => navigate('/servers/vps')} className="btn-primary">
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen section-padding flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-4">Order Placed Successfully!</h2>
          <p className="text-dark-400 mb-6">
            Thank you for your order. You'll receive a confirmation email shortly.
          </p>
          <p className="text-dark-500 text-sm">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <h1 className="mb-8">
          <span className="gradient-text">Checkout</span>
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-400' : 'text-dark-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white' : 'bg-dark-800'
              }`}>
                1
              </div>
              <span className="ml-2 hidden sm:inline">Billing</span>
            </div>
            <div className="w-16 h-1 bg-dark-800"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-400' : 'text-dark-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white' : 'bg-dark-800'
              }`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
            <div className="w-16 h-1 bg-dark-800"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-primary-400' : 'text-dark-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white' : 'bg-dark-800'
              }`}>
                3
              </div>
              <span className="ml-2 hidden sm:inline">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-dark p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Billing Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">First Name</label>
                      <input
                        type="text"
                        value={billingInfo.firstName}
                        onChange={(e) => setBillingInfo({...billingInfo, firstName: e.target.value})}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={billingInfo.lastName}
                        onChange={(e) => setBillingInfo({...billingInfo, lastName: e.target.value})}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={billingInfo.email}
                      onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={billingInfo.phone}
                      onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Address</label>
                    <input
                      type="text"
                      value={billingInfo.address}
                      onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">City</label>
                      <input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={billingInfo.zipCode}
                        onChange={(e) => setBillingInfo({...billingInfo, zipCode: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="btn-primary w-full">
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-dark p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500/10 transition-all">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn-primary flex-1">
                      Continue to Review
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-dark p-8 rounded-2xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Review Order</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Billing Information</h3>
                    <p className="text-dark-400">{billingInfo.firstName} {billingInfo.lastName}</p>
                    <p className="text-dark-400">{billingInfo.email}</p>
                    <p className="text-dark-400">{billingInfo.address}, {billingInfo.city}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Payment Method</h3>
                    <p className="text-dark-400">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="px-6 py-3 border-2 border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500/10 transition-all">
                      Back
                    </button>
                    <button onClick={handlePlaceOrder} className="btn-primary flex-1">
                      Place Order
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-dark p-6 rounded-2xl sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.billingCycle}`} className="flex justify-between">
                    <div>
                      <p className="text-white font-medium">{item.product.name}</p>
                      <p className="text-sm text-dark-400">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <p className="text-primary-400 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-dark-800 pt-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-dark-300">Subtotal:</span>
                  <span className="text-white font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg mb-2">
                  <span className="text-dark-300">Tax (0%):</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t border-dark-800 pt-4">
                  <span className="gradient-text">Total:</span>
                  <span className="gradient-text">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
