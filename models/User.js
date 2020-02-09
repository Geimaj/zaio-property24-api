const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString("hex");
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");

	return this.save();
};

userSchema.methods.validPassword = function(password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
		.toString("hex");
	return this.hash === hash;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
