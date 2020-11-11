const GraphicalService = require('../services/graphical.service');
const _ = require("lodash");

exports.verifyGraphical = async (req, res, next) => {
    try {
        const graphical = await GraphicalService.getGraphical(req.params.graphicalId);
        if (!(_.isEqual(graphical.user, req.user._id)) && !req.user.isAdmin)
            return res.status(403).json({ status: 403, message: 'Unauthorized' });
        next();
    }
    catch (e) {
        return res.status(406).json({ status: 406, message: e.message });
    }
}