const User = require('../models/user.model');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

exports.getUser = async (userIds) => {
    try {
        cards = [];
        asyncForEach(userIds, (userId) => {
            const user = (await User.findById(userId));
            await user.populate("profileImage").execPopulate();
            await user.populate("phoneNumber").execPopulate();
            await user.populate("github").execPopulate();
            await user.populate("linkedin").execPopulate();
            cards.push(user);
        })
        return cards;
    }
    catch (e) {
        throw e;
    }
}