/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {

  console.log('VITE_BASE_URL from env:', import.meta.env.BASE_URL);
  console.log('config.baseUrl:', config.baseUrl);

  let base = config.baseUrl || '';
  if (!base && import.meta.env.DEV) {
    console.warn('⚠️ VITE_BASE_URL is missing or empty – using fallback');

    base = 'https://task-api-eight-flax.vercel.app/api';
  }

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${base.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  console.log('Final fetch URL:', url); 

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData?.message || `Request failed: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}

export const fetcher = <T>(endpoint: string) => apiFetch<T>(endpoint);

export const postFetcher = <T>(endpoint: string, body: any) =>
  apiFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const putFetcher = <T>(endpoint: string, body: any) =>
  apiFetch<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });