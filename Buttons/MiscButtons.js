const { MessageButton } = require("discord-buttons");

module.exports = {
    acceptRules: (channel) => {
        const button = new MessageButton()
            .setStyle('green')
            .setLabel('Accepter le règlement')
            .setEmoji("✔️")
            .setID(`accept-rules`)

        return button
    }
}