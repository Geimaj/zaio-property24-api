const signupRouter = require("express").Router();
const { User } = require("../models/User");

signupRouter.route("/").post(async (req, res, next) => {
  const { username, password, email, fullname } = req.body;
  try {
    //validate
    if (!username) {
      throw new Error("usernamename is required");
    }
    if (!password) {
      throw new Error("password is required");
    }

    const existingUsers = await User.find({ username: username });
    //ensure username is available
    if ((await existingUsers).length > 0) {
      throw new Error("username is taken");
    }

    new User({
      username: username,
      email: email,
      fullname: fullname
    })
      .save()
      .then(user => user.setPassword(password))
      .then(user =>
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          fullname: user.fullname
        })
      )
      .catch(next);
  } catch (err) {
    console.log("nexting...");
    next(err);
  }
});

module.exports = signupRouter;
