import Product from '../models/Product';
import { Request, Response } from 'express';

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};