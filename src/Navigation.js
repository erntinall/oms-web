// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainPage.css';

function Navigation({ welcomeMessage }) {
	return (
	  <>
	    <nav>
	      <ul>
		<li><NavLink to="/customers">Customers</NavLink></li>
		<li><NavLink to="/orders">Orders</NavLink></li>
		<li><NavLink to="/products">Products</NavLink></li>
		<li><NavLink to="/inventory">Inventory</NavLink></li>
		<li><NavLink to="/shipments">Shipments</NavLink></li>
		<li><NavLink to="/suppliers">Suppliers</NavLink></li>
		<li><NavLink to="/employees">Employees</NavLink></li>
		<li><NavLink to="/payments">Payments</NavLink></li>
		<li><NavLink to="/sales-channels">Sales Channels</NavLink></li>
	      </ul>
	    </nav>
	    {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
	  </>
	);
}
export default Navigation;
