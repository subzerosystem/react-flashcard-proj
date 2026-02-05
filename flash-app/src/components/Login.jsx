import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { mockUsers } from '../data/mockData';
import { useLocation } from 'wouter';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useSetAtom(userAtom);
  const [, setLocation] = useLocation();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      const userSession = { username: user.username, timestamp: new Date().toISOString() };
      setUser(userSession);
      if (onLogin) onLogin(userSession);
      setLocation('/manage');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} placeholder="Enter username" autoComplete="username" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" autoComplete="current-password" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <div className="mt-3">
                <small className="text-muted">Demo credentials:<br/>Username: <strong>admin</strong> | Password: <strong>admin123</strong></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
