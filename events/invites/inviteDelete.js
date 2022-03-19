module.exports = {
    name: "inviteDelete",
    once: false,
    async execute(client, invite) {
        // Delete the Invite from Cache
        client.invites.get(invite.guild.id).delete(invite.code);
    }
}