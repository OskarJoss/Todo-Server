const User = require("../models/user");
const Todo = require("../models/todo");
const _ = require("lodash");

exports.initialData = async () => {
  const data = require("../test_data");
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    try {
      const user = new User(data.users().user1);
      user.save();
      console.log(`Added test user ${user.username}`);
    } catch (error) {
      console.log("initialData error: ", error);
    }
  }
  const todoCount = await Todo.countDocuments();
  if (todoCount === 0) {
    try {
      Todo.insertMany(_.map(data.todos(), (t) => t));
      console.log(`Added test todos`);
    } catch (error) {
      console.log("initialData error: ", error);
    }
  }
};
