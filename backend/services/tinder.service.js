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
            users = await User.find({interests: {"$all":[...interests]}});
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
