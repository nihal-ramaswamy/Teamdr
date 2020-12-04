const TinderService = require('../services/tinder.service');

exports.getUsersForInterests = async (req, res, next) => {
    try {
        const users = await TinderService.getUsersForInterests(req.body.Interests);
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}