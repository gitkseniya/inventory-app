import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';

interface NewItemModalProps {
    onItemCreated: () => void;
  }
  

  const NewItemModal: React.FC<NewItemModalProps> = ({ onItemCreated }) => {
  const { createItem } = useItems();
  const [newItemData, setNewItemData] = useState({
    name: "",
    description: "",
    serial: "",
    quantity: 1,
    created_at: new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItemData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem(newItemData);
      onItemCreated();
    } catch (error) {
      console.error('Failed to create the item:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"> {/* This is the modal background */}
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"> {/* This is the modal box */}
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            value={newItemData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mb-2 p-2 border-2 border-gray-300 rounded-md w-full"
            required
            />
            <input
            type="text"
            name="description"
            value={newItemData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-2 p-2 border-2 border-gray-300 rounded-md w-full"
            required
            />
            <input
            type="text"
            name="serial"
            value={newItemData.serial}
            onChange={handleChange}
            placeholder="Serial Number"
            className="mb-2 p-2 border-2 border-gray-300 rounded-md w-full"
            required
            />
            <input
            type="number"
            name="quantity"
            value={newItemData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="mb-2 p-2 border-2 border-gray-300 rounded-md w-full"
            required
            />

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Item</button>
          <button type="button" onClick={() => onItemCreated()} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewItemModal;
