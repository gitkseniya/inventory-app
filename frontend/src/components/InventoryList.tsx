import React, { useEffect } from 'react';
import { useItems } from '../hooks/useItems';

const InventoryList: React.FC = () => {
  const { items, fetchItems, deleteItem } = useItems([]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-bold mb-5">Inventory Items</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Serial Number</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.serial}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button className="text-blue-500 hover:text-blue-700 px-2 py-1">Edit</button>
                <button className="text-red-500 hover:text-red-700 px-2 py-1" onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
