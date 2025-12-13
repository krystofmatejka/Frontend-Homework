export type User = {
    id: string;
    name: string;
}

export type ShoppingList = {
  id: string;
  title: string;
  items: ShoppingListItem[];
  owner: User;
  members: User[];
  isArchived?: boolean;
}

export type ShoppingListItem = {
  id: string;
  title: string;
  isActive: boolean;
}
