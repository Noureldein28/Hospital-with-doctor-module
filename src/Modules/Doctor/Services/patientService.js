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
 * Patient Service - Handles all patient-related API calls
 */
class PatientService {
  /**
   * Get all patients assigned to the logged-in doctor
   * @param {Object} filters - Filter options (search, bloodType, etc.)
   * @returns {Promise} List of patients
   */
  async getPatients(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/doctor/patients?${params}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a specific patient by ID
   * @param {number} patientId - Patient ID
   * @returns {Promise} Patient data
   */
  async getPatientById(patientId) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient's medical history
   * @param {number} patientId - Patient ID
   * @returns {Promise} Patient's medical history
   */
  async getPatientHistory(patientId) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}/history`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update patient information
   * @param {number} patientId - Patient ID
   * @param {Object} patientData - Updated patient data
   * @returns {Promise} Updated patient data
   */
  async updatePatient(patientId, patientData) {
    try {
      const response = await apiClient.put(`/doctor/patients/${patientId}`, patientData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search patients by name, address, or other criteria
   * @param {string} searchTerm - Search term
   * @param {Object} filters - Additional filters
   * @returns {Promise} Filtered list of patients
   */
  async searchPatients(searchTerm, filters = {}) {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        ...filters
      }).toString();
      const response = await apiClient.get(`/doctor/patients/search?${params}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient's current prescriptions
   * @param {number} patientId - Patient ID
   * @returns {Promise} List of active prescriptions
   */
  async getPatientPrescriptions(patientId) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}/prescriptions`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient's appointment history
   * @param {number} patientId - Patient ID
   * @param {number} limit - Number of appointments to fetch
   * @returns {Promise} Patient's appointment history
   */
  async getPatientAppointments(patientId, limit = 10) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}/appointments?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add medical notes for a patient
   * @param {number} patientId - Patient ID
   * @param {string} notes - Medical notes
   * @param {string} type - Type of note (consultation, diagnosis, general)
   * @returns {Promise} Added note data
   */
  async addPatientNotes(patientId, notes, type = 'general') {
    try {
      const response = await apiClient.post(`/doctor/patients/${patientId}/notes`, {
        notes,
        type
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient statistics for the doctor
   * @returns {Promise} Patient statistics
   */
  async getPatientStats() {
    try {
      const response = await apiClient.get('/doctor/patients/stats');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Upload patient documents
   * @param {number} patientId - Patient ID
   * @param {FormData} formData - Form data containing files
   * @returns {Promise} Upload result
   */
  async uploadPatientDocuments(patientId, formData) {
    try {
      const response = await apiClient.post(`/doctor/patients/${patientId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient documents
   * @param {number} patientId - Patient ID
   * @returns {Promise} List of patient documents
   */
  async getPatientDocuments(patientId) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}/documents`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add or update patient vital signs
   * @param {number} patientId - Patient ID
   * @param {Object} vitals - Vital signs data
   * @returns {Promise} Added vital signs data
   */
  async addPatientVitals(patientId, vitals) {
    try {
      const response = await apiClient.post(`/doctor/patients/${patientId}/vitals`, vitals);
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

export default new PatientService();