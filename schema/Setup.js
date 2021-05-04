const mongoose = require("mongoose");
const regex = require("../middleware/regex_pattern");
const { ObjectId } = mongoose.Types;

const SetupSchema = mongoose.Schema(
	{
		user_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			},
			index: !global.describe ? true : false
		},
		notification: {
			platform: {
				type: String,
				required: true,
				enum: ["application", "website"]
			},
			schedule_time: {
				type: String,
				required: true,
				enum: ["day", "week"],
				default: "day"
			}
		},
		create_date: {
			type: Date,
			default: new Date()
		}
	},
	{ collection: "setup" }
);

module.exports = mongoose.model("setup", SetupSchema);
