import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Customers() {
	  const [customers, setCustomers] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetch('http://3.130.252.18:5000/customers')
	      .then(response => {
	        if (response.ok) {
		  return response.json();
		}
		throw new Error('Network response was not ok.');
	      })
	      .then(data => setCustomers(data))
	      .catch(error => {
	        console.error('Error fetching Customers:', error);
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
	      	<h2>Customers</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Name</th>
		    		<th>Email</th>
		    		<th>Phone</th>
		  	</tr>
			</thead>
			<tbody>
		  	{customers.map(customer => (
		    	<tr key={customer.customerid}>
				<td>{customer.customerid}</td>
		      		<td>{customer.name}</td>
		      		<td>{customer.email}</td>
		      		<td>{customer.phone}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Customers;
