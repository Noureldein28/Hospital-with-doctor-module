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
 * Medicine Service - Handles all medicine and prescription-related API calls
 */
class MedicineService {
  /**
   * Add medicine prescription for a patient
   * @param {number} patientId - Patient ID
   * @param {Object} medicineData - Medicine prescription data
   * @returns {Promise} Added prescription data
   */
  async addMedicine(patientId, medicineData) {
    try {
      const response = await apiClient.post(`/doctor/patients/${patientId}/medicines`, {
        medicineName: medicineData.medicineName,
        instructions: medicineData.instructions,
        dosage: medicineData.dosage,
        frequency: medicineData.frequency,
        duration: medicineData.duration,
        startDate: medicineData.startDate || new Date().toISOString().split('T')[0],
        notes: medicineData.notes
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get all medicines prescribed by the doctor
   * @param {Object} filters - Filter options
   * @returns {Promise} List of prescribed medicines
   */
  async getPrescribedMedicines(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/doctor/medicines/prescribed?${params}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get medicine database for search/autocomplete
   * @param {string} searchTerm - Search term for medicine name
   * @returns {Promise} List of available medicines
   */
  async searchMedicines(searchTerm) {
    try {
      const response = await apiClient.get(`/medicines/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient's current active prescriptions
   * @param {number} patientId - Patient ID
   * @returns {Promise} List of active prescriptions
   */
  async getPatientActiveMedicines(patientId) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}/medicines/active`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get patient's prescription history
   * @param {number} patientId - Patient ID
   * @param {number} limit - Number of records to fetch
   * @returns {Promise} Prescription history
   */
  async getPatientMedicineHistory(patientId, limit = 20) {
    try {
      const response = await apiClient.get(`/doctor/patients/${patientId}/medicines/history?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update medicine prescription
   * @param {number} prescriptionId - Prescription ID
   * @param {Object} updateData - Updated prescription data
   * @returns {Promise} Updated prescription data
   */
  async updateMedicinePrescription(prescriptionId, updateData) {
    try {
      const response = await apiClient.put(`/doctor/medicines/prescriptions/${prescriptionId}`, updateData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Discontinue a medicine prescription
   * @param {number} prescriptionId - Prescription ID
   * @param {string} reason - Reason for discontinuation
   * @returns {Promise} Discontinuation confirmation
   */
  async discontinueMedicine(prescriptionId, reason) {
    try {
      const response = await apiClient.patch(`/doctor/medicines/prescriptions/${prescriptionId}/discontinue`, {
        reason,
        discontinuedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get medicine interactions and contraindications
   * @param {Array} medicineIds - Array of medicine IDs to check
   * @returns {Promise} Interaction data
   */
  async checkMedicineInteractions(medicineIds) {
    try {
      const response = await apiClient.post('/medicines/interactions', {
        medicineIds
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get medicine information by ID
   * @param {number} medicineId - Medicine ID
   * @returns {Promise} Medicine information
   */
  async getMedicineInfo(medicineId) {
    try {
      const response = await apiClient.get(`/medicines/${medicineId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add medicine to favorites for quick access
   * @param {number} medicineId - Medicine ID
   * @returns {Promise} Favorite addition confirmation
   */
  async addToFavorites(medicineId) {
    try {
      const response = await apiClient.post('/doctor/medicines/favorites', {
        medicineId
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get doctor's favorite medicines
   * @returns {Promise} List of favorite medicines
   */
  async getFavoriteMedicines() {
    try {
      const response = await apiClient.get('/doctor/medicines/favorites');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Remove medicine from favorites
   * @param {number} medicineId - Medicine ID
   * @returns {Promise} Removal confirmation
   */
  async removeFromFavorites(medicineId) {
    try {
      const response = await apiClient.delete(`/doctor/medicines/favorites/${medicineId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Generate prescription PDF
   * @param {number} patientId - Patient ID
   * @param {Array} prescriptions - Array of prescription IDs
   * @returns {Promise} PDF generation result
   */
  async generatePrescriptionPDF(patientId, prescriptions) {
    try {
      const response = await apiClient.post(`/doctor/patients/${patientId}/prescription-pdf`, {
        prescriptions
      }, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get prescription statistics
   * @param {string} period - Period for stats (day, week, month)
   * @returns {Promise} Prescription statistics
   */
  async getPrescriptionStats(period = 'month') {
    try {
      const response = await apiClient.get(`/doctor/medicines/stats?period=${period}`);
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

export default new MedicineService();