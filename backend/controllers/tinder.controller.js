exports.getCard = async (req, res, next) => {
    try {
        const Cards = await TinderService.getCard(req.body.userIds);
        return res.status(200).json({ status: 200, data: Cards });
    }
    catch (e) {
        return res.status(e.status || 406).json({ status: e.status || 406, message: e.message });
    }
}