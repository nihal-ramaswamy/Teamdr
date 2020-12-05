const User = require("../models/user.model");
//const Post = require("../models/post.model"); // Remove all related, irrelevant

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

exports.getUsers = async () => {
    try {
        const users = await User.find({}).populate("profileImage");
        return users;
    }
    catch (e) {
        throw e;
    }
}

exports.getUser = async (userId) => {
    try {
        const user = (await User.findById(userId));
        await user.populate("profileImage").execPopulate();

        await user.populate("graphicals").execPopulate();
        await user.populate('portfolio').execPopulate();
        

        return user;
    }
    catch (e) {
        throw e;
    }
}

exports.getUserProfile = async (userId) => {
    const user = (await User.findById(userId));
    await user.populate("profileImage").execPopulate();
    await user.populate('portfolio').execPopulate();


    return user;
}

exports.updateUser = async (userId, updatedChanges) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $set: { ...updatedChanges, admin: false },
        });
        return user;
    } catch (e) {
        throw e;
    }
};

exports.updatePassword = async (userId, oldPassword, newPassword) => {
    try {
        var user = await User.findById(userId);
        await user.changePassword(oldPassword, newPassword);
    }
    catch (e) {
        throw e;
    }
}

exports.getUserPortfolio = async (userId) => {
    const user = (await User.findById(userId));
    await user.populate('portfolio').execPopulate();
    return user;
}

exports.addGraphicalToPortfolio = async (userId, graphicalId) => {
    try {
        await User.findByIdAndUpdate(userId, { $addToSet: { "portfolio": graphicalId } });
    }
    catch (e) {
        throw e;
    }
}

exports.removeGraphicalfromPortfolio = async (userId, graphicalId) => {
    try {
        await User.findByIdAndUpdate(userId, { $pull: { "portfolio": graphicalId } });
    }
    catch (e) {
        throw e;
    }
}

exports.reorderPortfolio = async (userId, graphicalIds) => {
    try {
        await User.findByIdAndUpdate(userId, { $set: { "portfolio": graphicalIds } });
    }
    catch (e) {
        throw e;
    }
}

/*exports.getFilteredPosts = async (tagsSelected, categoriesSelected) => {
    try {
        let postIDs = []
        if (!tagsSelected.length && categoriesSelected.length) {
            const posts = await Post.find({
                category: {$in: categoriesSelected},
            });
            postIDs = posts.map((post) => post._id);
        }
        else if (!categoriesSelected.length && tagsSelected.length){
            const posts = await Post.find({
                tags: {$in: tagsSelected},
            });
            postIDs = posts.map((post) => post._id);
        }
        else if (categoriesSelected.length && tagsSelected.length) {
            const posts = await Post.find({
                tags: {$in: tagsSelected},
                category: {$in: categoriesSelected},
            });
            postIDs = posts.map((post) => post._id);
        }
        else {
            const posts = await Post.find({});
            postIDs = posts.map((post) => post._id);
        }
        postIDs.reverse()
        return postIDs;
    }
    catch (e) {
        throw e;
    }
}*/