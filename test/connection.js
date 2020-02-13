const mongoose = require("mongoose");
const request = require("supertest");
const { url } = require("../config/config");
const User = require("../models/User");
const app = require("../index");

mongoose.Promise = global.Promise;
const connectionString = "mongodb://localhost:27017/property24";

exports.connectDatabase = function connect() {
	return mongoose.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
};

exports.disconnect = function disconnect() {
	return mongoose.connection.disconnect();
};

const authenticatedUser = request.agent(app);
const creds = { username: "test", password: "test" };

describe("database", () => {
	it("connects", async () => {
		await this.connectDatabase();
	});
});

// module.exports.createLoginCookie = function createLoginCookie(loginDetails) {
// 	return new Promise(async (resolve, reject) => {
// 		//insert user and set password (if not exists)
// 		const user = await User.findOneAndUpdate(
// 			{ username: loginDetails.username },
// 			{ username: loginDetails.username },
// 			{
// 				upsert: true
// 			}
// 		);
// 		console.log(user);
// 		await user.setPassword(loginDetails.password);
// 		request(url)
// 			.post("/login")
// 			.send(loginDetails)
// 			.then(res => {
// 				const cookie = res.headers["set-cookie"];
// 				resolve(cookie);
// 			})
// 			.catch(err => reject(err));
// 	});
// };
