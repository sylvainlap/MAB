/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Treatment = mongoose.model('Treatment');

exports.getTreatments = function(req, res, next) {
	Treatment.find(function(err, treatments) {
		if (err)
			return res.json(err);

		res.json(treatments);
	});
};

exports.postTreatment = function(req, res, next) {
	var treatment = new Treatment(req.body);
	treatment.save(function(err) {
		if (err)
			console.log(err);
			return res.json(err);

		res.json(treatment);
	});
};
