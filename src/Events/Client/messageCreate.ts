import { Event } from "../../Interfaces";
import { Message, TextChannel } from "discord.js";
import { User, Character } from "../../Database/Models";
import { sendProxy } from "../../Utils/SendProxy";

export const event: Event = {
  name: 'messageCreate',
  once: false,
  execute: async ( client, message: Message ) => {

    if ( message.content == `<@${client.user.id}>` ) message.reply({ content: "It's me, JOSEPH ~~STALINE~~!" })

    if ( message.author.bot ) return;
    else
    {

      sendProxy(client, message);

      // await client.service.UpdateUserInfo({ message_count: char.message_count + 1 }, { userID: message.author.id, name: WebhookConstructor.name }, 1);

    }
  }
}
