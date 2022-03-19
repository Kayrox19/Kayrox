module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(client, member) {
        const dataGuild = await client.getGuild(member.guild);
        const userInviter = await dataGuild.users.find((lead) => {
            if (lead.invited.includes(member.id)) return lead
        })
        if (userInviter) {
            const reformData = {
                id: userInviter.userId,
                invited: member.id,
                type: "Remove"
            }
            await client.userRef(member.guild, reformData);
        }



    }
}