import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
export default function Login() {
  const [username, setUsername] = useState('');

  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    if(username.trim('')) history.push(`/chat/${username}`);
  }
  return (
    <form onSubmit={handleLogin}>
      <h1>Tell us your Username:</h1>
      <input 
        onChange={e => setUsername(e.target.value)}
        type="text" 
        placeholder="Username" 
      />

      <button type="submit">Chat</button>
  
    </form>
  );
}