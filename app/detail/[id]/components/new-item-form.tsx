'use client';

import { useActionState } from "react";
import { addItemAction } from "../actions";

export function NewItemForm({ listId }: { listId: string }) {
    const [state, formAction, pending] = useActionState(addItemAction, null);

    if (pending) {
        return <p>Adding item...</p>;
    }

    return (
        <form action={formAction} key={Math.random()}>
            {state?.success === false && <p>Error adding item.</p>}
            {state?.success === true && <p>Item "{state.item.title}" added!</p>}
            <div className="new-item-layout">
                <input type="hidden" name="listId" value={listId} />
                <input type="text" name="name" placeholder="New item title" className="new-item-input" />
                <button type="submit" className="add-item-button">Add Item</button>
            </div>
        </form>
    )
}