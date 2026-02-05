import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { flashcardsAtom } from '../store/atoms';
import { useLocation } from 'wouter';

function AddCard() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
  const [, setLocation] = useLocation();

  const handleFrontChange = (e) => {
    setFront(e.target.value);
    if (error) setError('');
  };

  const handleBackChange = (e) => {
    setBack(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) {
      setError('Both front and back of the card are required');
      return;
    }
    const newCard = {
      id: flashcards.length > 0 ? Math.max(...flashcards.map(c => c.id)) + 1 : 1,
      front: front.trim(),
      back: back.trim(),
      createdAt: new Date().toISOString()
    };
    setFlashcards([...flashcards, newCard]);
    setSuccessMessage(`Card "${front}" added successfully!`);
    setFront('');
    setBack('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setLocation('/manage');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Add New Flashcard</h2>
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
              )}
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="front" className="form-label">Front (Question/Prompt)</label>
                  <textarea className="form-control" id="front" rows="3" value={front} onChange={handleFrontChange} placeholder="Enter the question or prompt..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="back" className="form-label">Back (Answer/Response)</label>
                  <textarea className="form-control" id="back" rows="3" value={back} onChange={handleBackChange} placeholder="Enter the answer or response..." />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">Add Card</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
