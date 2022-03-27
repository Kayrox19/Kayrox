const config = require("../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
    check: async (client) => {
        const allGive = await client.getAllGive();
        if (!client.isEmpty(allGive)) {
            const kayroxG = client.guilds.cache.find((g) => g.id === config.guildID);
            const findChannel = kayroxG.channels.cache.find(c => c.id === config.channelName.giveAwayChannel);
            allGive.map(async (g) => {
                if (g.time < Date.now()) {
                    if (!client.isEmpty(g.users)) {
                        const winnners = [];
                        for (let i = 0; i < g.numberOfWinner; i++) {
                            const user = await client.users.fetch(g.users[Math.floor(Math.random() * g.users.length)])
                            winnners.push(user.id);
                        }
                        let i = 1;
                        const embed = new MessageEmbed()
                            .setTitle("<:cadeau:951952913666822144> Résultat du giveaway !")
                            .setColor(14665182)
                            .setTimestamp()
                            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png')
                            .setDescription(winnners.map((x) => {
                                return "> Gagnant n°" + i++ + " •" + "<@" + x + ">"
                            }).join("\n"))

                        embed.description = embed.description + "\n\n→ Félicitation ! Vous avez gagné `" + g.prize + "`."

                        findChannel.send(embed);
                        await client.deleteGive(g._id);
                    }
                }
            })
        }
    }
}