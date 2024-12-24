import axios from 'axios';

const API_URL = 'https://butterchickenspot-backend.onrender.com/api';

export const menuApi = {
  async getAllMenuItems() {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching menu items: ${error.message}`);
    }
  },

  async addMenuItem(item) {
    try {
      const response = await axios.post(`${API_URL}/menu`, item);
      return response.data;
    } catch (error) {
      throw new Error(`Error adding menu item: ${error.message}`);
    }
  },

  async updateMenuItem(id, updates) {
    try {
      const response = await axios.put(`${API_URL}/menu/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating menu item: ${error.message}`);
    }
  },

  async deleteMenuItem(id) {
    try {
      const response = await axios.delete(`${API_URL}/menu/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting menu item: ${error.message}`);
    }
  }
}; 