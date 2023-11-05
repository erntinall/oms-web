function logout() {
    
    // Temporary until we get the Node.JS Script running for logout service 
    window.location.href = 'login.html';
  }
  
  function fetchEmployeeName() {
    
    // Remove once we get the Node JS script setup.
    document.getElementById('employeeName').textContent = "John Doe";
  }
  window.onload = fetchEmployeeName;
  