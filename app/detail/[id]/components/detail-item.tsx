'use client';

import { useActionState } from "react";
import { toggleItemIsActive, removeItemAction } from "../actions";

export function DetailItem({ id, title, isActive, listId }: { id: string; title: string; isActive: boolean; listId: string }) {
    const [state, formAction] = useActionState(toggleItemIsActive, null);
    const [removeState, removeFormAction] = useActionState(removeItemAction, null);

    return (
        <div className="detail-item-layout">
            <form action={formAction} className="detail-item-row">
                <input type="hidden" name="itemId" value={id} />
                <input type="hidden" name="listId" value={listId} />
                <button type="submit" className={`detail-item detail-item-${isActive ? 'active' : 'inactive'}`}>
                    {title}
                </button>
            </form>
            <form action={removeFormAction}>
                <input type="hidden" name="itemId" value={id} />
                <input type="hidden" name="listId" value={listId} />
                <button type="submit" className="detail-item-remove-button">Remove Item</button>
            </form>
        </div>
    )
}