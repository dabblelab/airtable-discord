const Discord = require('discord.js');
const client = new Discord.Client();

const mySecret = process.env['DISCORD_TOKEN']


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    client.channels.chache.get(`855009473394638889`).send('Pong!');
  }
});

client.login(mySecret);