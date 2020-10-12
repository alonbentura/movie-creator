var User = require("../models/user-model");
var Movie = require("../models/movie-model");
var bcrypt = require("bcrypt");
var jsonwt = require("jsonwebtoken");
var key = require("../db/myUrl");

createMovie = async (req, res) => {
  const movieDetails = req.body.movie;
  const userId = req.user.id;
  await User.findOne({ _id: userId }, (err, user) => {
    user.movies.push(movieDetails);
    user
      .save()
      .then((result) => {
        return res.status(201).json({
          success: true,
          // movie,
          message: "Movie created!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Movie not created!",
        });
      });
  });
};

updateMovie = async (req, res) => {
  const body = req.body;
  const newMovie = req.body;
  newMovie.time.toString();
  await User.findOne({ _id: req.user.id }, (err, user) => {
    const index = user.movies.findIndex((movie) => movie.id === req.params.id);
    user.movies[index] = newMovie;
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: req.params.id,
          message: "Movie updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Movie not updated!",
        });
      });
  });
};

deleteMovie = async (req, res) => {
  const userId = req.user.id;
  await User.findOne({ _id: userId }, (err, user) => {
    const index = user.movies.findIndex((movie) => movie.id === req.params.id);
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    user.movies.splice(index, 1);
    user
      .save()
      .then(() => {
        return res.status(200).json({ success: true, data: user.movies });
      })
      .catch((err) => console.log(err));
  });
};

getUserMovies = async (req, res) => {
  await User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user.movies) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    const movies = user.movies;
    return res.status(200).json({ success: true, data: movies });
  }).catch((err) => console.log(err));
};

createUser = async (req, res) => {
  var newUser = new User(req.body);
  var saltRouds = 10;
  await User.findOne({ email: newUser.email })
    .then(async (profile) => {
      if (!profile) {
          bcrypt.hash(newUser.password, saltRouds, (err, hash) => {
            if (err) {
              console.log("Error is", err.message);
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then(() => {
                  res.status(200).send(newUser);
                })
                .catch((err) => {
                  console.log("Error is ", err.message);
                });
            }
          });
      } else {
        res.send("User already exists...");
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
};

getUser = async (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  await User.findOne({ email: newUser.email })
    .then((profile) => {
      if (!profile) {
        res.send("User not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result == true) {
              //   res.send("User authenticated");
              const payload = {
                id: profile.id,
                email: profile.email,
              };
              jsonwt.sign(
                payload,
                key.secret,
                { expiresIn: 1000000 },
                (err, token) => {
                  delete profile.password;
                  res.json({
                    success: true,
                    token: token,
                    user: profile,
                  });
                }
              );
            } else {
              res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log("Error is ", err.message);
    });
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getUserMovies,
  createUser,
  getUser,
};
