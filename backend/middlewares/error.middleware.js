exports.notSupported = (req, res, next) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
}