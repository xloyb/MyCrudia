import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


// // Create Category
// export const createCategory = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const category = await prisma.category.create({ data: { name } });
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create category' });
//   }
// };


export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
  
    if (!name || name.trim() === '') {
      res.status(400).json({ error: 'Category name is required' });
      return; // Explicit return here
    }
  
    try {
      const category = await prisma.category.create({
        data: {
          name: name.trim(),
        },
      });
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category', details: error });
    }
  };

// Get All Categories
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name }
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(404).json({ error: 'Category not found' });
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Category not found' });
  }
};
