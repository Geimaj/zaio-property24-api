const request = require("supertest");
const app = require("../index");
// const { connectDatabase, disconnect } = require("./connection");
// const expect = require("chai").expect;
// const User = require("../models/User");
const mongoose = require("mongoose");
// // //drop all users
// before(async () => {
// 	// connectDatabase()
// 	// 	.then(res => {
// 	// 		return User.deleteMany({});
// 	// 	})
// 	// 	.then(res => {
// 	// 		done();
// 	// 	})
// 	// 	.catch(err => done(err));
// 	await mongoose.deleteModel(/.+/); // Delete every model
// });

// after(function() {
// });
// let boo;
// beforeEach(done => {
// 	boo = "!WWWWWWWWWWW!!!!!!!!AAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTT!!!!!";
// 	console.log("in before");
// 	done();
// });

const { User } = require("../api/user");

describe("user", () => {
	it("signup", done => {
		// request(app)
		// 	.post("/signup")
		// 	.send({
		// 		username: "test",
		// 		password: "test"
		// 	})
		const user = new User("test", "test");
		user.signup()
			.expect(200)
			.then(res => {
				console.log("got res");
				console.log(res);
				done();
			})
			.catch(err => {
				console.log("error!");
				done(err);
			});
	});
	// it("login", done => {
	// 	request(app)
	// 		.post("/login")
	// 		.send({
	// 			username: "test",
	// 			password: "test"
	// 		})
	// 		.expect(302)
	// 		.expect("location", "/")
	// 		.then(res => {
	// 			done();
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 			done(err);
	// 		});
	// });
	// // 	it("authenticates", done => {
	// // 		request(app)
	// // 			.post("/login")
	// // 			.send({
	// // 				username: "test",
	// // 				password: "notpassword"
	// // 			})
	// // 			.expect(302)
	// // 			.expect("location", "/login?fail=true")
	// // 			.then(res => {
	// // 				done();
	// // 			})
	// // 			.catch(err => {
	// // 				console.log(err);
	// // 				done(err);
	// // 			});
	// // 	});
	// // 	it("only allows unique usernames", done => {
	// // 		request(app)
	// // 			.post("/signup")
	// // 			.send({
	// // 				username: "test",
	// // 				password: "test"
	// // 			})
	// // 			.expect(422)
	// // 			.catch(err => done(err))
	// // 			.finally(done());
	// // 	});
	// // 	it("set auth cookies", done => {
	// // 		request(app)
	// // 			.post("/login")
	// // 			.send({
	// // 				username: "test",
	// // 				password: "test"
	// // 			})
	// // 			.then(res => {
	// // 				const cookie = res.header["set-cookie"][0];
	// // 				expect(cookie.toString(), /^connect.sid/);
	// // 				done();
	// // 			})
	// // 			.catch(err => {
	// // 				done(err);
	// // 			});
	// // 	});
});
