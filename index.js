const { Client, Partials, GatewayIntentBits, version } = require("discord.js");
const { ReactionRole } = require("discordjs-reaction-role");
const dotenv = require("dotenv").config();

// Make sure that all the three environment variables are declared.
["BOT_TOKEN", "ROLE", "MESSAGE"].forEach((env) => {
  if (!process.env[env]) {
    console.error(`Missing environment variable: ${env}`);
    process.exit(1);
  }
});

// Create a client with the intents and partials required.
const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// Create a new manager and use it.
let configuration = (msgID, emoji, roleID) => {
   let newConf = [
        {
          messageId: `${msgID}`,
          reaction: emoji, // :white_check_mark:
          roleId: `${roleID}`,
        },
    ];
    return newConf;
};//END configuration

let manager = new ReactionRole(client, configuration());


client.login(process.env.BOT_TOKEN);

// Start the bot.
client.on("ready", () => {
  console.log("Bot is online! Example: require. DJS version:", version);
  console.log(manager);
});


// Stop the bot when the process is closed (via Ctrl-C).
const destroy = () => {
  manager.teardown();
  client.destroy();
};
process.on("SIGINT", destroy);
process.on("SIGTERM", destroy);