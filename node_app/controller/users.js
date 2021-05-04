const router = (module.exports = require("express").Router());

router.get("/", (req, res) => {
	res.json([{ user_id: 1 }, { user_id: 2 }]);
});

router.get("/url_params/:user_id", (req, res) => {
	var { user_id } = req.params;
	if (/[^\d]/.test(user_id))
		return res.status(400).json({ error: "user_id must be number" });

	if (user_id === "1") return res.json({ user_id: 1 });
	if (user_id === "2") return res.json({ user_id: 2 });
	res.status(400).json({ error: "user_id not found" });
});

router.post("/missing", (req, res) => {});
