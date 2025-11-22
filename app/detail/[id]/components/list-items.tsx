'use client';

import { useActionState } from "react";
import { toggleItemIsActive, removeItemAction } from "../actions";
import type { ShoppingListItem } from "../../../database";

function DetailItem({ listId, item }: { listId: string; item: ShoppingListItem }) {
  const [state, formAction] = useActionState(toggleItemIsActive, null);
  const [removeState, removeFormAction] = useActionState(removeItemAction, null);

  return (
    <div className="detail-item-layout">
      <form action={formAction} className="detail-item-row">
        <input type="hidden" name="itemId" value={item.id} />
        <input type="hidden" name="listId" value={listId} />
        <button type="submit" className={`detail-item detail-item-${item.isActive ? 'active' : 'inactive'}`}>
          {item.title}
        </button>
      </form>
      <form action={removeFormAction}>
        <input type="hidden" name="itemId" value={item.id} />
        <input type="hidden" name="listId" value={listId} />
        <button type="submit" className="remove-button">Remove Item</button>
      </form>
    </div>
  )
}

export function ListItems({ listId, items }: { listId: string; items: ShoppingListItem[] }) {
  return (
    <>
      {items.map((item) => {
        return <DetailItem key={item.id} listId={listId} item={item} />;
      })}
    </>
  )
}