const { MessageEmbed } = require("discord.js");
const config = require("../config");

module.exports = {
    showInvites: (user, number) => {
        function checkValid() {
            if (user.invitedNumber && user.affiliateCode) {
                if (user.invitedNumber >= 5) {
                    return "> ```" + user.affiliateCode + " | ✔️```"
                } else {
                    return "> ```" + user.affiliateCode + " | ❌```"
                }
            } else {
                return "> ```Non défini```";
            }
        }
        const embed = new MessageEmbed()
            .setTitle("> ✉️ Invitation")
            .setDescription(`> De <@${user.userId}>`)
            .setColor(14003152)
            .setTimestamp()
            .addFields(
                { name: "Invitation(s):", value: user.invitedNumber ? "> ```" + user.invitedNumber + "```" : "> ```0```", inline: true },
                { name: "\u200B", value: "\u200B", inline: true },
                { name: "Pourcentage:", value: "> ```" + number + "%```", inline: true },
                { name: "Code:", value: checkValid(), inline: true },
                { name: "\u200B", value: "\u200B", inline: true },
                { name: "Wallet:", value: user.wallet ? "> ```" + user.wallet + "€```" : "> ```0€```", inline: true },
                { name: "Pour recevoir votre argent:", value: `Renseignez vous sur ce channel --> <#${config.channelName.affiliateChannel}>`, inline: true }
            )
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    },
    showInvitesForNoUser: (user, number) => {
        const embed = new MessageEmbed()
            .setTitle("> ✉️ Invitation")
            .setDescription(`> De <@${user.id}>`)
            .setColor(14003152)
            .setTimestamp()
            .addFields(
                { name: "Invitation(s):", value: 0, inline: true },
                { name: "\u200B", value: "\u200B", inline: true },
                { name: "Pourcentage:", value: "0%", inline: true },
                { name: "Code:", value: "> ```Non défini```", inline: true },
                { name: "\u200B", value: "\u200B", inline: true },
                { name: "Wallet:", value: "0€", inline: true },
                { name: "Pour recevoir votre argent:", value: `Renseignez vous sur ce channel --> <#${config.channelName.affiliateChannel}>`, inline: true }
            )
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    }
}