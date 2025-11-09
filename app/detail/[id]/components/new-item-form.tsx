'use client';

import { useActionState } from "react";
import { addItemAction } from "../actions";

export function NewItemForm({ listId }: { listId: string }) {
    const [state, formAction, pending] = useActionState(addItemAction, null);

    if (pending) {
        return <p>Adding item...</p>;
    }

    return (
        <form action={formAction}>
            {state?.success === false && <p>Error adding item.</p>}
            {state?.success === true && <p>Item "{state.item.title}" added!</p>}
            <input type="hidden" name="listId" value={listId} />
            <input type="text" name="name" placeholder="New item title" />
            <button type="submit">Add Item</button>
        </form>
    )
}