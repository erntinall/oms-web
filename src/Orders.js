import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Orders() {
	  const [orders, setOrders] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetch('http://3.130.252.18:5000/orders')
	      .then(response => {
	        if (response.ok) {
		  return response.json();
		}
		throw new Error('Network response was not ok.');
	      })
	      .then(data => setOrders(data))
	      .catch(error => {
	        console.error('Error fetching orders:', error);
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
	      	<h2>Orders List</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>Order ID</th>
		    		<th>Employee ID</th>
		    		<th>Customer ID</th>
		    		<th>Order Date</th>
		    		<th>Amount</th>
		    		<th>Status</th>
		  	</tr>
			</thead>
			<tbody>
		  	{orders.map(order => (
		    	<tr key={order.orderID}>
		      		<td>{order.orderID}</td>
		      		<td>{order.employeeID}</td>
		      		<td>{order.customerID}</td>
		      		<td>{order.orderDate}</td>
		      		<td>${formatAmount(order.amount)}</td>
		      		<td>{order.status}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}
function formatAmount(amount){
	return isNaN(amount) ? '0.00' : parseFloat(amount).toFixed(2);
}

export default Orders;

