import express from 'express';

const router = express.Router();

router.post('/', express.json(), async (req, res) => {
  console.log(req.body);

  res.sendStatus(400);
});

export default router;
