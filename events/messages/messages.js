const config = require("../../config");
const Suggest = require("../../Embeds/Suggest");
const PREFIX = process.env.PREFIX;

module.exports = {
    name: "message",
    once: false,
    async execute(client, message) {
        if (message.guild) {
            if (message.channel.id === config.channelName.suggestChannel && !message.author.bot) {
                message.delete()
                return message.channel.send(Suggest.addSuggest(message.content)).then((msg) => {
                    const cheked = client.emojis.cache.find(emoji => emoji.name === config.emoji.cheked);
                    const cross = client.emojis.cache.find(emoji => emoji.name === config.emoji.cross);
                    const neutral = client.emojis.cache.find(emoji => emoji.name === config.emoji.neutral);
                    msg.react(`${cheked}`);
                    msg.react(`${neutral}`);
                    msg.react(`${cross}`);
                })
            }

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
    }
}