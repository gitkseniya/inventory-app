import pool from './db';

export const findAllItems = async () => {
    return await pool.query("SELECT * FROM inventory");
};

export const createItem = async (serial: string, name: string, description: string, quantity: number, created_at: Date) => {
    return await pool.query(
        "INSERT INTO inventory (serial, name, description, quantity, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [serial, name, description, quantity, created_at]
    );
};

export const updateItem = async (id: number, serial: string, name: string, description: string, quantity: number, created_at: Date) => {
    return await pool.query(
        "UPDATE inventory SET serial = $1, name = $2, description = $3, quantity = $4, created_at = $5 WHERE id = $6 RETURNING *",
        [serial, name, description, quantity, created_at, id]
    );
};

export const deleteItem = async (id: number) => {
    return await pool.query(
        "DELETE FROM inventory WHERE id = $1 RETURNING *",
        [id]
    );
};
