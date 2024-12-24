import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import authRoutes from '@routes/authRoutes';
import categoryRoutes from '@routes/categoryRoutes';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000 - http://localhost:3000');
});
