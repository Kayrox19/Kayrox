const { MessageButton } = require("discord-buttons");

module.exports = {
    acceptRules: (channel) => {
        const button = new MessageButton()
            .setStyle('green')
            .setLabel('Fermer ma commande')
            .setID(`accept-rules`)

        return button
    }
}