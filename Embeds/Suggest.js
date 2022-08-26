const { MessageEmbed } = require("discord.js");

module.exports = {
    addSuggest: (sug, user) => {
        const embed = new MessageEmbed()
            .setTitle("Nouvelle suggestion !")
            .setDescription(`> De <@${user.id}>\n\n> ${sug}`)
            .setColor(14003152)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');

        return embed
    }
}