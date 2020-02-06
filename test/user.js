const assert = require("assert");
const User = require("../models/User");

describe("User", () => {
  it("adds user", done => {
    const user = new User({
      username: "tester"
    });
    user.save().then(() => {
      assert(user.isNew === false);
      done();
    });
  });

  it("finds user", done => {
    User.findOne({ username: "tester" }).then(user => {
      assert(user.username === "tester");
      done();
    });
  });

  it("sets password", done => {
    User.findOne({ username: "tester" }).then(async user => {
      user.setPassword("test").then(updatedUser => {
        assert(user.hash);
        assert(user.salt);
        done();
      });
    });
  });

  it("validates password", done => {
    User.findOne({ username: "tester" }).then(user => {
      assert(user.validPassword("test"));
      done();
    });
  });

  //   it("uses unique usernames only", done => {
  //     done();
  //   });
});
