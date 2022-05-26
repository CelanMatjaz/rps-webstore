import express from 'express';

import userRouter from './router/users';
import itemRouter from './router/items';
import categoryRouter from './router/categories';
import checkoutRouter from './router/checkout';
import ordersRouter from './router/orders';

const router = express.Router();

router.use('/account', userRouter);
router.use('/items', itemRouter);
router.use('/categories', categoryRouter);
router.use('/checkout', checkoutRouter);
router.use('/orders', ordersRouter);

router.use('*', (req, res) => res.sendStatus(404));

export default router;
