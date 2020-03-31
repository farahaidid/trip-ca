const mongoose = require('mongoose')

const connectionString = process.env.MONGO_LOCAL

exports.connect = async () => {
   try {
      const config = {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      }
      await mongoose.connect(connectionString, config)
      console.log("Connected to database")
   }
   catch (error) { console.log(error.message) }
}