const mongoose = require("mongoose");
const regex = require("../middleware/regex_pattern");
const { ObjectId } = mongoose.Types;

const TokenSchema = mongoose.Schema(
	{
		user_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		platform: {
			type: String,
			enum: ["web", "android", "ios"]
		},
		token: {
			type: String
		},
		create_date: {
			type: Date,
			default: new Date(),
			index: { expires: process.env.JWT_EXPIRE_TOKEN }
		},
		is_login: {
			type: Boolean,
			default: true
		}
	},
	{ collection: "token" }
);

if (!global.describe) {
	TokenSchema.index({ user_id: 1, platform: 1 });
}

module.exports = mongoose.model("token", TokenSchema);
