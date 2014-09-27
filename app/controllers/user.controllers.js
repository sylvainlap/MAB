/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var pagevet  = require('./pagevet.controllers');
var User     = mongoose.model('User');
var util     = require('util');

exports.updateUser = function(req, res, next) {
	codeCSO = req.params.codeCSO;
	User.findOne({ codeCSO: codeCSO }, function(err, user) {
		if (err) {
			res.json({ error: 'back_err_mongo' });
			return;
		}

		if (!user) {
			res.json({ error: 'back_no_user' });
			return;
		}

		pagevet.requestPagevet(codeCSO, function(err, result) {
			if (err) {
				res.json({ error: 'back_err_pagevet' });
				return;
			}

			console.log(util.inspect(result, false, null));

			user.firstname = result.donnees['F1.IND.IDENTITE'][0].info106;
			user.lastname = result.donnees['F1.IND.IDENTITE'][0].info104;
			user.email = result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2035;
			user.structure = result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2020;
			user.geoloc = {
				city: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2030[0],
				postcode: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2028[0],
				country: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2031[0],
				state: ""
			};
			user.save(function(err, user) {
				if (err) {
					res.json('back_err_mongo');
					return;
				}

				res.json(user);
			});
		});
	});
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

exports.createOrGetUser = function(codeCSO, callback) {
	User.findOne({ codeCSO: codeCSO }, function(err, user) {
		if (user) {
			// user already exists
			callback(null, user);
			return;
		}

		// user does not exist, create it
		pagevet.requestPagevet(codeCSO, function(err, result) {
			if (err) {
				callback(err);
				return;
			}

			user = new User({
				codeCSO: codeCSO,
				firstname: result.donnees['F1.IND.IDENTITE'][0].info106,
				lastname: result.donnees['F1.IND.IDENTITE'][0].info104,
				email: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2035,
				structure: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2020,
				geoloc: {
					city: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2030[0],
					postcode: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2028[0],
					country: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2031[0],
					state: ""
				}
			});
			user.save(function(err, user) {
				if (err) {
					callback(err);
					return;
				}

				callback(null, user);
			});
		});
	});
};
