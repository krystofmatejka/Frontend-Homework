'use client';

import { useActionState, useRef, useEffect } from "react";
import { addItemAction } from "../actions";
import type { DetailTranslation } from "../translations";

export function NewItem({ listId, translation }: { listId: string; translation: DetailTranslation }) {
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
      {state?.success === false && <p>{translation.newItem.error}</p>}
      {state?.success === true && <p ref={newItemMessageRef}>{translation.newItem.success.replace('{itemName}', state.item.title)}</p>}
      <div className="new-item-layout">
        <input type="hidden" name="listId" value={listId} />
        <input type="text" name="name" placeholder={translation.newItem.placeholder} className="new-item-input" />
        <button type="submit" className="add-item-button" disabled={pending}>{pending ? translation.newItem.adding : translation.newItem.addButton}</button>
      </div>
    </form>
  )
}