'use client';

import { useActionState } from "react";
import { updateListTitleAction } from "../actions";

export function UpdateTitle({ listId, currentTitle }: { listId: string; currentTitle: string }) {
    const [state, formAction, pending] = useActionState(updateListTitleAction, null);
    
    return (
        <form action={formAction}>
            <input type="hidden" name="listId" value={listId} />
            <input type="text" name="title" defaultValue={currentTitle} />
            <button type="submit">Update Title</button>
        </form>
    )
}