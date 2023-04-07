//Importing node modules
const express = require(`express`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
const uuid = require(`uuid`);
const app = express();
app.use(morgan(`common`));
app.use(bodyParser.json());

let movies = [
  {
    title: "American Beauty",
    description: `Lester Burnham is a gainfully employed suburban husband and father. Fed up with his boring, stagnant existence, he quits his job and decides to reinvent himself as a pot-smoking, responsibility-shirking teenager. What follows is at once cynical, hysterical, and, eventually, tragically uplifting.`,
    genre: {
      name: `Drama`,
      description: `Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues.`,
    },
    director: {
      name: `Sam Mendes`,
      bio: `Samuel Alexander Mendes was born on August 1, 1965 in Reading, England, UK to parents James Peter Mendes, a retired university lecturer, and Valerie Helene Mendes, an author who writes children's books. Their marriage didn't last long, James divorced Sam's mother in 1970 when Sam was just 5-years-old. Sam was educated at Cambridge University and joined the Chichester Festival Theatre following his graduation in 1987. Afterwards, he directed Judi Dench in "The Cherry Orchard", for which he won a Critics Circle Award for Best Newcomer. He then joined the Royal Shakespeare Company, where he directed such productions as "Troilus and Cressida" with Ralph Fiennes and "Richard III". In 1992, he became artistic director of the reopened Donmar Warehouse in London, where he directed such productions as "The Glass Menagerie" and the revival of the musical "Cabaret", which earned four Tony Awards including one for Best Revival of a Musical. He also directed "The Blue Room" starring Nicole Kidman. In 1999, he got the chance to direct his first feature film, American Beauty (1999). The movie earned 5 Academy Awards including Best Picture and Best Director for Mendes, which is a rare feat for a first-time film director.`,
      birthYear: `1965`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BNTBmZWJkNjctNDhiNC00MGE2LWEwOTctZTk5OGVhMWMyNmVhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg`,
    year: `1999`,
    featured: `Yes`,
  },
  {
    title: "Parasite",
    description: `The film follows a poor family who scheme to become employed by a wealthy family, infiltrating their household by posing as unrelated, highly qualified individuals.`,
    genre: {
      name: `Drama`,
      description: `Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues.`,
    },
    director: {
      name: `Bong Joon-ho`,
      bio: `Bong Joon-ho is a South Korean filmmaker. The recipient of three Academy Awards, his filmography is characterized by emphasis on social themes, genre-mixing, black humor, and sudden tone shifts. He first became known to audiences and achieved a cult following with his directorial debut film, the black comedy Barking Dogs Never Bite (2000), before achieving both critical and commercial success with his subsequent films: the crime thriller Memories of Murder (2003), the monster film The Host (2006), the science fiction action film Snowpiercer (2013), and the black comedy thriller Parasite (2019), all of which are among the highest-grossing films in South Korea, with Parasite also being the highest-grossing South Korean film in history.
      All of Bong's films have been South Korean productions, although both Snowpiercer and Okja (2017) are mostly in the English language. Two of his films have screened in competition at the Cannes Film Festival-Okja in 2017 and Parasite in 2019; the latter earned the Palme d'Or, which was a first for a South Korean film. Parasite also became the first South Korean film to receive Academy Award nominations, with Bong winning Best Picture, Best Director, and Best Original Screenplay, making Parasite the first film not in English to win Best Picture. In 2017, Bong was included on Metacritic's list of the 25 best film directors of the 21st century. In 2020, Bong was included in Time's annual list of 100 Most Influential People and Bloomberg 50.`,
      birthYear: `1969`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg`,
    year: `2019`,
    featured: `Yes`,
  },
  {
    title: "The Truman Show",
    description: `He doesn't know it, but everything in Truman Burbank's (Jim Carrey) life is part of a massive TV set. Executive producer Christof (Ed Harris) orchestrates "The Truman Show," a live broadcast of Truman's every move captured by hidden cameras. Cristof tries to control Truman's mind, even removing his true love, Sylvia (Natascha McElhone), from the show and replacing her with Meryl (Laura Linney). As Truman gradually discovers the truth, however, he must decide whether to act on it.`,
    genre: {
      name: `Drama`,
      description: `Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues.`,
    },
    director: {
      name: `Peter Weir`,
      bio: `Peter Weir was born on August 21, 1944 in Sydney, New South Wales, Australia. He is a director and writer, known for Master and Commander: The Far Side of the World (2003), The Way Back (2010) and Witness (1985). He has been married to Wendy Stites since 1966. They have two children.`,
      birthYear: `1944`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg`,
    year: `1998`,
    featured: `No`,
  },
  {
    title: "Midsommar",
    description: `A young American couple, their relationship foundering, travel to a fabled Swedish midsummer festival where a seemingly pastoral paradise transforms into a sinister, dread-soaked nightmare as the locals reveal their terrifying agenda.`,
    genre: {
      name: `Horror`,
      description: `Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.`,
    },
    director: {
      name: `Ari Aster`,
      bio: `Ari Aster is an American film director, screenwriter, and producer. He is known for writing and directing the A24 horror films Hereditary (2018) and Midsommar (2019). Aster was born into a Jewish family in New York City on July 15, 1986, the son of a poet mother and musician father. He has a younger brother. He recalled going to see his first movie, Dick Tracy, when he was four years old. The film featured a scene where a character fired a Tommy gun in front of a wall of fire. Aster reportedly jumped from his seat and "ran six New York City blocks" while his mother tried to catch him. In his early childhood, Aster's family briefly lived in England, where his father opened a jazz nightclub in Chester. Aster enjoyed living there, but the family returned to the U.S. and settled in New Mexico when he was 10 years old.`,
      birthYear: `1986`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_FMjpg_UX1000_.jpg`,
    year: `2019`,
    featured: `Yes`,
  },
  {
    title: "Inception",
    description: `Dom Cobb is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.`,
    genre: {
      name: `Sci-fi`,
      description: `Science fiction is a time-sensitive subject in literature. Usually futuristic, science fiction speculates about alternative ways of life made possible by technological change, and hence has sometimes been called "speculative fiction." Like fantasy, and often associated with it, science fiction envisions alternative worlds with believably consistent rules and structures, set apart somehow from the ordinary or familiar world of our time and place. Distinct from fantasy, however, science fiction reflects on technology to consider how it might transform the conditions of our existence and change what it means to be human. "Sci Fi" is the genre that considers what strange new beings we might become-what mechanical forms we might invent for our bodies, what networks and systems might nourish or tap our life energies, and what machine shells might contain our souls.`,
    },
    director: {
      name: `Christopher Nolan`,
      bio: `Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.`,
      birthYear: `1970`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg`,
    year: `2010`,
    featured: `No`,
  },
  {
    title: "Spirited Away",
    description: `10-year-old Chihiro moves with her parents to a new home in the Japanese countryside. After taking a wrong turn down a wooded path, Chihiro and her parents discover an amusement park with a stall containing an assortment of food. To her surprise, Chihiro's parents begin eating and then transform into pigs. In this supernatural realm, Chihiro encounters a host of characters and endures labor in a bathhouse for spirits, awaiting a reunion with her parents.`,
    genre: {
      name: `Animation`,
      description: `Based on the fact that animated movies all tend to share the same themes and style of storytelling, one could very easily argue that animation is a genre. This argument could even be broken down to encompass different studios as being different sub-genres.`,
    },
    director: {
      name: `Hayao Miyazaki`,
      bio: `Hayao Miyazaki is 1 of Japan's greatest animation directors. The entertaining plots, compelling characters & breathtaking animation in his films have earned him international renown from critics as well as public recognition within Japan.

    He was born on January 5, 1941 in Tokyo. He started his career in 1963 as an animator at the studio Toei Douga studio, and was subsequently involved in many early classics of Japanese animation. From the beginning, he commanded attention with his incredible drawing ability and the seemingly endless stream of movie ideas he proposed.`,
      birthYear: `1941`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg`,
    year: `2003`,
    featured: `Yes`,
  },
  {
    title: "Requiem of a dream",
    description: `Imaginatively evoking the inner landscape of human beings longing to connect, to love and feel loved, the film is a parable of happiness gloriously found and tragically lost. "Requiem for a Dream" tells parallel stories that are linked by the relationship between the lonely, widowed Sara Goldfarb and her sweet but aimless son, Harry. The plump Sara, galvanized by the prospect of appearing on a TV game show, has started on a dangerous diet regimen to beautify herself for a national audience.`,
    genre: {
      name: `Drama`,
      description: `Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues.`,
    },
    director: {
      name: `Darren Aronofsky`,
      bio: `Darren Aronofsky was born February 12, 1969, in Brooklyn, New York. Growing up, Darren was always artistic: he loved classic movies and, as a teenager, he even spent time doing graffiti art. After high school, Darren went to Harvard University to study film (both live-action and animation). He won several film awards after completing his senior thesis film, "Supermarket Sweep", starring Sean Gullette, which went on to becoming a National Student Academy Award finalist. Aronofsky didn't make a feature film until five years later, in February 1996, where he began creating the concept for Pi (1998). After Darren's script for Pi (1998) received great reactions from friends, he began production. The film re-teamed Aronofsky with Gullette, who played the lead. This went on to further successes, such as Requiem for a Dream (2000), The Wrestler (2008) and Black Swan (2010). Most recently, he completed the films Noah (2014) and Mother! (2017).`,
      birthYear: `1969`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg`,
    year: `2002`,
    featured: `No`,
  },
  {
    title: "American Psycho",
    description: `In New York City in 1987, a handsome, young urban professional, Patrick Bateman, lives a second life as a gruesome serial killer by night. The cast is filled by the detective, the fiance, the mistress, the coworker, and the secretary. This is a biting, wry comedy examining the elements that make a man a monster.`,
    genre: {
      name: `Horror`,
      description: `Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.`,
    },
    director: {
      name: `Mary Harron`,
      bio: `Mary Harron (born January 12, 1953) is a Canadian filmmaker and screenwriter. She gained recognition for her role in writing and directing several independent films, including I Shot Andy Warhol (1996), American Psycho (2000), and The Notorious Bettie Page (2005). She co-wrote American Psycho and The Notorious Bettie Page with Guinevere Turner. Although Harron has denied this title, she has been thought to be feminist filmmaker due to her film on lesbian feminist Valerie Solanas, in I Shot Andy Warhol (1996), and a queer story-line within her teenage Gothic horror, The Moth Diaries (2011).`,
      birthYear: `1953`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg`,
    year: `2000`,
    featured: `No`,
  },
  {
    title: "Gone Girl",
    description: `In Carthage, Mo., former New York-based writer Nick Dunne and his glamorous wife Amypresent a portrait of a blissful marriage to the public. However, when Amy goes missing on the couple's fifth wedding anniversary, Nick becomes the prime suspect in her disappearance. The resulting police pressure and media frenzy cause the Dunnes' image of a happy union to crumble, leading to tantalizing questions about who Nick and Amy truly are.`,
    genre: {
      name: `Thriller`,
      description: `Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety.`,
    },
    director: {
      name: `David Fincher`,
      bio: `Gillian Flynn was born on 24 February 1971 in Kansas City, Missouri, USA. She is a writer and producer, known for Gone Girl (2014), Widows (2018) and Utopia (2020). She has been married to Brett Nolan since 2007. They have two children.`,
      birthYear: `1971`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_.jpg`,
    year: `2014`,
    featured: `No`,
  },
  {
    title: "Moonlight",
    description: `Chiro, a young African-American boy, finds guidance in Juan, a drug dealer, who teaches him to carve his own path. As he grows up in Miami, Juan's advice leaves a lasting impression on him.`,
    genre: {
      name: `Drama`,
      description: `Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues.`,
    },
    director: {
      name: `David Fincher`,
      bio: `David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy in Hollywood. He went on to found Propaganda in 1987 with fellow directors Dominic Sena, Greg Gold and Nigel Dick. Fincher has directed TV commercials for clients that include Nike, Coca-Cola, Budweiser, Heineken, Pepsi, Levi's, Converse, AT&T and Chanel. He has directed music videos for Madonna, Sting, The Rolling Stones, Michael Jackson, Aerosmith, George Michael, Iggy Pop, The Wallflowers, Billy Idol, Steve Winwood, The Motels and, most recently, A Perfect Circle.
    As a film director, he has achieved huge success with Seven (1995), Fight Club (1999) and, Panic Room (2002).`,
      birthYear: `1962`,
      deathYear: `0`,
    },
    imageurl: `https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_.jpg`,
    year: `2017`,
    featured: `No`,
  },
];

let users = [
  { id: 1, name: "Florence", favoriteMovies: [] },
  { id: 2, name: "Marceline", favoriteMovies: ["Inception"] },
];

//_______________________ Methods used to change user details _______________________
// READ: provides list of users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

//CREATE: creates a user and gives an ID
app.post("/users", (req, res) => {
  console.log({
    req: true,
    body: req.body,
  });
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send(`users need names`);
  }
});

//UPDATE: upates a user name
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//CREATE: adds a movie to the user's favoriteMovie array
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res
      .status(200)
      .send(
        `${movieTitle} has been added to user ${id})'s array (name: ${user.name})`
      );
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE: removes a movie from a user
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(
        `${movieTitle} has been removed from user ${id}'s array ("${user.name}")`
      );
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE removes a user from the users array
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id != id);
    // res.status(200).json(users);
    res.status(200).send(`User ${user.id} ("${user.name}") has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

//_______________________ Methods used to access web pages _______________________
// READ: brings to main web page
app.get("/", (req, res) => {
  res.send("Welcome to my top ten movies!");
});
// USE: this will allow to request static pages from the public folder as filename.html
app.use(express.static(`public`));

//_______________________ Methods used for movies array _______________________
//READ:provides list of movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ: provides movie title info
app.get(`/movies/:title`, (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("This movie title is not in the collection");
  }
});

//READ: provides genre info
app.get(`/movies/genre/:genreName`, (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("This genre is not in the collection");
  }
});

// READ: provides director info
app.get(`/movies/director/:directorName`, (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.name === directorName
  ).director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("This director is not in the collection");
  }
});

//_____ error handling ____
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//_____ Listening on port 8080 ____
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
