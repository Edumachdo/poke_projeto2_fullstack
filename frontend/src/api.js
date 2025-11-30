const BASE_URL = 'http://localhost:3000/api';

const get = async (endpoint, params = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Add any provided params to the URL
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  
  // Add cache-busting parameter
  url.searchParams.append('_', new Date().getTime());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "/login";
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const post = async (endpoint, data) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Gracefully handle non-JSON responses
    const error = new Error(errorData.error || `HTTP error! status: ${response.status}`);
    error.response = { data: errorData };
    throw error;
  }

  return response.json();
};

const put = async (endpoint, data) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const del = async (endpoint) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Gracefully handle non-JSON responses
    const error = new Error(errorData.error || `HTTP error! status: ${response.status}`);
    error.response = { data: errorData };
    throw error;
  }

  // Handle 204 No Content response
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const login = (credentials) => post('/auth/login', credentials);

export const registerUser = (userData) => post('/auth/register', userData);

export const getPokemon = (search) => {
    const params = {};
    if (search) {
        params.search = search;
    }
    return get(`/pokemon`, params);
};

export const createPokemon = (data) => post('/pokemon', data);

export const getAllPokemon = (page = 1, limit = 30) => {
  return get('/pokemon', { page, limit });
};

export const deletePokemon = (id) => del(`/pokemon/${id}`);

export const updatePokemon = (id, data) => put(`/pokemon/${id}`, data);