import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Orders() {
	const [orders, setOrders] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [newOrder, setNewOrder] = useState({
	  employeeID: '',
	  customerID: '',
	  amount: '',
	  status: 'In Queue'
	});
	const [editingOrderID, setEditingOrderID] = useState(null);
	const [error, setError] = useState(null);

	  useEffect(() => {
		fetchOrders();
    	fetchEmployees();
    	fetchCustomers();
	  }, []);

	// Fetch Orders
	const fetchOrders = async () => {
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
	};

	// Fetch Employees
	const fetchEmployees = async () => {
		try {
			const response = await fetch('http://3.130.252.18:5000/employees');
			if (!response.ok) {
			  throw new Error('Network response was not ok.');
			}
			const data = await response.json();
			setEmployees(data);
		} catch (error) {
			console.error('Error fetching employees:', error);
			setError(error.message);
		}
	};

	// Fetch Customers
	const fetchCustomers = async () => {
		try {
			const response = await fetch('http://3.130.252.18:5000/customers');
			if (!response.ok) {
			  throw new Error('Network response was not ok.');
			}
			const data = await response.json();
			setCustomers(data);
		} catch (error) {
			console.error('Error fetching customers:', error);
			setError(error.message);
		}
	};

	// Handle Add/Update Order
	const handleSaveOrder = async (e) => {
		e.preventDefault();
		const orderData = {
			employeeID: newOrder.employeeID,
			customerID: newOrder.customerID,
			amount: newOrder.amount,
			status: newOrder.status || 'In Queue',
			...(editingOrderID ? {} : { orderDate: new Date().toISOString().slice(0, 10).replace('T', ' ') })
		};

		try {
			let response;
			if (editingOrderID) {
			// Call update order logic
			response = await fetch(`http://3.130.252.18:5000/order/${editingOrderID}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData)
			});
			delete orderData.orderDate;
			} else {
			// Call add order logic
			response = await fetch('http://3.130.252.18:5000/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData)
			});
			}

			if (!response.ok) {
			throw new Error('Network response was not ok.');
			}

			const data = await response.json();
			console.log(data.message); // Log the response message

			// After a successful add or update, fetch the latest orders
			await fetchOrders();
			// Reset the form to default state
			setNewOrder({ employeeID: '', customerID: '', amount: '', status: 'In Queue' });
			setEditingOrderID(null); // Exit editing mode
		} catch (error) {
			console.error('Error saving order:', error);
			setError(error.message);
		}
	};
	const startEditingOrder = (order) => {
		setEditingOrderID(order.orderID);
		setNewOrder({
		  employeeID: order.employeeID ? order.employeeID.toString() : '',
		  customerID: order.customerID ? order.customerID.toString() : '',
		  amount: order.amount ? order.amount.toString() : '',
		  status: order.status ? order.status : 'In Queue'
		});
	};
	const cancelEditing = () => {
		setEditingOrderID(null);
		setNewOrder({ employeeID: '', customerID: '', amount: '', status: 'In Queue' });
	};
	const handleDeleteOrder = async (orderID) => {
		if (window.confirm("Are you sure you want to delete this order?")) {
		  try {
			const response = await fetch(`http://3.130.252.18:5000/order/${orderID}`, {
			  method: 'DELETE',
			});
			if (!response.ok) {
			  throw new Error('Network response was not ok.');
			}
			// Remove the deleted order from the state
			setOrders(orders.filter((order) => order.orderID !== orderID));
		  } catch (error) {
			console.error('Error deleting order:', error);
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
	      	<h2>Orders List</h2>
			<div className="add-item-form">
				<form onSubmit={handleSaveOrder}>
				<select
				value={newOrder.employeeID}
				onChange={(e) => setNewOrder({ ...newOrder, employeeID: e.target.value })}
				>
				<option value="">Select Employee</option>
				{employees.map(employee => (
					<option key={employee.employeeID} value={employee.employeeID}>
					{employee.employeeName}
					</option>
				))}
				</select>
				<select
				value={newOrder.customerid}
				onChange={(e) => {
					console.log(e.target.value);
					setNewOrder({ ...newOrder, customerID: e.target.value });
				}}
				>
				<option value="">Select Customer</option>
				{customers.map((customer) => (
					<option key={customer.customerid} value={customer.customerid}>
						{customer.name}
					</option>
				))}
				</select>
				<input
				type="number"
				placeholder="Amount"
				value={newOrder.amount}
				onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
				/>
				<input
				type="text"
				placeholder="Status"
				value={newOrder.status}
				onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
				/>
				<button type="submit">{editingOrderID ? 'Save Changes' : 'Add Order'}</button>
			</form>
			</div>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Employee</th>
		    		<th>Customer</th>
		    		<th>Order Date</th>
		    		<th>Amount</th>
		    		<th>Status</th>
					<th>Actions</th>
		  	</tr>
			</thead>
			<tbody>
		  	{orders.map(order => (
		    	<tr key={order.orderID}>
		      		<td>{order.orderID}</td>
		      		<td>{order.employeeName}</td>
		      		<td>{order.customerName}</td>
		      		<td>{formatDate(order.orderDate)}</td>
		      		<td>${formatAmount(order.amount)}</td>
		      		<td>{order.status}</td>
					<td>
						<button onClick={() => startEditingOrder(order)}>Edit</button>
						<button onClick={() => handleDeleteOrder(order.orderID)}>Delete</button>
					</td>
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
function formatDate(dateString) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Adjust according to your needs
	return new Date(dateString).toLocaleDateString(undefined, options);
}

export default Orders;

