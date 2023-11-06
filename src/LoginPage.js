import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // import css of page

const LoginPage = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [error, setError] = useState(''); // State to hold the error message
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://3.130.252.18:5000/login', { employeeID });
      console.log('Login successful:', response.data.message);
      navigate('/main', {state: {welcomeMessage: response.data.message}}); // Use navigate to redirect to MainPage.js
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred while attempting to login.');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
	{error && <div className="error-message">{error}</div>} {/* Display the error message here */}
      </form>
    </div>
  );
};

export default LoginPage;

