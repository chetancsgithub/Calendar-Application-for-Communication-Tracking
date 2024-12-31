import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

// Authentication API
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);

// Company API
export const getCompanies = () => axios.get(`${API_URL}/companies`);
export const addCompany = (data) => axios.post(`${API_URL}/companies`, data);
export const updateCompany = (id, data) => axios.put(`${API_URL}/companies/${id}`, data);
export const deleteCompany = (id) => axios.delete(`${API_URL}/companies/${id}`);

// Communication Methods API
export const getCommunicationMethods = () => axios.get(`${API_URL}/communication-methods`);
export const addCommunicationMethod = (data) => axios.post(`${API_URL}/communication-methods`, data);
export const updateCommunicationMethod = (id, data) =>
  axios.put(`${API_URL}/communication-methods/${id}`, data);
export const deleteCommunicationMethod = (id) =>
  axios.delete(`${API_URL}/communication-methods/${id}`);

// Companies Details
export const getCompanyDetails = (id) => axios.get(`${API_URL}/companies/${id}`);
export const logCommunicationByName = (name, data) =>
  axios.post(`${API_URL}/companies/name/${name}/log`, data);


// Communications
export const getOverdueCommunications = () => axios.get(`${API_URL}/communications/overdue`);
export const getTodaysCommunications = () => axios.get(`${API_URL}/communications/today`);
