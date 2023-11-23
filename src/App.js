import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import MainPage from './MainPage.js';
import Orders from './Orders.js';
import Shipments from './Shipments.js';
import Inventory from './Inventory.js';
import Customers from './Customers.js';
import Products from './Products.js';
import Suppliers from './Suppliers.js';
import Employees from './Employees.js';
import Payments from './Payments.js';


function App() {
  return (
    <Router>
	<Routes>
	  <Route path="/login" exact element={<LoginPage />} />
	  <Route path="/main" exact element={<MainPage />} />
	  <Route path="/orders" element={<Orders />} />
	  <Route path="/shipments" element={<Shipments />} />
	  <Route path="/inventory" element={<Inventory />} />
	  <Route path="/customers" element={<Customers />} />
	  <Route path="/products" element={<Products />} />
	  <Route path="/suppliers" element={<Suppliers />} />
	  <Route path="/employees" element={<Employees />} />
	  <Route path="/payments" element={<Payments />} />
	  <Route path="/" element={<LoginPage />} />
	</Routes>
    </Router>
  );
}

export default App;
