const loginRouter = require("express").Router();
const passport = require("../config/passport");

loginRouter
  .route("/")
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login?fail=true"
    }),
    handleSuccesss
  )
  .options(
    passport.authenticate("local", {
      failureRedirect: "/login?fail=true"
    }),
    handleSuccesss
  )
  .get((req, res) => {
    if (req.query.fail) {
      res.status(401);
      res.send({ error: "Invalid creds" });
    } else {
      res.send({ message: "login page" });
    }
  });

function handleSuccesss(req, res) {
  if (req.user) {
    res.redirect(`/user/${req.user.id}`);
  }
}

module.exports = loginRouter;
