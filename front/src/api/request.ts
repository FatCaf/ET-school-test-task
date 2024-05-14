import axios from 'axios';
import { toast } from 'react-toastify';
import api from './api';

const eventApi = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

eventApi.interceptors.response.use(
  (res) => res.data,
  (err) => {
    toast.error(err.message);
  },
);

export default eventApi;
