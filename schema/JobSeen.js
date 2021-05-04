const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const JobSeenSchema = mongoose.Schema(
	{
		job_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		company_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		count: {
			type: Number,
			default: 1
		}
	},
	{ collection: "job_seen" }
);

module.exports = mongoose.model("job_seen", JobSeenSchema);
