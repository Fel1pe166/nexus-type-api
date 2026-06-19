const express = require("express");
const cors = require("cors");

function startServer(client) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      name: "Nexus Type API",
      status: "Online",
      version: "1.0.1",
      bot: client.isReady() ? "Connected" : "Offline",
      uptime: Math.floor(process.uptime()),
      updatedAt: new Date().toISOString()
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
      if (!client.isReady()) {
        return res.status(503).json({
          error: "Bot ainda está conectando ao Discord"
        });
      }

      const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);

      if (!guild) {
        return res.status(404).json({
          error: "Servidor Discord não encontrado",
          details: "Verifique se DISCORD_GUILD_ID está correto e se o bot está no servidor."
        });
      }

      res.json({
        guildName: guild.name,
        guildId: guild.id,
        totalMembers: guild.memberCount,
        onlineMembers: "Unavailable",
        botStatus: "Connected",
        ping: `${client.ws.ping}ms`,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro em /api/discord/stats:", error);

      res.status(500).json({
        error: "Erro ao buscar dados do Discord",
        details: error.message
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      error: "Rota não encontrada",
      path: req.originalUrl
    });
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
