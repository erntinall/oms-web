const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'AbdulFawy23!',
  database: 'dbsystems'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.get('/getEmployeeName', (req, res) => {
  const employeeID = req.query.employeeID;
  
  if (!employeeID) {
    return res.status(400).send('Employee ID is required');
  }

  const query = 'SELECT employeeName FROM employee WHERE employeeID = ?';
  connection.query(query, [employeeID], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching employee name');
    }
    
    if (results.length > 0) {
      res.json({ name: results[0].name });
    } else {
      res.status(404).send('Employee not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
