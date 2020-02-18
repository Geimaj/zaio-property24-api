const passport = require("../config/passport");
const { User, getSafeUserData } = require("../models/User");

module.exports = app => {
	//User CRUD
	app.route("/signup").post(async (req, res, next) => {
		const { username, password, email, fullname } = req.body;
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

	//user login
	app.route("/login")
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

	app.route("/user").get((req, res) => {
		User.find({})
			.then(users => {
				users = users.map(user => {
					return getSafeUserData(user);
				});

				res.send(users);
			})
			.catch(err => {
				res.status(500);
				res.send({
					error: err.message
				});
			});
	});

	app.route("/user/:id").get((req, res) => {
		User.findById(req.params.id)
			.then(user => {
				res.send(getSafeUserData(user) || {});
			})
			.catch(err => {
				res.status(500);
				res.send({
					error: err.message
				});
			});
	});
};
