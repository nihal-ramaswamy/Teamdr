const { findByIdAndUpdate } = require('../models/user.model');
const User = require('../models/user.model');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

exports.getUsersForInterests = async (Interests) => {
    
    try {
        let users = [];
        if (Interests.length) {
            const interests = []
            Interests.forEach((Interest)=>{interests.push(Interest.name)});
            console.log(interests)
            users = await User.find({interests: {$all:[...interests]}});
            console.log(interests, users)
        }
        else {
            users = await User.find({}); 
        }
        console.log(users, Interests);
        return users;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
} 

exports.Swipe = async (swiper, swipedId, typeOfSwipe) => {

    try {
        if (typeOfSwipe == 'right') {
            await User.findByIdAndUpdate(swiper._id, { $addToSet: { "swipedRightOn": swipedId } })
            await User.findByIdAndUpdate(swiper._id, { $pull: { "swipedLeftOn": swipedId } })
            await User.findByIdAndUpdate(swipedId, { $addToSet: { "teamRequests": swiper._id } })
        }
        else if (typeOfSwipe == 'left') {
            await User.findByIdAndUpdate(swiper._id, { $addToSet: { "swipedRightOn": swipedId } })
        }
        else {
            console.log('Failed to recognise swipe type: ', typeOfSwipe);
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

exports.ReactToRequest = async (swiper, swipedId, typeOfReaction) => {

    try {
        if (typeOfReaction == 'yes') {
            await User.findByIdAndUpdate(swiper._id, { $addToSet: { "matched": swipedId } })
            await User.findByIdAndUpdate(swiper._id, { $pull: { "teamRequests": swipedId } })
            await User.findByIdAndUpdate(swipedId, { $addToSet: { "matched": swiper._id} })
            await User.findByIdAndUpdate(swipedId, { $pull: { "swipedRightOn": swiper._id} })
        }
        else if (typeOfReaction == 'no') {
            await User.findByIdAndUpdate(swiper._id, { $pull: { "teamRequests": swipedId } })
        }
        else {
            console.log('Failed to recognise swipe type: ', typeOfReaction);
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
} 
