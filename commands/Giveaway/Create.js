const MiscButtons = require("../../Buttons/MiscButtons");
const config = require("../../config");
const Giveaway = require("../../Embeds/Giveaway");

module.exports.run = async (client, message, args) => {
    message.delete()
    const userIdAdmin = message.guild.roles.cache.get(config.adminRoleId).members.map(m => m.user.id);
    if (userIdAdmin.includes(message.member.id)) {
        const numberOfwinner = args[0], prize = args[1], time = args[2];
        if (!numberOfwinner || !prize || !time) {
            return message.reply("Veuillez renseigner utiliser la commande avec le nombre de gagnant, le lot et le temps de cette maniere:\n```!create 2 Chaussete 2022-03-29```");
        }

        const findChannel = await message.guild.channels.cache.find(c => c.id === config.channelName.giveAwayChannel);
        if (findChannel) {
            const time2 = Date.parse(time) / 1000;
            const message2 = await findChannel.send(Giveaway.giveaway({ prize: prize, numberWinners: numberOfwinner, time: parseInt(time2), numbers: 0 }), { buttons: [MiscButtons.giveButton()] })
            return await client.createGiveaway(numberOfwinner, prize, time2, message2.id)
        }
    }
};

module.exports.help = {
    name: "create",
    category: "giveaway",
    description: "",
    usage: "",
    admin: true
};