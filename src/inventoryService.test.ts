import '@testing-library/jest-dom';
import { findAllItems, createItem, updateItem, deleteItem } from './inventoryService';
import pool from './db';

jest.mock('./db', () => ({
  query: jest.fn()
}));

describe('Inventory Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAllItems returns all items', async () => {
    const mockItems = [{ id: 1, name: 'Laptop', serial: '12345' }];
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockItems });

    const result = await findAllItems();
    expect(result.rows).toEqual(mockItems);  // Change this line
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM inventory");
});

  test('createItem inserts a new item and returns it', async () => {
    const newItem = { serial: '123456', name: 'Mouse', description: 'Wireless Mouse', quantity: 10, created_at: new Date() };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [newItem] });

    const result = await createItem(newItem.serial, newItem.name, newItem.description, newItem.quantity, newItem.created_at);
    expect(result.rows[0]).toEqual(newItem); // Check the first element of the array
    expect(pool.query).toHaveBeenCalled();
  });


  test('updateItem updates an item and returns the updated item', async () => {
    const updatedItem = { id: 1, serial: '123456', name: 'Mouse', description: 'Updated Mouse', quantity: 15, created_at: new Date() };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedItem] });

    const result = await updateItem(updatedItem.id, updatedItem.serial, updatedItem.name, updatedItem.description, updatedItem.quantity, updatedItem.created_at);
    expect(result.rows[0]).toEqual(updatedItem);
    expect(pool.query).toHaveBeenCalled();
  });

  test('deleteItem deletes an item and returns it', async () => {
    const deletedItem = { id: 1 };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [deletedItem] });

    const result = await deleteItem(deletedItem.id);
    expect(result.rows[0]).toEqual(deletedItem);
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM inventory WHERE id = $1 RETURNING *", [deletedItem.id]);
  });
});
