import Cart from '../models/Cart';
import Product from '../models/Product';
import { Request, Response } from 'express';

export const getCartItems = async (_: Request, res: Response) => {
  const items = await Cart.find().populate('productId');
  res.json(items);
};

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const existing = await Cart.findOne({ productId });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    res.json(existing);
    return;
  }

  const newItem = new Cart({ productId, quantity });
  await newItem.save();
  res.json(newItem);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
  res.json(item);
};

export const removeCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  res.json({ message: 'Item removed' });
};