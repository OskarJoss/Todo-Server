const User = require("../models/user");

exports.initialData = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    try {
      const user = new User({ name: process.env.TEST_USER_NAME });
      user.save();
      console.log(`Added test user ${user.name}`);
    } catch (error) {
      console.log("initialData error: ", error);
    }
  }
};
