const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
  },
  {
    timestamps: true,
    //toJSON: {virtuals: true, getters: true},
    //toObject: {virtuals: true, getters: true},
  }
);

module.exports = mongoose.model("User", userSchema);
