import express from 'express';
import { findAllItems, createItem, updateItem, deleteItem } from './inventoryService';

const router = express.Router();

router.get('/items', async (req, res) => {
    try {
        const result = await findAllItems();
        res.json(result.rows);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});

router.post('/items', async (req, res) => {
    try {
        const { serial, name, description, quantity, created_at } = req.body;
        const result = await createItem(serial, name, description, quantity, created_at);
        res.json(result.rows[0]);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});

router.put('/items/:item_id', async (req, res) => {
    try {
        const item_id = parseInt(req.params.item_id, 10);
        if (isNaN(item_id)) {
            return res.status(400).send("Invalid item ID");
        }
        const { serial, name, description, quantity, created_at } = req.body;
        const result = await updateItem(item_id, serial, name, description, quantity, created_at);
        if (result.rows.length === 0) {
            return res.status(404).json("Item not found");
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});

router.delete('/items/:item_id', async (req, res) => {
    try {
        const item_id = parseInt(req.params.item_id, 10);
        if (isNaN(item_id)) {
            return res.status(400).send("Invalid item ID");
        }
        const result = await deleteItem(item_id);
        if (result.rows.length === 0) {
            return res.status(404).json("Item not found");
        }
        res.json("Item deleted");
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});

export default router;
