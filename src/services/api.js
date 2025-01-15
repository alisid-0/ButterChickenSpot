import axios from 'axios';

const API_URL = 'https://butterchickenspotbackend.onrender.com/api';

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

export const authApi = {
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone
      });
      return response.data;
    } catch (error) {
      console.error('Registration error details:', error.response?.data);
      
      if (error.response?.data?.error?.includes('auth/email-already-in-use')) {
        throw new Error('This email is already registered. Please use a different email or login.');
      }
      
      throw new Error(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login Response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const newsletterApi = {
  async getAllPosts() {
    try {
      const response = await axios.get(`${API_URL}/newsletter`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching newsletter posts: ${error.message}`);
    }
  },

  async addPost(post) {
    try {
      const response = await axios.post(`${API_URL}/newsletter`, post);
      return response.data;
    } catch (error) {
      throw new Error(`Error adding newsletter post: ${error.message}`);
    }
  },

  async updatePost(id, updates) {
    try {
      const response = await axios.put(`${API_URL}/newsletter/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating newsletter post: ${error.message}`);
    }
  },

  async deletePost(id) {
    try {
      const response = await axios.delete(`${API_URL}/newsletter/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting newsletter post: ${error.message}`);
    }
  }
}; 

export const ordersApi = {
  async createOrder(orderData) {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  },

  async getOrder(orderId) {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }
  },

  async getUserOrders(userId) {
    try {
      const response = await axios.get(`${API_URL}/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user orders: ${error.message}`);
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      const response = await axios.put(`${API_URL}/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }
};