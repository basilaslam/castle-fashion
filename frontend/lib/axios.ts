import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3432/api/',
});

// Add a request interceptor to include the headers
axiosInstance.interceptors.request.use(
  config => {
    // Add headers only if they are available
    if (process.env.WEBCASTLE_ACCESS_KEY) {
      config.headers['webcastle-access-key'] = process.env.WEBCASTLE_ACCESS_KEY;
    }
    if (process.env.WEBCASTLE_SECRET_KEY) {
      config.headers['webcastle-secret-key'] = process.env.WEBCASTLE_SECRET_KEY;
    }
    // Set origin based on the environment
    config.headers['webcastle-user-origin'] = process.env.VERCEL_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
