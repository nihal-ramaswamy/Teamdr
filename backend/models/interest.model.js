const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var Interest = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
        },

        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

Interest.plugin(passportLocalMongoose);
module.exports = mongoose.model("Interest", Interest);