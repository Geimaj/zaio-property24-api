const signupRouter = require("express").Router();
const { User } = require("../models/User");

signupRouter.route("/").post(async (req, res, next) => {
<<<<<<< HEAD
  const { username, password, email, fullname } = req.body;
  try {
    //validate
    if (!username) {
      throw new Error("usernamename is required");
    }
    if (!password) {
      throw new Error("password is required");
    }

    const existingUsers = await User.find({ username: username });
    //ensure username is available
    if ((await existingUsers).length > 0) {
      throw new Error("username is taken");
    }
=======
	const { username, password, email, fullname } = req.body;
	try {
		//validate
		if (!username) {
			throw new Error("{error: 'usernamename is required'}");
		}
		if (!password) {
			throw new Error("{error: 'password is required'}");
		}

		const existingUsers = await User.find({ username: username });
		//ensure username is available
		if ((await existingUsers).length > 0) {
			throw new Error("{error: 'username is taken'}");
		}
>>>>>>> de30977dbf371be41c9158ab8ad94148d7f5781b

		new User({
			username: username,
			email: email,
			fullname: fullname
		})
			.save()
			.then(user => user.setPassword(password))
			.then(user =>
				res.send({
					_id: user._id,
					username: user.username,
					email: user.email,
					fullname: user.fullname
				})
			)
			.catch(next);
	} catch (err) {
		console.log("nexting...");
		next(err);
	}
});

module.exports = signupRouter;
