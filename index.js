//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

//controller imports
const userController = require("./controllers/user");
const propertyRouter = require("./controllers/property");

const app = express();

const config = require("./config/config"),
	port = process.env.PORT || 3030,
	{ env, dbURL, url } = config;

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
		console.log("error");
		console.log(err);
	});

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

//login controller
userController(app);

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

//all other routes
app.use("/property", propertyRouter);

app.get("/", (req, res) => {
	const user = req.user;
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
