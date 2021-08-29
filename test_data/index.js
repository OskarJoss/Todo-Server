exports.users = () => {
  return {
    user1: {
      username: "testuser1",
    },
  };
};

exports.todos = () => {
  return {
    todo1: {
      title: "clean room",
      description: "Do it now!",
      creator: exports.users().user1.username,
    },
    todo2: {
      title: "relax",
      creator: exports.users().user1.username,
    },
  };
};
