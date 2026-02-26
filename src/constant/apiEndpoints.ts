export const API_ENDPOINTS = {
  OVERVIEW: '/overview',
  USERS: {
    LIST: 'users',
    BY_ID: (id: number | string) => `users/${id}`,
  },
  ANALYTICS: 'analytics',
  PRODUCTS: {
    LIST: 'products',
    BY_ID: (id: number | string) => `products/${id}`,
  },
  DASHBOARD: {
    ALL: 'dashboard',
  },
} as const;