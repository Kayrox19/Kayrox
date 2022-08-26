const { MessageEmbed } = require("discord.js");

module.exports = {
    clearMessage: (user, number) => {
        const embed = new MessageEmbed()
            .setDescription(`***<@${user.id}>, ${number} messages ont bien été supprimés.***`)
            .setColor(14003152)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');

        return embed
    },
    rules1: () => {
        const embed = new MessageEmbed()
            .setImage("https://cdn.discordapp.com/attachments/789511639476731944/952534595138629642/banniere_reglement.png")
            .setColor(14665182)

        return embed
    },
    rules2: () => {
        const embed = new MessageEmbed()
            .setTitle("Règlement de Kayrox - Art")
            .setDescription("**Règle n°1** • Avoir une attitude correcte et adaptée afin de conserver une atmosphère chaleureuse.\n\n**Règle n°2** • Merci de ne pas Spam, Flood, ou encore Insulter.\n\n**Règle n°3** • Les pseudos/images de profil ne doivent pas inciter à la haine ou à la violence.\n\n**Règle n°4** • Les caractères spéciaux, pornographiques, sexistes, homophobes… Sont interdits à l'écrit comme à travers des pseudos.\n\n**Règle n°5** • La pub est interdite sauf pour le rôle <@&952530060152295424> *(la pub en message privé est également interdite).*\n\n**Règle n°6** • Vous devez utiliser les salons selon leurs différentes utilités. Toute tentative d'arnaque est punissable.")
            .setColor(14003152)
            .setTimestamp()

        return embed
    },
    rules3: () => {
        const embed = new MessageEmbed()
            .setTitle("Règlement des commandes")
            .setDescription("**Règle n°1** • Toute pub mensongère envers le discord est punissable.\n\n**Règle n°2** • La publication d'avis sur un service n'étant pas constructifs ou visant à nuire au bien être de Kayrox - Art est interdite.\n\n**Règle n°3** • Toute tentative de vol ou d'arnaque lors d'une commande est strictement interdite par ce présent règlement.")
            .setColor(14003152)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');

        return embed
    }
}