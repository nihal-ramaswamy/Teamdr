var jwt = require('jsonwebtoken');
var config = require('config');

const appConfig = config.get("app");

exports.getToken = function (user) {
    return jwt.sign(user, appConfig.secretKey, { expiresIn: 30 * 24 * 3600 });
}