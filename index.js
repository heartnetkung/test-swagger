require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const glob = require("glob");
const path = require("path");
const doc = require("./middleware/doc");

const app = express();
for (var file of glob.sync(path.join(__dirname, "node_app/controller/*.js")))
	app.use("/app/" + path.basename(file, ".js"), require(file));

const schemaPath = path.join(__dirname, "schema");
const specPath = path.join(__dirname, "node_app/spec");
const swaggerPath = path.join(__dirname, "doc.yaml");
app.use("/doc/app", doc(swaggerPath, schemaPath, specPath));

app.listen(3000);
