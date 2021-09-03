require("dotenv").config();
const { expect } = require("chai");
const mongoose = require("mongoose");
const Todo = require("../models/todo");
const User = require("../models/user");

// const controller = require("./controllers/controller");

process.env.ENVIRONMENT = "test";
console.log(process.env.TEST_DB_PATH);

describe("Database Connected", async () => {
  before(async () => {
    try {
      await mongoose.connect(process.env.TEST_DB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      });
      await Todo.deleteMany({});
      await User.deleteMany({});
    } catch (err) {
      console.log("ERRRRR: ", err);
    }
  });

  describe("Controller", async () => {
    before(async () => {
      await Todo.deleteMany({});
      await User.deleteMany({});
    });
    describe("Running test test", async () => {
      it("should do stuff", async () => {
        expect(3).to.equal(3);
      });
    });
  });

  after(async () => {
    const todos = await Todo.find();
    const users = await User.find();
    console.log("Todos in DB: ", todos.length);
    console.log("Users in DB: ", users.length);

    await Todo.deleteMany({});
    await User.deleteMany({});
  });
});
