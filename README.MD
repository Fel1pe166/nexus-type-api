🚀 Nexus Core API

API oficial do Nexus Countdown.

Esta API é responsável por conectar o site Nexus com o Discord, fornecer estatísticas em tempo real, monitoramento de status, sistema de tickets, notificações e recursos administrativos.

✨ Recursos

- Estatísticas do Discord em tempo real
- Contador de membros
- Contador de membros online
- Status do bot
- Status da API
- Sistema de tickets
- Sistema de notificações
- Integração com Discord
- Sistema de segurança
- Logs administrativos
- Monitoramento Nexus Type IA

📦 Tecnologias

- Node.js
- Express
- Discord.js
- dotenv
- CORS

🔗 Endpoints

Discord Stats

GET

/api/discord/stats

Retorna:

{
  "guildName": "Nexus",
  "totalMembers": 1250,
  "onlineMembers": 340,
  "botStatus": "Connected",
  "ping": "35ms"
}

Status

GET

/api/status

Retorna:

{
  "site": "Online",
  "api": "Online",
  "bot": "Connected",
  "ping": "35ms"
}

⚙️ Configuração

Criar arquivo ".env"

DISCORD_BOT_TOKEN=SEU_TOKEN
DISCORD_GUILD_ID=SEU_ID
PORT=3000

🚀 Instalação

npm install

Executar:

npm start

🛡️ Segurança

- Rate Limit
- Proteção Anti-Spam
- Logs de Auditoria
- Validação de Dados
- Sessões Seguras

🤖 Nexus Type

Sistema inteligente responsável por:

- Detectar spam
- Detectar flood
- Gerar alertas
- Monitorar atividades suspeitas
- Auxiliar administradores

👑 Projeto

Desenvolvido para o ecossistema Nexus Countdown.

Todos os direitos reservados © Nexus.