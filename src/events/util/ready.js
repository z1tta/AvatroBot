module.exports = (client) => {
  const statuses = [
    "préfixe par défaut: >",
    "Un problème avec le bot? rejoignez le serveur de support: https://discord.gg/5N8HDB",
  ];
  let si = 0;
  let seconds = 20;
  setInterval(() => {
    try {
      si++;
      if (si + 1 > statuses.length) si = 0;
      client.user.setPresence({
        activity: { name: statuses[si] },
        status: "online",
      });
    } catch (err) {
      throw err;
    }
  }, seconds * 1000);
  console.log(
    `Connecté en tant que ${client.user.tag} (ID: "${client.user.id}")`
  );
};
