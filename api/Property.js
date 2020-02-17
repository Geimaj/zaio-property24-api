const { get } = require("./api");

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
};
