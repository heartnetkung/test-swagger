const mongoose = require("mongoose");
const regex = require("../middleware/regex_pattern");

const UserSchema = mongoose.Schema(
	{
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
		resume: { type: String },
		facebook: {
			id: {
				type: String,
				index: !global.describe ? true : false
			},
			name: { type: String, default: null },
			first_name: { type: String, default: null },
			last_name: { type: String, default: null },
			email: { type: String, default: null },
			picture: {
				url: { type: String },
				height: { type: Number, max: 720 },
				width: { type: Number, max: 720 }
			}
		},
		job_interest: {
			jobcat: Array,
			subjobcat: Array
		},
		general: {
			firstname: {
				type: String,
				required: true,
				validate: {
					validator: val => regex.regexName.test(val),
					message: props => `${props.value} validation error`
				}
			},
			lastname: {
				type: String,
				required: true,
				validate: {
					validator: val => regex.regexName.test(val),
					message: props => `${props.value} validation error`
				}
			},
			sex: {
				type: String,
				enum: ["male", "female", "other"]
			},
			birthday: {
				type: Date,
				required: true
			},
			picture_url: { type: String }
		},
		location: {
			address: { type: String, default: null },
			province: { type: String, default: null },
			sub_district: { type: String, default: null },
			district: { type: String, default: null }
		},
		works: [
			{
				company_name: { type: String },
				position: { type: String },
				start: { type: Date },
				end: { type: Date },
				salary: { type: Number },
				company_size: { type: String }
			}
		],
		educations: [
			{
				level: { type: String },
				school: { type: String },
				branch: { type: String },
				grade: { type: String }
			}
		],
		skill: [String],
		achievement: [String],
		create_date: {
			type: Date,
			default: new Date()
		},
		last_update: {
			type: Date,
			default: null
		}
	},
	{ collection: "user" }
);

if (!global.describe) {
	UserSchema.index({ email: 1, tel: 1 });
	UserSchema.index({ "facebook.id": 1, tel: 1, email: 1 });
}

module.exports = mongoose.model("user", UserSchema);
