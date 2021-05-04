const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const SearchHistorySchema = mongoose.Schema(
	{
		params: {
			author_name: String,
			experience_requirement: mongoose.Schema.Types.Mixed,
			gender_requirement: mongoose.Schema.Types.Mixed,
			education_requirement: mongoose.Schema.Types.Mixed,
			jobcat: mongoose.Schema.Types.Mixed,
			subjobcat: mongoose.Schema.Types.Mixed,
			salary_min: Number,
			salary_max: Number,
			search: String,
			district: mongoose.Schema.Types.Mixed,
			province: mongoose.Schema.Types.Mixed,
			tag: mongoose.Schema.Types.Mixed
		},
		user_id: {
			type: ObjectId,
			required: true,
			validate: {
				validator: val => regex.regexMongoId.test(val),
				message: props => `${props.value} validation error`
			}
		},
		is_pin: {
			type: Boolean,
			default: false
		},
		create_date: {
			type: Date,
			default: Date.now
		},
		update_date: { type: Date, default: Date.now }
	},
	{ collection: "search_history" }
);

if (!global.describe) {
	SearchHistorySchema.index({ user_id: 1, is_pin: 1, update_date: 1 });
	SearchHistorySchema.index({
		user_id: 1,
		"params.district": 1,
		"params.province": 1,
		"params.experience_requirement": 1,
		"params.gender_requirement": 1,
		"params.education_requirement": 1,
		"params.jobcat": 1,
		"params.subjobcat": 1,
		"params.salary_min": 1,
		"params.salary_max": 1,
		"params.search": 1,
		"params.tag": 1
	});
}

module.exports = mongoose.model("search_history", SearchHistorySchema);
