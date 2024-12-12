// src/http.js
import axios from "axios";
import { errorAlert, successAlert, infoAlert, warnAlert } from "./index";

const apiClient = axios.create({
  baseURL: "http://localhost:3050",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      errorAlert(error.response.data.message || error.message);
      console.error("API Error:", error.response.data.message || error.message);
    } else {
      errorAlert(error.message);
      console.error("Network Error:", error.message);
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

const getData = (endpoint) => httpRequest("GET", endpoint);

const postData = (endpoint, payload) => httpRequest("POST", endpoint, payload);

export { getData, postData, httpRequest };
