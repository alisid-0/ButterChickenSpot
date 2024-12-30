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
    if (activeTab === 'main') return item.categories?.includes('main');
    if (activeTab === 'remix') return item.categories?.includes('remix');
    if (activeTab === 'special') return item.categories?.includes('special');
    if (activeTab === 'beverage') return item.categories?.includes('beverage');
    if (activeTab === 'side') return item.categories?.includes('side');
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
    <div className="min-h-screen bg-[#FFF8CC] relative z-0">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#434725]">Menu Dashboard</h1>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              onClick={() => handleEdit(null)}
              className="bg-[#F26722] text-[#FFF8CC] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add New Item
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#434725] text-[#FFF8CC] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-[#434725]/80 transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Logout
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 mb-8">
          <div className="flex gap-2 sm:gap-4 min-w-max">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'main', label: 'Main Menu' },
              { id: 'remix', label: 'Remix Menu' },
              { id: 'special', label: 'Specials' },
              { id: 'beverage', label: 'Beverages' },
              { id: 'side', label: 'Sides' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-colors text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#F26722] text-[#FFF8CC]'
                    : 'bg-white text-[#434725] hover:bg-[#F26722]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-[#F26722] hover:text-white transition-colors"
                  >
                    <PenSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#434725] mb-2">{item.name}</h3>
                <p className="text-sm sm:text-base text-[#434725]/70 mb-4">{item.description}</p>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-[#F26722]">${item.price}</span>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {item.categories?.map(category => (
                      <span
                        key={category}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#434725]/10 rounded-full text-xs sm:text-sm text-[#434725]"
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