const mongoose = require("mongoose")
const schema = require("./schema/user.schema")

const users = mongoose.model('users', schema)

module.exports = users