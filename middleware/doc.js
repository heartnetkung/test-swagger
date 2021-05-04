const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fs = require("fs");
const express = require("express");
const path = require("path");
const _ = require("lodash");
const glob = require("glob");
const mongoose = require("mongoose");
require("mongoose-schema-jsonschema")(mongoose);

const SWAGGER_OPTIONS = {
	swaggerOptions: {
		defaultModelsExpandDepth: 2,
		defaultModelExpandDepth: 1,
		docExpansion: "list",
		filter: true,
		validatorUrl: null,
		deepLinking: true,
	},
};

module.exports = (swaggerPath, schemaPath, specPath) => {
	var router = express.Router();
	router.use("/schema", express.static(schemaPath));
	router.use("/spec", express.static(specPath));

	var swaggerDoc = YAML.load(swaggerPath);
	swaggerDoc = addSchema(swaggerDoc, schemaPath);
	swaggerDoc = addTags(swaggerDoc, specPath);
	swaggerDoc = addRoutes(
		swaggerDoc,
		path.join(__dirname, "../node_app/controller")
	);
	return [
		router,
		swaggerUi.serve,
		swaggerUi.setup(swaggerDoc, SWAGGER_OPTIONS),
	];
};

const addRoutes = (doc, routerPath) => {
	for (var file of glob.sync(routerPath + "/*.js")) {
		var router = require(file);
		var fileName = path.basename(file, ".js");
		var routesInCode = route2Swagger(fileName, router);

		var paths = (doc.paths = doc.paths || {});
		for (var { pathName, method, tags } of routesInCode) {
			if (
				paths[pathName] &&
				paths[pathName][method] &&
				paths[pathName][method].description
			)
				continue;
			paths[pathName] = paths[pathName] || {};
			paths[pathName][method] = paths[pathName][method] || {
				deprecated: true,
				description: "The route exists but no document.",
				tags,
			};
		}
	}
	return doc;
};

const route2Swagger = (parent, router) => {
	var ans = [];
	for (var route of router.stack) {
		var pathName = "/" + parent + route.route.path;
		var tags = ["/" + parent];
		pathName = pathName.replace(/\/:([^\/]+)/g, "/{$1}").replace(/\/$/, "");
		for (var method in route.route.methods)
			ans.push({ pathName, method, tags });
	}
	return ans;
};

const addSchema = (doc, schemaPath) => {
	var schemas = {};
	for (var file of glob.sync(schemaPath + "/*.js"))
		schemas[path.basename(file, ".js")] = model2JsonSchema(file);
	var ans = _.merge({ components: { schemas } }, doc);

	for (var key in schemas) {
		var current = schemas[key];
		if (!current) continue;
		if (!current.description) current.description = "";
		current.description += ` [(source)](schema/${key}.js)`;
	}
	return ans;
};

const addTags = (doc, specPath) => {
	var tags = [];
	for (var file of glob.sync(specPath + "/*.spec.js")) {
		var name = path.basename(file).split(".")[0];
		tags.push({ name, description: "" });
	}

	var ans = _.merge({ tags }, doc);
	if (!ans.paths) return ans;

	for (var pathName in ans.paths) {
		var methods = ans.paths[pathName];
		for (var method in methods) {
			var api = methods[method];
			if (!api.description) api.description = "";
			if (api.tags && api.tags[0])
				api.description += ` [(test case)](spec${api.tags[0]}.spec.js)`;
		}
	}
	return ans;
};

const model2JsonSchema = (file) => {
	var model = require(file);
	var ans = model.schema.jsonSchema();
	if (ans.properties) delete ans.properties.__v;
	ans.description = "";
	return ans;
};
