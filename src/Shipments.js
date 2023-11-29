import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Shipments() {
	  const [shipments, setShipments] = useState([]);
	  const [orders, setOrders] = useState([]);
	  const [newShipment, setNewShipment] = useState({
		orderID: '',
		shipmentDate: new Date().toISOString().slice(0, 10),
		tracking: ''
	  });
	  const [editingShipmentID, setEditingShipmentID] = useState(null);
  	  const [isEditing, setIsEditing] = useState(false);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetchShipments();
		fetchOrders();
	  }, []);
	  const fetchShipments = async () => {
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
	  };
	  const fetchOrders = async () => {
		try {
		  const response = await fetch('http://3.130.252.18:5000/orders');
		  if (!response.ok) {
			throw new Error('Network response was not ok.');
		  }
		  const data = await response.json();
		  setOrders(data);
		} catch (error) {
		  console.error('Error fetching orders:', error);
		  setError(error.message);
		}
	  };
	  const handleSaveShipment = async (e) => {
		e.preventDefault();

		let formattedDate;
		if (newShipment.shipmentDate) {
			const parsedDate = new Date(newShipment.shipmentDate);
			formattedDate = parsedDate.toISOString().split('T')[0];
		}
	  
		const shipmentData = {
		  orderID: newShipment.orderID,
		  shipmentDate: formattedDate || newShipment.shipmentDate,
		  tracking: newShipment.tracking
		};
	  
		try {
		  let response;
		  if (isEditing && editingShipmentID) {
			// Update existing shipment
			response = await fetch(`http://3.130.252.18:5000/shipment/${editingShipmentID}`, {
			  method: 'PUT',
			  headers: { 'Content-Type': 'application/json' },
			  body: JSON.stringify(shipmentData)
			});
		  } else {
			// Add new shipment
			response = await fetch('http://3.130.252.18:5000/shipments', {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			  body: JSON.stringify(shipmentData)
			});
		  }
	  
		  if (!response.ok) {
			throw new Error('Network response was not ok.');
		  }
	  
		  const data = await response.json();
		  console.log(data.message); // Log the response message
	  
		  // After a successful add or update, fetch the latest shipments
		  await fetchShipments();
	  
		  // Reset the form to default state
		  setNewShipment({ orderID: '', shipmentDate: new Date().toISOString().slice(0, 10), tracking: '' });
		  setIsEditing(false);
		  setEditingShipmentID(null);
		} catch (error) {
		  console.error('Error saving shipment:', error);
		  setError(error.message);
		}
	  };
	  const handleDeleteShipment = async (shipmentID) => {
		if (window.confirm("Are you sure you want to delete this shipment?")) {
		  try {
			const response = await fetch(`http://3.130.252.18:5000/shipment/${shipmentID}`, {
			  method: 'DELETE',
			});
			if (!response.ok) {
			  throw new Error('Network response was not ok.');
			}
			// Remove the deleted shipment from the state
			setShipments(shipments.filter((shipment) => shipment.shipmentID !== shipmentID));
		  } catch (error) {
			console.error('Error deleting shipment:', error);
			setError(error.message);
		  }
		}
	  };
	  const startEditingShipment = (shipment) => {
		setEditingShipmentID(shipment.shipmentID);
		setIsEditing(true);
		setNewShipment({
		  orderID: shipment.orderID.toString(),
		  shipmentDate: shipment.shipmentDate,
		  tracking: shipment.tracking
		});
	  };
	  const cancelEditing = () => {
		setIsEditing(false);
		setEditingShipmentID(null);
		// Reset newShipment state
	  };

	  if (error) {
	    return <div>Error: {error}</div>;
	  }

	  return (
	    <div>
	      <Navigation/>
	      <div className="tab-content orders-content">
	      	<h2>Shipments</h2>
			  <div className="add-item-form">
				<form onSubmit={handleSaveShipment}>
					<select
						value={newShipment.orderID}
						onChange={(e) => setNewShipment({ ...newShipment, orderID: e.target.value })}
						>
						<option value="">Select Order</option>
						{orders.map(order => (
							<option key={order.orderID} value={order.orderID}>
							{order.orderID}
							</option>
						))}
					</select>
					<input
					type="text"
					placeholder="Shipment Date"
					value={formatDate(newShipment.shipmentDate)}
					readOnly
					/>
					<input
					type="text"
					placeholder="Tracking"
					value={newShipment.tracking}
					onChange={(e) => setNewShipment({ ...newShipment, tracking: e.target.value })}
					/>
					<button type="submit">Add Shipment</button>
				</form>
			  </div>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Order</th>
		    		<th>Date Shipped</th>
		    		<th>Shipment Progress</th>
					<th>Actions</th>
		  	</tr>
			</thead>
			<tbody>
		  	{shipments.map(shipment => (
		    	<tr key={shipment.shipmentID}>
		      		<td>{shipment.shipmentID}</td>
		      		<td>{shipment.orderID}</td>
		      		<td>{formatDate(shipment.shipmentDate)}</td>
					<td>{shipment.tracking}</td>
					<td>
						<button onClick={() => startEditingShipment(shipment)}>Edit</button>
						<button onClick={() => handleDeleteShipment(shipment.shipmentID)}>Delete</button>
					</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}
function formatDate(dateString) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Adjust according to your needs
	return new Date(dateString).toLocaleDateString(undefined, options);
}

export default Shipments;

