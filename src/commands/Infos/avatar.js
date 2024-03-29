const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["getpfp", "getpdp", "pfp", "pdp", "getavatar"],
  run: async (client, message, args, settings) => {
    if ((await client.isIgnored()) == true) return;
    if (settings.autoDelete == true) message.delete();
    const member = client.getMember(args[0]) || message.member;
    const embed = new MessageEmbed()
      .setTitle(`Photo de profil de ${member.displayName}`)
      .setImage(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(`ID: ${message.author.id}`)
    return message.channel.send(embed);
  },
  cooldown: 5,
  usage: `prefixname [member]`,
  description:
    "Renvoie la photo de profil de l'utilisateur spécifié, ou sa propre photo de profil",
  category: "Infos",
  permission: "Aucunes",
};
