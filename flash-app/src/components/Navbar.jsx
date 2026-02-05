import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';

function Navbar({ brandName = "Flashcard App" }) {
  const [user, setUser] = useAtom(userAtom);
  const [location] = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  const isActive = (path) => {
    return location === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">{brandName}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link href="/list" className={`nav-link ${isActive('/list')}`}>List Cards</Link>
                </li>
                <li className="nav-item">
                  <Link href="/add" className={`nav-link ${isActive('/add')}`}>Add Card</Link>
                </li>
                <li className="nav-item">
                  <Link href="/manage" className={`nav-link ${isActive('/manage')}`}>Manage Cards</Link>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                <span className="navbar-text me-3">Welcome, <strong>{user.username}</strong></span>
                <Link href="/" className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</Link>
              </div>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
