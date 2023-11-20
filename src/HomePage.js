import React from 'react';

const HomePage = () => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`${process.env.PUBLIC_URL}/homepage.html`}
      title="Home Page" 
      style={{ border: 'none' }}
    />
  );
};

export default HomePage;
