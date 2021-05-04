const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const img = {
	width: { type: Number },
	height: { type: Number },
	url: { type: String }
};

const LandingPageSchema = mongoose.Schema(
	{
		en_name: { type: String, required: true, unique: true },
		th_name: { type: String, required: true, unique: true },
		url_name: { type: String, required: true, unique: true },
		author_name: { type: String, required: true },
		author_avatar: img,
		post_text: { type: String, required: true },
		post_image: [img],
		cover_photo: img,
		params: { type: Object }
	},
	{ collection: "landing_page" }
);

module.exports = mongoose.model("landing_page", LandingPageSchema);
