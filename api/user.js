const { get, post } = require("./api");

export function createUser(user) {
	post(user).then(res => {
		console.log(res);
	});
}
