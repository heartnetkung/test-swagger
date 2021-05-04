const mongoose = require("mongoose");

const LogWorkerSchema = mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ["system", "clear_unlike", "clear_company_interest"]
		},
		data: {
			type: Object,
			default: null
		},
		error: {
			type: Object,
			default: null
		},
		create_date: {
			type: Date,
			default: new Date(),
			index: { expires: process.env.EXPIRE_GENERAL }
		}
	},
	{ collection: "log_worker" }
);

if (!global.describe) {
	LogWorkerSchema.index({ type: 1 });
}

module.exports = mongoose.model("log_worker", LogWorkerSchema);
