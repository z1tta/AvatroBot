const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "modules",
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms("ADMINISTRATOR")) return client.noPerms();
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("État des modules")
        .setDescription(
          `<:enabled:728220529303224320>: module activé\n<:disabled:728220530418647060>: module désactivé\nPour avoir plus d'information sur un module, tapez \`${settings.prefix}modules <module_name>\`\nPour activer/désactiver un module, tapez\n\`${settings.prefix}modules <module_name> <enable || disable>\``
        )
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`);
      if (settings.modules.logs.enabled == true)
        embed.addField("Logs:", client.emotes.enabled, true);
      if (settings.modules.logs.enabled == false)
        embed.addField("Logs:", client.emotes.disabled, true);
      if (settings.modules.announcements.enabled == true)
        embed.addField("Announcements:", client.emotes.enabled, true);
      if (settings.modules.announcements.enabled == false)
        embed.addField("Announcements:", client.emotes.disabled, true);
      if (settings.modules.moderation.enabled == true)
        embed.addField("Moderation:", client.emotes.enabled, true);
      if (settings.modules.moderation.enabled == false)
        embed.addField("Moderation:", client.emotes.disabled, true);
      if (settings.modules.AFK.enabled == true)
        embed.addField("AFK:", client.emotes.enabled, true);
      if (settings.modules.AFK.enabled == false)
        embed.addField("AFK:", client.emotes.disabled, true);
      if (settings.modules.autoMessage.enabled == true)
        embed.addField("AutoMessage:", client.emotes.enabled, true);
      if (settings.modules.autoMessage.enabled == false)
        embed.addField("AutoMessage:", client.emotes.disabled, true);
      if (settings.modules.autoRoles.enabled == true)
        embed.addField("AutoRoles:", client.emotes.enabled, true);
      if (settings.modules.autoRoles.enabled == false)
        embed.addField("AutoRoles:", client.emotes.disabled, true);
      if (settings.modules.reminders.enabled == true)
        embed.addField("Reminders:", client.emotes.enabled, true);
      if (settings.modules.reminders.enabled == false)
        embed.addField("Reminders:", client.emotes.disabled, true);
      return message.channel.send(embed);
    }

    if (!args[1]) {
      const modulesObjects = settings.modules._doc.modules;
      const modulesName = [];
      for (const name in modulesObjects) {
        modulesName.push(name.toLowerCase());
      }
      if (!modulesName.includes(args[0].toLowerCase())) {
        return message.reply(
          `${args[0]} n'est pas un nom de module, pour avoir la liste de tous les modules, tapez \`${settings.prefix}modules\``
        );
      }
      const embed = new MessageEmbed()
        .setColor("#5991bd")
        .setTimestamp()
        .setFooter(`ID: ${message.author.id}`)
        .addField(
          "Description",
          settings.modules[args[0].toLowerCase()].description,
          true
        );
      if (settings.modules[args[0].toLowerCase()].enabled == true)
        embed.setDescription(`<:enabled:728220529303224320> module activé`);
      if (settings.modules[args[0].toLowerCase()].enabled == false)
        embed.setDescription(`<:disabled:728220530418647060> module désactivé`);
      if (args[0].toLowerCase() == "logs") embed.setTitle("Logs");
      if (args[0].toLowerCase() == "announcements")
        embed.setTitle("Announcements");
      if (args[0].toLowerCase() == "moderation") embed.setTitle("Moderation");
      if (args[0].toLowerCase() == "afk") embed.setTitle("AFK");
      if (args[0].toLowerCase() == "automessage") embed.setTitle("AutoMessage");
      if (args[0].toLowerCase() == "autoroles") embed.setTitle("AutoRoles");
      if (args[0].toLowerCase() == "reminders") embed.setTitle("Reminders");
      message.channel.send(embed);
    }

    if (args[1]) {
      const modulesObjects = settings.modules._doc.modules;
      const modulesNames = [];
      for (const name in modulesObjects) {
        modulesNames.push(name.toLowerCase());
      }
      if (!modulesNames.includes(args[0].toLowerCase()))
        return message.reply(
          `${args[0]} n'est pas un nom de module, pour avoir la liste de tous les modules, tapez \`${settings.prefix}modules\``
        );
      let newSetting;
      if (args[1].toLowerCase() == "enable") newSetting = true;
      if (args[1].toLowerCase() == "disable") newSetting = false;
      if (args[0].toLowerCase() == "logs") {
        if (newSetting == true) {
          if (settings.modules.logs.enabled == true)
            return message.reply(`le module \`Logs\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.logs.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Logs\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.logs.enabled == false)
            return message.reply(`le module \`Logs\` est déjà désactivé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.logs.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Logs\` à bien été désactivé`
            );
          }
        }
      }
      if (args[0].toLowerCase() == "announcements") {
        if (newSetting == true) {
          if (settings.modules.announcements.enabled == true)
            return message.reply(`le module \`Announcements\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.announcements.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Announcements\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.announcements.enabled == false)
            return message.reply(
              `le module \`Announcements\` est déjà désactivé`
            );
          else {
            await client.updateGuild(message.guild, {
              "modules.announcements.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Announcements\` à bien été désactivé`
            );
          }
        }
      }
      if (args[0].toLowerCase() == "moderation") {
        if (newSetting == true) {
          if (settings.modules.moderation.enabled == true)
            return message.reply(`le module \`Moderation\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.moderation.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Moderation\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.moderation.enabled == false)
            return message.reply(`le module \`Moderation\` est déjà désactivé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.moderation.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Moderation\` à bien été désactivé`
            );
          }
        }
      }
      if (args[0].toLowerCase() == "afk") {
        if (newSetting == true) {
          if (settings.modules.AFK.enabled == true)
            return message.reply(`le module \`AFK\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.AFK.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`AFK\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.AFK.enabled == false)
            return message.reply(`le module \`AFK\` est déjà désactivé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.AFK.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`AFK\` à bien été désactivé`
            );
          }
        }
      }
      if (args[0].toLowerCase() == "automessage") {
        if (newSetting == true) {
          if (settings.modules.autoMessage.enabled == true)
            return message.reply(`le module \`AutoMessage\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.autoMessage.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`AutoMessage\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.autoMessage.enabled == false)
            return message.reply(
              `le module \`AutoMessage\` est déjà désactivé`
            );
          else {
            await client.updateGuild(message.guild, {
              "modules.autoMessage.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`AutoMessage\` à bien été désactivé`
            );
          }
        }
      }
      if (args[0].toLowerCase() == "autoroles") {
        if (newSetting == true) {
          if (settings.modules.autoRoles.enabled == true)
            return message.reply(`le module \`AutoRoles\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.autoRoles.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`AutoRoles\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.autoRoles.enabled == false)
            return message.reply(`le module \`AutoRoles\` est déjà désactivé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.autoRoles.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`AutoRoles\` à bien été désactivé`
            );
          }
        }
      }
      if (args[0].toLowerCase() == "reminders") {
        if (newSetting == true) {
          if (settings.modules.reminders.enabled == true)
            return message.reply(`le module \`Reminders\` est déjà activé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.reminders.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Reminders\` à bien été activé`
            );
          }
        }
        if (newSetting == false) {
          if (settings.modules.reminders.enabled == false)
            return message.reply(`le module \`Reminders\` est déjà désactivé`);
          else {
            await client.updateGuild(message.guild, {
              "modules.reminders.enabled": newSetting,
            });
            message.channel.send(
              `${client.emotes.check} Le module \`Reminders\` à bien été désactivé`
            );
          }
        }
      }
    }
  },
  cooldown: 5,
  usage: `prefixname [module_name] [enable || disable]`,
  description:
    "Affiche la liste des modules et leur état\nActive ou désactive un module",
  category: "Admins",
  permission: "Administrateur",
};
