// MainPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';

function MainPage() {
  const location = useLocation();
  const welcomeMessage = location.state?.welcomeMessage;
  // Extract the role from location.state
  const role = location.state?.role;
  
  return (
    <div>
      <Navigation welcomeMessage={welcomeMessage} role={role}/>
    </div>
  );
}

export default MainPage;
