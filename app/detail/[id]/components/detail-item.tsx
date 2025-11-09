'use client';

import { useActionState } from "react";
import { toggleItemIsActive, removeItemAction } from "../actions";

export function DetailItem({ id, title, isActive, listId }: { id: string; title: string; isActive: boolean; listId: string }) {
    const [state, formAction] = useActionState(toggleItemIsActive, null);
    const [removeState, removeFormAction] = useActionState(removeItemAction, null);

    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="itemId" value={id} />
                <input type="hidden" name="listId" value={listId} />
                <div>
                    <h3>{title}</h3>
                    <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
                    <button type="submit">Toggle Status</button>
                </div>
            </form>
            <form action={removeFormAction}>
                <input type="hidden" name="itemId" value={id} />
                <input type="hidden" name="listId" value={listId} />
                <button type="submit">Remove Item</button>
            </form>
        </div>
    )
}