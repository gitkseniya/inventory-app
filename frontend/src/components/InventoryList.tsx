import React, { useEffect, useState } from 'react';
import { InventoryItem, useItems } from '../hooks/useItems';
import NewItemModal from './NewItemModal'; 

const InventoryList: React.FC = () => {
  const { items, fetchItems, deleteItem, editItem, createItem } = useItems();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<InventoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  
  const [newItemData, setNewItemData] = useState<Omit<InventoryItem, 'id'>>({
  name: "",
  description: "",
  serial: "",
  quantity: 1,
  created_at: new Date()
});

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleEditClick = (item: InventoryItem) => {
    if (item.id != null) { 
      setEditingId(item.id);
      setEditFormData(item);
    } else {
      console.error("Attempted to edit item without a valid ID");
    }
  };
  
  const handleDelete = async (item: InventoryItem) => {
    if (item.id == null) {
      console.error("Attempted to delete an item without a valid ID.");
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(item.id);
        fetchItems();
      } catch (error) {
        console.error('Failed to delete the item:', error);
      }
    }
  };
  
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InventoryItem) => {
    setEditFormData({
      ...editFormData!,
      [field]: field === 'quantity' ? parseInt(e.target.value, 10) : e.target.value
    });
  };

  const onItemCreated = () => {
    fetchItems();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const saveChanges = async () => {
    if (editFormData) {
      await editItem(editFormData);
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col items-start">
      <h1 className="text-xl font-bold mb-5">Inventory Items</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4"
      >
        Add New Item
      </button>
      {showModal && <NewItemModal onItemCreated={onItemCreated} onCancel={handleCancel} />}
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
              {editingId === item.id ? (
                <>
                  <td className="px-4 py-2"><input type="text" value={editFormData!.name} onChange={(e) => handleFieldChange(e, 'name')} className="form-input rounded-md" /></td>
                  <td className="px-4 py-2"><input type="text" value={editFormData!.description} onChange={(e) => handleFieldChange(e, 'description')} className="form-input rounded-md" /></td>
                  <td className="px-4 py-2"><input type="text" value={editFormData!.serial} onChange={(e) => handleFieldChange(e, 'serial')} className="form-input rounded-md" /></td>
                  <td className="px-4 py-2"><input type="number" value={editFormData!.quantity} onChange={(e) => handleFieldChange(e, 'quantity')} className="form-input rounded-md" /></td>
                  <td className="px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700 px-2 py-1" onClick={saveChanges}>Save</button>
                    <button className="text-gray-500 hover:text-gray-700 px-2 py-1" onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{item.serial}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700 px-2 py-1" onClick={() => handleEditClick(item)}>Edit</button>
                    <button className="text-red-500 hover:text-red-700 px-2 py-1" onClick={() => handleDelete(item)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
