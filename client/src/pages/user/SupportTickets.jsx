import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiTicket, HiPlus, HiChatAlt } from 'react-icons/hi';
import { useAuthStore } from '../../store/useStore';

const SupportTickets = () => {
  const { isAuthenticated } = useAuthStore();
  const [tickets, setTickets] = useState([
    { 
      id: 1001, 
      subject: 'Server not responding', 
      status: 'open',
      priority: 'high',
      created: '2025-12-05',
      lastUpdate: '2025-12-05',
      replies: 2
    },
    { 
      id: 1002, 
      subject: 'How to setup SSL certificate?', 
      status: 'answered',
      priority: 'medium',
      created: '2025-12-03',
      lastUpdate: '2025-12-04',
      replies: 4
    },
    { 
      id: 1003, 
      subject: 'Billing question', 
      status: 'closed',
      priority: 'low',
      created: '2025-12-01',
      lastUpdate: '2025-12-02',
      replies: 3
    },
  ]);

  const [showNewTicket, setShowNewTicket] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-blue-500/20 text-blue-400';
      case 'answered': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1>
            Support <span className="gradient-text">Tickets</span>
          </h1>
          <button 
            onClick={() => setShowNewTicket(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <HiPlus className="w-5 h-5" />
            <span>New Ticket</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Open Tickets</div>
            <div className="text-3xl font-bold text-blue-400">
              {tickets.filter(t => t.status === 'open').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Answered</div>
            <div className="text-3xl font-bold text-green-400">
              {tickets.filter(t => t.status === 'answered').length}
            </div>
          </div>
          <div className="glass-dark p-6 rounded-xl border border-dark-800">
            <div className="text-dark-400 text-sm mb-2">Total Tickets</div>
            <div className="text-3xl font-bold text-white">{tickets.length}</div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark p-6 rounded-xl border border-dark-800 hover:border-primary-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <HiTicket className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{ticket.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority} priority
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-dark-400">
                      <span>Ticket #{ticket.id}</span>
                      <span>Created: {ticket.created}</span>
                      <span>Last update: {ticket.lastUpdate}</span>
                      <span className="flex items-center">
                        <HiChatAlt className="w-4 h-4 mr-1" />
                        {ticket.replies} replies
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary text-sm px-4 py-2">
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Ticket Modal */}
        {showNewTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-dark p-8 rounded-2xl max-w-2xl w-full border border-dark-800"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Create New Ticket</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Subject</label>
                  <input type="text" className="w-full" placeholder="Brief description of your issue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Priority</label>
                  <select className="w-full">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Message</label>
                  <textarea className="w-full" rows="6" placeholder="Describe your issue in detail..."></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewTicket(false)}
                    className="flex-1 px-4 py-3 border-2 border-dark-700 text-white rounded-lg hover:bg-dark-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Submit Ticket
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

export default SupportTickets;
