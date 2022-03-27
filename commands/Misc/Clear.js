const config = require('../../config');
const { clearMessage } = require('../../Embeds/Misc');

module.exports.run = async (client, message, args) => {
    message.delete()
    const userIdAdmin = message.guild.roles.cache.get(config.adminRoleId).members.map(m => m.user.id);
    if (userIdAdmin.includes(message.member.id)) {
        if (!args[0] || args[0] <= 1 || args[0] > 100) {
            return message.reply("Il te faut preciser un nombre entre 2 et 100.")
        } else {
            return message.channel.bulkDelete(args[0]).then(() => {
                message.reply(clearMessage(message.member, args[0])).then(msg => {
                    msg.delete({ timeout: 5000 });
                })
            })
        }

    }
};

module.exports.help = {
    name: "clear",
    category: "misc",
    description: "",
    usage: "",
    admin: true
};