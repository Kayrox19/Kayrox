const { MessageEmbed } = require("discord.js");
const config = require("../config");

module.exports = {
    newUsers: (user) => {
        const embed = new MessageEmbed()
            .setColor(14003152)
            .setDescription(`**👋 Ho, <@${user.id}> vient d'arriver !**\n\nJe te souhaite la bienvenue sur ce discord.\n→ N'oublie pas d'aller lire le <#${config.channelName.rulesChannel}>.`)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    }
}