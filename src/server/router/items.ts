import express from 'express';
import { getAllItems, getItemById } from '../db/models/items';
const router = express.Router();

router.use(express.json());

router.get('/all', async (req, res) => {
    const data = await getAllItems(); 
    res.json({ data });
});

router.get('/:id', async (req,res) => {
    const data = await getItemById(req.params.id);
    res.json({ data })
})

router.post('*', (req, res) => res.status(404).json({error: "Not found"}));

export default router;
