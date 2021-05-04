const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const UserInterestSchema = mongoose.Schema(
	{
		user_id: {
			type: ObjectId,
			required: true
		},
		type: {
			type: String,
			required: true,
			enum: ["search"]
		},
		params: {
			type: Object
		},
		create_date: {
			type: Date,
			default: Date.now
		}
	},
	{ collection: "user_interest" }
);

if (!global.describe) UserInterestSchema.index({ user_id: 1, create_date: 1 });

module.exports = mongoose.model("user_interest", UserInterestSchema);
