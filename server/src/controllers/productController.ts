import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, categoryId } = req.body;
  
    if (!name || !description || !price || !categoryId) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }
  
    const userId = req.user?.id; 
  
    if (!userId) {
      res.status(403).json({ error: 'Unauthorized: User ID is required' });
      return;
    }
  
    try {
      const product = await prisma.product.create({
        data: {
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price),
          categoryId: Number(categoryId),
          userId, // Ensures userId is passed correctly
        },
      });
  
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  };
  

// Get All Products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { 
        category: true,
     },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    if (!id) {
      res.status(400).json({ error: 'Product ID is required' });
      return;
    }
  
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) }, // Convert `id` to a number
      });
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name?.trim(),
        description: description?.trim(),
        price: price ? parseFloat(price) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(404).json({ error: 'Product not found' });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(404).json({ error: 'Product not found' });
  }
};
