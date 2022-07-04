const config = require("../../config");
const { Permissions } = require("discord.js");
const Tickets = require("../../Embeds/Tickets");
const TicketButtons = require("../../Buttons/TicketButtons");
const Giveaway = require("../../Embeds/Giveaway");

module.exports = {
    name: "clickButton",
    once: false,
    async execute(client, button) {
        const data = button.message.components[0].components[0];
        const message = button.message;
        const channel = button.channel

        if (data.label === "Fermer ma commande") {
            button.reply.defer();
            return channel.send(Tickets.confirmDelete(message), { buttons: [TicketButtons.confirmDeleteOrderYes(message.author.id), TicketButtons.confirmDeleteOrderNo(message.author.id)] })

        }

        const id = button.id.split("-");
        if (id.includes("close" && "confirm" && "yes")) {
            const allMessages = [];
            message.channel.messages.cache.map((m) => {
                if (m.content === '' && !client.isEmpty(m.embeds[0])) {
                    allMessages.push({
                        embed: m.embeds[0],
                        sendAt: m.createdTimestamp,
                        by: m.author.id
                    })
                } else if (!client.isEmpty(m.content)) {
                    allMessages.push({
                        content: m.content,
                        sendAt: m.createdTimestamp,
                        by: m.author.id
                    })
                }
            })
            const data2 = {
                content: allMessages,
                id: channel.topic.split("-")[1]
            }
            await client.updateTicket(button.guild, data2);
            message.delete()
            channel.setParent(config.categories.archiveTickets);
            channel.setName(`archive-${channel.name}`)
            button.reply.defer();
        } else if (id.includes("close" && "confirm" && "no")) {
            button.reply.defer();
            return message.delete();
        }

        if (id.includes("open" && "order")) {
            const user = await client.users.fetch(button.clicker.id);
            let nameRef = user.username.split(" ")[0];
            const name = nameRef + "-commande".toLowerCase();

            const findChannel = button.guild.channels.cache.find(c => c.name === name.toLowerCase()); //Check if channel exist
            if (findChannel) return user.send(Tickets.ticketOpenToUser(findChannel)) // Channel exist

            const data = {
                author: user.id
            };

            const tickets = await client.createTicket(button.guild, data);
            if (tickets) {
                async function createCat() {
                    const findChannel = button.guild.channels.cache.find(c => c.type === "category" && c.name === config.categories.ticketName); //Check if categories exist
                    if (findChannel) return findChannel;
                    else {
                        const cat = await message.guild.channels.create(config.categories.ticketName, {
                            type: 'category', permissionOverwrites: [
                                {
                                    id: message.guild.id,
                                    allow: ['VIEW_CHANNEL']
                                }
                            ]
                        })
                        return cat;
                    }
                }
                const cat = await createCat();
                await button.guild.channels.create(name.toLowerCase(), {
                    type: 'GUILD_TEXT',
                    topic: `${user.id}-${tickets._id}`,
                    parent: cat.id
                }).then((channel) => {
                    channel.overwritePermissions([
                        {
                            id: button.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                        {
                            id: user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ADD_REACTIONS],
                            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]
                        }
                    ])
                    return channel.send(Tickets.openedTicket(message), { buttons: [TicketButtons.deleteOrder(channel)] }).then((msg) => msg.pin())//Send message to the created channel with button.
                });

            }
            button.reply.defer();

        }

        if (id.includes("accept" && "rules")) {
            const memberRoles = message.guild.roles.cache.find(r => r.id === config.roles.memberRules);
            // const user = await client.users.fetch(button.clicker.id)
            const user = message.guild.member(button.clicker.user);
            await user.roles.add(memberRoles.id).catch(() => {
                console.log("User trop eleve pour avoir le roles");
            })
            button.reply.defer();
        }

        if (button.id === "join-giveaway") {
            const user = await message.guild.member(button.clicker.user);
            const giveaway = await client.findGiveAway(message.id);
            if (giveaway) {
                if (giveaway.users.includes(user.id)) {
                    return await button.reply.send("Vous participez déjà à ce giveaway!", { ephemeral: true });
                } else {
                    await client.addUserToGiveAway(message.id, user.id);
                    const gI = await client.findGiveAway(message.id);
                    message.edit(Giveaway.giveaway({ prize: gI.prize, numberWinners: gI.numberOfWinner, time: gI.time, numbers: gI.users.length }));
                    return await button.reply.send("Vous avez rejoint ce giveaway!", { ephemeral: true });
                }
            } else {
                return await button.reply.send("Ce giveaway n'est plus disponible!", { ephemeral: true });
            }

        }

    }
}