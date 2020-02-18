const { User, getSafeUserData } = require("../models/User");

const userRouter = require("express").Router();

userRouter.route("/").get((req, res) => {
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

userRouter.route("/:id").get((req, res) => {
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

module.exports = userRouter;
