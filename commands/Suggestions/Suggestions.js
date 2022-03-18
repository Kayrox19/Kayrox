const config = require("../../config");
const { Permissions } = require("discord.js")
const Suggest = require("../../Embeds/Suggest");

module.exports.run = async (client, message, args) => {
    message.delete();
    if (!args[0]) return message.reply("Veuillez rensigner une suggestions.");

    const findChannel = message.guild.channels.cache.find(c => c.name === config.channelName.suggestChannel); //Check if channel exist
    if (findChannel) {
        return findChannel.send(Suggest.addSuggest(args)).then((msg) => {
            msg.react("✅");
            msg.react("❌");
        })
    } else {
        const channel = await message.guild.channels.create(config.channelName.suggestChannel, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                id: message.guild.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ADD_REACTIONS],
                deny: [Permissions.FLAGS.SEND_MESSAGES],
            }]
        }); // Succes created the channel
        channel.setParent(config.categories.suggestCat);
        return channel.send(Suggest.addSuggest(args)).then((msg) => {
            msg.react("✅");
            msg.react("❌");
        })
    }


};

module.exports.help = {
    name: "sug",
    category: "suggestion",
    description: "Open a suggestion",
    usage: ""
};