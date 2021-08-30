const Todo = require("../models/todo");
const _ = require("lodash");

exports.findAllByUser = async (req, res) => {
  const errors = [];
  let data;

  if (!req.user) {
    errors.push("Request needs to be made by valid user");
  }

  if (_.isEmpty(errors)) {
    try {
      const creator = req.user.username;
      const todos = await Todo.find({ creator: creator });
      data = todos;
    } catch (err) {
      console.log("Todos findAllByUser Error: ", err);
      if (err.message) {
        errors.push(err.message);
      } else {
        errors.push(err);
      }
    }
  }

  if (!_.isEmpty(errors)) {
    const r = {
      success: false,
      errors: errors,
    };
    res.status(400).json(r);
  } else {
    const r = {
      success: true,
      message: "Found all todos by user!",
      data: data,
    };
    res.status(200).json(r);
  }
};

exports.findOne = async (req, res) => {
  const errors = [];
  let data;

  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      throw `No todo with id ${req.params.id} found`;
    }
    data = todo;
  } catch (err) {
    console.log("Todos findOne Error: ", err);
    if (err.message) {
      errors.push(err.message);
    } else {
      errors.push(err);
    }
  }

  if (!_.isEmpty(errors)) {
    const r = {
      success: false,
      errors: errors,
    };
    res.status(400).json(r);
  } else {
    const r = {
      success: true,
      message: "Found todo!",
      data: data,
    };
    res.status(200).json(r);
  }
};

exports.add = async (req, res) => {
  const errors = [];

  if (!req.user) {
    errors.push("Request needs to be made by valid user");
  }
  if (!req.body.title) {
    errors.push("Missing input title");
  }

  if (_.isEmpty(errors)) {
    try {
      const body = { ...req.body, creator: req.user.username };
      const todo = new Todo(body);
      await todo.save();
    } catch (err) {
      console.log("Todos add Error: ", err);
      if (err.message) {
        errors.push(err.message);
      } else {
        errors.push(err);
      }
    }
  }
  if (!_.isEmpty(errors)) {
    const r = {
      success: false,
      errors: errors,
    };
    res.status(400).json(r);
  } else {
    const r = {
      success: true,
      message: "Added new todo!",
    };
    res.status(200).json(r);
  }
};

exports.edit = async (req, res) => {
  const errors = [];

  if (!req.user) {
    errors.push("Request needs to be made by valid user");
  }

  if (_.isEmpty(errors)) {
    try {
      const todo = await Todo.findOne({ _id: req.params.id });
      if (!todo) {
        throw `No todo with id ${req.params.id} found`;
      }
      if (todo.creator !== req.user.username) {
        throw `Todo can only be edited by creator`;
      }
      await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
        useFindAndModify: false,
        new: true,
      });
    } catch (err) {
      console.log("Todos edit Error: ", err);
      if (err.message) {
        errors.push(err.message);
      } else {
        errors.push(err);
      }
    }
  }

  if (!_.isEmpty(errors)) {
    const r = {
      success: false,
      errors: errors,
    };
    res.status(400).json(r);
  } else {
    const r = {
      success: true,
      message: "Edited todo!",
    };
    res.status(200).json(r);
  }
};

exports.delete = async (req, res) => {
  const errors = [];

  if (!req.user) {
    errors.push("Request needs to be made by valid user");
  }

  if (_.isEmpty(errors)) {
    try {
      const todo = await Todo.findOne({ _id: req.params.id });
      if (!todo) {
        throw `No todo with id ${req.params.id} found`;
      }
      if (todo.creator !== req.user.username) {
        throw `Todo can only be removed by creator`;
      }
      await Todo.findOneAndDelete({ _id: req.params.id });
    } catch (err) {
      console.log("Todos delete Error: ", err);
      if (err.message) {
        errors.push(err.message);
      } else {
        errors.push(err);
      }
    }
  }

  if (!_.isEmpty(errors)) {
    const r = {
      success: false,
      errors: errors,
    };
    res.status(400).json(r);
  } else {
    const r = {
      success: true,
      message: "Todo deleted!",
    };
    res.status(200).json(r);
  }
};
