const { get, post, put, remove } = require("./api");

module.exports.Property = class Property {
	constructor(
		street = "long street",
		number = 0,
		beds = 0,
		baths = 0,
		price = 0,
		images = []
	) {
		this.street = street;
		this.number = number;
		this.beds = beds;
		this.baths = baths;
		this.price = price;
		this.images = images;
	}

	static getAll() {
		return get("/property", {});
	}

	static getAllForUser(userId) {
		return get(`/property?postedBy=${userId}`, {
			postedBy: userId
		});
	}

	static delete(id) {
		return remove(`/property/${id}`);
	}

	save() {
		return post("/property", {
			...this
		});
	}

	update(id) {
		return put("/property", {
			...this,
			id: id
		});
	}
};
