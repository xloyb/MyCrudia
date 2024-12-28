import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, FlatList, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/Products';
import { getCategories } from '../services/Category';
import { Picker } from '@react-native-picker/picker';


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
    try {
      //await createProduct(newProduct);
      await createProduct(newProduct.name, newProduct.description, Number(newProduct.price), Number(newProduct.categoryId));

      setNewProduct({ name: '', description: '', price: '', categoryId: '' });
      fetchProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete product');
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
    try {
      await updateProduct(editingProduct.id, newProduct.name, newProduct.description, Number(newProduct.price), Number(newProduct.categoryId));
      setNewProduct({ name: '', description: '', price: '', categoryId: '' });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Products</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={newProduct.name}
        onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newProduct.description}
        onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newProduct.price}
        keyboardType="numeric"
        onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Category ID"
        value={newProduct.categoryId}
        keyboardType="numeric"
        onChangeText={(text) => setNewProduct({ ...newProduct, categoryId: text })}
      /> */}

<Picker
        selectedValue={newProduct.categoryId}
        onValueChange={(itemValue) =>
          setNewProduct({ ...newProduct, categoryId: itemValue })
        }>
        <Picker.Item label="Select Category" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
      <Button
        title={editingProduct ? 'Update Product' : 'Add Product'}
        onPress={editingProduct ? handleUpdateProduct : handleCreateProduct}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Button title="Edit" onPress={() => handleEditProduct(item)} />
            <Button title="Delete" onPress={() => handleDeleteProduct(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
