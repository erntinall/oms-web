// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainPage.css';
import { useAuth } from './AuthContext';

function Navigation({ welcomeMessage, role }) {
	const { user } = useAuth();
  	const isManager = user.role === "Manager";
	return (
	  <>
	    <nav>
	      <ul>
			{/* Always visible */}
			<li><NavLink to="/orders">Orders</NavLink></li>
            <li><NavLink to="/inventory">Inventory</NavLink></li>
            <li><NavLink to="/shipments">Shipments</NavLink></li>
            <li><NavLink to="/suppliers">Suppliers</NavLink></li>

            {/* Visible only to Managers */}
            {isManager && <li><NavLink to="/customers">Customers</NavLink></li>}
            {isManager && <li><NavLink to="/products">Products</NavLink></li>}
            {isManager && <li><NavLink to="/employees">Employees</NavLink></li>}
            {isManager && <li><NavLink to="/payments">Payments</NavLink></li>}
	      </ul>
	    </nav>
	    {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
	  </>
	);
}
export default Navigation;
