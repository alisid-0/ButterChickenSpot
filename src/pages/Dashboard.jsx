import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenSquare, Image, Trash2, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditItemModal from '../components/EditItemModal';
import { useMenu } from '../hooks/useMenu';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { 
    menuItems, 
    loading, 
    error, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem 
  } = useMenu();
  
  const [activeTab, setActiveTab] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(item.id);
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Error deleting item. Please try again.');
      }
    }
  };

  const handleSave = async (itemData) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, itemData);
      } else {
        await addMenuItem(itemData);
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Error saving item. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredItems = menuItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'classic') return !item.categories?.includes('remix');
    if (activeTab === 'remix') return item.categories?.includes('remix');
    if (activeTab === 'special') return item.categories?.includes('special');
    if (activeTab === 'beverage') return item.categories?.includes('beverage');
    return true;
  });

  if (loading) {
    return <div className="min-h-screen bg-[#FFF8CC] flex items-center justify-center">
      <div className="text-xl text-[#434725]">Loading dashboard...</div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#FFF8CC] flex items-center justify-center">
      <div className="text-xl text-[#434725]">Error loading dashboard: {error}</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8CC]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-[#434725]">Menu Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => handleEdit(null)}
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

        {/* Tab navigation */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'classic', label: 'Classic Menu' },
            { id: 'remix', label: 'Remix Menu' },
            { id: 'special', label: 'Specials' },
            { id: 'beverage', label: 'Beverages' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#F26722] text-[#FFF8CC]'
                  : 'bg-white text-[#434725] hover:bg-[#F26722]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-[#F26722] hover:text-white transition-colors"
                  >
                    <PenSquare className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#434725] mb-2">{item.name}</h3>
                <p className="text-[#434725]/70 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#F26722]">${item.price}</span>
                  <div className="flex gap-2">
                    {item.categories?.map(category => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-[#434725]/10 rounded-full text-sm text-[#434725]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
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