const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const JobLikeSchema = mongoose.Schema(
	{
		user_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		company_id: {
			type: ObjectId,
			validate: {
				validator: val => !val || regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		job_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		is_like: {
			type: Boolean,
			required: true
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
	{ collection: "job_like" }
);

if (!global.describe)
	JobLikeSchema.index({ user_id: 1, is_like: 1, last_update: 1 });

module.exports = mongoose.model("job_like", JobLikeSchema);
