import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Suppliers() {
	  const [suppliers, setSuppliers] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
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
	  }, []);

	  if (error) {
	    return <div>Error: {error}</div>;
	  }

	  return (
	    <div>
	      <Navigation/>
	      <div className="tab-content orders-content">
	      	<h2>Suppliers</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Name</th>
		    		<th>Contact</th>
		  	</tr>
			</thead>
			<tbody>
		  	{suppliers.map(supplier => (
		    	<tr key={supplier.supplierID}>
				<td>{supplier.supplierID}</td>
		      		<td>{supplier.supplierName}</td>
		      		<td>{supplier.contactInfo}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Suppliers;
