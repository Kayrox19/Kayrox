const { MessageEmbed } = require("discord.js");

module.exports = {
    clearMessage: (user, number) => {
        const embed = new MessageEmbed()
            .setDescription(`***<@${user.id}>, ${number} messages ont bien été supprimés.***`)
            .setColor(14003152)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    }
}