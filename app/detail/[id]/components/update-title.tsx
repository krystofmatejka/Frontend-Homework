'use client';

import { useActionState, useState, useEffect } from "react";
import { updateListTitleAction, updateListMembersAction, leaveListAction } from "../actions";
import { type Person, me } from "../users";

export function UpdateTitle({ listId, currentTitle, owner, members }: { listId: string; currentTitle: string, owner: Person; members: Person[] }) {
    const [state, formAction, pending] = useActionState(updateListTitleAction, null);
    const [stateMembers, formActionMembers, pendingMembers] = useActionState(updateListMembersAction, null);
    const [stateLeave, formActionLeave, pendingLeave] = useActionState(leaveListAction, null);
    const [isEdditing, setIsEdditing] = useState(false);

    const canEdditing = (owner.id === me.id) || (members.find(member => member.id === me.id));

    const handleMembersFormAction = async (formData: FormData) => {
        await formActionMembers(formData);
        setIsEdditing(false);
    };

    const handleTitleFormAction = async (formData: FormData) => {
        await formAction(formData);
        setIsEdditing(false);
    };

    const handleLeaveListAction = async (formData: FormData) => {
        await formActionLeave(formData);
        setIsEdditing(false);
    };

    if (!isEdditing) {
        return (
            <>
                <h2>{currentTitle}</h2>
                {canEdditing && (
                    <button onClick={() => setIsEdditing(true)} disabled={pending}>Start editing</button>
                )}
            </>
        )
    }

    if (owner.id === me.id) {
        return (
            <div>
            <form action={handleTitleFormAction}>
                <input type="hidden" name="listId" value={listId} />
                <input type="text" name="title" defaultValue={currentTitle} />
                <button type="submit" disabled={pending}>
                    {pending ? 'Updating...' : 'Update Title'}
                </button>
            </form>
            <form action={handleMembersFormAction}>
                <input type="hidden" name="listId" value={listId} />
                <select name="members" multiple defaultValue={members.map(member => member.id)}>
                    <option value="user-1">John Doe</option>
                    <option value="user-2">Jane Smith</option>
                </select>
                <button type="submit" disabled={pendingMembers}>
                    {pendingMembers ? 'Updating...' : 'Update Members'}
                </button>
            </form>
            <button onClick={() => setIsEdditing(false)} disabled={pending || pendingMembers}>
                Stop editing
            </button>
            </div>
        )
    }

    if (members.find(member => member.id === me.id)) {
        return (
            <>
                <h2>{currentTitle}</h2>
                <form action={handleLeaveListAction}>
                    <input type="hidden" name="listId" value={listId} />
                    <button type="submit" disabled={pendingLeave}>
                        {pendingLeave ? 'Leaving...' : 'Leave list'}
                    </button>
                </form>
            </>
        )
    }
}
