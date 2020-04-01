const mongoose = require('mongoose')

const { ObjectId } = require('mongoose').SchemaTypes

const schema = new mongoose.Schema({
   city: {
      type: String,
      required: true
   },
   dateFrom: {
      type: Date,
      required: true
   },
   dateTo: {
      type: Date,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   addedBy: {
      type: ObjectId,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now()
   }
})

module.exports = schema