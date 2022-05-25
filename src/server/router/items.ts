import express from 'express';
import {
  getAllItems,
  getAllItemsByCategory,
  getItemById,
} from '../db/models/items';
const router = express.Router();

router.use(express.json());

function correctNumber(sus: any) {
  const susType = typeof sus;
  if (susType === 'string') {
    sus = parseInt(sus, 10);
  } else if (susType === 'number') {
    // ignored
  } else {
    return undefined;
  }
  if (isNaN(sus)) {
    return undefined;
  }
  return Math.round(Math.abs(sus));
}

router.get<{ categoryId?: number }>('/all', async (req, res) => {
  const offset = correctNumber(req.query.page);
  const limit = correctNumber(req.query.page_size);

  if (req.params.categoryId) {
    return res.json({
      data: await getAllItemsByCategory(
        req.params.categoryId,
        correctNumber(req.query.page),
        correctNumber(req.query.page_size)
      ),
    });
  } else {
    res.json({ data: await getAllItems(offset, limit) });
  }
});

router.get('/:id', async (req, res) => {
  const data = await getItemById(req.params.id);
  res.json({ data });
});

router.post('*', (req, res) => res.status(404).json({ error: 'Not found' }));

export default router;
