const User = require('../models/user.model');

exports.getUser = async (userId) => {
    try {
        const user = await (await User.findById(userId));

        return user;
    }
    catch (e) {
        throw e;
    }
}

exports.createUser = async (username, password, email, name, isClient, preferences) => {
    try {
        var user = await User.register(new User({username: username, email: email}), password);
        user.name = name;
        user.isClient = isClient;
        user.isApproved = !isClient;
        user.preferences = preferences;
        user = await user.save();
        return user;
    }
    catch (e) {
        throw e;
    }
}

exports.findUser = async (username, email) => {
    try {
        const user = await User.findOne({ $or: [ { "username": username }, { "email": email } ] });
        return user === null ? true : false;
    }
    catch (e) {
        throw e;
    }
}