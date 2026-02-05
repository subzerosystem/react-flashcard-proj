import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { flashcardsAtom } from '../store/atoms';

function ListCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards] = useAtom(flashcardsAtom);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <h4>No flashcards available</h4>
          <p>Add some flashcards first to start studying!</p>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Study Flashcards</h4>
              <span className="badge bg-primary">Card {currentIndex + 1} of {flashcards.length}</span>
            </div>
            <div className="progress mt-2" style={{ height: '8px' }}>
              <div className="progress-bar" role="progressbar" style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}></div>
            </div>
          </div>
          <div className="card shadow-lg border-0" style={{ minHeight: '300px', cursor: 'pointer' }} onClick={handleFlip}>
            <div className="card-body d-flex flex-column justify-content-center align-items-center p-5">
              <div className="mb-3">
                <span className={`badge ${isFlipped ? 'bg-success' : 'bg-info'}`}>
                  {isFlipped ? 'Back (Answer)' : 'Front (Question)'}
                </span>
              </div>
              <div className="text-center">
                <h3 className="mb-4">{isFlipped ? currentCard.back : currentCard.front}</h3>
              </div>
              <div className="mt-auto">
                <small className="text-muted">Click card to {isFlipped ? 'see question' : 'reveal answer'}</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentIndex === 0}>← Previous</button>
            <button className="btn btn-outline-primary" onClick={handleReset}>Reset</button>
            <button className="btn btn-secondary" onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>Next →</button>
          </div>
          <div className="card mt-4 bg-light">
            <div className="card-body">
              <h6 className="card-title">Study Session Stats</h6>
              <div className="row text-center">
                <div className="col-4">
                  <div className="fw-bold">{currentIndex + 1}</div>
                  <small className="text-muted">Current</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold">{flashcards.length - currentIndex - 1}</div>
                  <small className="text-muted">Remaining</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold">{Math.round(((currentIndex + 1) / flashcards.length) * 100)}%</div>
                  <small className="text-muted">Progress</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCards;
