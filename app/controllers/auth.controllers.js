/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var moment    = require('moment');
var jwt       = require('jwt-simple');
var path      = require('path');
var crypto    = require('./crypto.controllers');
var CONSTANTS = require('../../config/constants');
var User      = mongoose.model('User');

exports.generateToken = function(req, res, next) {
	var auth = req.params.auth;
	auth = auth.replace(/-/g, '+').replace(/_/g, '/').replace(/\./g, '=');
	auth = crypto.decrypt(new Buffer(auth, 'base64'));
	console.log(auth.toString());

	auth = auth.toString().split('|');
	var codeCso = auth[0];
	var md5ToTest = auth[1].slice(0,32);

	// build the md5
	var md5Computed = crypto.md5(req.ip + moment().format('YYYYMMDD') + codeCso);

	console.log(codeCso + ' / ' + md5ToTest + ' / ' + md5Computed);

	generateToken(codeCso, function(token) {
		res.json({ message: 'back_logged', token: token, _id: codeCso });
	});
};

exports.login = function(req, res, next) {
	res.sendFile(path.join(__dirname, '../../public/login.html'));
};

// TOUT CE QUI EST EN DESSOUS VA ETRE ENLEVE

exports.register = function(req, res, next) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (user)
			return res.json({ error: 'back_username_exists' });

		user = new User(req.body);
		user.save(function(err) {
			if (err)
				return res.json({ error: 'back_err_val_account' });

			// all went good, now we send the token
			generateToken(user.id, function(token) {
				res.json({ message: 'back_logged', token: token, _id: user.id, lang:user.lang, favs:user.favs });
			});
		});
	});
};

/*exports.login = function(req, res, next) {
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
					res.json({ message: 'back_logged', token: token, _id: user.id, lang:user.lang, favs:user.favs });
				});
			} else {
				res.json({ error: 'back_wrong_pass' });
			}
		});
	});
};*/

exports.decodeToken = function(req, res, next) {
	var token = req.headers['x-access-token'];

	if (token) {
		try {
			var decoded = jwt.decode(token, CONSTANTS.JWT_SECRET);
			User.findOne({ _id: decoded.iss }, function(err, user) {
				if (err)
					return res.json({ error: 'back_no_user' });

				req.user = user;
				return next();
			});
		} catch (err) {
			next(err);
		}
	} else {
		req.user = undefined;
		next();
	}
};

exports.requireLogin = function(req, res, next) {
	if (!req.user) {
		return res.json({ error: 'back_require_login' });
	} else {
		next();
	}
};

exports.getProfile = function(req, res, next) {
	// req.user is defined
	User.findById(req.user.id, function(err, user) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		// should never happen
		if (!user)
			return res.json({ error: 'back_no_user' });

		res.json(user);
	});
};

exports.updateProfile = function(req, res, next) {
	// req.user is defined
	User.findById(req.user.id, function(err, user) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		// should never happen
		if (!user)
			return res.json({ error: 'back_no_user' });

		// c'est un test, mais je pense que ca marche
		for (var attr in req.body) {
			user[attr] = req.body[attr];
		}
		user.save(function(err) {
			if (err)
				return res.json({ error: 'back_err_profile' });
		});
		res.json({ message: 'back_profile_ok' });
	});
};

function generateToken(id, callback) {
	var expires = moment().add('days', 7).valueOf();
	var token = jwt.encode({
		iss: id,
		exp: expires
	}, CONSTANTS.JWT_SECRET);
	callback(token);
}
