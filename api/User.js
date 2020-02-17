const { post } = require("./api");

module.exports.User = class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  signup() {
    return post("/signup", {
      username: this.username,
      password: this.password
    });
  }

  login() {
    return post("/login", {
      username: this.username,
      password: this.password
    });
  }
};
