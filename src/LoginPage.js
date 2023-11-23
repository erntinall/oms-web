import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // import css of page

const LoginPage = () => {
  const [employeeID, setEmployeeID] = useState(''); // State to hold employeeID
  const [password, setPassword] = useState(''); // State to hold password val\
  const [newPassword, setNewPassword] = useState('');
  const [verifyNewPassword, setVerifyNewPassword] = useState('');
  const [error, setError] = useState(''); // State to hold the error message
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    if (!employeeID) {
      setError('Please enter Employee ID.');
      return;
    }
    try {
      const response = await axios.post('http://3.130.252.18:5000/login', { employeeID, password });
      if (response.status == 200){
	console.log('Login successful:', response.data.message);
        navigate('/main', {state: {welcomeMessage: response.data.message}});
        setIsLoggedIn(true);
      }
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

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (newPassword !== verifyNewPassword) {
      setError('New passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://3.130.252.18:5000/change-password', {
	employeeID,
	oldPassword: password,
	newPassword
      });
      console.log('Password change successful:', response.data.message);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred while attempting to change the password.');
    }
  };
  const showChangePasswordForm = () => {
    if (!employeeID) {
      setError('You must be logged in to change your password.');
      return;
    }
    setIsChangingPassword(true);
    setError('');
  };
  const showLoginForm = () => {
    setIsChangingPassword(false);
    setError('');
  };

  return (
    <div className="login-container">
      {isChangingPassword ? (
	// Password change
	<form onSubmit={handlePasswordChange} className="login-form">
	  <label>
	    Old Password:
	    <input
	      type="password"
	      value={password}
	      onChange={(e) => setPassword(e.target.value)}
	    />
	  </label>
	  <label>
	    New Password:
	    <input
	      type="password"
	      value={newPassword}
	      onChange={(e) => setNewPassword(e.target.value)}
	    />
	  </label>
	  <label>
	    Verify New Password:
	    <input
	      type="password"
	      value={verifyNewPassword}
	      onChange={(e) => setVerifyNewPassword(e.target.value)}
	    />
	  </label>
	  <button type="submit">Submit New Password</button>
	  <button type="button" onClick={showLoginForm} className="cancel-change-password-button">Cancel</button>
	</form>
      ) : (
	// Login Form
        <form onSubmit={handleLogin} className="login-form">
          <label>
            Employee ID:
            <input
              type="text"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
          </label>
	  <label>
	    Password:
	    <input
	      type="password"
	      value={password}
	      onChange={(e) => setPassword(e.target.value)}
	    />
	  </label>
	  <div className="login-actions">
            <button type="submit">Login</button>
	    <button type="button" onClick={showChangePasswordForm} className="change-password-button" disabled={employeeID.trim().length === 0}>Change Password</button>
	  </div>
	  {error && <div className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default LoginPage;

