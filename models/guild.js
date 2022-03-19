const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    numberOfUser: Number,
    prefix: String,
    ownerId: String,
    tickets: {
        type: [
            {
                ticketID: mongoose.Schema.Types.ObjectId,
                ticketStatus: String,
                authorId: String,
                openAt: String,
                closeAt: String,
                content: {
                    type: [
                        {
                            content: String,
                            sendAt: String,
                            by: String,
                            embed: JSON
                        }
                    ]
                }
            }
        ]
    },
    users: {
        type: [
            {
                userId: String,
                invitedNumber: Number,
                affiliateCode: String,
                wallet: Number,
                invited: Array,
            }
        ]
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Guild", guildSchema);