/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * UserSchema
 */
var UserSchema = new Schema({
	codeCSO: {
		type: Number,
		required: true,
		unique: true
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	email: {
		type: String,
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

mongoose.model('User', UserSchema);
