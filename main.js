/*
 8   8                                      8""""8   8"""88 ""8""         / /    8""""                          8""""8                                  
8   8  eeeee e    e eeeee  eeeee e    e    8    8   8    8   8          / /     8     eeeee  eeeee eeeee eeeee 8    8   eeeee  eeee e   e  eeee eeeee  
8eee8e 8   8 8    8 8   8  8  88 8    8    8eeee8ee 8    8   8e        / /      8eeee 8   8  8  88 8   "   8   8eeee8ee 8   8  8    8   8  8    8   8  
88   8 8eee8 8eeee8 8eee8e 8   8 eeeeee    88     8 8    8   88       / /       88    8eee8e 8   8 8eeee   8e  88     8 8eee8e 8eee 8eee8e 8eee 8eee8e 
88   8 88  8   88   88   8 8   8 88   8    88     8 8    8   88      / /        88    88   8 8   8    88   88  88     8 88   8 88   88   8 88   88   8 
88   8 88  8   88   88   8 8eee8 88   8    88eeeee8 8eeee8   88     / /         88    88   8 8eee8 8ee88   88  88eeeee8 88   8 88ee 88   8 88ee 88   8         

Licence :
2022
By FrostBreker For Kayrox
Name: Kayrox’ Bot
V: 1.0.0
*/
const { Client, Collection, Permissions } = require('discord.js');
require('discord-reply');
require('dotenv').config();
const config = require("./config");
const { readdirSync } = require("fs");
const Tickets = require('./Embeds/Tickets');
const TicketButtons = require("./Buttons/TicketButtons");
const MiscButtons = require("./Buttons/MiscButtons");
const NewUsers = require('./Embeds/NewUsers');
const Misc = require('./Embeds/Misc');
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

const client = new Client();
require("discord-buttons")(client)
require("./utils/functions")(client);
client.mongoose = require("./utils/mongoose");
["commands"].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`Dossier Chargeée [🗂️] : ${getFileName.help.category}`)
            console.log(`Commande chargée [🛢️] : ${getFileName.help.name}`, "\n_______________________________________")
        };
    });
};

loadCommands();
client.mongoose.init(client.timestampParser());
client.on('message', async message => {

    if (message.guild) {
        const data = await client.getGuild(message.guild).catch(() => {
        });

        if (!data) {

            const g = message.guild;
            if (g) {
                if (!data) {
                    client.createGuild(g);
                    return message.channel.send(`Bot opérationnel pour ${g.name}, veuillez renvoyer votre commande.`)
                }
            }
        } else {

            if (!data.prefix) {
                if (!message.content.startsWith(PREFIX) || message.author.bot) return;
                const args = message.content.slice(PREFIX.length).split(/ +/);
                const command = args.shift().toLowerCase();

                if (!client.commands.has(command)) return;
                client.commands.get(command).run(client, message, args);
            } else {
                if (!message.content.startsWith(data.prefix) || message.author.bot) return;
                const args = message.content.slice(data.prefix.length).split(/ +/);
                const command = args.shift().toLowerCase();

                if (!client.commands.has(command)) return;
                client.commands.get(command).run(client, message, args);
            }
        }
    }
});

client.on("guildCreate", async guild => {
    const data = await client.getGuild(guild);

    if (!data) {
        const g = guild;
        if (!data) client.createGuild(g);
    }
})

client.on('clickButton', async (button) => {
    const data = button.message.components[0].components[0];
    const message = button.message;
    const channel = button.channel

    if (data.label === "Annuler ma commande.") {
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
        return channel.delete();
    } else if (id.includes("close" && "confirm" && "no")) {
        return message.delete();
    }

    if (id.includes("open" && "order")) {
        const user = message.guild.member(button.clicker.user);
        let nameRef = user.user.username.split(" ")[0]
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
                                allow: ['VIEW_CHANNEL'],
                            }
                        ]
                    })
                    return cat;
                }
            }
            const channel = await button.guild.channels.create(name.toLowerCase(), {
                type: 'GUILD_TEXT',
                topic: `${user.id}-${tickets._id}`,
                permissionOverwrites: [
                    {
                        id: button.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: user.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]
                    }
                ]
            }); // Succes created the channel
            user.send(Tickets.ticketOpenToUser(channel))//Send message to the user
            const cat = await createCat();
            channel.setParent(cat.id);
            return channel.send(Tickets.openedTicket(message), { buttons: [TicketButtons.deleteOrder(channel)] }).then((msg) => msg.pin())//Send message to the created channel with button.
        }

    }

    if (id.includes("accept" && "rules")) {
        const memberRoles = message.guild.roles.cache.find(r => r.id === config.roles.memberRules);
        const user = message.guild.member(button.clicker.user);
        await user.roles.add(memberRoles.id).catch(() => {
            console.log("User trop eleve pour avoir le roles");
        })
    }


})

client.on('guildMemberAdd', async member => {
    if (member.guild.id !== config.guildID) return;
    const kayroxG = client.guilds.cache.find((g) => g.id === config.guildID); //Get the guild
    const findChannel = kayroxG.channels.cache.find(c => c.name === config.channelName.newUsersChannelName); //Check if channel exist
    const rulesChannel = kayroxG.channels.cache.find(c => c.name === config.channelName.rulesChannel); //Check if channel exist
    const memberRoles = kayroxG.roles.cache.find(r => r.id === config.roles.arrived);
    await member.roles.add(memberRoles.id).catch(() => {
        console.log("User trop eleve pour avoir le roles");
    })

    if (!findChannel) {
        const channel = await kayroxG.channels.create(config.channelName.newUsersChannelName, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                id: kayroxG.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ADD_REACTIONS],
                deny: [Permissions.FLAGS.SEND_MESSAGES],
            }]
        }); // Succes created the channel
        // channel.setParent(config.categories.catForNewUsers);
        channel.send(NewUsers.newUsers(member, rulesChannel.id)).then((msg) => {
            msg.react("👋")
        })
    } else {
        findChannel.send(NewUsers.newUsers(member, rulesChannel.id)).then((msg) => {
            msg.react("👋")
        })
    }
});

client.on('ready', async () => {
    const commands = [];
    client.commands.forEach((c) => commands.push(c.help.name))
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
        if (findChannel) findChannel.delete()
        //Categorie 💜 • Information
        const channel = await kayroxG.channels.create(config.channelName.orderChannel, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                id: kayroxG.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.ADD_REACTIONS],
                deny: [Permissions.FLAGS.SEND_MESSAGES],
            }]
        }); // Succes created the channel
        channel.setParent(config.categories.categoriesForOrder)
        channel.send(Tickets.init()[0])//Send initial embed
        channel.send(Tickets.init()[1], { buttons: [TicketButtons.createOrder(channel)] })//Send initial embed
    }
    createOrderChannel();

    async function createRulesChannels() {
        const findChannel = kayroxG.channels.cache.find(c => c.name === config.channelName.rulesChannel); //Check if channel exist
        if (findChannel) findChannel.delete()
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
        channel.send(Misc.rules(), { buttons: [MiscButtons.acceptRules()] })
        // channel.send(Tickets.init()[1], { buttons: [TicketButtons.createOrder(channel)] })//Send initial embed
    }
    createRulesChannels();


    setInterval(() => client.user.setPresence({ activity: { name: `${PREFIX}${commands[Math.floor(Math.random() * commands.length)]}`, type: 'WATCHING' }, status: 'online' }), 10000);

});

client.login(TOKEN);