// Shopping Lists API routes
// Based on app/database.ts structure

const ALL_USERS = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "Tommy",
  },
  {
    id: 4,
    name: "Timmy",
  },
];

// Current user
const ME = ALL_USERS[0];

const SHOPPING_LISTS = [
  {
    id: "1",
    title: "Fruits",
    items: [
      { id: "1", title: "Apple", isActive: true },
      { id: "2", title: "Banana", isActive: false },
      { id: "3", title: "Mango", isActive: true },
      { id: "4", title: "Banana", isActive: true },
    ],
    owner: ALL_USERS[0],
    members: [ALL_USERS[1]],
    isArchived: false,
  },
  {
    id: "2",
    title: "Vegetables",
    items: [
      { id: "3", title: "Corn", isActive: true },
      { id: "4", title: "Tomato", isActive: true },
      { id: "5", title: "Guacamole", isActive: false },
    ],
    owner: ALL_USERS[1],
    members: [ALL_USERS[0]],
    isArchived: true,
  },
  {
    id: "3",
    title: "Pastry",
    items: [
      { id: "3", title: "Bagel", isActive: true },
      { id: "4", title: "Croissant", isActive: true },
      { id: "5", title: "Donut", isActive: false },
    ],
    owner: ALL_USERS[2],
    members: [],
    isArchived: false,
  },
  {
    id: "4",
    title: "Dairy",
    items: [
      { id: "6", title: "Milk", isActive: true },
      { id: "7", title: "Cheese", isActive: true },
      { id: "8", title: "Yogurt", isActive: false },
    ],
    owner: ALL_USERS[0],
    members: [ALL_USERS[1], ALL_USERS[2]],
    isArchived: false,
  },
  {
    id: "5",
    title: "Bakery",
    items: [
      { id: "9", title: "Bread", isActive: true },
      { id: "10", title: "Bagel", isActive: true },
      { id: "11", title: "Croissant", isActive: false },
    ],
    owner: ALL_USERS[1],
    members: [ALL_USERS[0], ALL_USERS[2]],
    isArchived: true,
  },
];

