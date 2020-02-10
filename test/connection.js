const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const connectionString = "mongodb://localhost:27017/property24";

exports.connect = function connect() {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

exports.disconnect = function disconnect() {
  return mongoose.connection.disconnect();
};
// before(done => {
//   mongoose
//     .connect(connectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     })
//     .then(() => {
//       done();
//     })
//     .catch(err => {
//       console.log("error");
//       console.log(err);
//       done();
//     });
// });

// // //drop collections before each test
// // after(done => {
// //   //   let tasks = Object.keys(mongoose.connection.collections).map(collection => {
// //   //     return mongoose.connection.collection(collection).drop();
// //   //   });

// //   //   Promise.all(tasks)
// //   //     .then(() => {
// //   //       done();
// //   //     })
// //   //     .catch(err => {
// //   //       console.log("error");mocha OverwriteModelError: Cannot overwrite `User` model once compiled.
// //   //       console.log(err);
// //   //       done();
// //   //     })
// //   //     .finally(() => {
// //   //       mongoose.connection.close();
// //   //     });
// //   console.log("after");
// // });
