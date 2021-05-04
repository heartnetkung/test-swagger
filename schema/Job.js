const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const img = {
	width: { type: Number },
	height: { type: Number },
	url: { type: String }
};

const JobSchema = mongoose.Schema(
	{
		src: { type: String, required: true },
		meta_id: { type: ObjectId, required: true },

		//author
		author_name: { type: String, required: true },
		author_avatar: img,
		author_id: { type: String, required: true },
		author_url: { type: String, required: true },
		company_id: ObjectId,

		//post
		post_text: { type: String, required: true },
		post_image: [img],
		post_url: { type: String, required: true },
		post_id: { type: String, required: true, unique: true },
		post_date: { type: Date, required: true },
		facebook_group_id: String,

		//contact
		tel_text: String,
		tel_no: [String],
		line_text: String,
		line_id: [String],
		email_text: String,
		email: [String],

		//info
		job_title: [String],
		company_name: [String],
		salary_min: Number,
		salary_max: Number,
		experience_requirement: Number,
		education_requirement: [String],
		gender_requirement: [String],

		//complex field
		jobcat: [String],
		subjobcat: [String],
		province: [String],
		district: [String],
		hashtags: [String],
		hiddentags: [String],

		//interaction
		like_count: Number,
		seen_count: Number,
		interact_count: Number,
		premium: Number,
		base_score: Number
	},
	{ collection: "job" }
);

module.exports = mongoose.model("job", JobSchema);
