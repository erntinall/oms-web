import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';
import './add-record.css';

function Customers() {
	  const [customers, setCustomers] = useState([]);
	  const [error, setError] = useState(null);
	  // EDIT and DELETE operations
	  const [editingCustomer, setEditingCustomer] = useState(null);
	  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
	
	const startEditingCustomer = (customer) => {
	  setEditingCustomer(customer.customerid);
	  setNewCustomer({ name: customer.name, email: customer.email, phone: customer.phone });
	};

	// READ 
	useEffect(() => {
		fetchCustomers();
	  }, []);
	
	  const fetchCustomers = async () => {
		try {
		  const response = await fetch('http://3.130.252.18:5000/customers');
		  if (!response.ok) throw new Error('Network response was not ok.');
		  const data = await response.json();
		  setCustomers(data);
		} catch (error) {
		  console.error('Error fetching Customers:', error);
		  setError(error.message);
		}
	  };
	// This function decides whether to add a new customer or update an existing one
	const handleSaveCustomer = async (e) => {
	  e.preventDefault();
	  if (editingCustomer) {
	    await handleUpdateCustomer(editingCustomer, newCustomer);
	  } else {
	    await handleAddCustomer(newCustomer);
	  }
	};
	

	// ADD; init code by AF, cleared out by EA
	const handleAddCustomer = async (customer) => {
	  try {
	    await fetch('http://3.130.252.18:5000/customers/add', {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(customer),
	    });
	    setNewCustomer({ name: '', email: '', phone: '' }); // Reset the newCustomer state
	    fetchCustomers();
	  } catch (error) {
	  console.error('Error adding customer:', error);
	  setError(error.message);
	  }
	};
	// UPDATE
	const handleUpdateCustomer = async (customerID, customer) => {
	  try {
	    await fetch(`http://3.130.252.18:5000/customers/update/${customerID}`, {
	      method: 'PUT',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(customer),
	    });
	    setEditingCustomer(null);
	    setNewCustomer({ name: '', email: '', phone: '' }); // Reset the form
	    fetchCustomers();
	  } catch (error) {
	    console.error('Error updating customer:', error);
	    setError(error.message);
	  }
	};

	// DELETE with confirmation; AF did init delete function, EA tweaked with confirmation and backend connection..
	const handleDeleteCustomer = async (customerID) => {
		const confirmDelete = window.confirm("Deleting this customer will also delete all related records. Are you sure you want to proceed?");
		if (confirmDelete) {
			try {
			await fetch(`http://3.130.252.18:5000/customers/delete/${customerID}`, {
				method: 'DELETE',
			});
			fetchCustomers();
			} catch (error) {
			console.error('Error deleting customer:', error);
			setError(error.message);
			}
		}
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
	    <div>
	      <Navigation/>
	      <div className="tab-content orders-content">
	      	<h2>Customers</h2>
		    <div className="add-item-form">	
			<form onSubmit={handleSaveCustomer}>
				<input
					type="text"
					placeholder="Name"
					value={newCustomer.name}
					onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
				/>
				<input
					type="email"
					placeholder="Email"
					value={newCustomer.email}
					onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
				/>
				<input
					type="tel"
					placeholder="Phone"
					value={newCustomer.phone}
					onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
				/>
				<button type="submit">{editingCustomer ? 'Save Changes' : 'Add Customer'}</button>
       		 	</form>
		    </div>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Name</th>
		    		<th>Email</th>
		    		<th>Phone</th>
					<th>Actions</th>
		  	</tr>
			</thead>
			<tbody>
		  	{customers.map(customer => (
		    	editingCustomer === customer.customerid ? (
					<tr key={customer.customerid}>
					  <form onSubmit={(e) => handleUpdateCustomer(e, customer.customerid)}>
						<td>{customer.customerid}</td>
						<td><input value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} name="name" /></td>
						<td><input value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} name="email" type="email" /></td>
						<td><input value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} name="phone" type="tel" /></td>
						<td>
						  <button type="submit">Update</button>
						  <button onClick={() => setEditingCustomer(null)}>Cancel</button>
						</td>
					  </form>
					</tr>
				  ) : (
					<tr key={customer.customerid}>
					  <td>{customer.customerid}</td>
					  <td>{customer.name}</td>
					  <td>{customer.email}</td>
					  <td>{customer.phone}</td>
					  <td>
						<button onClick={() => startEditingCustomer(customer)}>Edit</button>
						<button onClick={() => handleDeleteCustomer(customer.customerid)}>Delete</button>
					  </td>
					</tr>
				  )
				))}
			  </tbody>
			</table>
		  </div>
		</div>
	  );
	}

export default Customers;
