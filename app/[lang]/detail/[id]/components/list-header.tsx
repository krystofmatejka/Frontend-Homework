'use client';

import { useActionState, useState } from "react";
import { updateListTitleAction, updateListMembersAction, leaveListAction } from "../actions";
import type { User } from "../../../../types";
import type { DetailTranslation } from "../translations";

export function ListHeader({ listId, currentTitle, owner, members, me, users, translation }: { listId: string; currentTitle: string, owner: User; members: User[]; me: User; users: User[]; translation: DetailTranslation }) {
  const [state, formAction, pending] = useActionState(updateListTitleAction, null);
  const [stateMembers, formActionMembers, pendingMembers] = useActionState(updateListMembersAction, null);
  const [stateLeave, formActionLeave, pendingLeave] = useActionState(leaveListAction, null);
  const [isEdditing, setIsEdditing] = useState(false);

  const isOwner = owner.id === me.id;
  const isMember = members.find(member => member.id === me.id);

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

  if (isOwner && !isEdditing) {
    return (
      <div className="list-header-layout">
        <h2>{currentTitle}</h2>
        <button type="button" onClick={() => setIsEdditing(true)} disabled={pending} className="primary-button">{translation.listHeader.startEditing}</button>
      </div>
    )
  }

  if (isOwner && isEdditing) {
    return (
      <div className="list-header-layout">
        <div>
          <form action={handleTitleFormAction} className="edit-item-admin-layout">
            <input type="hidden" name="listId" value={listId} />
            <input type="text" name="title" defaultValue={currentTitle} className="edit-item-input" />
            <button type="submit" disabled={pending} className="primary-button">
              {pending ? translation.listHeader.updating : translation.listHeader.updateTitle}
            </button>
          </form>
          <form action={handleMembersFormAction}>
            <input type="hidden" name="listId" value={listId} />
            <select name="members" multiple defaultValue={members.map(member => member.id)} className="edit-item-input">
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button type="submit" disabled={pendingMembers} className="primary-button">
              {pendingMembers ? translation.listHeader.updating : translation.listHeader.updateMembers}
            </button>
          </form>
        </div>
        <button onClick={() => setIsEdditing(false)} disabled={pending || pendingMembers} className="primary-button">
          {translation.listHeader.stopEditing}
        </button>
      </div>
    )
  }

  if (isMember) {
    return (
      <div className="list-header-layout">
        <h2>{currentTitle}</h2>
        <form action={handleLeaveListAction}>
          <input type="hidden" name="listId" value={listId} />
          <button type="submit" disabled={pendingLeave} className="primary-button">
            {pendingLeave ? translation.listHeader.leaving : translation.listHeader.leaveList}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="list-header-layout">
      <h2>{currentTitle}</h2>
    </div>
  )
}
