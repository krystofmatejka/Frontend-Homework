'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ShoppingList } from "../database";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3100';

export async function fetchAllLists(showArchived: boolean = false): Promise<ShoppingList[]> {
  const response = await fetch(`${BACKEND_URL}/api/shopping-lists?showArchived=${showArchived}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch shopping lists');
  }
  
  return response.json();
}

export async function createListAction(prevState: unknown, formData: FormData) {
  const title = formData.get('title') as string;
  const members = formData.getAll('members') as string[];

  const response = await fetch(`${BACKEND_URL}/api/shopping-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, members }),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || 'Failed to create list',
    };
  }

  revalidatePath('/');
  revalidatePath(`/detail/${result.id}`);
  redirect(`/detail/${result.id}`);
}

export async function toggleArchiveAction(listId: string) {
  const response = await fetch(`${BACKEND_URL}/api/shopping-lists/${listId}/archive`, {
    method: 'POST',
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    return {
      success: false,
      message: result.message || 'Failed to toggle archive status',
    };
  }
  
  revalidatePath('/');
  
  return result;
}
