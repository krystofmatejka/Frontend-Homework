'use server';

import { revalidatePath } from "next/cache";
import type { ShoppingList } from "../../database";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3100';

export async function fetchList(id: string, isActive: boolean): Promise<ShoppingList | null | undefined> {
  if (id === "failed") {
    throw new Error("Failed to fetch items.");
  }

  const response = await fetch(`${BACKEND_URL}/api/shopping-lists/${id}?isActive=${isActive}`);
  
  if (response.status === 404 || response.status === 403) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error("Failed to fetch items.");
  }
  
  return response.json();
}

export async function addItemAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const name = formData.get('name') as string;

  const response = await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || 'Failed to add item',
    };
  }

  revalidatePath(`/detail/${listId}`);

  return result;
}

export async function removeItemAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const itemId = formData.get('itemId') as string;

  await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}/items/${itemId}`, {
    method: 'DELETE',
  });

  revalidatePath(`/detail/${listId}`);
}

export async function toggleItemIsActive(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const itemId = formData.get('itemId') as string;

  await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}/items/${itemId}/toggle`, {
    method: 'POST',
  });

  revalidatePath(`/detail/${listId}`);
}

export async function updateListTitleAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const title = formData.get('title') as string;

  const response = await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || 'Failed to update title',
    };
  }

  revalidatePath(`/detail/${listId}`);
  return result;
}

export async function updateListMembersAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;
  const members = formData.getAll('members') as string[];

  const response = await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ members }),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || 'Failed to update members',
    };
  }

  revalidatePath(`/detail/${listId}`);
  return result;
}

export async function leaveListAction(prevState: unknown, formData: FormData) {
  const listId = formData.get('listId') as string;

  const response = await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}/leave`, {
    method: 'POST',
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || 'Failed to leave list',
    };
  }

  revalidatePath(`/detail/${listId}`);
  return result;
}