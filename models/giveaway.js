const mongoose = require("mongoose");

const giveawaySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messageId: String,
    prize: String,
    numberOfWinner: Number,
    time: Number,
    users: {
        type: [],
        default: []
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Giveaway", giveawaySchema);