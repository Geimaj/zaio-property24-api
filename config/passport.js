const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		async (username, password, done) => {
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
