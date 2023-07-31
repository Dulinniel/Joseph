import { Event } from "../../Interfaces";
import { Message, TextChannel } from "discord.js";
import { User, Character } from "../../Database/Models";

export const event: Event = {
  name: 'messageCreate',
  once: false,
  execute: async ( client, message: Message ) => {

    if ( message.content == `<@${client.user.id}>` ) message.reply({ content: "It's me, JOSEPH ~~STALINE~~!" })

    if ( message.author.bot ) return;
    else
    {

      let characters = await client.service.GetUserInfo({ userID: message.author.id }, 1, "*");
      if (characters)
      {
        let char;
        let msg = {
          content: "",
          attachment: [],
          exists: false
        }

        for ( const character of characters )
        {
          char = character;
          let textPosition: number = character.bracket.indexOf("text");
          let bracket: any = character.bracket.reverse()[textPosition];
          let data: number = message.content.indexOf(bracket);

          switch ( data )
          {
            case -1:
              continue;
              break;
            case 0:
              msg.content = message.content.slice(bracket.length, message.content.length);
              break;
            default:
              msg.content = message.content.slice(0, data);
              break;
          }

          break;
        }

        for ( const [k, v] of message.attachments )
        {
          msg.attachment.push(v.url);
        }

        if ( msg.content != "" || msg.attachment.length > 0 ) msg.exists = true;

        if ( msg.exists )
        {

          message.delete();

          let webhook = await ( message.channel as TextChannel ).guild.fetchWebhooks()
          await webhook.get(client.config.WEBHOOK_ID as string).edit({
            name: char.name,
            avatar: char.image,
            channel: ( message.channel as TextChannel ).id
          }).then( wb => wb.send({ content: msg.content, files: msg.attachment }) );

          await client.service.UpdateUserInfo({ message_count: char.message_count+1 }, { userID: message.author.id, name: char.name }, 1);

        }
      } else return;

    }

  }
}
