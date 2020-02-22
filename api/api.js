const BASE_URL =
	process.env.REACT_APP_BASE_URL ||
	"https://zaio-property24-api.herokuapp.com";

module.exports.get = function get(endpoint) {
	const url = `${BASE_URL}${endpoint}`;

	return fetch(url, {
		method: "GET",
		credentials: "include"
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log("error getting " + url);
			return err;
		});
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
	})
		.then(res => {
			return res.json();
		})
		.catch(error => {
			console.log("error posting to " + url);
			console.log(error.message);
			return error;
		});
};

module.exports.put = function put(endpoint, jsonData) {
	const url = `${BASE_URL}${endpoint}`;
	return fetch(url, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(jsonData),
		credentials: "include"
	})
		.then(res => {
			return res.json();
		})
		.catch(error => {
			console.log("error putting " + url);
			console.log(error.message);
			return error;
		});
};

module.exports.remove = function remove(endpoint) {
	const url = `${BASE_URL}${endpoint}`;
	return fetch(url, {
		method: "DELETE",
		credentials: "include"
	})
		.then(res => res.json())
		.catch(error => {
			console.log("error deleting " + url);
			console.log(error.message);
			return error;
		});
};
