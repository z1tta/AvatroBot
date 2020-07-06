module.exports = {
  name: "delmod",
  aliases: ["deletemod", "delmoderator", "deletemoderator"],
  run: async (client, message, args, settings) => {
    if (client.isIgnored() == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR"))
      return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    const role = client.getRole(args[0]);
    if (!role) return client.roleNotFound();
    await client.updateGuild(message.guild, {
      "modules.moderation.moderatorRole": "none",
    });
    return message.channel.send(
      `<a:check:728546006614147083> Le role ${role} à bien été supprimé du statut modérateur`
    );
  },
  cooldown: 5,
  usage: "<role_id || role_mention || role_name>",
  description: "Supprime un rôle modérateur",
  category: "Moderation",
  permission: "Administrateur",
};