module.exports = {
  name: "ignoredmemberadd",
  aliases: ["ignoreduseradd", "ima", "iua"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("moderation", message.guild) == false)
      return client.moduleDisabled("moderation");
    if (!args[0]) return message.reply(`vous devez spécifier un membre`);
    const member = client.getMember(args[0]);
    if (!member) return client.memberNotFound();
    if (member.hasPermission("ADMINISTRATOR"))
      return message.reply(`commande interdite, ce membre est administrateur`);
    const dbMember = await client.getDbMember(member, message.guild);
    if (dbMember.isIgnored == true)
      return message.reply(`le membre ${member} est déjà ignoré`);
    else await client.updateMember(member, message.guild, "isIgnored", true);
    return message.channel.send(
      `${client.emotes.check} Le membre ${member} sera ignoré`
    );
  },
  cooldown: 5,
  usage: `prefixname <member>`,
  description: "Ajoute un membre pour lequel les commandes seront ignorées",
  category: "Moderation",
  permission: "Administrateur",
};
