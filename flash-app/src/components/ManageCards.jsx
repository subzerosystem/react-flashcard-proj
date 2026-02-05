import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { flashcardsAtom } from '../store/atoms';
import { useLocation } from 'wouter';

function CardItem({ card, onUpdate, onDelete }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Front</h6>
          <p className="card-text">{card.front}</p>
          <hr />
          <h6 className="card-subtitle mb-2 text-muted">Back</h6>
          <p className="card-text">{card.back}</p>
        </div>
        <div className="card-footer bg-transparent border-top-0">
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-primary" onClick={() => onUpdate(card.id)}>Update</button>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(card.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageCards() {
  const [cardToDelete, setCardToDelete] = useState(null);
  const [flashcards, setFlashcards] = useAtom(flashcardsAtom);
  const [, setLocation] = useLocation();
  const [showBacks, setShowBacks] = useState(false);

  const handleUpdate = (cardId) => {
    setLocation(`/update/${cardId}`);
  };

  const handleDeleteClick = (cardId) => {
    setCardToDelete(cardId);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      const updatedCards = flashcards.filter(card => card.id !== cardToDelete);
      setFlashcards(updatedCards);
      setCardToDelete(null);
    }
  };

  const cancelDelete = () => {
    setCardToDelete(null);
  };

  const handleAddNew = () => {
    setLocation('/add');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Flashcards</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={handleAddNew}>Add New</button>
          <button className="btn btn-info" onClick={() => setShowBacks(!showBacks)}>
            {showBacks ? 'Show Fronts Only' : 'Toggle Back'}
          </button>
        </div>
      </div>
      {flashcards.length === 0 ? (
        <div className="alert alert-info">No flashcards yet. Click "Add New" to create your first card!</div>
      ) : (
        <div className="row">
          {flashcards.map(card => (
            <CardItem key={card.id} card={card} onUpdate={handleUpdate} onDelete={handleDeleteClick} />
          ))}
        </div>
      )}
      {cardToDelete && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">Are you sure you want to delete this flashcard? This action cannot be undone.</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <p className="text-muted">Total cards: <strong>{flashcards.length}</strong></p>
      </div>
    </div>
  );
}

export default ManageCards;
