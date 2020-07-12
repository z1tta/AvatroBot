module.exports = {
  name: "logchannel",
  aliases: ["lc"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (client.isEnabled("logs") == false) return client.moduleDisabled("logs");
    if (!args[0]) return message.reply("vous devez indiquer un channel");
    if (args[0] == "delete") {
      if (settings.modules.logs.logChannel == "none")
        return message.reply(`Aucun channel de log n'est configuré`);
      else {
        await client.updateGuild(message.guild, {
          "modules.logs.logChannel": "none",
        });
        return message.channel.send(
          `${client.emotes.check} Le channel de log à été supprimé`
        );
      }
    }
    const channel = client.getChannel(args[0]);
    if (!channel) return client.channelNotFound();
    if (settings.modules.logs.logChannel == "none") {
      await client.updateGuild(message.guild, {
        "modules.logs.logChannel": channel.id,
      });
      return message.channel.send(
        `${client.emotes.check} Le channel ${channel} à bien été défini comme channel de logs`
      );
    } else {
      await client.updateGuild(message.guild, {
        "modules.logs.logChannel": channel.id,
      });
      return message.channel.send(
        `${client.emotes.check} Le channel de logs à bien été changé de <#${settings.modules.logs.logChannel}> à ${channel}`
      );
    }
  },
  cooldown: 5,
  usage: "<channel_id || channel_mention || channel_name>\n<delete>",
  description:
    "Configure l'envoi des message de logs dans le salon indiqué ou supprime le salon de logs exisant",
  category: "Logs",
  permission: "Administrateur",
};