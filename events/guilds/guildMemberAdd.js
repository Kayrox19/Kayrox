const config = require("../../config");
const NewUsers = require("../../Embeds/NewUsers");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        if (member.guild.id !== config.guildID) return;
        const kayroxG = client.guilds.cache.find((g) => g.id === config.guildID); //Get the guild
        const findChannel = kayroxG.channels.cache.find(c => c.id === config.channelName.newUsersChannelName); //Check if channel exist
        const rulesChannel = kayroxG.channels.cache.find(c => c.name === config.channelName.rulesChannel); //Check if channel exist
        const memberRoles = kayroxG.roles.cache.find(r => r.id === config.roles.arrived);
        await member.roles.add(memberRoles.id).catch(() => {
            console.log("User trop eleve pour avoir le roles");
        })

        if (findChannel) {
            findChannel.send(NewUsers.newUsers(member, rulesChannel.id)).then((msg) => {
                msg.react("👋")
            })
        }
    }
}