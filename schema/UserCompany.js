const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const UserCompanySchema = mongoose.Schema(
	{
		company_id: {
			type: ObjectId,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		email: {
			type: String,
			validate: {
				validator: val => regex.regexEmail.test(val),
				message: props => `${props.value} validation error`
			}
		},
		password: {
			type: String
		},
		tel: {
			type: String,
			unique: true
		},
		profile_url: {
			type: String,
			validate: {
				validator: val => regex.regexImageUrl.test(val),
				message: props => `${props.value} validation error`
			}
		},
		facebook: {
			id: { type: String },
			name: { type: String },
			first_name: { type: String },
			last_name: { type: String },
			email: { type: String },
			picture: {
				url: { type: String },
				height: { type: Number, max: 720 },
				width: { type: Number, max: 720 }
			}
		},
		role: {
			type: String,
			required: true,
			enum: ["admin", "member"]
		},
		create_date: {
			type: Date,
			default: new Date()
		}
	},
	{ collection: "user_company" }
);

if (!global.describe) UserCompanySchema.index({ _id: 1, company_id: 1 });

module.exports = mongoose.model("user_company", UserCompanySchema);
