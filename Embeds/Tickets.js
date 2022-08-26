const { MessageEmbed } = require("discord.js");

module.exports = {
  init: () => {
    const image = new MessageEmbed()
      .setImage("https://cdn.discordapp.com/attachments/911363826665009182/954115638757060678/commander.png")
      .setColor(14003152)
    const embed = new MessageEmbed()
      .setTitle("🛒 - Créez votre commande !")
      .setColor(14003152)
      .setDescription("> Vous souhaitez passer commande ? alors n'attendez plus.\n\n**__Comment se déroulera la commande ?__**\n\n**Étape n°1** • Mise en contact avec le client.\n**Étape n°2** • Remplissage d'un questionnaire par le client afin de répondre à ses besoins.\n**Étape n°3** • Envoie régulier de l'avancement de la commande.\n**Étape n°4** • Validation de la commande par le client.\n**Étape n°5 •** Paiement via **Paypal**.\n\n→ Pour créer votre commande, cliquez sur la reaction ci-dessous.")
      .setTimestamp()
      .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');

    return [image, embed]
  },
  openedTicket: () => {
    const embed = new MessageEmbed()
      .setAuthor(`👋 - Bienvenue sur votre espace ticket !`)
      .setColor(14003152)
      .setDescription("Afin de gagner en efficacité, merci de remplir les informations demandées dans ce formulaire :\n```\n• Description de votre commande :\n• Type de votre commande (logo, bannière...) :\n• Dimensions en pixels (facultatif) :\n• Votre budget :\n• Informations suplémentaires :\n```\n→ Merci de patienter jusqu'à la prise en charge de votre commande.")
      .setTimestamp()
      .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png');
    return embed
  },
  confirmDelete: () => {
    const embed = new MessageEmbed()
      .setTitle("Êtes-vous sûr de vouloir fermer votre ticket ?")
      .setColor(14003152)
      .setTimestamp()
      .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png')
    return embed
  },
  ticketOpenToUser: (channel) => {
    const embed = new MessageEmbed()
      .setTitle("Commandes ouverte")
      .setDescription(`> <#${channel.id}>`)
      .setColor(14003152)
      .setTimestamp()
      .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png')
    return embed
  },
  viewTicketFirst: (user, time) => {
    const embed = new MessageEmbed()
      .setTitle(`Lecture du ticket de ${user}`)
      .setColor(14003152)
      .setTimestamp(Date.parse(time))
      .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png')
    return embed
  },
  viewTicket: (data, client, user) => {
    if (!client.isEmpty(data.embed)) {
      const embed = new MessageEmbed()
        .setColor(14003152)
        .setAuthor(user.username, user.avatarURL())

      data.embed.timestamp ? embed.setTimestamp(data.embed.timestamp) : null
      data.embed.description ? embed.setDescription(data.embed.description) : null
      data.embed.title ? embed.setTitle(data.embed.title) : null
      return embed
    } else if (!client.isEmpty(data.content)) {
      const embed = new MessageEmbed()
        .setAuthor(user.username, user.avatarURL())
        .setDescription(`> ${data.content}`)
        .setColor(14003152)
        // .setTimestamp(Date.parse(time))
        .setFooter("Kayrox' Bot", 'https://zupimages.net/up/22/34/ob9s.png')
      return embed

    }

  },
  allTickets: (data) => {
    const embed = new MessageEmbed()
      .setTitle("🎫 - Archive Tickets")
      .setDescription(data.map((e) => {
        return "```\n• !viewt " + e.id + " de " + e.user + "\n```"
      }).join("\n\n"))
      .setColor(14003152)

    return embed
  },
}