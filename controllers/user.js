const passport = require("../config/passport");
const User = require("../models/User");

module.exports = app => {
  //User CRUD
  app.route("/signup").post(async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);
    console.log("signup");
    try {
      //validate
      if (!username) {
        throw new Error("{error: 'usernamename is required'}");
      }
      if (!password) {
        throw new Error("{error: 'password is required'}");
      }

      const existingUsers = await User.find({ username: username });
      //ensure username is available
      if ((await existingUsers).length > 0) {
        throw new Error("{error: 'username is taken'}");
      }

      new User({
        username: username
      })
        .save()
        .then(user => user.setPassword(password))
        .then(user => res.send({ _id: user._id, username: user.username }))
        .catch(next);
    } catch (err) {
      console.log("nexting...");
      next(err);
    }
  });

  //user login
  app
    .route("/login")
    .post(
      passport.authenticate("local", {
        failureRedirect: "/login?fail=true",
        successRedirect: "/"
      })
    )
    .options(
      passport.authenticate("local", {
        failureRedirect: "/login?fail=true",
        successRedirect: "/"
      })
    )
    .get((req, res) => {
      req.query.fail ? res.send("Invalid creds") : res.send("login page");
    });
};
