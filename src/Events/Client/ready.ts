import { Event } from "../../Interfaces";

export const event: Event = {
  name: 'ready',
  once: true,
  execute: async ( client ) => {

    client.user.setPresence({ activities: [{ name: "Lorem Ipsum" }], status: "dnd" });
    client.loadCommands();
    console.log(`Logged in as : ${client.user.username}`);

  }
}
