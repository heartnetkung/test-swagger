const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const JobHidddenSchema = mongoose.Schema(
	{
		job_post_id: {
			type: String,
			required: true
		},
		user_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		create_date: {
			type: Date,
			default: new Date()
		}
	},
	{ collection: "job_hidden" }
);

if (!global.describe) JobHidddenSchema.index({ job_post_id: 1, user_id: 1 });

module.exports = mongoose.model("job_hidden", JobHidddenSchema);
