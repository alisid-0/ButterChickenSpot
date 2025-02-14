import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenSquare, Image, Trash2, Plus, LogOut, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditItemModal from '../components/EditItemModal';
import EditNewsletterModal from '../components/EditNewsletterModal';
import { useMenu } from '../hooks/useMenu';
import { useAuth } from '../context/AuthContext';
import { newsletterApi } from '../services/api';

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
  const [activeSection, setActiveSection] = useState('menu');
  const [newsletterPosts, setNewsletterPosts] = useState([]);
  const [newsletterLoading, setNewsletterLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const posts = await newsletterApi.getAllPosts();
        setNewsletterPosts(posts);
      } catch (error) {
        console.error('Error fetching newsletter posts:', error);
      } finally {
        setNewsletterLoading(false);
      }
    };

    if (activeSection === 'newsletter') {
      fetchNewsletter();
    }
  }, [activeSection]);

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

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowNewsletterModal(true);
  };

  const handleDeletePost = async (post) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await newsletterApi.deletePost(post.id);
        setNewsletterPosts(posts => posts.filter(p => p.id !== post.id));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const handleSavePost = async (postData) => {
    try {
      if (editingPost) {
        const updated = await newsletterApi.updatePost(editingPost.id, postData);
        setNewsletterPosts(posts => posts.map(p => p.id === editingPost.id ? updated : p));
      } else {
        const newPost = await newsletterApi.addPost(postData);
        setNewsletterPosts(posts => [...posts, newPost]);
      }
      setShowNewsletterModal(false);
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post. Please try again.');
    }
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
      <div className="px-4 py-12">
        <div className="flex flex-col gap-6 mb-8 max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-black text-[#434725]">
              {activeSection === 'menu' ? 'Menu Dashboard' : 'Newsletter Dashboard'}
            </h1>
            <button
              onClick={handleLogout}
              className="bg-[#434725] text-[#FFF8CC] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-[#434725]/80 transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Logout
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveSection('menu')}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                activeSection === 'menu'
                  ? 'bg-[#F26722] text-[#FFF8CC]'
                  : 'bg-white text-[#434725] hover:bg-[#F26722]/10'
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveSection('newsletter')}
              className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                activeSection === 'newsletter'
                  ? 'bg-[#F26722] text-[#FFF8CC]'
                  : 'bg-white text-[#434725] hover:bg-[#F26722]/10'
              }`}
            >
              Newsletter
            </button>
          </div>

          {activeSection === 'menu' ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 sm:gap-4 pb-2">
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
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-colors text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
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
                <button
                  onClick={() => handleEdit(null)}
                  className="bg-[#F26722] text-[#FFF8CC] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors flex items-center gap-2 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add New Item
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEditingPost(null);
                  setShowNewsletterModal(true);
                }}
                className="bg-[#F26722] text-[#FFF8CC] px-6 py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Post
              </button>
            </div>
          )}
        </div>

        <div className="max-w-[1280px] mx-auto">
          {activeSection === 'menu' ? (
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
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {newsletterPosts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#434725] mb-2">{post.title}</h3>
                        <p className="text-sm text-[#434725]/60">
                          By {post.author} • {new Date(post.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-[#F26722] hover:text-white transition-colors"
                        >
                          <PenSquare className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post)}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#434725]/80 mb-4">{post.content}</p>
                    {post.image && (
                      <div className="relative aspect-square w-full max-w-[300px] mx-auto overflow-hidden rounded-xl">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <EditItemModal
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {showNewsletterModal && (
        <EditNewsletterModal
          post={editingPost}
          onClose={() => setShowNewsletterModal(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
} 