import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const ProductManagement = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState([
    { id: 1, name: 'VPS Starter', type: 'vps', price: 5.99, active: true },
    { id: 2, name: 'VPS Professional', type: 'vps', price: 14.99, active: true },
    { id: 3, name: 'Cloud Basic', type: 'cloud', price: 19.99, active: true },
    { id: 4, name: 'Dedicated E3', type: 'dedicated', price: 99.99, active: true },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">
              Product <span className="gradient-text">Management</span>
            </h1>
            <p className="text-dark-400">Manage all hosting products and services</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <HiPlus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="glass-dark rounded-xl border border-dark-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">ID</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Name</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Type</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Price</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-6 text-dark-400 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-dark-800/50 hover:bg-dark-800/30"
                  >
                    <td className="py-4 px-6 text-white">#{product.id}</td>
                    <td className="py-4 px-6 text-white font-semibold">{product.name}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-400 uppercase">
                        {product.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-white">${product.price}/mo</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-primary-400"
                        >
                          <HiPencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-red-400"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingProduct) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-dark p-8 rounded-2xl max-w-md w-full border border-dark-800"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Product Name</label>
                  <input
                    type="text"
                    defaultValue={editingProduct?.name}
                    className="w-full"
                    placeholder="e.g., VPS Starter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Type</label>
                  <select defaultValue={editingProduct?.type} className="w-full">
                    <option value="vps">VPS</option>
                    <option value="cloud">Cloud</option>
                    <option value="dedicated">Dedicated</option>
                    <option value="domain">Domain</option>
                    <option value="ssl">SSL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Price (USD/month)</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.price}
                    className="w-full"
                    placeholder="9.99"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    defaultChecked={editingProduct?.active ?? true}
                    className="w-4 h-4"
                  />
                  <label htmlFor="active" className="text-dark-300 text-sm">Active</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProduct(null);
                    }}
                    className="flex-1 px-4 py-3 border-2 border-dark-700 text-white rounded-lg hover:bg-dark-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
