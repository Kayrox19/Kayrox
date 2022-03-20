const Config = require("../../config");

module.exports.run = async (client, message, args) => {
    message.delete()
    const userIdAdmin = message.guild.roles.cache.get(Config.adminRoleId).members.map(m => m.user.id);
    if (userIdAdmin.includes(message.member.id)) {
        if (!args[0] || !args[1] || isNaN(args[1])) {
            return message.reply("Veuillez renter un ```code``` et un ```prix```\nExemples:```!pay 929SKS 20```")
        } else {
            const code = args[0];
            const price = args[1];

            const dataGuild = await client.getGuild(message.guild);
            const user = await dataGuild.users.find((lead) => {
                if (lead.affiliateCode === code) return lead
            });
            if (!user) {
                return message.reply("Code entrer invalide.")
            } else {
                const Data = {
                    id: user.userId,
                    price: price,
                    type: "pay"
                }
                const payment = await client.payUser(message.guild, Data);
                if (await payment) {
                    return message.reply(`<@${Data.id}> à bien recus sont argent\n!invite <@${Data.id}>`);
                }
            }
        }
    }
};

module.exports.help = {
    name: "pay",
    category: "invites",
    description: "",
    usage: ""
};