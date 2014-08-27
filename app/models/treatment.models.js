/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * TreatmentSchema
 */
var TreatmentSchema = new Schema({
	date_created: {
		type: Date,
		default: Date.now
	},
	date_dispense: {
		type: Date,
		required: true
	},
	pathology: {
		type: String,
		required: true
	},
	treat_type: {
		type: String,
		required: true
	},
	treat_init: {
		type: String,
		required: true
	},
	follow_sample: {
		type: Boolean,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	frequency: {
		type: Number,
		required: true
	},
	dispense_mode: {
		type: Number,
		required: true
	},
	veterinary: {
		type: Schema.Types.ObjectId,
		required: true
	},
	animals: {
		type: Array, // [{animal:Animal, q:Number}]
		required: true
	},
	prescription: {
		type: Array, // [{product:proA, qty: 10},{product:proB, qty: 50}]
		required: true
	}
});

mongoose.model('Treatment', TreatmentSchema);
