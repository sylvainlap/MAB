/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var SALT_WORK_FACTOR = 10;

/**
 * UserSchema
 */
var UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	structure: {
		type: String,
	},
	geoloc: {
		type: String,
	},
	activity: {
		type: [Schema.Types.Mixed],
	},
	volume: {
		type: [Schema.Types.Mixed],
	},
	school: {
		type: Schema.Types.Mixed,
	},
	lang: {
		type: String,
		trim: true,
	},
	favs: {
		type: Schema.Types.Mixed,
	},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password'))
		return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err)
			return next(err);

		// hash the password
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err)
				return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err)
			return cb(err);
		cb(null, isMatch);
	});
};

mongoose.model('User', UserSchema);
