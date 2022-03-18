const config = require("../../config");
const Tickets = require("../../Embeds/Tickets");
module.exports.run = async (client, message, args) => {
    message.delete();
    const userIdAdmin = message.guild.roles.cache.get(config.adminRoleId).members.map(m => m.user.id);
    if (userIdAdmin.includes(message.member.id)) {
        const dataGuild = await client.getGuild(message.guild);
        const ticket = dataGuild.tickets;
        if(client.isEmpty(ticket)) return message.reply("Aucun ticket disponible.")
        let data = []
        await ticket.map(async(t) => {
            if(t.ticketStatus === "Close") {
                const tUser = await client.users.fetch(t.authorId);
                data.push({
                    user: tUser.username,
                    id: t.id
                })
            }
        })
        message.member.send(Tickets.allTickets(data));
    }
};

module.exports.help = {
    name: "allt",
    category: "tickets",
    description: "View all tickets",
    usage: ""
};