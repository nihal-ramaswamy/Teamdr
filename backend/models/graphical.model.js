const mongoose = require("mongoose");

var Graphical = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    type: {
        type: Number,
        default: 0,
    },

    location: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },

    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Graphical'
    },

    s3Object: {
        type: Object,
        default: {}
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

module.exports = mongoose.model("Graphical", Graphical);
