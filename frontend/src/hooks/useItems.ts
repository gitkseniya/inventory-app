import axios from 'axios';
import { useState, useCallback } from 'react';

export type InventoryItem = {
  id: number;
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
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:4000/api/items/${itemId}`);
        setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      } catch (error) {
        console.error('Failed to delete the item:', error);
      }
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

  return { items, fetchItems, deleteItem, editItem };
};
