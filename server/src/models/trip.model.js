const mongoose = require("mongoose")
const schema = require("./schema/trip.schema")

const trips = mongoose.model('trips', schema)

module.exports = trips