//this hase bee added based on an example, it may be chnaged
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("common"));

let topMovies = [
  {
    title: "American Beauty",
  },
  {
    title: "Parasyte",
  },
  {
    title: "The Truman Show",
  },
  {
    title: "Midsommar",
  },
  {
    title: "Inception",
  },
  {
    title: "Spirited Away",
  },
  {
    title: "Requiem of a dream",
  },
  {
    title: "American Psycho",
  },
  {
    title: "Gone Girl",
  },
  {
    title: "Moonlight",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my top ten movies!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/index", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

// use requests
app.use(express.static("public"));
//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
