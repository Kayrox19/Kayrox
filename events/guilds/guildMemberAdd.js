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
        };


        // To compare, we need to load the current invite list.
        member.guild.fetchInvites().then(async guildInvites => {
            //Part1 get invite and inviter
            const newInvites = guildInvites;
            // This is the *existing* invites for the guild.
            const oldInvites = client.invites.get(member.guild.id);
            // Look through the invites, find the one for which the uses went up.
            const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
            // This is just to simplify the message being sent below (inviter doesn't have a tag property)
            const inviter = await client.users.fetch(invite.inviter.id);

            //Part2
            const reformData = {
                id: inviter.id,
                invited: member.id,
                type: "Add"
            }
            await client.userRef(member.guild, reformData).then(async () => {
                //PART 3
                const dataGuild = await client.getGuild(member.guild);
                const userInviter = await dataGuild.users.find((lead) => {
                    if (lead.userId === inviter.id) return lead
                })
                if (!userInviter.affiliateCode) {
                    if (userInviter.invitedNumber >= 5) {
                        const generateRandomString = (myLength) => {
                            const chars =
                                "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
                            const randomArray = Array.from(
                                { length: myLength },
                                (v, k) => chars[Math.floor(Math.random() * chars.length)]
                            );

                            const randomString = randomArray.join("");
                            return randomString;
                        };

                        const code = generateRandomString(8);
                        const Data = {
                            id: inviter.id,
                            code: code
                        }
                        await client.setCodeForUser(member.guild, Data);
                    }
                }
            })


        })
    }
}