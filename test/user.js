const request = require("supertest");
const app = require("../index");
const { connect, disconnect } = require("./connection");
const expect = require("chai").expect;
const User = require("../models/User");

//drop all users
before(done => {
  connect()
    .then(res => {
      return User.deleteMany({});
    })
    .then(res => {
      done();
    })
    .catch(err => done(err));
});

describe("user", () => {
  it("creates user", done => {
    request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "test"
      })
      .expect(200)
      .then(res => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("logs in", done => {
    request(app)
      .post("/login")
      .send({
        username: "test",
        password: "test"
      })
      .expect(302)
      .expect("location", "/")
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it("validates creds", done => {
    request(app)
      .post("/login")
      .send({
        username: "test",
        password: "notpassword"
      })
      .expect(302)
      .expect("location", "/login?fail=true")
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it("only allows unique usernames", done => {
    request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "test"
      })
      .expect(422)
      .catch(err => done(err))
      .finally(done());
  });

  it("should save cookies", done => {
    request(app)
      .post("/login")
      .send({
        username: "test",
        password: "test"
      })
      .then(res => {
        const cookie = res.header["set-cookie"][0];
        expect(cookie.toString(), /^connect.sid/);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
