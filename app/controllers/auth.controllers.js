/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var moment   = require('moment');
var jwt      = require('jwt-simple');
var User     = mongoose.model('User');

var jwtTokenSecret = '1mB4tm3n';

exports.register = function(req, res, next) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (user)
			return res.json({ error: 'back_username_exists' });

		user = new User(req.body);
		user.save(function(err) {
			if (err)
				return res.json({ error: 'back_err_during_validation' });

			// all went good, now we send the token
			generateToken(user.id, function(token) {
				res.json({ message: 'back_logged', token: token, _id: user.id });
			});
		});
	});
};

exports.login = function(req, res, next) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		if (!user)
			return res.json({ error: 'back_user_not_found' });

		user.comparePassword(req.body.password, function(err, isMatch) {
			if (err)
				return res.json({ error: 'back_err_compare' });

			if (isMatch) {
				// build and send the token
				generateToken(user.id, function(token) {
					res.json({ message: 'back_logged', token: token, _id: user.id });
				});
			} else {
				res.json({ error: 'back_wrong_pass' });
			}
		});
	});
};

exports.decodeToken = function(req, res, next) {
	var token = req.headers['x-access-token'];

	if (token) {
		try {
			var decoded = jwt.decode(token, jwtTokenSecret);
			User.findOne({ _id: decoded.iss }, function(err, user) {
				if (err)
					return res.json(err);

				req.user = user;
				return next();
			});
		} catch (err) {
			next(err);
		}
	} else {
		console.log('no token here...');
		req.user = undefined;
		next();
	}
};

exports.requireLogin = function(req, res, next) {
	if (!req.user) {
		res.json({ error: 'You need to be authentified !' });
	} else {
		next();
	}
};

exports.getProfile = function(req, res, next) {
	// req.user is defined
	User.findById(req.user.id, function(err, user) {
		if (err)
			return res.json(err);

		// should never happen
		if (!user)
			return res.json({ error: 'User not found.' });

		res.json(user);
	});
};

exports.updateProfile = function(req, res, next) {
	// req.user is defined
	User.findById(req.user.id, function(err, user) {
		if (err)
			return res.json(err);

		// should never happen
		if (!user)
			return res.json({ error: 'User not found.' });

		// c'est un test, mais je pense que ca marche
		for (var attr in req.body) {
			user[attr] = req.body[attr];
		}
		user.save(function(err) {
			if (err)
				return res.json(err);
		});
		res.json({ message: 'Profile successfully updated.' });
	});
};

function generateToken(id, callback) {
	var expires = moment().add('days', 7).valueOf();
	var token = jwt.encode({
		iss: id,
		exp: expires
	}, jwtTokenSecret);
	callback(token);
}
