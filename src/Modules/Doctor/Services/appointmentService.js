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

/**
 * Appointment Service - Handles all appointment-related API calls
 */
class AppointmentService {
  /**
   * Get all appointments for the logged-in doctor
   * @param {Object} filters - Filter options (date, status, etc.)
   * @returns {Promise} List of appointments
   */
  async getAppointments(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/doctor/appointments?${params}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get appointments for a specific date range
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @returns {Promise} List of appointments
   */
  async getAppointmentsByDateRange(startDate, endDate) {
    try {
      const response = await apiClient.get(`/doctor/appointments/range?start=${startDate}&end=${endDate}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a specific appointment by ID
   * @param {number} appointmentId - Appointment ID
   * @returns {Promise} Appointment data
   */
  async getAppointmentById(appointmentId) {
    try {
      const response = await apiClient.get(`/doctor/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update appointment status
   * @param {number} appointmentId - Appointment ID
   * @param {string} status - New status (upcoming, completed, cancelled)
   * @param {string} notes - Optional notes
   * @returns {Promise} Updated appointment data
   */
  async updateAppointmentStatus(appointmentId, status, notes = '') {
    try {
      const response = await apiClient.patch(`/doctor/appointments/${appointmentId}/status`, {
        status,
        notes
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Reschedule an appointment
   * @param {number} appointmentId - Appointment ID
   * @param {string} newDate - New date in YYYY-MM-DD format
   * @param {string} newTime - New time in HH:MM format
   * @returns {Promise} Updated appointment data
   */
  async rescheduleAppointment(appointmentId, newDate, newTime) {
    try {
      const response = await apiClient.patch(`/doctor/appointments/${appointmentId}/reschedule`, {
        date: newDate,
        time: newTime
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add consultation notes to an appointment
   * @param {number} appointmentId - Appointment ID
   * @param {string} notes - Consultation notes
   * @param {string} diagnosis - Diagnosis
   * @param {Array} prescriptions - Array of prescribed medicines
   * @returns {Promise} Updated appointment data
   */
  async addConsultationNotes(appointmentId, notes, diagnosis = '', prescriptions = []) {
    try {
      const response = await apiClient.post(`/doctor/appointments/${appointmentId}/consultation`, {
        notes,
        diagnosis,
        prescriptions
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get appointment statistics
   * @param {string} period - Period for stats (day, week, month, year)
   * @returns {Promise} Appointment statistics
   */
  async getAppointmentStats(period = 'week') {
    try {
      const response = await apiClient.get(`/doctor/appointments/stats?period=${period}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Cancel an appointment
   * @param {number} appointmentId - Appointment ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise} Cancellation confirmation
   */
  async cancelAppointment(appointmentId, reason) {
    try {
      const response = await apiClient.patch(`/doctor/appointments/${appointmentId}/cancel`, {
        reason
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get upcoming appointments for today
   * @returns {Promise} Today's upcoming appointments
   */
  async getTodayAppointments() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await apiClient.get(`/doctor/appointments/today?date=${today}`);
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

export default new AppointmentService();