var express = require('express');
const cors = require('../utils/cors.util');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

const AuthMiddleware = require('../middlewares/auth.middleware');
const ErrorMiddleware = require('../middlewares/error.middleware');
const FileMiddleware = require('../middlewares/file.middleware');
const GraphicalMiddleware = require('../middlewares/graphical.middleware');

const GraphicalController = require('../controllers/graphical.controller');

router.route('/')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(ErrorMiddleware.notSupported)
.post(cors.whitelist, AuthMiddleware.verifyUser, FileMiddleware.upload.single('file'), GraphicalController.createGraphical)
.put(ErrorMiddleware.notSupported)
.delete(ErrorMiddleware.notSupported);

router.route('/:graphicalId')
.options(cors.whitelist, (req, res) => {
    res.sendStatus(200);
})
.get(cors.whitelist, GraphicalController.getGraphical)
.post(ErrorMiddleware.notSupported)
.put(cors.whitelist, AuthMiddleware.verifyUser, GraphicalMiddleware.verifyGraphical, GraphicalController.updateGraphical)
.delete(cors.whitelist, AuthMiddleware.verifyUser, GraphicalMiddleware.verifyGraphical, GraphicalController.removeGraphical);

module.exports = router;