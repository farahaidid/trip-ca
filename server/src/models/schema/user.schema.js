const mongoose = require('mongoose')

const validName = /^[a-zA-Z ]{2,16}$/;
const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const name = {
   type: String,
   required: true,
   match: validName
}

const schema = new mongoose.Schema({
   firstName: name,
   lastName: name,
   dateOfBirth: {
      type: Date,
      required: true
   },
   email: {
      type: String,
      required: true,
      match: validEmail,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   gender: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   }
})

module.exports = schema