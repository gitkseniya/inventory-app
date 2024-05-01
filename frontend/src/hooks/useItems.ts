import axios from 'axios';
import { useCallback, useState } from 'react';

type InventoryItem = {
  id: number;
  serial: string;
  name: string;
  description: string;
  quantity: number;
  created_at: Date;
};

export const useItems = (initialItems: InventoryItem[]) => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);

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

  return { items, fetchItems, deleteItem };
};

