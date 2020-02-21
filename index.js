//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

//import routers
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const userRouter = require("./routes/user");
const propertyRouter = require("./routes/property");

const User = require("./models/User");

const app = express();

const config = require("./config/config"),
	port = process.env.PORT || 3030,
	{ env, dbURL } = config;

app.set("port", port);
app.set("env", env);

//connect to database
const connectionString = dbURL;
console.log(`connectionString ${connectionString}`);
mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.catch(err => {
		console.log("error connecting to database");
		console.log(err);
		return;
	});

//cors
//set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	res.set("Access-Control-Allow-Credentials", "true");
	next();
});
app.use(
	cors({
		origin: true
	})
);
app.options("*", cors());

app.use(bodyParser.json());

//passport
app.use(session({ secret: "dev" }));
app.use(passport.initialize());
app.use(passport.session());

//unuathenticated routes
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.get("/logout", (req, res) => {
	req.logout();
	res.status(200);
	res.send({
		result: "sucsess",
		id: 0,
		fullname: "noone"
	});
});

app.route("/whoami").get((req, res) => {
	if (req.user) {
		res.send(User.getSafeUserData(req.user));
	} else {
		res.send({
			id: 0,
			fullname: "noone"
		});
	}
});

//make sure all other requests are authenticated
app.use((req, res, next) => {
	if (!req.user) {
		res.status(401);
		res.send({ error: "unauthorized request" });
		return;
	} else {
		next();
	}
});
// every route below this line will fail without auth

//authenticated routes
app.use("/user", userRouter);
app.use("/property", propertyRouter);

app.get("/", (req, res) => {
	if (req.user) {
		res.send({ message: "welcome" });
	} else {
		console.log("no auth");
	}
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
