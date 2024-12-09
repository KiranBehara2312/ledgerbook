// src/http.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or any other way of getting the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response globally
apiClient.interceptors.response.use(
  (response) => response.data, // Return the response data directly
  (error) => {
    if (error.response) {
      // Handle error responses (e.g., 4xx, 5xx)
      console.error('API Error:', error.response.data.message || error.message);
    } else {
      // Handle network or other types of errors
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Common function to make API calls
const httpRequest = async (method, url, data = null) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
    });
    return response; 
  } catch (error) {
    throw error;
  }
};

const getData = (endpoint) => httpRequest('GET', endpoint);

const postData = (endpoint, payload) => httpRequest('POST', endpoint, payload);

export { getData, postData, httpRequest };
