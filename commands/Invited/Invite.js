const Invites = require('../../Embeds/Invites');

module.exports.run = async (client, message, args) => {
    message.delete()
    const dataGuild = await client.getGuild(message.guild);
    async function getUser(id) {
        const userInviter = await dataGuild.users.find((lead) => {
            if (lead.userId === id) return lead
        })
        return userInviter;
    }


    const mention = message.mentions.users.first();
    if (!mention) {
        const userInviter = await getUser(message.member.id);

        if (userInviter) {
            message.reply(`\n`)
            return message.reply(Invites.showInvites(userInviter, await client.calculatePercentForCode(userInviter.invitedNumber)));
        } else {
            message.reply("Vous n'avez aucune invitation.")
        }
    } else {
        const userInviter = await getUser(mention.id);
        if (userInviter) {
            message.reply(`\n`)
            return message.reply(Invites.showInvites(userInviter, await client.calculatePercentForCode(userInviter.invitedNumber)));
        } else {
            message.reply(`L'utilisateur <@${mention.id}> n'a aucune invitation.`)
        }
    }



};

module.exports.help = {
    name: "invite",
    category: "invites",
    description: "",
    usage: ""
};