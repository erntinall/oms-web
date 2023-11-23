import React, { useState, useEffect } from 'react';
import Navigation from './Navigation'
import './MainPage.css';
import './Table.css';

function Employees() {
	  const [employees, setEmployees] = useState([]);
	  const [error, setError] = useState(null);

	  useEffect(() => {
	    fetch('http://3.130.252.18:5000/employees')
	      .then(response => {
	        if (response.ok) {
		  return response.json();
		}
		throw new Error('Network response was not ok.');
	      })
	      .then(data => setEmployees(data))
	      .catch(error => {
	        console.error('Error fetching Employees:', error);
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
	      	<h2>Employees</h2>
	      	<table className="orders-table">
			<thead>
		  	<tr>
		    		<th>ID</th>
		    		<th>Name</th>
		    		<th>Role</th>
		  	</tr>
			</thead>
			<tbody>
		  	{employees.map(employee => (
		    	<tr key={employee.employeeID}>
				<td>{employee.employeeID}</td>
		      		<td>{employee.employeeName}</td>
		      		<td>{employee.employeeRank}</td>
		    	</tr>
		  	))}
		 	</tbody>
			</table>
		  	</div>
	       		</div>
	      	);
}

export default Employees;
