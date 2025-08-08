import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Doctor Service - Handles all doctor-related API calls
 */
class DoctorService {
  /**
   * Get doctor profile information
   * @returns {Promise} Doctor profile data
   */
  async getProfile() {
    try {
      const response = await apiClient.get('/doctor/profile');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update doctor profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Updated profile data
   */
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/doctor/profile', profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get doctor dashboard statistics
   * @returns {Promise} Dashboard statistics
   */
  async getDashboardStats() {
    try {
      const response = await apiClient.get('/doctor/dashboard/stats');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get doctor's schedule
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Schedule data
   */
  async getSchedule(date) {
    try {
      const response = await apiClient.get(`/doctor/schedule?date=${date}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update doctor's availability
   * @param {Object} availabilityData - Availability data
   * @returns {Promise} Updated availability
   */
  async updateAvailability(availabilityData) {
    try {
      const response = await apiClient.put('/doctor/availability', availabilityData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors consistently
   * @param {Error} error - Axios error object
   * @returns {Object} Formatted error object
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        data: null
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
        data: null
      };
    }
  }
}

export default new DoctorService();