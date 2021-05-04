const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const regex = require("../middleware/regex_pattern");

const SearchResultSchema = mongoose.Schema(
	{
		results: {
			type: [ObjectId],
			required: true
		},
		create_date: {
			type: Date,
			expires: 6 * 3600,
			default: Date.now
		}
	},
	{ collection: "search_result" }
);

module.exports = mongoose.model("search_result", SearchResultSchema);
