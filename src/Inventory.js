import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';
import './add-record.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);
  const [editingInventory, setEditingInventory] = useState(null);
  const [newInventoryItem, setNewInventoryItem] = useState({
    description: '', supplier: '', quantity: 0, price: 0
  });
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  
  const fetchProductsAndSuppliers = async () => {
    try {
      const productsResponse = await fetch('http://3.130.252.18:5000/products');
      const suppliersResponse = await fetch('http://3.130.252.18:5000/suppliers');
      if (!productsResponse.ok || !suppliersResponse.ok) {
        throw new Error('Network response was not ok.');
      }
      const productsData = await productsResponse.json();
      const suppliersData = await suppliersResponse.json();
      setProducts(productsData);
      setSuppliers(suppliersData);
    } catch (error) {
      console.error('Error fetching products or suppliers:', error);
      setError(error.message);
    }
  };

  const fetchInventory = async () => {
    fetch('http://3.130.252.18:5000/inventory')
      .then(response => {
        if (response.ok) {
	  return response.json();
	}
        throw new Error('Network response was not ok.');
      })
      .then(data => setInventory(data))
      .catch(error => {
        console.error('Error fetching inventory:', error);
	setError(error.message);
      });
  };
  const handleAddInventoryItem = async (item) => {
    try {
      const response = await fetch('http://3.130.252.18:5000/inventory/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInventoryItem),
      });
      if (!response.ok) {
	throw new Error('Network response was not ok.');
      }
      await fetchInventory();
      setNewInventoryItem({ description: '', supplier: '', quantity: 0, price: 0 });
    } catch (error) {
      console.error('Error adding inventory item:', error);
      setError(error.message);
    }
  };
  const handleUpdateInventoryItem = async (inventoryID, updatedItem) => {
    try {
      const response = await fetch(`http://3.130.252.18:5000/inventory/update/${inventoryID}`, {
	method: 'PUT',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
	  productID: updatedItem.productID,
	  supplierID: updatedItem.supplierID,
	  quantity: updatedItem.quantity,
	}),
      });
      if (!response.ok) {
        const errorData = await response.json();
	throw new Error(errorData.message || 'An error occurred while updating the inventory item.');
      }
      await fetchInventory();
      setEditingInventory(null);
      setNewInventoryItem({ description: '', supplier: '', quantity: 0 });
    } catch (error) {
      console.error('Error updating inventory item:', error);
      setError(error.message);
    }
  };
  const handleDeleteInventoryItem = async (inventoryID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this inventory item?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://3.130.252.18:5000/inventory/delete/${inventoryID}`, {
	  method: 'DELETE',
	});
        if (!response.ok) {
	  throw new Error('Network response was not ok.');
	}
	await fetchInventory();
      } catch (error) {
	console.error('Error deleting inventory item:', error);
	setError(error.message);
      }
    }
  };
  const handleSaveInventoryItem = async (e) => {
    e.preventDefault();
    if (editingInventory) {
      await handleUpdateInventoryItem(editingInventory, newInventoryItem);
    } else {
      await handleAddInventoryItem(newInventoryItem);
    }
  };
  const startEditingInventoryItem = (item) => {
    setEditingInventory(item.inventoryID);
    setNewInventoryItem({
      productID: item.productID,
      supplierID: item.supplierID,
      quantity: item.quantity,
    });
  };
  useEffect(() => {
    fetchInventory();
    fetchProductsAndSuppliers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navigation/>
      <div className="tab-content orders-content">
      	<h2>Inventory</h2>
	<div className="add-item-form">
	  <form onSubmit={handleSaveInventoryItem}>
	  {/* Dropdown for selecting Product */}
	    <select 
	      value={newInventoryItem.productID || ''} 
	      onChange={(e) => setNewInventoryItem({ ...newInventoryItem, productID: e.target.value })}
	    >
	      <option value="">Select Product</option>
	      {products.map(product => (
	        <option key={product.productID} value={product.productID}>
	          {product.productName}
		</option>
	      ))}
	    </select>
	  {/* Dropdown for selecting Supplier */}
	    <select
	      value={newInventoryItem.supplierID || ''} 
	      onChange={(e) => setNewInventoryItem({ ...newInventoryItem, supplierID: e.target.value })}
	    >
	      <option value="">Select Supplier</option>
	      {suppliers.map(supplier => (
		<option key={supplier.supplierID} value={supplier.supplierID}>
		  {supplier.supplierName}
		</option>
	      ))}
	    </select>
	  {/* Input for Quantity */}
	    <input 
	      type="number" 
	      placeholder="Quantity" 
	      value={newInventoryItem.quantity} 
	      onChange={(e) => setNewInventoryItem({ ...newInventoryItem, quantity: e.target.value })}
	    />
	  {/* Submit Button */}
	    <button type="submit">{editingInventory ? 'Save Changes' : 'Add Item'}</button>
	  </form>
	</div>
      	<table className="orders-table">
		<thead>
	  	<tr>
	    		<th>ID</th>
	    		<th>Description</th>
	    		<th>Supplier</th>
	    		<th>Quantity</th>
	    		<th>Actions</th>
	  	</tr>
		</thead>
		<tbody>
	  	{inventory.map(item => (
	    	<tr key={item.inventoryID}>
	      		<td>{item.inventoryID}</td>
			<td>{item.productName}</td>
			<td>{item.supplierName}</td>
			<td>{item.quantity}</td>
			<td>
			  <button onClick={() => startEditingInventoryItem(item)}>Edit</button>
			  <button onClick={() => handleDeleteInventoryItem(item.inventoryID)}>Delete</button>
			</td>
	    	</tr>
	  	))}
	 	</tbody>
		</table>
	  	</div>
       		</div>
  );
}

export default Inventory;

