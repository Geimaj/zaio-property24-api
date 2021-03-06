const Property = require("../models/Property");

const propertyRouter = require("express").Router();

propertyRouter
	.route("/") // /property/
	.get((req, res) => {
		let filter = {
			...req.query
		};
		Property.find(filter)
			.then(properties => {
				res.send(properties);
				return;
			})
			.catch(err => {
				res.status(500);
				res.send(err);
				res.send([]);
			});
	})
	.post((req, res) => {
		const user = req.user;
		new Property({
			...req.body,
			postedBy: user.id
		})
			.save()
			.then(property => {
				res.send(property);
			})
			.catch(err => {
				res.send(err.message);
			});
	})
	.put(async (req, res) => {
		const propertyID = req.body.id;

		//find property with id = propertyID
		// and postedBy = req.user.id
		const property = await Property.findById(propertyID);
		if (property && property.postedBy.toString() === req.user.id) {
			await Property.findByIdAndUpdate(propertyID, {
				...req.body,
				postedBy: req.user.id
			});
			const updatedProperty = await Property.findById(propertyID);
			res.send(updatedProperty);
		} else {
			res.status(403);
			res.send({ error: "thats not yours" });
		}
	});

propertyRouter
	.route("/:id") // /property/:id
	.get((req, res) => {
		Property.findById(req.params.id)
			.then(property => {
				res.send(property);
			})
			.catch(err => {
				res.status(500);
				res.send({ error: err.message });
			});
	})
	.delete(async (req, res) => {
		const userID = req.user.id;
		const propertyID = req.params.id;

		//make sure user owns property
		const property = await Property.findById(propertyID);
		if (property && property.postedBy.toString() === userID) {
			await property.delete();
			res.send(property);
		} else {
			res.status(403);
			res.send({
				error: "You do not own that property"
			});
		}
	});
module.exports = propertyRouter;
