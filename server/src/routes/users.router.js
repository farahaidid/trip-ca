const userRouter = require('express').Router()
const usersRouter = require('express').Router()

const { verifyToken } = require("../middlewares/verifyToken")
const { createUser, loginUser, getUserProfile, updateProfile } = require('../controllers/user.controller')
const { getTrips, createTrip, deleteTrip } = require('../controllers/trip.controller')

usersRouter.route("/").post(createUser)

userRouter.route("/login").post(loginUser)
userRouter.route("/:id")
   .get(verifyToken, getUserProfile)
   .patch(verifyToken, updateProfile)

userRouter.route("/:id/trips")
   .post(verifyToken, createTrip)
   .get(verifyToken, getTrips)

userRouter.route("/:id/trip/:tripId")
   .delete(verifyToken, deleteTrip)

exports.userRouter = userRouter
exports.usersRouter = usersRouter