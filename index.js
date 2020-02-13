//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

//controller imports
const userController = require("./controllers/user");
const propertyController = require("./controllers/property");

const app = express();

const config = require("./config/config"),
	port = process.env.PORT || 3030,
	{ env, dbURL, url } = config;
// env = config.env,
// dbURL = config.dbURL;

app.set("port", port);
app.set("env", env);

//connect to database
const connectionString = dbURL;
mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.catch(err => {
		console.log("error");
		console.log(err);
	});

//middleware
app.use((req, res, next) => {
	// console.log(`${req.method} ${req.path}`);
	next();
});
app.use((req, res, next) => {
	cors({
		origin: req.originalUrl
	});
});
app.use(bodyParser.json());

//passport
app.use(session({ secret: "dev" }));
app.use(passport.initialize());
app.use(passport.session());

//login controller
userController(app);

//make sure all other requests are authenticated
// app.use((req, res, next) => {
// 	if (!req.user) {
// 		res.status(401);
// 		res.send({ error: "unauthorized request" });
// 		next("that was an unauthorized request");
// 	} else {
// 		next();
// 	}
// });

//all other controllers
propertyController(app);

app.get("/", (req, res) => {
	const user = req.user;
	user
		? res.send({ message: "welcome" })
		: res.send({ error: "login first" });
});

//error handling
app.use((err, req, res, next) => {
	console.log(err);
	res.status(422).send({ error: err.message });
	next(err.message);
});

app.listen(port);
console.log("listening on " + port);

module.exports = app;
