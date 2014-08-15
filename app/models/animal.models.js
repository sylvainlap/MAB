/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * AnimalSchema
 */
var AnimalSchema = new Schema({
	species: {
		type: String,
		trim: true,
		required: '{PATH} is required!'
	},
	type: {
		type: String,
		trim: true,
		required: '{PATH} is required!'
	},
	weight: {
		type: Number,
		required: '{PATH} is required!'
	},
	age: {
		type: Number,
		required: '{PATH} is required!'
	},
	environment: {
		type: String,
		trim: true,
		required: '{PATH} is required!'
	}
});

mongoose.model('Animal', AnimalSchema);
