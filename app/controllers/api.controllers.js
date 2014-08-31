/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Treatment = mongoose.model('Treatment');

exports.getTreatments = function(req, res, next) {
	Treatment.find({ veterinary: req.headers.uid }, function(err, treatments) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		res.json(treatments);
	});
};

exports.postTreatment = function(req, res, next) {
	var treatment = new Treatment(req.body);
	treatment.save(function(err) {
		if (err)
			return res.json({ error: 'back_err_val_treatment' });

		res.json({ message: 'back_treatment_ok' });
	});
};
