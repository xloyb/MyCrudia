import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import authRoutes from '@routes/authRoutes';
import categoryRoutes from '@routes/categoryRoutes';
import productRoute from '@routes/productRoute';

const app = express();

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
app.use('/api/products', productRoute);

app.listen(3000, () => {
  console.log('Server running on port 3000 - http://localhost:3000');
});
