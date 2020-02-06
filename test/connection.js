const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectionString = "mongodb://localhost:27017/property24";

before(done => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => {
      done();
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      done();
    });
});

//drop collections before each test
beforeEach(done => {
  let tasks = [];
  console.log(mongoose.connection.collections);
  for (let collection of mongoose.connection.collections) {
    tasks.push(collection.drop());
  }

  Promise.all(tasks)
    .then(done)
    .catch(err => {
      console.log("error");
      console.log(err);
      done();
    });
});
