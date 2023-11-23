import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Inventory() {
	  const [inventory, setInventory] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
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
	  }, []);

	  if (error) {
	    return <div>Error: {error}</div>;
	  }

	  return (
	    <div>
	      <Navigation/>
	      <div className="tab-content orders-content">
	      	<h2>Inventory</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Description</th>
		    		<th>Supplier</th>
		    		<th>Quantity</th>
		    		<th>Amount</th>
		  	</tr>
			</thead>
			<tbody>
		  	{inventory.map(item => (
		    	<tr key={item.inventoryID}>
		      		<td>{item.inventoryID}</td>
				<td>{item.productName}</td>
				<td>{item.supplierName}</td>
				<td>{item.quantity}</td>
				<td>${typeof item.amount === 'number' ? item.amount.toFixed(2) : '0.00'}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Inventory;

