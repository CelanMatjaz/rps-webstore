import { insertOrder } from './../db/models/orders';
import { getItemById, getItemsByIds } from './../db/models/items';
import express from 'express';
import { insertOrderItem } from '../db/models/orderItems';

const router = express.Router();

interface PostBody {
  items: { id: number; quantity: number }[];
  address: string;
  paymentInfo: string;
}

router.post<{}, {}, PostBody>('/', express.json(), async (req, res) => {
  const { address, paymentInfo, items } = req.body;

  if (!req.session.userId)
    return res.status(403).json({ error: 'Not authenticated' });
  if (!items || !address || !paymentInfo)
    res.status(400).json({ error: 'Bad request' });

  const itemMap = {};
  for (const { id, quantity } of items) {
    if (!id || !quantity) return res.status(400).json({ error: 'Bad request' });
    itemMap[id] = quantity;
  }

  const newOrderId = await insertOrder({
    address,
    payment_info: paymentInfo,
    user_id: req.session.userId,
  });
  if (!newOrderId) return res.sendStatus(500);

  const orderItems = await getItemsByIds(Object.keys(itemMap).map((id) => +id));
  for (const { img_path, name, price, category_id, id } of orderItems) {
    await insertOrderItem({
      name,
      category_id,
      img_path,
      price,
      quantity: itemMap[id] ?? 1,
      order_id: newOrderId,
    });
  }

  return res.sendStatus(200);
});

export default router;
