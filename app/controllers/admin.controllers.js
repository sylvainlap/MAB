/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Treatment = mongoose.model('Treatment');
var User      = mongoose.model('User');

exports.getUsers = function(req, res, next) {
	User.find(function(err, users) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		res.render('users', { title: 'Users', users: users });
	});
};

exports.getTreatments = function(req, res, next) {
	Treatment.find(function(err, treatments) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		res.render('treatments', { title: 'Treatments', treatments: treatments });
	});
};

