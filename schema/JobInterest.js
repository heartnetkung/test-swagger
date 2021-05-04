const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const JobInterestSchema = mongoose.Schema(
	{
		job_id: {
			type: ObjectId,
			default: null,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		user_id: {
			type: ObjectId,
			default: null,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		company_id: {
			type: ObjectId,
			default: null,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		create_date: {
			type: Date,
			default: new Date()
		},
		last_update: {
			type: Date,
			default: null
		}
	},
	{ collection: "job_interest" }
);

module.exports = mongoose.model("job_interest", JobInterestSchema);
