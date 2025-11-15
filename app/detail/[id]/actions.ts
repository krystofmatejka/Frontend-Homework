'use server';

import { revalidatePath } from "next/cache";
import { me, users, shoppingList } from "./database";
import type { ShoppingList } from "./database";

export async function fetchList(id: string, isActive: boolean): Promise<ShoppingList | null | undefined> {
  if (id === "failed") {
    throw new Error("Failed to fetch items.");
  }

  const shoppingListItem = shoppingList[id];

  if (shoppingListItem) {
    const isOwner = shoppingListItem.owner.id === me.id;
    const isMember = shoppingListItem.members.some(member => member.id === me.id);
    if (!isOwner && !isMember) {
      return null;
    }

    return {
      ...shoppingListItem,
      items: shoppingListItem.items.filter(item => isActive ? item.isActive === isActive : true),
    };
  }

  return null;
}

export async function addItemAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;

  const newItem = {
    id: Math.random().toString(36).substring(7),
    title: formData.get('name') as string,
    isActive: true,
  }

  shoppingList[listId].items.push(newItem);

  revalidatePath(`/detail/${listId}`);

  return {
    success: true,
    message: 'it worked',
    item: newItem
  };
}

export async function removeItemAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const itemId = formData.get('itemId') as string;

  const index = shoppingList[listId].items.findIndex(item => item.id === itemId);

  if (index >= 0) {
    shoppingList[listId].items.splice(index, 1);
  }

  revalidatePath(`/detail/${formData.get('listId')}`);
}

export async function toggleItemIsActive(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const itemId = formData.get('itemId') as string;

  const list = shoppingList[listId];

  const index = list.items.findIndex(item => item.id === itemId);
  if (index >= 0) {
    list.items[index].isActive = !list.items[index].isActive;
  }

  revalidatePath(`/detail/${formData.get('listId')}`);
}

export async function updateListTitleAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const newTitle = formData.get('title') as string;

  const list = shoppingList[listId];

  if (!list) {
    return {
      success: false,
      message: 'List not found',
    }
  }

  if (list.owner.id !== me.id) {
    return {
      success: false,
      message: 'Only the owner can update the list title',
    }
  }

  list.title = newTitle;

  revalidatePath(`/detail/${formData.get('listId')}`);
  return {
    success: true,
    message: 'Title updated successfully',
  }
}

export async function updateListMembersAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const members = formData.getAll('members') as string[];
  const list = shoppingList[listId];

  if (!list) {
    return {
      success: false,
      message: 'List not found',
    }
  }

  if (list.owner.id !== me.id) {
    return {
      success: false,
      message: 'Only the owner can update the list members',
    }
  }

  list.members = members.map(memberId => {
    const user = users.find(user => user.id === memberId);
    if (!user) {
      throw new Error('Unknown member id');
    }
    return user;
  });

  revalidatePath(`/detail/${formData.get('listId')}`);
  return {
    success: true,
    message: 'Members updated successfully',
  }
}

export async function leaveListAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const list = shoppingList[listId];

  if (!list) {
    return {
      success: false,
      message: 'List not found',
    }
  }

  const memberIndex = list.members.findIndex(member => member.id === me.id);

  if (memberIndex === -1) {
    return {
      success: false,
      message: 'You are not a member of this list',
    }
  }

  list.members.splice(memberIndex, 1);

  revalidatePath(`/detail/${listId}`);
  return {
    success: true,
    message: 'You have left the list successfully',
  }
}