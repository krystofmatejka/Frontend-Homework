const { ALL_USERS } = require('../data/users');

module.exports = [
  {
    id: "get-users",
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
      {
        id: "all",
        type: "json",
        options: {
          status: 200,
          body: ALL_USERS,
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json",
        options: {
          status: 200,
          body: ALL_USERS[0],
        },
      },
      {
        id: "id-3",
        type: "json",
        options: {
          status: 200,
          body: ALL_USERS[2],
        },
      },
      {
        id: "real",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const userId = req.params.id;
            const user = ALL_USERS.find((userData) => userData.id === userId);
            if (user) {
              res.status(200);
              res.send(user);
            } else {
              res.status(404);
              res.send({
                message: "User not found",
              });
            }
          },
        },
      },
    ],
  },
];
