

import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, FlatList, Alert, Pressable } from 'react-native';
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
        placeholder="Enter category name..."
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#0056b3' : '#007bff' }
        ]}
        onPress={editingCategory ? handleUpdateCategory : handleCreateCategory}
      >
        <Text style={styles.buttonText}>{editingCategory ? 'Update Category' : 'Add Category'}</Text>
      </Pressable>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <View style={styles.actions}>
              <Pressable
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditCategory(item)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteCategory(item.id)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </Pressable>
            </View>
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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 25,
    color: '#212529',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryText: {
    fontSize: 20,
    color: '#495057',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#17a2b8',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
