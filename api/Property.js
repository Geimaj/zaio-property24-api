const { get, post, put, remove } = require("./api");

module.exports.Property = class Property {
	constructor(
		street = "long street",
		number = 0,
		beds = 0,
		baths = 0,
		price = 0,
		images = [],
		postCode = "0000",
		name = `${beds} beds on ${street}`,
		city = "Cape Town"
	) {
		this.street = street;
		this.number = number;
		this.beds = beds;
		this.baths = baths;
		this.price = price;
		this.images = images;
		this.postCode = postCode;
		this.name = name;
		this.city = city;
	}

	static getAll() {
		return get("/property");
	}

	static getAllForUser(userId) {
		return get(`/property?postedBy=${userId}`, {
			postedBy: userId
		});
	}

	static getAllByName(propertyName) {
		return get(`/property?name=${propertyName}`);
	}

	static delete(id) {
		return remove(`/property/${id}`);
	}

	static getById(id) {
		return get(`/property/${id}`);
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
