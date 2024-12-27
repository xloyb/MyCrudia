import axios from 'axios';
import { API_URL } from '../context/AuthContext';

const CATEGORY_URL = `${API_URL.replace('/auth', '/categories')}`;

export const createCategory = async (name: string) => {
  try {
    const response = await axios.post(CATEGORY_URL, { name });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const updateCategory = async (id: number, name: string) => {
  try {
    const response = await axios.put(`${CATEGORY_URL}/${id}`, { name });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await axios.delete(`${CATEGORY_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
