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
	treat_type: {//obsolete >> à virer
		type: String,
		required: true
	},
	treat_init: {// Premier traitement ? bool
		type: Boolean,
		required: true
	},
	follow_sample: {
		type: Boolean,
		default: false
	},
	client_type: {// is pro ? bool
		type: Boolean,
		required: true
	},
	delivered: {
		type: Boolean,
		default: false
	},
	veterinary: {
		type: Schema.Types.ObjectId,
		required: true
	},
	animals: {
		type: [Schema.Types.Mixed], // [{species:string, type:string, age:string, weight:number, quantity:number, environment:[String]},...]
		required: true
	},
	prescription: {
		type: Array, // [{product:proA, qty: 10, dm: String},{product:proB, qty: 50, dm: String}]
		required: true
	}
});

mongoose.model('Treatment', TreatmentSchema);
