const BASE_URL =
	location.hostname === "localhost" ? `http://localhost:3030` : "produrl";
module.exports.BASE_URL = BASE_URL;

module.exports.get = function get() {
	throw new Error();
};

module.exports.post = function post(endpoint, jsonData) {
	const url = `${BASE_URL}${endpoint}`;
	return fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(jsonData),
		credentials: "include"
		// credentials: "same-origin"
	})
		.then(res => res.json())
		.catch(error => {
			console.log("error posting to " + url);
			console.log(error.message);
		});
};
