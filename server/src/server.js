'use strict'

// Importing app
const app = require("./app")

// Configuring env
const dotenv = require('dotenv')
dotenv.config({ path: "../.env" })

// Connecting to database
const database = require("./database/connection")
database.connect()

// Defining port
const PORT = process.env.PORT || 3500

// Starting server
app.listen(PORT, () => {
   console.log("\nSever started at http://localhost:" + PORT)
})