import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3306/login', {
        employeeID,
        password
      });
      if (response.data.success) {
        history.push('/homepage');
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Employee ID:
            <input
              type="text"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
