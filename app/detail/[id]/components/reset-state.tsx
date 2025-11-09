'use client';

import { useActionState } from "react";
import { resetListAction } from "../actions";

export function ResetStateButton({ listId }: { listId: string }) {
    const [state, formAction, pending] = useActionState(resetListAction, null)
    return (
        <form action={formAction}>
            <input type="hidden" name="listId" value={listId} />
            <button type="submit" disabled={pending}>
                {pending ? 'Resetting...' : 'Reset List State'}
            </button>
        </form>
    )
}