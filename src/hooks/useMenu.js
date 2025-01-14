import { useState, useEffect } from 'react';
import { menuApi } from '../services/api';

export function useMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const items = await menuApi.getAllMenuItems();
      setMenuItems(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const addMenuItem = async (item) => {
    try {
      const newItem = await menuApi.addMenuItem(item);
      setMenuItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMenuItem = async (id, updates) => {
    try {
      const updatedItem = await menuApi.updateMenuItem(id, updates);
      setMenuItems(prev => 
        prev.map(item => item.id === id ? { ...item, ...updatedItem } : item)
      );
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await menuApi.deleteMenuItem(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenu: fetchMenuItems
  };
} 