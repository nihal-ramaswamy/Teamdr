const GraphicalService = require('../services/graphical.service');

exports.createGraphical = async (req, res, next) => {
    try {
        const graphical = await GraphicalService.createGraphical(req.user._id, req.file);
        return res.status(200).json({ status: 200, data: graphical });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.getGraphical = async (req, res, next) => {
    try {
        const graphical = await GraphicalService.getGraphical(req.params.graphicalId);
        return res.status(200).json({ status: 200, data: graphical });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.updateGraphical = async (req, res, next) => {
    try {
        await GraphicalService.updateGraphical(req.params.graphicalId, req.body);
        const graphical = await GraphicalService.getGraphical(req.params.graphicalId);
        return res.status(200).json({ status: 200, data: graphical });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}

exports.removeGraphical = async (req, res, next) => {
    try {
        const resp = await GraphicalService.removeGraphical(req.params.graphicalId);
        return res.status(200).json({ status: 200, data: resp });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}