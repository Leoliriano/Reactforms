import React, { useState } from 'react';

function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!token) {
      setError('No token found, please sign up first.');
      return;
    }
    setError(null);
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage(`Authenticated! Welcome, ${result.data.username}`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Authentication failed.');
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

export default Authenticate;
