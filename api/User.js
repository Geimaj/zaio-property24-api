const { post, get } = require("./api");

module.exports.User = class User {
	constructor(
		username,
		password,
		fullname = "Joe Shmoe",
		email = "joe@blogs.com"
	) {
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.email = email;
	}

	signup() {
		return post("/signup", {
			...this
		});
	}

	login() {
		return post("/login", {
			...this
		});
	}

	static whoami() {
		return get("/whoami");
	}

	static getAll() {
		return get(`/user`);
	}

	static getById(userId) {
		return get(`/user/${userId}`);
	}
};
