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

export const shoppingList: Record<string, ShoppingList> = {
  "1": {
    id: "1",
    title: "Fruits",
    items: [
      { id: "1", title: "Apple", isActive: true },
      { id: "2", title: "Banana", isActive: false },
      { id: "3", title: "Mango", isActive: true },
      { id: "4", title: "Banana", isActive: true },
    ],
    owner: me,
    members: [users[1]],
    isArchived: false,
  },
  "2": {
    id: "2",
    title: "Vegetables",
    items: [
      { id: "3", title: "Corn", isActive: true },
      { id: "4", title: "Tomato", isActive: true },
      { id: "5", title: "Guacamole", isActive: false },
    ],
    owner: users[1],
    members: [me],
    isArchived: true,
  },
  "3": {
    id: "3",
    title: "Pastry",
    items: [
      { id: "3", title: "Bagel", isActive: true },
      { id: "4", title: "Croissant", isActive: true },
      { id: "5", title: "Donut", isActive: false },
    ],
    owner: users[2],
    members: [],
    isArchived: false,
  },
  "4": {
    id: "4",
    title: "Dairy",
    items: [
      { id: "6", title: "Milk", isActive: true },
      { id: "7", title: "Cheese", isActive: true },
      { id: "8", title: "Yogurt", isActive: false },
    ],
    owner: users[0],
    members: [users[1], users[2]],
    isArchived: false,
  },
  "5": {
    id: "5",
    title: "Bakery",
    items: [
      { id: "9", title: "Bread", isActive: true },
      { id: "10", title: "Bagel", isActive: true },
      { id: "11", title: "Croissant", isActive: false },
    ],
    owner: users[1],
    members: [users[0], users[2]],
    isArchived: true,
  }
};