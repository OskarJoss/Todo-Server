const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    descrition: { type: String, default: "No description added" },
    creator: { type: String, required: true },
  },
  {
    timestamps: true,
    //toJSON: {virtuals: true, getters: true},
    //toObject: {virtuals: true, getters: true},
  }
);

module.exports = mongoose.model("Todo", todoSchema);
