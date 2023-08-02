# **"My Movie Movie List" Documentation**

Welcome to "My Movie List" API documentation page. <br>
[This](https://shrouded-ocean-05047.herokuapp.com/documentation.html) is the server-side component of the "My Movie List" web application which can be found here: [React Version](https://mymovielistj.netlify.app/), [Angular Version](https://birdieber.github.io/myFlix-Angular-client/welcome). <br>
The API stores different movie name and provides users with access to information such as movie title, directors name and info, genres.
In the app, users can sign up, browse through the movie info, update their personal information, create a list of their favorite movies and delete their account.

## **Technologies Used**
The Movie Flix application is built with the following technologies:

- JavaScript
- MongoDB (NoSQL database)
- Express (Node.js framework)
- Node.js
- Postman (API development and testing)
- PostgreSQL (Relational database, assumed to be used in addition to MongoDB)
- Mongoose (MongoDB object modeling)

## **Features**
The Movie Flix API supports the following features:

**Get All Movies**
- **URL:** /movies
- **HTTP Method:** GET
- **Query Parameters:** N/A
- **Request Body Data Format:** N/A
- **Response Body Data Format:** JSON object holding data about all the movies

**Get Single Movie by Title**
- **URL:** /movies/:Title
- **HTTP Method:** GET
- **Query Parameters:** :title
- **Request Body Data Format:** N/A
- **Response Body Data Format:** JSON object holding data about a single movie

**Get Genre by Name**
- **URL:** /movies/genre/:genreName
- **HTTP Method:** GET
- **Query Parameters:** :genreName
- **Request Body Data Format:** N/A
- **Response Body Data Format:** JSON object holding data about a specific genre of movie

**Get Director by Name**
- **URL:** /movies/directors/:directorName
- **HTTP Method:** GET
- **Query Parameters:** :directorName
- **Request Body Data Format:** N/A
- **Response Body Data Format:** JSON object holding data about a specific director

**User Registration**
- **URL:** /users
- **HTTP Method:** POST
- **Query Parameters:** N/A
- **Request Body Data Format:** JSON object holding data about the users to add, structured like this:
>{
  *"Username": "String",*<br>
  *"Password": "String",*<br>
  *"Email": "String",*<br>
  *"Birthday": "Date"*
}
- **Response Body Data Format:** JSON object holding data about the user that was added, structured like this:
>{
  *"username": "Test1",*<br>
  *"Password": "1234",*<br>
  *"Email": "testtest@gmail.com",*<br>
  *"Birthday": "1988-08-08",*<br>
  *"favorite_movies": [],*<br>
  *"id": "some-unique-id"*<br>
}

**Update User Info**
- **URL:** /users/:Username
- **HTTP Method:** PUT
- **Query Parameters:** :Username
- **Request Body Data Format:** JSON object holding data about the updated user information
- **Response Body Data Format:** N/A

**Add Movie to Favorites**
- **URL:** /users/:Username/movies/:MovieID
- **HTTP Method:** POST
- **Query Parameters:** :Username, :MovieID
- **Request Body Data Format:** N/A
- **Response Body Data Format:** JSON object holding data about the user and the movie that was added

**Remove Movie from Favorites**
- **URL:** /users/:Username/movies/:MovieID
- **HTTP Method:** DELETE
- **Query Parameters:** :Username, :MovieID
- **Request Body Data Format:** N/A
- **Response Body Data Format:** JSON object holding data about the user and the movie that was removed

**User Deregistration**
- **URL:** /users/:Username
- **HTTP Method:** DELETE
- **Query Parameters:** N/A
- **Request Body Data Format:** N/A
- **Response Body Data Format:** A text message indicating whether the user has successfully deregistered

## **Database Information**
The Movie Flix application interacts with a database to store data about different movies, directors, genres, and user information. The following databases are utilized:

**MongoDB:** Stores data related to movies, directors, and genres using a NoSQL approach.
**PostgreSQL:** Presumed to be used for storing user information and favorites list in a relational format.
