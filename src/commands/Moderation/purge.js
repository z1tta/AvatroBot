module.exports = {
  name: "purge",
  aliases: ["clear"],
  run: async (client, message, args, settings) => {
    if (await client.isIgnored() == true) return;
    if (settings.autoDelete == true) message.delete();
    if (!client.checkPerms() && !client.isMod()) return client.noPerms();
    if (client.isEnabled("moderation") == false)
      return client.moduleDisabled("moderation");
    
  },
  cooldown: 5,
  usage: "prefixname",
  description: "",
  category: "",
  permission: "",
};