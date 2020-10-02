const Movie = require("../models/movie-model");
const User = require("../models/movie-model");
var bcrypt = require("bcrypt");

createMovie = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a movie",
    });
  }

  const movie = new Movie(body);

  if (!movie) {
    return res.status(400).json({ success: false, error: err });
  }

  movie
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: movie._id,
        message: "Movie created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Movie not created!",
      });
    });
};

updateMovie = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Movie not found!",
      });
    }
    movie.priorety = body.priorety;
    movie.name = body.name;
    movie.time = body.time;
    movie.rating = body.rating;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie._id,
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
  await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }

    return res.status(200).json({ success: true, data: movie });
  }).catch((err) => console.log(err));
};

getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: movie });
  }).catch((err) => console.log(err));
};

getMovies = async (req, res) => {
  await Movie.find({}, (err, movies) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!movies.length) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    return res.status(200).json({ success: true, data: movies });
  }).catch((err) => console.log(err));
};

getUser = async (req, res) => {
  await User.find({}, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

createUser = async (req, res) => {
  var newUser = new User(req.body);
  var saltRouds = 10;
  await User.findOne({ email: newUser.email })
    .then(async (profile) => {
      if (!profile) {
        console.log("no profile"),
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

checkUser = async (req, res) => {
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
              res.send(profile.id);
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


/*

    await User.findOne({ name: newUser.name })
    .then(profile => {
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
                name: profile.name
              };
              jsonwt.sign(
                payload,
                key.secret,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
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
    .catch(err => {
      console.log("Error is ", err.message);
    }); */
    

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById,
  getUser,
  createUser,
  checkUser,
};
