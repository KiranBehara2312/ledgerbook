// src/http.js
import axios from "axios";
import { errorAlert, successAlert, infoAlert, warnAlert } from "./index";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
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
      if (
        error.response.data?.err === "ADNTP" ||
        error.response.data?.err === "ITP" ||
        error.message === "ADNTP" ||
        error.message === "ITP"
      ) {
        errorAlert(error.response.data.message || error.message);
        setTimeout(() => {
          window.location.href = window.location.origin + "/auth/login";
          localStorage.removeItem("authToken");
        }, 1000);
      }
      console.error("API Error:", error.response.data.message || error.message);
    } else {
      errorAlert(error.message);
      if (err?.err === "ADNTP" || err?.err === "ITP") {
        errorAlert(error.message);
        setTimeout(() => {
          window.location.href = window.location.origin + "/auth/login";
          localStorage.removeItem("authToken");
        }, 1000);
      }
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Common function to make API calls
const httpRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      headers: headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getData = (endpoint, headers = {}) =>
  httpRequest("GET", endpoint, null, headers);

const postData = (endpoint, payload) => httpRequest("POST", endpoint, payload);

export { getData, postData, httpRequest };
