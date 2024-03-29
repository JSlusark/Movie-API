const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	genre: {
		name: String,
		description: String,
	},
	director: {
		name: String,
		bio: String,
	},
	// Actors: [String],
	// ImagePath: String,
	// Featured: Boolean,
});

let userSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	birthday: Date,
	favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to be hashed.
 * @returns {string} The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

/**
 * Validates a password against the stored password hash.
 * @param {string} password - The password to be validated.
 * @returns {boolean} True if the password matches the hash, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.password); //Password in exercise
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
