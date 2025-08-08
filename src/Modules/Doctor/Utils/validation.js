/**
 * Validation utilities for the Doctor module
 */

/**
 * Validate medicine form data
 * @param {Object} data - Form data to validate
 * @returns {Object} Object containing validation errors
 */
export const validateMedicine = (data) => {
  const errors = {};
  
  // Medicine name validation
  if (!data.medicineName || data.medicineName.trim() === '') {
    errors.medicineName = 'Medicine name is required';
  } else if (data.medicineName.trim().length < 2) {
    errors.medicineName = 'Medicine name must be at least 2 characters';
  } else if (data.medicineName.trim().length > 100) {
    errors.medicineName = 'Medicine name must be less than 100 characters';
  }
  
  // Instructions validation
  if (!data.instructions || data.instructions.trim() === '') {
    errors.instructions = 'Instructions are required';
  } else if (data.instructions.trim().length < 10) {
    errors.instructions = 'Instructions must be at least 10 characters';
  } else if (data.instructions.trim().length > 500) {
    errors.instructions = 'Instructions must be less than 500 characters';
  }
  
  return errors;
};

/**
 * Validate patient form data
 * @param {Object} data - Patient data to validate
 * @returns {Object} Object containing validation errors
 */
export const validatePatient = (data) => {
  const errors = {};
  
  // Name validation
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Patient name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }
  
  // Age validation
  if (!data.age) {
    errors.age = 'Age is required';
  } else if (isNaN(data.age) || data.age < 0 || data.age > 150) {
    errors.age = 'Please enter a valid age (0-150)';
  }
  
  // Address validation
  if (!data.address || data.address.trim() === '') {
    errors.address = 'Address is required';
  } else if (data.address.trim().length < 10) {
    errors.address = 'Address must be at least 10 characters';
  } else if (data.address.trim().length > 200) {
    errors.address = 'Address must be less than 200 characters';
  }
  
  // Blood type validation
  const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  if (!data.bloodType) {
    errors.bloodType = 'Blood type is required';
  } else if (!validBloodTypes.includes(data.bloodType)) {
    errors.bloodType = 'Please select a valid blood type';
  }
  
  return errors;
};

/**
 * Validate appointment form data
 * @param {Object} data - Appointment data to validate
 * @returns {Object} Object containing validation errors
 */
export const validateAppointment = (data) => {
  const errors = {};
  
  // Patient name validation
  if (!data.patientName || data.patientName.trim() === '') {
    errors.patientName = 'Patient name is required';
  }
  
  // Date validation
  if (!data.date) {
    errors.date = 'Date is required';
  } else {
    const appointmentDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      errors.date = 'Appointment date cannot be in the past';
    }
  }
  
  // Time validation
  if (!data.time) {
    errors.time = 'Time is required';
  } else {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.time)) {
      errors.time = 'Please enter a valid time (HH:MM format)';
    }
  }
  
  // Notes validation (optional but if provided, should meet criteria)
  if (data.notes && data.notes.trim().length > 300) {
    errors.notes = 'Notes must be less than 300 characters';
  }
  
  return errors;
};

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Check if a string is empty or only whitespace
 * @param {string} str - String to check
 * @returns {boolean} True if string is empty or only whitespace
 */
export const isEmpty = (str) => {
  return !str || str.trim() === '';
};

/**
 * Validate required fields in an object
 * @param {Object} data - Data object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object} Object containing validation errors
 */
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && isEmpty(data[field]))) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  
  return errors;
};