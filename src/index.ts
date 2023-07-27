import Client from "./Client";

const client = new Client({
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: true
  },
  intents: 40511
})

client.loadEvents();
client.init()
