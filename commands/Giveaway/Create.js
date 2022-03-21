const Invites = require('../../Embeds/Invites');

module.exports.run = async (client, message, args) => {
    message.delete()
    const dataGuild = await client.getGuild(message.guild);
    

};

module.exports.help = {
    name: "create",
    category: "giveaway",
    description: "",
    usage: ""
};