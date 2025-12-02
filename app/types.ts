export type User = {
    id: string;
    name: string;
}

export const me: User = {
    id: "user-1",
    name: "John Doe",
}

export const users: User[] = [
    me,
    {
        id: "user-2",
        name: "Jane Smith",
    },
    {
        id: "user-3",
        name: "Alice Johnson",
    },
];

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
