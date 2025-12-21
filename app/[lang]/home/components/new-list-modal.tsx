'use client';

import { useActionState, useState, useRef } from "react";
import { createListAction } from "../actions";
import type { User } from "../../../types";
import type { Translation } from "../translations";

export function NewListModal({ users, translation }: { users: User[]; translation: Translation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createListAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    formRef.current?.reset();
  };

  return (
    <>
      <button 
        type="button" 
        onClick={handleOpen} 
        className="primary-button"
      >
        {translation.newList.newList}
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{translation.newList.createNewShoppingList}</h2>
              <button 
                type="button" 
                onClick={handleClose} 
                className="modal-close"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <form ref={formRef} action={formAction}>
              <div className="modal-form-group">
                <label htmlFor="title" className="modal-label">{translation.newList.listName}</label>
                <input 
                  type="text" 
                  id="title"
                  name="title" 
                  className="new-item-input" 
                  placeholder="Enter list name"
                  required
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="members" className="modal-label">{translation.newList.members}</label>
                <select 
                  id="members"
                  name="members" 
                  multiple 
                  className="edit-item-input modal-select"
                >
                  {users.filter(user => user.id !== 'user-1').map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <p className="modal-help-text">{translation.newList.multiselect}</p>
              </div>

              {state && !state.success && (
                <p className="modal-error">{state.message}</p>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={handleClose} 
                  className="secondary-button"
                  disabled={pending}
                >
                  {translation.newList.cancel}
                </button>
                <button 
                  type="submit" 
                  className="primary-button"
                  disabled={pending}
                >
                  {pending ? translation.newList.creating : translation.newList.createList}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
