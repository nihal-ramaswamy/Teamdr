const createError = require('http-errors');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const passport = require("passport");
const logger = require('morgan');

const AuthRouter = require("./routes/auth.route");
const UserRouter = require("./routes/user.route");
const GraphicalRouter = require("./routes/graphical.route");

// Configure app Preprocessors
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Listen to Port

const appConfig = config.get("app");

// Configure API Endpoints
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/graphical", GraphicalRouter);


// Configuring MongoDB Connection
const dbConfig = config.get("db");
const URL = dbConfig.mongoUrl;

mongoose.set("useCreateIndex", true);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB Connection Error...")
);

app.use(express.static('build'));
app.use('/images', express.static('public/images'));

app.get('*', (req, res) => {
    try {
        const resolvingPath = path.resolve(
            __dirname,
            'build',
            'index.html'
        );
        return res.sendFile(resolvingPath);
    } catch (err) {
        console.log(err)
        if (err.code === 'ENOENT') {
            const resolvingPath = path.resolve(
                __dirname,
                'build',
                'index.html'
            );
            return res.sendFile(resolvingPath);
        } else {
            throw err;
        }

    }
});

app.use(express.static(path.join(__dirname, 'build')))
app.use("/assets", express.static("build/assets"));
app.use("/images", express.static("public/images"));

// Error handling
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.end(err.message);
});

const PORT = appConfig.PORT;
app.listen(process.env.port || PORT);

// Exports
module.exports = app;
