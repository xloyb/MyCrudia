import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, FlatList, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../services/Category';

export default function ManageCategoriesScreen() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
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

  const handleCreateCategory = async () => {
    if (!newCategory) return;
    try {
      await createCategory(newCategory);
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      Alert.alert('Error', 'Failed to create category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete category');
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategory(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !newCategory) return;
    try {
      await updateCategory(editingCategory.id, newCategory);
      setNewCategory('');
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      Alert.alert('Error', 'Failed to update category');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <Button
        title={editingCategory ? 'Update Category' : 'Add Category'}
        onPress={editingCategory ? handleUpdateCategory : handleCreateCategory}
      />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text>{item.name}</Text>
            <Button title="Edit" onPress={() => handleEditCategory(item)} />
            <Button title="Delete" onPress={() => handleDeleteCategory(item.id)} color="red" />
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
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
