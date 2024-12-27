import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../context/AuthContext';

const PRODUCT_URL = `${API_URL.replace('/auth', '/products')}`;
const TOKEN_KEY = "my-jwt";

async function getAuthToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export const createProduct = async (name: string, description: string, price: number, categoryId: number) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(PRODUCT_URL, { name, description, price, categoryId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, name?: string, description?: string, price?: number, categoryId?: number) => {
  try {
    const token = await getAuthToken();
    const response = await axios.put(`${PRODUCT_URL}/${id}`, {
      name,
      description,
      price,
      categoryId,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const token = await getAuthToken();
    await axios.delete(`${PRODUCT_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
