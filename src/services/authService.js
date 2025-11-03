// Mock auth service using localStorage (for development without backend)
const USERS_STORAGE_KEY = 'smart_irrigation_users';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw { message: 'User with this email already exists' };
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        password: userData.password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      
      // Create mock token
      const token = `mock_token_${Date.now()}`;
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        token: token,
        user: userWithoutPassword,
        message: 'Registration successful'
      };
    } catch (error) {
      throw error.message ? error : { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Find user
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      
      if (!user) {
        throw { message: 'Invalid email or password' };
      }
      
      // Create mock token
      const token = `mock_token_${Date.now()}`;
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        token: token,
        user: userWithoutPassword,
        message: 'Login successful'
      };
    } catch (error) {
      throw error.message ? error : { message: 'Login failed' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password change failed' };
    }
  },
};

export default authService;
