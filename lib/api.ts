import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` }
    : {},
});
