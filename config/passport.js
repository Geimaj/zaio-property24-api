const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		async (username, password, done) => {
			console.log("AUTHORIZING USER...");
			User.findOne({ username: username })
				.then(user => {
					if (!user) {
						return done(null, false, {
							message: "Incorrect username"
						});
					}

					if (!user.validPassword(password)) {
						return done(null, false, {
							message: "incorrect password"
						});
					}

					return done(null, user);
				})
				.catch(err => {
					console.log("caught err", err.message);
					done(err);
				});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(done);
});

module.exports = passport;
