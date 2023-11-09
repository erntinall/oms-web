import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
	const fetchOrders = async () => {
	  setLoading(true);
	  try {
	    const response = await axios.get('http://localhost:5000/orders');
	    setOrders(response.data);
	  } catch (error) {
	    console.error('Error fetching orders:', error);
	  }
	  setLoading(false);
	}
	fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
      try {
        const response = await axios.put(`http://localhost:5000/order/${orderId}`, { status: newStatus });
	console.log(response.data.message);
	setOrders(orders.map(order => order.orderID === orderId ? { ...order, status: newStatus } : order));
      } catch (error) {
	console.error('Error updating order status:', error);
      }
    };
   return ( 
	<div>
	  <h1>Orders</h1>
	  {loading ? (
	    <p>Loading orders...</p>
	  ) : (
	    <table>
	      <thead>
		<tr>
		  <th>Order ID</th>
		  <th>Employee ID</th>
		  <th>Customer ID</th>
		  <th>Order Date</th>
		  <th>Amount</th>
		  <th>Status</th>
		  <th>Update Status</th>
		</tr>
	      </thead>
	    <tbody>
	      {orders.map(order => (
	        <tr key={order.orderID}>
		  <td>{order.orderID}</td>
		  <td>{order.employeeID}</td>
		  <td>{order.customerID}</td>
		  <td>{order.orderDate}</td>
		  <td>${order.amount}</td>
		  <td>{order.status}</td>
		  <td>
		    <select
		      value={order.status}
		      onChange={(e) => updateOrderStatus(order.orderID, e.target.value)}
		    >
		      <option value="Processing">Processing</option>
		      <option value="Shipped">Shipped</option>
		      <option value="Cancelled">Cancelled</option>
		    </select>
		  </td>
		</tr>
	      ))}
	    </tbody>
	  </table>
	)}
      </div>
    );
};

export default Orders;
