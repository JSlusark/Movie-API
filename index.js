//Importing node modules
const express = require(`express`);
const morgan = require(`morgan`);
const mongoose = require("mongoose");
const bodyParser = require(`body-parser`);
const uuid = require(`uuid`);
const path = require(`path`);
const app = express();
const Models = require("./models.js");

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/myflix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize Models
const Movies = Models.Movie;
const Users = Models.User;

app.use(morgan(`common`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Auth.js here
let auth = require("./auth.js")(app);
const passport = require("passport");
require("./passport.js");

//_______________________ Methods for User list _______________________
// READ:list of users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// READ: details on a user
app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ username: req.params.username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//CREATE: creates/adds a user
app.post(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          console.log(user, req.body);
          return res.status(400).send(req.body.username + "already exists");
        } else {
          Users.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//UPDATE: updates a user
app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// UPDATE: Add a movie to a user's list of favorites
app.post(
  "/users/:username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: { favoriteMovies: req.params.MovieID },
      },
      { new: true }
    )
      .then((updatedUser) => {
        console.log(updatedUser, req.params);
        res.json(updatedUser);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//DELETE: removes a movie from a user MONGOOSE
app.delete(
  "/users/:username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: { favoriteMovies: req.params.MovieID },
      },
      { new: true }
    )
      .then((updatedUser) => {
        console.log(updatedUser);
        res.json(updatedUser);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//DELETE removes a user
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//_______________________ Methods for movies collection _______________________

//READ: list of movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//READ: movie title
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ title: req.params.title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//READ: genre info
app.get(
  "/movies/genre/:genreName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "genre.name": req.params.genreName })
      .then((movie) => {
        res.json(movie.genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// READ: director info MONGOOSE
app.get(
  "/movies/director/:directorName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "director.name": req.params.directorName })
      .then((movie) => {
        res.json(movie.director);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//_______________________ Other Methods _______________________

// Access static pages from the public folder as filename.html
app.use(express.static(`public`));

app.get("/docs", (req, res) => {
  res.sendFile("documentation.html", {
    root: path.join(__dirname, "public"),
  });
});

//_____ error handling ____
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Something's not right. Please try again later.");
});

//_____ Listening on port 8080 ____
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
