const config = require("../../config");
const { Permissions, Collection } = require('discord.js');
const Misc = require("../../Embeds/Misc");
const MiscButtons = require("../../Buttons/MiscButtons");
const Tickets = require("../../Embeds/Tickets");
const TicketButtons = require("../../Buttons/TicketButtons");
const checkGiveaway = require("../../utils/checkGiveaway");
const PREFIX = process.env.PREFIX;

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const commands = [];
        client.commands.forEach((c) => {
            if (!c.help.admin) {
                commands.push(c.help.name)
            }
        })
        console.log(`${client.timestampParser()} => ${client.user.tag} with ${client.guilds.cache.map(g => g.
            memberCount).reduce((a, b) => a + b)} users!`)

        const guild = [];
        client.guilds.cache.map(e => guild.push(e));
        guild.forEach(async g => {
            const data = await client.getGuild(g);
            if (!data) client.createGuild(g);
        })
        const kayroxG = client.guilds.cache.find((g) => g.id === config.guildID); //Get the guild

        async function createOrderChannel() {
            const findChannel = kayroxG.channels.cache.find(c => c.name === config.channelName.orderChannel); //Check if channel exist
            if (findChannel) return;

            const channel = await kayroxG.channels.create(config.channelName.orderChannel, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [{
                    id: kayroxG.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ADD_REACTIONS],
                    deny: [Permissions.FLAGS.SEND_MESSAGES],
                }]
            }); // Succes created the channel
            channel.setParent(config.categories.categoriesForOrder)
            channel.send(Tickets.init()[0])
            channel.send(Tickets.init()[1], { components: [TicketButtons.createOrder(channel)] })
        }
        createOrderChannel();

        async function createRulesChannels() {
            const findChannel = kayroxG.channels.cache.find(c => c.name === config.channelName.rulesChannel); //Check if channel exist
            if (findChannel) return;
            //Categorie 💜 • Information
            const channel = await kayroxG.channels.create(config.channelName.rulesChannel, {
                type: 'GUILD_TEXT',
                permissionOverwrites: [{
                    id: kayroxG.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ADD_REACTIONS],
                    deny: [Permissions.FLAGS.SEND_MESSAGES],
                }]
            }); // Succes created the channel
            channel.setParent(config.categories.catForRules)
            channel.send(Misc.rules1())
            channel.send(Misc.rules2())
            channel.send(Misc.rules3(), { buttons: [MiscButtons.acceptRules()] })
        }
        createRulesChannels();
        setInterval(() => client.user.setPresence({ activity: { name: `${PREFIX}${commands[Math.floor(Math.random() * commands.length)]}`, type: 'WATCHING' }, status: 'online' }), 10000);


        setInterval(() => {
            checkGiveaway.check(client)
        }, 10000)

        client.guilds.cache.forEach(g => {
            g.fetchInvites().then(guildInvites => {
                client.invites.set(g.id, new Collection(guildInvites.map((invite) => [invite.code, invite.uses])));
            })
        });
    }
}