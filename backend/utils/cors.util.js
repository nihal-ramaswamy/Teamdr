const cors = require('cors');
const config = require('config');

const appConfig = config.get("app");

const whitelist = appConfig.whitelist;

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.whitelist = cors();