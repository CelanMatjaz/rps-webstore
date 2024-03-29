import express from 'express';
import { getAllCategories } from '../db/models/categories';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ data: await getAllCategories() });
});

export default router;
