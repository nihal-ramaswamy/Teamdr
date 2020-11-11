const UserService = require('../services/user.service');
const Post = require('../services/post.service') // Remove all related, irrelevant

exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserService.getUsers();
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e){
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
} 

exports.getUser = async (req, res, next) => {
    try {
        const user = await UserService.getUser(req.user._id);
        return res.status(200).json({ status: 200, data: user });
        
    }
    catch (e){
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
} 

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await UserService.getUserProfile(req.params.userId);
        return res.status(200).json({ status: 200, data: user });
    }
    catch (e){
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
} 

exports.updateUser = async (req, res, next) => {
    try {
        await UserService.updateUser(req.user._id, req.body);
        return res.status(200).json({ status: 200 });
    }
    catch (e){
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        await UserService.updatePassword(req.user._id, req.body.oldPassword, req.body.newPassword);
        user = await UserService.getUser(req.user._id);
        return res.status(200).json({ status: 200, data: user });
    }   
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.getUserPortfolio = async (req, res, next) => {
    try {
        const user = await UserService.getUserPortfolio(req.params.userId);
        return res.status(200).json({ status: 200, data: user });
    }   
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.getFilteredPosts = async (req, res, next) => {
    try {
        const postIDs = await UserService.getFilteredPosts(req.body.tagsSelected, req.body.categoriesSelected);
        return res.status(200).json({ status: 200, data: postIDs });
    } catch (e) {
        console.log('e?')
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
};