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

        rating: {
            type: Number,
            default: 5,
        },

        phoneNumber: {
            type: String,
            default: null,
        },

        github: {
            type: String,
            default: null,
        },

        linkedin: {
            type: String,
            default: null,
        },

        bio: {
            type: String,
            default: null,
        },

        swipedRightOn: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],

        swipedLeftOn: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        teamRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        matched: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        interests: [ 
            {
                type: String,
                default: null,
            }
        ],

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