const { MessageEmbed } = require("discord.js");

module.exports = {
  giveaway: (data, user) => {
    const embed = new MessageEmbed()
      .setTitle("`🎁`  Nouveau giveaway !  `🎁`")
      .setDescription("• Lot à gagner : `" + data.prize + "`\n• Nombre de gagnant : `" + data.numberWinners + "`\n• Temps restant : <t:" + data.time / 1000 + ":R>\n• Particpant(s) : " + data.numbers + "\n\n→ Cliquez sur le boutton pour participer")
      .setColor(14003152)
      .setTimestamp()
      .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');

    return embed
  }
}