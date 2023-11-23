import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Payments() {
	  const [payments, setPayments] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetch('http://3.130.252.18:5000/payments')
	      .then(response => {
	        if (response.ok) {
		  return response.json();
		}
		throw new Error('Network response was not ok.');
	      })
	      .then(data => setPayments(data))
	      .catch(error => {
	        console.error('Error fetching Payments:', error);
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
	      	<h2>Payments</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Order</th>
		    		<th>Payment Method</th>
		  		<th>Amount</th>
		  	</tr>
			</thead>
			<tbody>
		  	{payments.map(payment => (
		    	<tr key={payment.paymentID}>
				<td>{payment.paymentID}</td>
		      		<td>{payment.orderID}</td>
		      		<td>{payment.paymentType}</td>
				<td>{payment.amount}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Payments;
