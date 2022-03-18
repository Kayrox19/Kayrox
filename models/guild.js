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
                channelId: String,
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
    }

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Guild", guildSchema);