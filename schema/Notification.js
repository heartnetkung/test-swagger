const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const NotificationSchema = mongoose.Schema(
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
		notification: {
			title: { type: String, required: true },
			body: { type: String, required: true },
			image: { type: String, default: null },
			highPriority: { type: Boolean, default: false },
			data: {}
		},
		create_date: {
			type: Date,
			default: new Date(),
			index: { expires: 60 * 60 * 24 * 30 }
		}
	},
	{ collection: "notification" }
);

module.exports = mongoose.model("notification", NotificationSchema);
