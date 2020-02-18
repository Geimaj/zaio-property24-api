const { get, post, put, remove } = require("./api");

module.exports.Property = class Property {
	constructor(street, number, beds, baths, price) {
		this.street = street;
		this.number = number;
		this.beds = beds;
		this.baths = baths;
		this.price = price;
	}

	static getAll() {
		return get("/property", {});
	}

	static delete(id) {
		return remove(`/property/${id}`);
	}

	save() {
		return post("/property", {
			street: this.street,
			number: this.number,
			beds: this.beds,
			baths: this.baths,
			price: this.price
		});
	}

	update(id) {
		return put("/property", {
			id: id,
			street: this.street,
			number: this.number,
			beds: this.beds,
			baths: this.baths,
			price: this.price
		});
	}
};
