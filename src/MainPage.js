// MainPage.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const location = useLocation();
  const welcomeMessage = location.state?.welcomeMessage;
  
  return (
    <div>
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
	    {/* Add more tabs as needed for each section of the database */}
	  </ul>
      </nav>
      {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
    </div>
  );
}

export default MainPage;
