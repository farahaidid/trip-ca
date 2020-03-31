const mongoose = require('mongoose')

const connectionString = "mongodb://localhost:27017/Trip"//process.env.MONGO_LOCAL

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