var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

const ErrorMiddleware = require('../middlewares/error.middleware');

const AuthController = require('../controllers/auth.controller');

const cors = require('../utils/cors.util');

router.route('/register')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist,AuthController.registerUser)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/login')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist, AuthController.loginUser)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

module.exports = router;