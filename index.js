const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const userController = require("./controllers/user");

const app = express();
const port = 3030;

//connect to database
const connectionString =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/property24"
    : process.env.MONGO_URI;
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
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use(cors());
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(
//   (username, password, done) => {

//   }
// ));

//controllers
userController(app);

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  console.log("oops");
  res.status(422).send({ error: err.message });
});

app.listen(port);
console.log("listening on " + port);
