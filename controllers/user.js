const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        if (password !== "password") {
          return done(null, false, { message: "incorrect password" });
        }

        return done(null, user);
      })
      .catch(err => {
        done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

module.exports = app => {
  //User CRUD
  app
    .route("/user")
    .get((req, res, next) => {
      User.find({})
        .then(users => res.send(users))
        .catch(next);
    })
    .post(async (req, res, next) => {
      const { username, password } = req.body;
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
          username: username
        })
          .save()
          .then(user => res.send(user))
          .catch(next);
      } catch (err) {
        next(err);
      }
    });

  //user login
  app.post(
    "/login",

    passport.authenticate("local", {
      failureRedirect: "/login"
    }),

    (req, res) => {
      res.redirect("/");
    }
  );
  // app.route("/login").post((req, res) => {

  //   User.
  //   res.send("hella");
  // });
};
