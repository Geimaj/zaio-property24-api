const { User, getSafeUserData } = require("../models/User");
const Property = require("../models/Property");

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

userRouter.route("/agents").get(async (req, res) => {
	//pretend that anyone who has posted a property is an agent
	const userIds = [];
	const properties = await Property.find({});
	properties.forEach(property => {
		const id = property.postedBy.toString();

		if (!userIds.includes(id)) {
			userIds.push(id);
		}
	});

	const queue = userIds.map(id => User.findById(`${id}`));
	Promise.all(queue).then(users => {
		res.send(users.map(u => getSafeUserData(u)));
	});
});

userRouter.route("/:id").get((req, res) => {
	User.findById(req.params.id)
		.then(user => {
			res.send(getSafeUserData(user));
		})
		.catch(err => {
			res.status(500);
			res.send({
				error: err.message
			});
		});
});

module.exports = userRouter;
