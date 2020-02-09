export const BASE_URL = location === "localhost" ? `/` : "produrl";

export function get() {
	throw new Error();
}

export function post(endpoint, jsonData) {
	return fetch(endpoint, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(jsonData)
	})
		.then(res => res.json())
		.catch(error => {
			console.log("error posting to " + endpoint);
			console.log(error);
		});
}
