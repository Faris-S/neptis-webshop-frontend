export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.faris.ba';

export const ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products/`,
  ORDERS: `${API_BASE_URL}/orders/`,
  LOGIN: `${API_BASE_URL}/auth/login/`,
};
