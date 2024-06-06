import { Message, TextChannel } from "discord.js";
import { Event } from "../../Interfaces";
import { sendProxy } from "../../Utils/SendProxy";

export const event: Event = {
  name: 'messageUpdate',
  once: true,
  execute: async ( client, oldMessage: Message, newMessage: Message ) => {

    if ( oldMessage != newMessage )
    {
      sendProxy(client, newMessage);
    }
  }
}
