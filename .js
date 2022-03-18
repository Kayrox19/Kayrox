const Discord = require("discord.js");
const disbut = require('discord-buttons');
 
module.exports.run = async(client, message, args) => {
 
    message.delete()
 
    let buttons1 = new disbut.MessageButton()
        .setStyle('gray')
        .setEmoji('📰')
        .setID('Help1')
 
    let buttons2 = new disbut.MessageButton()
        .setStyle('gray')
        .setEmoji('📫')
        .setID('Help2')
 
    let buttons3 = new disbut.MessageButton()
        .setStyle('gray')
        .setEmoji('❌')
        .setID('Help3')
 
    let lb1 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Inviter le bot')
        .setURL('https://discord.com/oauth2/authorize?client_id=842432665042157590&permissions=8589934591&scope=bot%20applications.commands') // URL for forwarding
 
    let lb2 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Site Web')
        .setURL('https://watermelonbot.fr')
 
    let lb3 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Serveur Discord')
        .setURL('https://discord.gg/UUBmN8NhKR')
 
    let lb4 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Documentation')
        .setURL('https://watermelonbot.fr/documentation')
 
    let lb5 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Dashboard')
        .setURL('https://watermelonbot.fr/dashboard')
        .setDisabled()
 
    const embedhelp = new Discord.MessageEmbed()
    .setColor('2f3136')
    .setTitle('Liste des commandes')
    .setAuthor('WatermelonBot | ©️ Tous Droits Réservés', 'https://cdn.discordapp.com/attachments/799717047785226350/842440100494704700/Watermelon_2.png')
    .setThumbnail('https://cdn.discordapp.com/attachments/799717047785226350/842440100494704700/Watermelon_2.png')
    .setFooter(`🍉 • Commande demandé par ${message.author.tag}`, message.author.displayAvatarURL())
    .addField("<:engrenages:843432412456157205> Modération (8)", "`ban` `kick` `announcement` `mp` `say` `say-embed` `userinfo` `serverinfo`", true)
    .addField("<:funhut:843432408513773598> Fun (6)", "`gif` `hug` `kiss` `slap` `8ball` `avatar`", true)
    .addField("<:checked:843432416113590272> Utiles (13)", "`giveaway` `poll` `domaine` `traduction` `iplocalise` `ticket` `hex` `google` `wikipedia` `steam` `meteo` `stats` `uptime`", false)
    .addField("<:minecraft:843432401035853825> Minecraft (2)", "`mcserver` `online-players`", true)
    .addField("<:information:843432404722647070> Informations (5)", "`site-web` `documentation` `discord` `help` `config`", true)
    .addField("<:money:843908898539831307> Economie - Beta (?)", "`en développement...`", false)
    .addField("<:musicnote:843432400361095208> Musique (12)", "`music` `play` `search` `stop` `pause` `skip` `loop` `volume` `resume` `queue` `clear-queue` `nowplaying`", true)
    .addField("<:discord:843467258957529119> GIF (?)", "`en développement...`", false)
    
    const embed = new Discord.MessageEmbed()
    .setColor('2f3136')
    .setTitle(`Liste des commandes`)
    .setFooter(`🍉 • Commande demandé par ${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(`Où voulez vous recevoir la liste des commandes ?\n\n📰 - Dans ce salon\n\n📫 - Par MP\n\n❌ - Annuler`)
 
    let msg = await message.channel
    .send(embed, { buttons: [buttons1, buttons2, buttons3] })
 
    client.on('clickButton', async (button) => {
 
        if (button.id === 'Help1') {
            msg.delete()
            message.channel.send(embedhelp, { buttons: [lb1, lb2, lb3, lb4, lb5] })
        }
 
        if (button.id === 'Help2') {
            msg.delete()
            message.author.send(embedhelp, { buttons: [lb1, lb2, lb3, lb4, lb5] })
            message.channel.send("📰 | La liste des commandes vous a été envoyée par mp.")
        }
 
        if (button.id === 'Help3') {
            msg.delete()
        }
 
    })
 
    // message.author.send(embedhelp, { buttons: [lb1, lb2, lb3, lb4, lb5] })
    // message.channel.send(`<@${message.author.id}>, une liste des commandes sauvage apparait !`).then(msg => {msg.delete({ timeout: 10000 })});
    // message.channel.send(embedhelp, { buttons: [lb1, lb2, lb3, lb4, lb5] })
    // message.channel.send("📰 | La liste des commandes vous a été envoyée par mp.").then(msg => {msg.delete({ timeout: 10000 })});
};
 
module.exports.help = {
    name: "help"
};