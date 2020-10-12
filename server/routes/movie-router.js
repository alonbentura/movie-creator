const express = require("express");
var passport = require("passport");
const MovieCtrl = require("../controllers/movie-ctrl");

const router = express.Router();
router.post("/user", MovieCtrl.createUser);
router.post("/getUser", MovieCtrl.getUser);
router.use(passport.authenticate("jwt", { session: false }));
router.post("/movie", MovieCtrl.createMovie);
router.put("/movie/:id", MovieCtrl.updateMovie);
router.delete("/movie/:id", MovieCtrl.deleteMovie);
router.get("/user/movies", MovieCtrl.getUserMovies);
// router.get('/user', MovieCtrl.getUser)

module.exports = router;
