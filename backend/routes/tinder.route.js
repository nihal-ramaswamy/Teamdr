var express = require("express");
const bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.json());
const ErrorMiddleware = require("../middlewares/error.middleware");

const AuthController = require("../controllers/auth.controller");

const cors = require("../utils/cors.util");

import Cards from "./dbCards.js";

// Middlewares
app.use(express.json());
app.use(Cors());

router.route("/cards", (req, res) => {
	const dbCard = req.body;

	Cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.route("/cards", (req, res) => {
	Cards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});
