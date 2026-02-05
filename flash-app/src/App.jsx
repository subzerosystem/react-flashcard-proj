import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'wouter';
import { useAtom } from 'jotai';
import axios from 'axios';
import { userAtom, flashcardsAtom } from './store/atoms';
import { initialFlashcards } from './data/mockData';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ListCards from './components/ListCards';
import AddCard from './components/AddCard';
import UpdateCard from './components/UpdateCard';
import ManageCards from './components/ManageCards';

function ProtectedRoute({ component: Component }) {
  const [user] = useAtom(userAtom);
  if (!user) {
    return <Redirect to="/" />;
  }
  return <Component />;
}

function App() {
  const [user] = useAtom(userAtom);
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = { data: initialFlashcards };
        setFlashcards(response.data);
        console.log('Flashcards loaded from API (simulated):', response.data);
      } catch (error) {
        console.error('Error loading flashcards:', error);
      }
    };
    if (flashcards.length === 0) {
      loadFlashcards();
    }
  }, []);

  return (
    <div className="app">
      <Navbar brandName="Flashcard App" />
      <main>
        <Router>
          <Switch>
            <Route path="/">{user ? <Redirect to="/manage" /> : <Login />}</Route>
            <Route path="/list"><ProtectedRoute component={ListCards} /></Route>
            <Route path="/add"><ProtectedRoute component={AddCard} /></Route>
            <Route path="/update/:id"><ProtectedRoute component={UpdateCard} /></Route>
            <Route path="/manage"><ProtectedRoute component={ManageCards} /></Route>
            <Route>
              <div className="container mt-5">
                <div className="alert alert-warning">
                  <h4>404 - Page Not Found</h4>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </main>
      <footer className="mt-5 py-3 bg-light text-center">
        <div className="container">
          <small className="text-muted">Flashcard App © 2025 | Built with React, Jotai, Wouter, Bootstrap</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
