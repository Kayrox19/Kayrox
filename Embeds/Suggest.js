const { MessageEmbed } = require("discord.js");

module.exports = {
    addSuggest: ( sug) => {
        const text = sug.map((x) => {
            return `${x}`;
        }).join(" ")
        const embed = new MessageEmbed()
            .setTitle("Nouvelle suggestion !")
            .setDescription(`> ${text}`)
            .setColor(14003152)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    }
}