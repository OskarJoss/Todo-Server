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

exports.findOne = async (req, res) => {};

exports.add = async (req, res) => {};

exports.edit = async (req, res) => {};

exports.delete = async (req, res) => {};
