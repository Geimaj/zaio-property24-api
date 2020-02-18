const loginRouter = require("express").Router();
const passport = require("../config/passport");

loginRouter
	.route("/")
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
		if (req.query.fail) {
			res.status(401);
			res.send({ error: "Invalid creds" });
		} else {
			res.send({ message: "login page" });
		}
	});

module.exports = loginRouter;
