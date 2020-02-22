# Property24 API
![Publish to NPM](https://github.com/Geimaj/zaio-property24-api/workflows/Publish%20to%20NPM/badge.svg)
To install:

- Clone this repository
- npm install "/path/to/this/repo" inside your client project

To use:

## User

```
import { User } from "zaio-property24-api/api/User";

//signup
new User(
    "username",
    "password",
    "fullname",
    "email"
    )
    .signup()
    .then(user => {
        console.log(user)
    })
    .catch(err => {
        console.log(err)
    })

//login
new User("username","password")
    .login()
    .then(...)
    .catch(...)

```

## Property

```
import { Property } from "zaio-property24-api/api/Property";

//fetch all properties
Property
    .getAll()
    .then(properties => {
        console.log(properties)
    })
    .catch(err => {
        console.log(err)
    })

//delete property
Property.delete(property.id).then(...).catch(...)

//create new property
new Property(
        "main street", //street
        5, //number
        2, //beds
        2, //baths
        100000, //price
        ["https://image1.com", "https://image2.com"], //images
        7500 //postCode,
        "Country cottage" //name
    )
    .save()
    .then(...)
    .catch(...)

//update property
new Property(street, number, beds, baths, price)
    .update(id)
    .then(...)
    .catch(...)

//get app properties posted by a particular user
Property.getAllForUser(user.id).then(....)

//search properties by name
Property.getAllByName("beach villa").then(...)

```
