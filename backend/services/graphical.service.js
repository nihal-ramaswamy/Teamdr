const Graphical = require("../models/graphical.model");
const config = require('config');
const FileUtil = require('../utils/file.util');
const isProd = config.get("isProd");
const graphicalConfig = config.get("graphical");

exports.createGraphical = async (user, file) => {
    try {
        let graphical;
        if (isProd) {
            graphical = await Graphical.create({ "user": user, "location": file.location, "key": file.key});
        }
        else {
            graphical = await Graphical.create({ "user": user, "location": `${graphicalConfig.base_url}/${file.filename}`});
        }
        return graphical;
    } catch (e) {
        throw e;
    }
};

exports.getGraphical = async (graphicalId) => {
    try {
        const graphical = await Graphical.findById(graphicalId);
        return graphical;
    } catch (e) {
        throw e;
    }
};

exports.updateGraphical = async (graphicalId, updatedChanges) => {
    try {
        const graphical = await Graphical.findById(graphicalId);
        await Graphical.findByIdAndUpdate(graphicalId, {
            $set: { ...updatedChanges, numberOfSales: graphical.numberOfSales },
        });
    } catch (e) {
        throw e;
    }
};

exports.removeGraphical = async (graphicaId) => {
    try {
        const graphical = await Graphical.findById(graphicaId);
        if (graphical.numberOfSales === 0) {
            if (!isProd) {
                FileUtil.removeFile(graphical.location);
            }
            return graphical.remove();
        } else return "This Content cannot be deleted!";
    } catch (e) {
        throw e;
    }
};
