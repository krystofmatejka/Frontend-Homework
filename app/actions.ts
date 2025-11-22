'use server';

import { me, shoppingList } from "./detail/[id]/database";
import type { ShoppingList } from "./detail/[id]/database";

export async function fetchAllLists(): Promise<ShoppingList[]> {
  const lists = Object.values(shoppingList);
  
  return lists.filter(list => {
    const isOwner = list.owner.id === me.id;
    const isMember = list.members.some(member => member.id === me.id);
    return isOwner || isMember;
  });
}
