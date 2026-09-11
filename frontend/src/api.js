import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const fetchLeaves = () => API.get('leaves/');
export const submitLeave = (data) => API.post('leaves/', data);

export const fetchClaims = () => API.get('claims/');
export const submitClaim = (data) => API.post('claims/', data);

export const fetchPurchases = () => API.get('purchases/');
export const submitPurchase = (data) => API.post('purchases/', data);

export default API;