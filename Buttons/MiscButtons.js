const { MessageButton } = require("discord-buttons");

module.exports = {
    acceptRules: () => {
        const button = new MessageButton()
            .setStyle('green')
            .setLabel('Fermer ma commande')
            .setID(`accept-rules`)

        return button
    },
    giveButton: () => {
        const button = new MessageButton()
            .setStyle('green')
            .setLabel('Participer au giveaway')
            .setID(`join-giveaway`)

        return button
    }
}