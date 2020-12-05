var express = require("express");
const bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.json());
const ErrorMiddleware = require("../middlewares/error.middleware");

const cors = require("../utils/cors.util");
const AuthMiddleware = require('../middlewares/auth.middleware')
const TeamderController = require('../controllers/teamder.controller');

router.route('/interests')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist, AuthMiddleware.verifyUser, TeamderController.getUsersForInterests)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/swipe')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist, AuthMiddleware.verifyUser, TeamderController.Swipe)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/react')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist, AuthMiddleware.verifyUser, TeamderController.ReactToRequest)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

module.exports = router;
