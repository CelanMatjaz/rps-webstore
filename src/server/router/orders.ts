import express from 'express';
import { getOrderItemsFromOrder } from '../db/models/orderItems';
import { getOrdersFromUser } from '../db/models/orders';

const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);
  return res.json({ data: await getOrdersFromUser(req.session.userId) });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!req.session.userId) return res.sendStatus(401);
  return res.json({
    data: await getOrderItemsFromOrder(+id, +req.session.userId),
  });
});

router.use('*', (req, res) => res.sendStatus(404));

export default router;
