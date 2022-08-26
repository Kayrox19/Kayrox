const { MessageEmbed } = require("discord.js");

module.exports = {
    newUsers: (user, rules) => {
        const embed = new MessageEmbed()
            .setColor(14003152)
            .setDescription(`**<:main:951952618790482001> Ho, <@${user.id}> vient d'arriver !**\n\nJe te souhaite la bienvenue sur ce discord.\n→ N'oublie pas d'aller lire le <#${rules}>.`)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');

        return embed
    }
}