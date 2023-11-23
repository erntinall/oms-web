import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Shipments() {
	  const [shipments, setShipments] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetch('http://3.130.252.18:5000/shipments')
	      .then(response => {
	        if (response.ok) {
		  return response.json();
		}
		throw new Error('Network response was not ok.');
	      })
	      .then(data => setShipments(data))
	      .catch(error => {
	        console.error('Error fetching Shipments:', error);
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
	      	<h2>Shipments</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Order</th>
		    		<th>Date Shipped</th>
		    		<th>Shipment Progress</th>
		  	</tr>
			</thead>
			<tbody>
		  	{shipments.map(shipment => (
		    	<tr key={shipment.shipmentID}>
		      		<td>{shipment.shipmentID}</td>
		      		<td>{shipment.orderID}</td>
		      		<td>{shipment.shipmentDate}</td>
				<td>{shipment.tracking}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Shipments;

