const { MessageEmbed } = require("discord.js");

module.exports = {
    clearMessage: (user, number) => {
        const embed = new MessageEmbed()
            .setDescription(`***<@${user.id}>, ${number} messages ont bien été supprimés.***`)
            .setColor(14003152)
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    },
    rules: (user, number) => {
        const embed = new MessageEmbed()
            .setDescription("```#Règlement du serveur Discord```\n\n**n°1 •** Avoir une attitude correcte est adapté pour former une atmosphère chaleureuse autour des membres.\n**n°2 •** Ne pas spam, ni flood, ni insulter.\n**n°3 •** Les pseudos/images de profils ne doivent pas entraîne dans la haine ou même la violence.\n**n°4 •** Les caractères spéciaux, pornographiques, sexistes, homophobes… Sont interdits que ce soit à l'écrit ou bien même dans les pseudo.\n**n°5 •** La pub est interdit sauf pour le rôle de Partenariat (la pub en message privé est également interdite).\n**n°6 •** Vous devez utilisez les salons selon leurs utilités différentes.\nTout tentative d'arnaque est punissable.\n\n:warning: **Voilà, faites attention, ce règlement peut être modifié à n'importe quel moment.**\n\n:white_check_mark: Si tu souhaites avoir accès au reste du Discord je te laisse cliquer sur le bouton ci-dessous")
            .setColor(14003152)
            .setImage("https://i.imgur.com/RGu4Kzw.png")
            .setTimestamp()
            .setFooter("Kayrox' Bot", 'https://www.zupimages.net/up/22/11/un0j.png');

        return embed
    }
}