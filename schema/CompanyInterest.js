const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const CompanyInterestSchema = mongoose.Schema(
	{
		user_id: {
			type: ObjectId,
			default: null,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		company_id: {
			type: ObjectId,
			default: null,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		is_interest: {
			type: Boolean,
			required: true
		},
		create_date: {
			type: Date,
			default: new Date()
		},
		last_update: {
			type: Date,
			default: null
		}
	},
	{ collection: "company_interest" }
);

if (!global.describe) {
	CompanyInterestSchema.index({ user_id: 1, is_interest: 1 });
	CompanyInterestSchema.index({ user_id: 1, is_interest: 1, last_update: 1 });
}

module.exports = mongoose.model("company_interest", CompanyInterestSchema);
