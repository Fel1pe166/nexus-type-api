const express = require("express");
const cors = require("cors");

let statsCache = null;
let statsCacheTime = 0;
const CACHE_DURATION = 60 * 1000;

function startServer(client) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      name: "Nexus Type API",
      status: "Online",
      version: "1.0.0",
      bot: client.isReady() ? "Connected" : "Offline",
      uptime: process.uptime()
    });
  });

  app.get("/api/status", (req, res) => {
    res.json({
      site: "Online",
      api: "Online",
      bot: client.isReady() ? "Connected" : "Offline",
      ping: `${client.ws.ping}ms`,
      uptime: Math.floor(process.uptime()),
      updatedAt: new Date().toISOString()
    });
  });

  app.get("/api/discord/stats", async (req, res) => {
    try {
      const now = Date.now();

      if (statsCache && now - statsCacheTime < CACHE_DURATION) {
        return res.json(statsCache);
      }

      const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);

      const data = {
        guildName: guild.name,
        guildId: guild.id,
        totalMembers: guild.memberCount,
        onlineMembers: "Unavailable",
        botStatus: client.isReady() ? "Connected" : "Offline",
        ping: `${client.ws.ping}ms`,
        lastUpdated: new Date().toISOString()
      };

      statsCache = data;
      statsCacheTime = now;

      res.json(data);
    } catch (error) {
      console.error(error);

      if (statsCache) {
        return res.json({
          ...statsCache,
          warning: "Dados em cache porque o Discord limitou a requisição."
        });
      }

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
    console.log(`🌐 Porta: ${PORT}`);
    console.log(`🤖 Bot: ${client.isReady() ? client.user.tag : "Conectando..."}`);
    console.log("=================================");
  });
}

module.exports = { startServer };