module.exports = [
  {
    id: "get-me",
    url: "/api/users/me",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: ME,
        },
      },
    ],
  },
  {
    id: "get-all-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: ALL_USERS,
        },
      },
    ],
  },
  {
    id: "get-shopping-lists",
    url: "/api/shopping-lists",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const showArchived = req.query.showArchived === "true";
            
            // Filter lists based on access and archived status
            const filteredLists = SHOPPING_LISTS.filter(list => {
              const isOwner = list.owner.id === ME.id;
              const isMember = list.members.some(member => member.id === ME.id);
              const hasAccess = isOwner || isMember;
              
              if (!hasAccess) return false;
              
              if (showArchived) return true;
              return !list.isArchived;
            });
            
            res.status(200);
            res.send(filteredLists);
          },
        },
      },
      {
        id: "all",
        type: "json",
        options: {
          status: 200,
          body: SHOPPING_LISTS,
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 500,
          body: {
            message: "Failed to fetch shopping lists",
          },
        },
      },
    ],
  },
  {
    id: "get-shopping-list",
    url: "/api/shopping-lists/:id",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const isActive = req.query.isActive === "true";
            
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({ message: "Shopping list not found" });
              return;
            }
            
            // Check if list is archived
            if (list.isArchived) {
              res.status(404);
              res.send({ message: "List is archived" });
              return;
            }
            
            // Check access
            const isOwner = list.owner.id === ME.id;
            const isMember = list.members.some(member => member.id === ME.id);
            
            if (!isOwner && !isMember) {
              res.status(403);
              res.send({ message: "Access denied" });
              return;
            }
            
            // Filter items if isActive query param is set
            const filteredList = {
              ...list,
              items: isActive 
                ? list.items.filter(item => item.isActive === true)
                : list.items,
            };
            
            res.status(200);
            res.send(filteredList);
          },
        },
      },
      {
        id: "not-found",
        type: "json",
        options: {
          status: 404,
          body: {
            message: "Shopping list not found",
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 500,
          body: {
            message: "Failed to fetch items",
          },
        },
      },
    ],
  },
  {
    id: "create-shopping-list",
    url: "/api/shopping-lists",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const { title, members } = req.body;
            
            if (!title || title.trim() === '') {
              res.status(400);
              res.send({
                success: false,
                message: 'Title is required',
              });
              return;
            }
            
            const newId = (Math.max(...SHOPPING_LISTS.map(l => parseInt(l.id)), 0) + 1).toString();
            
            const newList = {
              id: newId,
              title: title.trim(),
              items: [],
              owner: ME,
              members: (members || []).map(memberId => {
                const user = ALL_USERS.find(u => u.id === memberId);
                if (!user) {
                  throw new Error('Unknown member id');
                }
                return user;
              }),
              isArchived: false,
            };
            
            SHOPPING_LISTS.push(newList);
            
            res.status(201);
            res.send(newList);
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,
          body: {
            success: false,
            message: "Failed to create shopping list",
          },
        },
      },
    ],
  },
  {
    id: "update-shopping-list",
    url: "/api/shopping-lists/:id",
    method: "PATCH",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const { title, members, isArchived } = req.body;
            
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({
                success: false,
                message: 'List not found',
              });
              return;
            }
            
            // Only owner can update
            if (list.owner.id !== ME.id) {
              res.status(403);
              res.send({
                success: false,
                message: 'Only the owner can update the list',
              });
              return;
            }
            
            if (title !== undefined) {
              list.title = title;
            }
            
            if (members !== undefined) {
              list.members = members.map(memberId => {
                const user = ALL_USERS.find(u => u.id === memberId);
                if (!user) {
                  throw new Error('Unknown member id');
                }
                return user;
              });
            }
            
            if (isArchived !== undefined) {
              list.isArchived = isArchived;
            }
            
            res.status(200);
            res.send({
              success: true,
              message: 'List updated successfully',
              list,
            });
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,
          body: {
            success: false,
            message: "Failed to update shopping list",
          },
        },
      },
    ],
  },
  {
    id: "toggle-archive-list",
    url: "/api/shopping-lists/:id/archive",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({
                success: false,
                message: 'List not found',
              });
              return;
            }
            
            if (list.owner.id !== ME.id) {
              res.status(403);
              res.send({
                success: false,
                message: 'Only the owner can archive/unarchive this list',
              });
              return;
            }
            
            list.isArchived = !list.isArchived;
            
            res.status(200);
            res.send({
              success: true,
              message: list.isArchived ? 'List archived' : 'List unarchived',
            });
          },
        },
      },
    ],
  },
  {
    id: "leave-shopping-list",
    url: "/api/shopping-lists/:id/leave",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({
                success: false,
                message: 'List not found',
              });
              return;
            }
            
            const memberIndex = list.members.findIndex(member => member.id === ME.id);
            
            if (memberIndex === -1) {
              res.status(400);
              res.send({
                success: false,
                message: 'You are not a member of this list',
              });
              return;
            }
            
            list.members.splice(memberIndex, 1);
            
            res.status(200);
            res.send({
              success: true,
              message: 'You have left the list successfully',
            });
          },
        },
      },
    ],
  },
  {
    id: "add-list-item",
    url: "/api/shopping-lists/:id/items",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const { title, name } = req.body;
            
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({
                success: false,
                message: 'List not found',
              });
              return;
            }
            
            const newItem = {
              id: Math.random().toString(36).substring(7),
              title: title || name,
              isActive: true,
            };
            
            list.items.push(newItem);
            
            res.status(201);
            res.send({
              success: true,
              message: 'Item added successfully',
              item: newItem,
            });
          },
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,
          body: {
            success: false,
            message: "Failed to add item",
          },
        },
      },
    ],
  },
  {
    id: "remove-list-item",
    url: "/api/shopping-lists/:id/items/:itemId",
    method: "DELETE",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const itemId = req.params.itemId;
            
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({
                success: false,
                message: 'List not found',
              });
              return;
            }
            
            const index = list.items.findIndex(item => item.id === itemId);
            
            if (index >= 0) {
              list.items.splice(index, 1);
            }
            
            res.status(200);
            res.send({
              success: true,
              message: 'Item removed successfully',
            });
          },
        },
      },
    ],
  },
  {
    id: "toggle-item-active",
    url: "/api/shopping-lists/:id/items/:itemId/toggle",
    method: "POST",
    variants: [
      {
        id: "success",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const listId = req.params.id;
            const itemId = req.params.itemId;
            
            const list = SHOPPING_LISTS.find(l => l.id === listId);
            
            if (!list) {
              res.status(404);
              res.send({
                success: false,
                message: 'List not found',
              });
              return;
            }
            
            const index = list.items.findIndex(item => item.id === itemId);
            
            if (index >= 0) {
              list.items[index].isActive = !list.items[index].isActive;
            }
            
            res.status(200);
            res.send({
              success: true,
              message: 'Item status toggled',
              item: list.items[index],
            });
          },
        },
      },
    ],
  },
];
