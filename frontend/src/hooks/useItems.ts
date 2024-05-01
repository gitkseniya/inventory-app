import axios from 'axios';
import { useState, useCallback } from 'react';

export type InventoryItem = {
  id?: number | null;
  serial: string;
  name: string;
  description: string;
  quantity: number;
  created_at: Date;
};

export const useItems = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const deleteItem = async (itemId: number) => {
    try {
        await axios.delete(`http://localhost:4000/api/items/${itemId}`);
        setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      } catch (error) {
        console.error('Failed to delete the item:', error);
    }
  };

  const editItem = async (item: InventoryItem) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/items/${item.id}`, item);
      setItems(currentItems => currentItems.map(i => i.id === item.id ? {...i, ...response.data} : i));
    } catch (error) {
      console.error('Failed to edit the item:', error);
    }
  };

  const createItem = async (newItem: InventoryItem) => {
    try {
        const response = await axios.post('http://localhost:4000/api/items', newItem);
        setItems(prevItems => [...prevItems, response.data]); // Assuming response.data is the new item returned by the server with an ID
    } catch (error) {
        console.error('Failed to create the item:', error);
    }
  };

  return { items, fetchItems, deleteItem, editItem, createItem };
};
