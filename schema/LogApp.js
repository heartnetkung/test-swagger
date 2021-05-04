const mongoose = require("mongoose");

const LogAppSchema = mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ["validation", "cast", "app"]
		},
		message: {
			type: String,
			default: null
		},
		error: {
			type: String,
			default: null
		},
		create_date: {
			type: Date,
			default: new Date(),
			index: { expires: process.env.EXPIRE_GENERAL }
		}
	},
	{ collection: "log_app" }
);

module.exports = mongoose.model("log_app", LogAppSchema);
