/**
 * Date formatting utilities for the Doctor module
 */

/**
 * Format a date object to a readable string
 * @param {Date} date - The date object to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format a time string to 12-hour format
 * @param {string} time - Time string in HH:MM format
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  if (!time) return '';
  
  try {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return time; // Return original if formatting fails
  }
};

/**
 * Format a date and time for display
 * @param {string|Date} date - Date string or Date object
 * @param {string} time - Time string in HH:MM format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, time) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);
  
  return `${formattedDate} at ${formattedTime}`;
};

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = targetDate.getTime() - now.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (Math.abs(diffInMinutes) < 1) {
    return 'Just now';
  } else if (Math.abs(diffInMinutes) < 60) {
    return diffInMinutes > 0 
      ? `in ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`
      : `${Math.abs(diffInMinutes)} minute${Math.abs(diffInMinutes) === 1 ? '' : 's'} ago`;
  } else if (Math.abs(diffInHours) < 24) {
    return diffInHours > 0 
      ? `in ${diffInHours} hour${diffInHours === 1 ? '' : 's'}`
      : `${Math.abs(diffInHours)} hour${Math.abs(diffInHours) === 1 ? '' : 's'} ago`;
  } else {
    return diffInDays > 0 
      ? `in ${diffInDays} day${diffInDays === 1 ? '' : 's'}`
      : `${Math.abs(diffInDays)} day${Math.abs(diffInDays) === 1 ? '' : 's'} ago`;
  }
};

/**
 * Check if a date is today
 * @param {string|Date} date - Date string or Date object
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  
  const today = new Date();
  const checkDate = new Date(date);
  
  return today.toDateString() === checkDate.toDateString();
};

/**
 * Get the start of the week for a given date
 * @param {Date} date - The date to get the week start for
 * @returns {Date} Start of the week (Sunday)
 */
export const getWeekStart = (date = new Date()) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day;
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get an array of dates for the current week
 * @param {Date} startDate - Optional start date (defaults to current week)
 * @returns {Date[]} Array of 7 dates representing the week
 */
export const getWeekDates = (startDate) => {
  const start = startDate ? new Date(startDate) : getWeekStart();
  const dates = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};