import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import MainPage from './MainPage.js';

function App() {
  return (
    <Router>
	<Routes>
	  <Route path="/login" exact element={<LoginPage />} />
	  <Route path="/main" exact element={<MainPage />} />
	  <Route path="/" element={<LoginPage />} />
	</Routes>
    </Router>
  );
}

export default App;
