import express from 'express';
import pool from './db';

const router = express.Router();


router.get('/items', async (req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM inventory");
        res.json(allItems.rows);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});


router.post('/items', async (req, res) => {
    try {
        const { serial, name, description, quantity, created_at } = req.body;
        const newItem = await pool.query(
            "INSERT INTO inventory (serial, name, description, quantity, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [serial, name, description, quantity, created_at]
        );
        res.json(newItem.rows[0]);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});


router.put('/items/:item_id', async (req, res) => {
    try {
        const { item_id } = req.params;
        const { serial, name, description, quantity, created_at } = req.body;
        const updateItem = await pool.query(
            "UPDATE inventory SET serial = $1, name = $2, description = $3, quantity = $4, created_at = $5 WHERE id = $6 RETURNING *",
            [serial, name, description, quantity, created_at, item_id]
        );
        if (updateItem.rows.length === 0) {
            return res.status(404).json("Item not found");
        }
        res.json(updateItem.rows[0]);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});


router.delete('/items/:item_id', async (req, res) => {
    try {
        const { item_id } = req.params;
        const deleteItem = await pool.query(
            "DELETE FROM inventory WHERE id = $1 RETURNING *",
            [item_id]
        );
        if (deleteItem.rows.length === 0) {
            return res.status(404).json("Item not found");
        }
        res.json("Item deleted");
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send("Server error");
    }
});

export default router;
