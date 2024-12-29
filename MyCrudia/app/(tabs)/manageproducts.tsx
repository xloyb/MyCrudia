
import { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { Text, View, TextField, Button, Picker } from 'react-native-ui-lib';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/Products';
import { getCategories } from '../services/Category';

export default function ManageProductsScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.categoryId) return;
    setLoading(true);
    try {
      await createProduct(newProduct.name, newProduct.description, Number(newProduct.price), Number(newProduct.categoryId));
      setNewProduct({ name: '', description: '', price: '', categoryId: '' });
      fetchProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId.toString(),
    });
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct || !newProduct.name || !newProduct.description || !newProduct.price || !newProduct.categoryId) return;
    setLoading(true);
    try {
      await updateProduct(editingProduct.id, newProduct.name, newProduct.description, Number(newProduct.price), Number(newProduct.categoryId));
      setNewProduct({ name: '', description: '', price: '', categoryId: '' });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex padding-20>
      <Text text40 marginB-20 color="#3A3A3A">Manage Products</Text>
      {/* <TextField
        placeholder="Product Name"
        value={newProduct.name}
        onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
        floatingPlaceholder
        placeholderTextColor="#6C757D"
        style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10 }}
      />
      <TextField
        placeholder="Description"
        value={newProduct.description}
        onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
        floatingPlaceholder
        placeholderTextColor="#6C757D"
        style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10 }}
      />
      <TextField
        placeholder="Price"
        value={newProduct.price}
        keyboardType="numeric"
        onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
        floatingPlaceholder
        placeholderTextColor="#6C757D"
        style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10 }}
      /> */}

<TextField
  placeholder="Product Name"
  value={newProduct.name}
  onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
  placeholderTextColor="#6C757D"
  style={{ backgroundColor: '#cbd1d5', borderRadius: 8, padding: 20, marginBottom: 15, height: 40  }}
/>
<TextField
  placeholder="Description"
  value={newProduct.description}
  onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
  placeholderTextColor="#6C757D"
  style={{ backgroundColor: '#cbd1d5', borderRadius: 8, padding: 20, marginBottom: 15, height: 40  }}
/>
<TextField
  placeholder="Price"
  value={newProduct.price}
  keyboardType="numeric"
  onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
  placeholderTextColor="#6C757D"
  style={{ backgroundColor: '#cbd1d5', borderRadius: 8, padding: 20, marginBottom: 15, height: 40  }}
/>

      <Picker
        placeholder="Select Category"
        value={newProduct.categoryId}
        onChange={(item) => {
          if (item) {
            setNewProduct({ ...newProduct, categoryId: item.toString() });
          }
        }}
        topBarProps={{ title: 'Categories' }}
        style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10 }}
      >
        {categories.map((category) => (
          <Picker.Item key={category.id} value={category.id.toString()} label={category.name} />
        ))}
      </Picker>

      <Button
        label={editingProduct ? 'Update Product' : 'Add Product'}
        onPress={editingProduct ? handleUpdateProduct : handleCreateProduct}
        marginT-20
        disabled={loading}
        backgroundColor={editingProduct ? '#007BFF' : '#28A745'}
        color="white"
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View row spread paddingV-15 style={{ borderBottomWidth: 1, borderColor: '#E0E0E0' }}>
            <Text color="#3A3A3A">{item.name}</Text>
            <View row>
              <Button label="Edit" onPress={() => handleEditProduct(item)} link color="#007BFF" marginR-10 />
              <Button label="Delete" onPress={() => handleDeleteProduct(item.id)} link color="#DC3545" />
            </View>
          </View>
        )}
      />
    </View>
  );
}
