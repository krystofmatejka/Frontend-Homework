'use client';

import { useActionState } from "react";
import { toggleItemIsActive } from "../actions";

export function DetailItem({ id, title, isActive, listId }: { id: string; title: string; isActive: boolean; listId: string }) {
    const [state, formAction] = useActionState(toggleItemIsActive, null);

    return (
        <form action={formAction}>
            <input type="hidden" name="itemId" value={id} />
            <input type="hidden" name="listId" value={listId} />
            <div>
                <h3>{title}</h3>
                <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
                <button type="submit">Toggle Status</button>
            </div>
        </form>
    )
}