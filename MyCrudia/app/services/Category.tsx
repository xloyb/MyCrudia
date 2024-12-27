import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../context/AuthContext';

const CATEGORY_URL = `${API_URL.replace('/auth', '/categories')}`;
const TOKEN_KEY = "my-jwt";

async function getAuthToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

// Create Category
export const createCategory = async (name: string) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(CATEGORY_URL, { name }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Get All Categories
export const getCategories = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(CATEGORY_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Update Category
export const updateCategory = async (id: number, name: string) => {
  try {
    const token = await getAuthToken();
    const response = await axios.put(`${CATEGORY_URL}/${id}`, { name }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Delete Category
export const deleteCategory = async (id: number) => {
  try {
    const token = await getAuthToken();
    await axios.delete(`${CATEGORY_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
