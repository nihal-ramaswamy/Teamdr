const TeamderService = require('../services/teamder.service');

exports.getUsersForInterests = async (req, res, next) => {
    try {
        const users = await TeamderService.getUsersForInterests(req.body.Interests);
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.Swipe = async (req, res, next) => {
    try {
        const users = await TeamderService.Swipe(req.user, req.body.id, req.body.swipe);
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.ReactToRequest = async (req, res, next) => {
    try {
        const users = await TeamderService.ReactToRequest(req.user, req.body.id, req.body.reaction);
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.TeammateStatus = async (req, res, next) => {
    try {
        const users = await TeamderService.TeammateStatus(req.user, req.body.id, req.body.reaction);
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.Rate = async (req, res, next) => {
    try {
        const users = await TeamderService.Rate(req.user, req.body.id, req.body.value);
        return res.status(200).json({ status: 200, data: users });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}