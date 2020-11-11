var express = require('express');
const cors = require('../utils/cors.util');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

const AuthMiddleware = require('../middlewares/auth.middleware');
const ErrorMiddleware = require('../middlewares/error.middleware');

const UserController = require('../controllers/user.controller');

router.route('/')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(cors.whitelist, AuthMiddleware.verifyUser, UserController.getUser)
.post(ErrorMiddleware.notSupported)
.put(cors.whitelist, AuthMiddleware.verifyUser, UserController.updateUser)
.delete(ErrorMiddleware.notSupported);


router.route('/users')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(cors.whitelist, UserController.getUsers)
.post(ErrorMiddleware.notSupported)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/password')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(ErrorMiddleware.notSupported)
.put(cors.whitelist, AuthMiddleware.verifyUser, UserController.updatePassword)
.delete(ErrorMiddleware.notSupported);

router.route('/:userId')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(cors.whitelist, UserController.getUserProfile)
.post(ErrorMiddleware.notSupported)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/:userId/portfolio')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(cors.whitelist, UserController.getUserPortfolio)
.post(ErrorMiddleware.notSupported)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/posts/filters')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist, AuthMiddleware.verifyUser, UserController.getFilteredPosts)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);