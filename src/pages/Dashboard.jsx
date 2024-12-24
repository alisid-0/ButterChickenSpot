import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenSquare, Image, Trash2, Plus, LogOut } from 'lucide-react';
import { menuItems, remixMenu } from '../data/menu';
import { specialOfTheWeek } from '../data/specials';
import EditItemModal from '../components/EditItemModal';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('classic');
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (updatedItem) => {
    // In a real app, this would update the database
    console.log('Saving item:', updatedItem);
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (item) => {
    // In a real app, this would delete from the database
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting item:', item);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const tabs = [
    { id: 'classic', label: 'Classic Menu' },
    { id: 'remix', label: 'Remix Menu' },
    { id: 'special', label: 'Weekly Special' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8CC] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-[#434725]">Menu Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddNew}
              className="bg-[#F26722] text-[#FFF8CC] px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Item
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#434725] text-[#FFF8CC] px-6 py-3 rounded-xl font-bold hover:bg-[#434725]/80 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#434725] text-[#FFF8CC]'
                  : 'bg-white text-[#434725] hover:bg-[#434725]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'classic' ? menuItems : activeTab === 'remix' ? remixMenu : [specialOfTheWeek]).map(item => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#FFF8CC] transition-colors"
                  >
                    <PenSquare className="w-6 h-6 text-[#434725]" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#FFF8CC] transition-colors"
                  >
                    <Trash2 className="w-6 h-6 text-[#EF4423]" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#434725]">{item.name}</h3>
                  <span className="text-lg font-black text-[#F26722]">${item.price}</span>
                </div>
                <p className="text-[#434725]/70 text-sm line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {showModal && (
          <EditItemModal
            item={editingItem}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
} 