const mongoose = require("mongoose");

const OtpSchema = mongoose.Schema(
	{
		tel: {
			type: String,
			require: true
		},
		otp_number: {
			type: String,
			required: true
		},
		count: Number,
		create_date: {
			type: Date,
			default: new Date(),
			index: { expires: process.env.OTP_EXPIRE }
		}
	},
	{ collection: "otp" }
);

module.exports = mongoose.model("otp", OtpSchema);
