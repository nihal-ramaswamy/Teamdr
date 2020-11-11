const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var User = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "User",
        },

        email: {
            type: String,
            default: "",
            unique: true,
            dropDups: true,
            required: true,
        },

        profileImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Graphical",
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },

        isClient: {
            type: Boolean,
            default: false,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },

        portfolio: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Graphical",
            },
        ],

        graphicals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Graphical",
            },
        ],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
