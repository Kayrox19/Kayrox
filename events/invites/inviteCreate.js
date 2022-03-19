module.exports = {
    name: "inviteCreate",
    once: false,
    async execute(client, invite) {
        // Update cache on new invites
        client.invites.get(invite.guild.id).set(invite.code, invite.uses);
    }
}