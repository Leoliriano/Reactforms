import React, { useState } from 'react';

function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 8) {
      setError('Username must be at least 8 characters long.');
      return;
    }
    setError(null);
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to sign up.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
