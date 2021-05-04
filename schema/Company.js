const mongoose = require("mongoose");
const regex = require("../middleware/regex_pattern");

const CompanySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		welfare: {
			type: String
		},
		profile_url: {
			type: String,
			validate: {
				validator: val => regex.regexImageUrl.test(val),
				message: props => `${props.value} validation error`
			}
		},
		popup_url: {
			type: String,
			validate: {
				validator: val => regex.regexImageUrl.test(val),
				message: props => `${props.value} validation error`
			}
		},
		website: {
			type: String,
			validate: {
				validator: val => regex.regexHttp.test(val),
				message: props => `${props.value} validation error`
			}
		},
		line: { type: String },
		facebook: { type: String },
		picture_url: [
			{
				type: String,
				validate: {
					validator: val => regex.regexImageUrl.test(val),
					message: props => `${props.value} validation error`
				}
			}
		],
		contacts: [
			{
				tel: {
					type: String
				},
				tel_remark: {
					type: String
				},
				email: {
					type: String,
					validate: {
						validator: val => regex.regexEmail.test(val),
						message: props => `${props.value} validation error`
					}
				}
			}
		],
		location: {
			address: { type: String, default: null },
			province: { type: String, default: null },
			sub_district: { type: String, default: null },
			district: { type: String, default: null }
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
	{ collection: "company" }
);

module.exports = mongoose.model("company", CompanySchema);
