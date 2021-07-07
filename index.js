const Discord = require('discord.js');
const client = new Discord.Client();

const mySecret = process.env['DISCORD_TOKEN']

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'API_KEY' }).base('BASE_ID');

// Make sure to fill in API_KEY, BASE_ID, CHANNEL_ID and RECORD_ID everywhere in this file for your code to run correct!

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.author === client.user) {
    return;
  }
  if (message.content !== "fetch reviews" && message.content !== "update review" && message.content !== "delete review") {
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
        records.forEach(function(record) {
          console.log(record.getId());
        });
      });
      client.channels.cache.get(`CHANNEL_ID`).send('Thank you for your feedback!');
    }
    catch (err) {
      console.log(err);
    }

  }

  if (message.content === "fetch reviews") {
    try {
      base('Information').select({
        view: 'Grid view'
      }).firstPage(function(err, records) {
        records.forEach(function(record) {
          console.log('Retrieved', record.get('UName'));
          client.channels.cache.get(`CHANNEL_ID`).send(`\n \n \n ${record.get('Feedback')} \n By ${record.get('UName')} \n At ${record.get('Time of Creation')} \n \n \n `)
        });
      });
      client.channels.cache.get(`CHANNEL_ID`).send(`Here are the reviews that you have fetched:\n`)



    }
    catch (err) {
      console.log(err);
    }

  }
  if (message.content === "update review") {
    try {
      base('Information').update("RECORD_ID", {
        "UName": "Xname",
        "Feedback": "Sample Feedback Updated"
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      });
      client.channels.cache.get(`CHANNEL_ID`).send(`updated`)
    }
    catch (err) {
      console.log(err);
    }

  }
  if (message.content === "delete review") {
    try {
      base('Information').destroy('RECORD_ID', function(err, deletedRecord) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted record', deletedRecord.id);
      });
      client.channels.cache.get(`CHANNEL_ID`).send(`The record has been deleted.`)
    }
    catch (err) {
      console.log(err);
    }

  }
}
);

client.login(mySecret);

