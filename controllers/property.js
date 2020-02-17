const Property = require("../models/Property");

const propertyRouter = require("express").Router();

propertyRouter
	.route("/") // (/property/)
	.get((req, res) => {
		console.log("GETTING PROPERTIES");
		Property.find({}).then(properties => {
			res.send(properties);
			return;
		});
	})
	.post((req, res) => {
		const user = req.user;
		const { street, number, beds, baths, price } = req.body;
		new Property({
			street: street,
			number: number,
			beds: beds,
			baths: baths,
			price: price,
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
			res.send("thats not yours");
		}
	})
	.delete(async (req, res) => {
		const userID = req.user.id;
		const propertyID = req.body.id;

		//make sure user owns property
		const property = await Property.findById(propertyID);
		if (property && property.postedBy.toString() === userID) {
			await property.delete();
			res.send(property);
		} else {
			res.send({
				error: "You do not own that property"
			});
		}
	});
module.exports = propertyRouter;
