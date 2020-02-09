const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertySchema = new Schema({
	street: String,
	number: String,
	beds: Number,
	baths: Number,
	price: Number,
	postedBy: Schema.Types.ObjectId
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
