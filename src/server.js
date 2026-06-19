const express = require("express");
const cors = require("cors");

function startServer(client) {
const app = express();

app.use(cors());
app.use(express.json());

// Página inicial da API
app.get("/", (req, res) => {
res.json({
name: "Nexus Type API",
status: "Online",
version: "1.0.0",
bot: client.isReady() ? "Connected" : "Offline",
uptime: process.uptime()
});
});

// Status da API
app.get("/api/status", (req, res) => {
res.json({
site: "Online",
api: "Online",
bot: client.isReady() ? "Connected" : "Offline",
ping: "${client.ws.ping}ms",
uptime: Math.floor(process.uptime()),
updatedAt: new Date().toISOString()
});
});

// Estatísticas do Discord
app.get("/api/discord/stats", async (req, res) => {
try {
const guild = await client.guilds.fetch(
process.env.DISCORD_GUILD_ID
);

  await guild.members.fetch();

  const totalMembers = guild.memberCount;

  const onlineMembers = guild.members.cache.filter(
    member =>
      member.presence &&
      ["online", "idle", "dnd"].includes(member.presence.status)
  ).size;

  res.json({
    guildName: guild.name,
    guildId: guild.id,
    totalMembers,
    onlineMembers,
    botStatus: client.isReady() ? "Connected" : "Offline",
    ping: `${client.ws.ping}ms`,
    lastUpdated: new Date().toISOString()
  });
} catch (error) {
  console.error(error);

  res.status(500).json({
    error: "Erro ao buscar dados do Discord",
    details: error.message
  });
}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
console.log("=================================");
console.log("🚀 Nexus Type API Online");
console.log("🌐 Porta: ${PORT}");
console.log(
"🤖 Bot: ${ client.isReady() ? client.user.tag : "Conectando..." }"
);
console.log("=================================");
});
}

module.exports = { startServer };
