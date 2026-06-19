require("dotenv").config();

const { client } = require("./discord");
const { startServer } = require("./server");

client.login(process.env.DISCORD_BOT_TOKEN);

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
  startServer(client);
});
