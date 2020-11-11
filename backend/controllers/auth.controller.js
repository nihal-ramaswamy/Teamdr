var passport = require('passport');

const AuthService = require('../services/auth.service');
const AuthUtil = require('../utils/auth.util');

exports.loginUser = async (req, res, next) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            return res.status(401).json({success: false, status: 'Login Unsuccessful!', err: info});
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(401).json({success: false, status: 'Login Unsuccessful!', err: err.message});          
            }
            // EmailUtil.sendMail(req.user.email, 'login', { firstname: req.user.firstname, username: req.user.username });

            var token = AuthUtil.getToken({_id: req.user._id});
            res.status(200).json({success: true, status: 'Login Successful!', token: token});
        });
    }) (req, res, next);
}

exports.registerUser = async (req, res, next) => {
    try {
        const user = await AuthService.createUser(req.body.username, req.body.password, req.body.email, req.body.name, req.body.isClient, req.body.preferences);
        passport.authenticate('local')(req, res, () => res.status(200).json({ status: 200, message: 'Registration Successful'}));
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });       
    }
}
