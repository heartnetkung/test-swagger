const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const EmailTemplateSchema = mongoose.Schema(
	{
		user_id: {
			type: ObjectId,
			default: null,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		topic: { type: String },
		text: { type: String },
		resume: { type: String },
		create_date: {
			type: Date,
			default: new Date()
		}
	},
	{ collection: "email_template" }
);

module.exports = mongoose.model("email_template", EmailTemplateSchema);
