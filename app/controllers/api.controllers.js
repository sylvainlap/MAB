/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Animal   = mongoose.model('Animal');

exports.getAnimals = function(req, res, next) {
	Animal.find(function(err, animals) {
		if (err)
			return res.json(err);

		res.json(animals);
	});
};

exports.createAnimal = function(req, res, next) {
	var animal = new Animal(req.body);
	animal.save(function(err) {
		if (err)
			return res.json(err);

		res.json(animal);
	});
};
