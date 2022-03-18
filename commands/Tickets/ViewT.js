const config = require("../../config");
const Tickets = require("../../Embeds/Tickets");
module.exports.run = async (client, message, args) => {
    message.delete();
    const userIdAdmin = message.guild.roles.cache.get(config.adminRoleId).members.map(m => m.user.id);
    if (userIdAdmin.includes(message.member.id)) {
        if (!args[0]) return message.reply("Veuillez renter un id");
        const dataGuild = await client.getGuild(message.guild);
        const ticket = await dataGuild.tickets.find((lead) => {
            let str = lead._id.toString().split('"')
            if (str[0] === args[0]) return lead
        });
        if (!ticket) return message.reply("L'id entrée n'existe pas.\nFaites !allt pour voire tous les ticket")
        if (ticket.ticketStatus === "Open" || client.isEmpty(ticket.content)) return message.reply("Le ticket que vous souhaiter visionner n'est pas clos.");
        else {
            const tUser = await client.users.fetch(ticket.authorId);
            message.member.send(Tickets.viewTicketFirst(tUser.username, ticket.openAt))
            ticket.content.map(async (t) => {
                const user = await client.users.fetch(t.by);
                message.member.send(Tickets.viewTicket(t, client, user))
            })
        }
    }
};

module.exports.help = {
    name: "viewt",
    category: "tickets",
    description: "View ticket",
    usage: ""
};