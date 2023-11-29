import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Suppliers() {
	  const [suppliers, setSuppliers] = useState([]);
	  const [newSupplier, setNewSupplier] = useState({
		supplierName: '',
		contactInfo: ''
	  });
	  const [editingSupplierID, setEditingSupplierID] = useState(null);
  	  const [isEditing, setIsEditing] = useState(false);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetchSuppliers();
	  }, []);
	  const fetchSuppliers = async () => {
		fetch('http://3.130.252.18:5000/suppliers')
	      .then(response => {
	        if (response.ok) {
		  return response.json();
		}
		throw new Error('Network response was not ok.');
	      })
	      .then(data => setSuppliers(data))
	      .catch(error => {
	        console.error('Error fetching Suppliers:', error);
		setError(error.message);
	      });
	  }
	  const handleSaveSupplier = async (e) => {
        e.preventDefault();

        const supplierData = {
            supplierName: newSupplier.supplierName,
            contactInfo: newSupplier.contactInfo
        };

        try {
            let response;
            if (isEditing && editingSupplierID) {
                // Update existing supplier
                response = await fetch(`http://3.130.252.18:5000/suppliers/${editingSupplierID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(supplierData)
                });
            } else {
                // Add new supplier
                response = await fetch('http://3.130.252.18:5000/suppliers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(supplierData)
                });
            }

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            console.log(data.message); // Log the response message

            // Fetch the latest suppliers
            await fetchSuppliers();

            // Reset form to default state
            setNewSupplier({ supplierName: '', contactInfo: '' });
            setIsEditing(false);
            setEditingSupplierID(null);
        } catch (error) {
            console.error('Error saving supplier:', error);
            setError(error.message);
        }
    };
	  const handleDeleteSupplier = async (supplierID) => {
		if (window.confirm("Are you sure you want to delete this supplier?")) {
		  try {
			const response = await fetch(`http://3.130.252.18:5000/suppliers/${supplierID}`, {
			  method: 'DELETE',
			});
			if (!response.ok) {
			  throw new Error('Network response was not ok.');
			}
			// Remove the deleted supplier from the state
			setSuppliers(suppliers.filter((supplier) => supplier.supplierID !== supplierID));
		  } catch (error) {
			console.error('Error deleting supplier:', error);
			setError(error.message);
		  }
		}
	  };
	  const startEditingSupplier = (supplier) => {
		setEditingSupplierID(supplier.supplierID);
		setIsEditing(true);
		setNewSupplier({
		  supplierName: supplier.supplierName,
		  contactInfo: supplier.contactInfo
		});
	  };

	  if (error) {
	    return <div>Error: {error}</div>;
	  }

	  return (
	    <div>
	      <Navigation/>
	      <div className="tab-content orders-content">
	      	<h2>Suppliers</h2>
			  <div className="add-item-form">
                    <form onSubmit={handleSaveSupplier}>
                        <input
                            type="text"
                            placeholder="Supplier Name"
                            value={newSupplier.supplierName}
                            onChange={(e) => setNewSupplier({ ...newSupplier, supplierName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Contact Info"
                            value={newSupplier.contactInfo}
                            onChange={(e) => setNewSupplier({ ...newSupplier, contactInfo: e.target.value })}
                        />
                        <button type="submit">{isEditing ? 'Update' : 'Add'} Supplier</button>
                    </form>
                </div>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Name</th>
		    		<th>Contact</th>
					<th>Actions</th>
		  	</tr>
			</thead>
			<tbody>
		  	{suppliers.map(supplier => (
		    	<tr key={supplier.supplierID}>
					<td>{supplier.supplierID}</td>
		      		<td>{supplier.supplierName}</td>
		      		<td>{supplier.contactInfo}</td>
					<td>
						<button onClick={() => startEditingSupplier(supplier)}>Edit</button>
						<button onClick={() => handleDeleteSupplier(supplier.supplierID)}>Delete</button>
					</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Suppliers;
