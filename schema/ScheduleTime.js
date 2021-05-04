const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const ScheduleTime = mongoose.Schema(
	{
		receiver_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		role: {
			type: String,
			enum: ["user", "company"]
		},
		daily: { type: Boolean },
		weekly: { type: Boolean },
		create_date: {
			type: Date,
			default: new Date()
		},
		last_update: {
			type: Date,
			default: null
		}
	},
	{ collection: "schedule_time" }
);

module.exports = mongoose.model("schedule_time", ScheduleTime);
