const Discord = require('discord.js');
const client = new Discord.Client();

const mySecret = process.env['DISCORD_TOKEN']

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'API_KEY_HERE' }).base('BASE_ID');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.author === client.user) {
    return;
  }

  try {
    base('Information').create([
  {
    "fields": {
      "UName": `${message.author.username}`,
      "Feedback": `${message.content}`
    }
  }
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function (record) {
    console.log(record.getId());
  });
});
    client.channels.cache.get(`CHANNEL_ID`).send('Thank you for your feedback!');
  }
  catch (err) {
    console.log(err);
  }
});

client.login(mySecret);

