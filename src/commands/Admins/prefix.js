module.exports = {
  name: "prefix",
  aliases: ["p"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!args[0])
      return message.channel.send(
        `Préfixe actuel sur ce serveur: \`${settings.prefix}\``
      );
    if (args[0] == "reset") {
      await client.updateGuild(message.guild, { prefix: ">" });
      return message.channel.send(
        `${client.emotes.check} Préfixe réinitialisé: \`>\``
      );
    }
    if (args[0]) {
      const newSetting = args.join(" ");
      if (newSetting == settings.prefix) return message.reply(`le nouveau préfixe doit être diférent de l'ancien`);
      if (newSetting.length < 1900) return message.reply(`le préfixe doit contenir 1900 caractères ou moins`);
      await client.updateGuild(message.guild, { prefix: newSetting });
      return message.channel.send(
        `${client.emotes.check} Préfixe mis à jour, ancien préfixe: \`${settings.prefix}\` nouveau préfixe: \`${newSetting}\``
      );
    }
  },
  cooldown: 5,
  usage: `prefixname [new_prefix]`,
  description: "Renvoie le préfixe actuel, ou change le préfixe",
  category: "Admins",
  permission: "Administrateur",
};
