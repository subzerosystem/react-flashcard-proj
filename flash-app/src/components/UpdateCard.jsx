import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { flashcardsAtom } from '../store/atoms';
import { useLocation, useRoute } from 'wouter';

function UpdateCard() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
  const [match, params] = useRoute('/update/:id');
  const cardId = params ? parseInt(params.id) : null;
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (cardId) {
      const cardToUpdate = flashcards.find(card => card.id === cardId);
      if (cardToUpdate) {
        setFront(cardToUpdate.front);
        setBack(cardToUpdate.back);
      } else {
        setError('Card not found');
      }
    }
  }, [cardId, flashcards]);

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
    const updatedCards = flashcards.map(card => {
      if (card.id === cardId) {
        return { ...card, front: front.trim(), back: back.trim(), updatedAt: new Date().toISOString() };
      }
      return card;
    });
    setFlashcards(updatedCards);
    setSuccessMessage('Card updated successfully!');
    setTimeout(() => setLocation('/manage'), 1500);
  };

  const handleCancel = () => {
    setLocation('/manage');
  };

  if (!cardId) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">No card ID specified</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Update Flashcard</h2>
              {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
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
                  <button type="submit" className="btn btn-primary">Update Card</button>
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

export default UpdateCard;
