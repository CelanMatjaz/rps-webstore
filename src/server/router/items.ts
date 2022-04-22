import express from 'express';
import { getAllItems } from '../db/models/items';
const router = express.Router();

router.use(express.json());
router.get('/all', async (req, res) => {
    const data = await getAllItems(); 
    res.json({ data });
});

router.post('*', (req, res) => res.status(404).json({error: "Not found"}));
export default router;
