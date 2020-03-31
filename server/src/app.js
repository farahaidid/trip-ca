const express = require("express")
const app = express()

// Middlewares
const cors = require('cors')
const { handleError } = require('./middlewares/error.handler')

// Router
const router = require("./routes/index.routes")

app
   .use(cors())

   // Body parser
   .use(express.urlencoded({ extended: true }))
   .use(express.json())

   // Router
   .use(router)

   // Global error handler
   .use((err, _, res, __) => { handleError(err, res) })

// Exporting app
module.exports = app