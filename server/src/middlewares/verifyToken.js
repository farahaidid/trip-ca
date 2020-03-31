const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
   let token = req.header("access-token") || req.query.token
   console.log("verifyToken", token)
   if (!token) { return res.status(401).json({ error: true, message: "Access denied!" }) }
   jwt.verify(token, process.env.TOKEN_SECRET,
      (err, decoded) => {
         if (err) return res.status(401).json({ error: true, message: err.message })
         req.body = { ...req.body, _id: decoded._id }
         next()
      }
   )
}