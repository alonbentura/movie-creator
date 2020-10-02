const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var passport = require("passport");
const db = require("./db");
const movieRouter = require("./routes/movie-router");
const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// require("./strategies/jsonwtStrategy")(passport);
app.use("/api", movieRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
