'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { me, shoppingList, users } from "../database";
import type { ShoppingList } from "../database";

export async function fetchAllLists(): Promise<ShoppingList[]> {
  const lists = Object.values(shoppingList);
  
  return lists.filter(list => {
    const isOwner = list.owner.id === me.id;
    const isMember = list.members.some(member => member.id === me.id);
    return isOwner || isMember;
  });
}

export async function createListAction(prevState: unknown, formData: FormData) {
  const title = formData.get('title') as string;
  const members = formData.getAll('members') as string[];

  if (!title || title.trim() === '') {
    return {
      success: false,
      message: 'Title is required',
    };
  }

  // Generate a unique ID that doesn't exist yet
  const existingIds = Object.keys(shoppingList).map(Number);
  const newId = (Math.max(...existingIds, 0) + 1).toString();

  const newList: ShoppingList = {
    id: newId,
    title: title.trim(),
    items: [],
    owner: me,
    members: members.map(memberId => {
      const user = users.find(user => user.id === memberId);
      if (!user) {
        throw new Error('Unknown member id');
      }
      return user;
    }),
  };

  shoppingList[newId] = newList;

  revalidatePath('/');
  revalidatePath(`/detail/${newId}`);
  redirect(`/detail/${newId}`);
}
