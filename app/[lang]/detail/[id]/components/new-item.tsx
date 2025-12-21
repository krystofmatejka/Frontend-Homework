'use client';

import { useActionState, useRef, useEffect } from "react";
import { addItemAction } from "../actions";

export function NewItem({ listId }: { listId: string }) {
  const [state, formAction, pending] = useActionState(addItemAction, null);
  const newItemMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (newItemMessageRef.current) {
        newItemMessageRef.current.remove();
      }
    }, 5000);
  });

  return (
    <form action={formAction} className="new-item-spacing">
      {state?.success === false && <p>Error adding item.</p>}
      {state?.success === true && <p ref={newItemMessageRef}>Item "{state.item.title}" added!</p>}
      <div className="new-item-layout">
        <input type="hidden" name="listId" value={listId} />
        <input type="text" name="name" placeholder="New item title" className="new-item-input" />
        <button type="submit" className="add-item-button" disabled={pending}>{pending ? 'Adding...' : 'Add Item'}</button>
      </div>
    </form>
  )
}