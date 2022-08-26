const { MessageButton } = require("discord-buttons");

module.exports = {
    deleteOrder: (channel) => {
        const button = new MessageButton()
            .setStyle('gray')
            .setLabel('Fermer ma commande')
            .setEmoji("🔒")
            .setID(`close-${channel.id}`)

        return button
    },
    confirmDeleteOrderYes: (id) => {
        const button = new MessageButton()
            .setStyle('green')
            .setEmoji("✔️")
            .setLabel("Oui")
            .setID(`close-confirm-yes-${id}`)

        return button
    },
    confirmDeleteOrderNo: (id) => {
        const button = new MessageButton()
            .setStyle('red')
            .setEmoji("❌")
            .setLabel("Non")
            .setID(`close-confirm-no-${id}`)

        return button
    },
      createOrder: (channel) => {
         const button = new MessageButton()
             .setStyle('blurple')
             .setLabel('Passer commande')
             .setEmoji("📩")
             .setID(`open-order-${channel.id}`)

         return button
    },
}