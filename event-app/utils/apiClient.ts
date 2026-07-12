import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getAccessToken = async () => SecureStore.getItemAsync('accessToken');
export const getRefreshToken = async () => SecureStore.getItemAsync('refreshToken');
export const setTokens = async (accessToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync('accessToken', accessToken);
  await SecureStore.setItemAsync('refreshToken', refreshToken);
};
export const clearTokens = async () => {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  let token = await getAccessToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Set default content type to JSON if not uploading a file
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          await setTokens(data.data.accessToken, data.data.refreshToken);
          
          // Retry original request with new token
          headers.set('Authorization', `Bearer ${data.data.accessToken}`);
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        } else {
          // Refresh failed, logout
          await clearTokens();
          // Optionally emit an event to trigger redirect to login
        }
      } catch (e) {
        await clearTokens();
      }
    } else {
      await clearTokens();
    }
  }

  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.message || "An error occurred");
  }

  return responseData.data;
};
