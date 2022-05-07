import express from 'express';
import { getAllItems, getItemById } from '../db/models/items';
const router = express.Router();

router.use(express.json());

function correctNumber(sus: any) {
    const susType = typeof sus;
    if (susType === "string") {
        sus = parseInt(sus, 10);
    } else if (susType === "number") {
        // ignored
    } else {
        return undefined;
    }
    if (isNaN(sus)) {
        return undefined;
    }
    return Math.round(Math.abs(sus));
}

router.get('/all', async (req, res) => {
    const offset = correctNumber(req.query.page);
    const limit = correctNumber(req.query.page_size);
    const data = await getAllItems(offset, limit); 
    res.json({ data });
});

router.get('/:id', async (req,res) => {
    const data = await getItemById(req.params.id);
    res.json({ data })
})


router.post('*', (req, res) => res.status(404).json({error: "Not found"}));

export default router;
