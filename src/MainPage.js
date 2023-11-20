// MainPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';

function MainPage() {
  const location = useLocation();
  const welcomeMessage = location.state?.welcomeMessage;
  
  return (
    <div>
      <Navigation welcomeMessage={welcomeMessage} />
    </div>
  );
}

export default MainPage;
